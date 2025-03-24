"use server";

import { Column } from "@/components/globals/types";
import prisma from "@/lib/prisma";
import { AppointmentRow, Appointment, AppointmentWithService } from "../appointment/Types";
import { formatDate } from "@fullcalendar/core/index.js";
import { Prisma } from "@prisma/client";
import nodemailer from "nodemailer";
import { User } from "@/components/auth/Types";

const model = "Appointment";
type AppointmentCreateInput = Prisma.AppointmentCreateInput & {
    id?: string;
    status?: string;
};

export const format = async (ufRecords: AppointmentWithService[], userId: string) => {
    const records: Appointment[] = [];

    if (!userId) {
        throw new Error("User not authenticated");
    }

    ufRecords.forEach((ufRecord) => {
        const service = ufRecord.service;
        const category = service?.category;

        const record = {
            ...ufRecord,
            user: {
                id: userId,
            } as User,
            service: {
                ...service,
                id: service.id,
                name: service?.name as string,
                price: Number(service.price),
                duration: Number(service.duration),
                durationUnit: service?.durationUnit as string,
                imageUrl: service?.imageUrl as string,
                categoryId: service.categoryId as number,
                category: category ? {
                    ...category,
                    id: category.id,
                    name: category?.name as string,
                } : undefined,
                typeId: service.typeId === null ? undefined : service.typeId,
            },
        };

        records.push(record);
    });

    return records;
};

export const tableFormat = async (columns: Column[], records: Appointment[]) => {
    const rows: AppointmentRow[] = [];

    records.forEach((record) => {
        const row: AppointmentRow = {
            id: String(record.id),
            userId: String(record.userId),
            fullname: record.fullname,
            time: String(record.time),
            rescheduledDate: formatDate(record.rescheduledDate || "N/A"),
            date: formatDate(record.date),
            email: record.email,
            phonenumber: record.phonenumber,
            category: record.service?.category?.name || "N/A",
            service: record.service?.name || "N/A",
            message: record.message,
            status: record.status,
            actions: ""
        };
        rows.push(row);
    });
    return rows;
};

export const getAppointments = async (userId: string) => {
    let records;

    try {
        records = await prisma.appointment.findMany({
            where: {
                userId: userId,

            },
            include: {
                service: {
                    include: {
                        category: true,
                        type: true
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Server Error",
            records: [],
        };
    }

    records = await format(records || [], userId);
    return {
        code: 200,
        message: "Fetched appointments",
        records,
    };
};

export const update = async (values: { id: number; status: string; declineReason?: string; rescheduledDate?: Date }) => {
    try {
        const data = await prisma.appointment.update({
            where: { id: values.id },
            data: {
                status: values.status,
                declineReason: values.declineReason,
                rescheduledDate: values.rescheduledDate
            },
            select: {
                id: true,
                fullname: true,
                email: true,
                date: true,
                time: true,
                status: true,
                declineReason: true,
                rescheduledDate: true
            },
        });

        await sendEmailToUser(data);

        return { code: 200, message: `Appointment updated successfully` };
    } catch (error) {
        console.error("Error updating appointment:", error);
        return { code: 500, message: "Server Error", error };
    }
};

export const sendEmailToUser = async (data: Pick<Appointment, "fullname" | "email" | "date" | "time" | "declineReason" | "status" | "rescheduledDate">) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let subject = "";
    let message = "";

    if (data.status === "Accepted") {
        subject = "Your Appointment Has Been Approved!";
        message = `
            Hello ${data.fullname},<br><br>

            We are pleased to inform you that your appointment at <b>Le Luxe Clinic</b> has been <b>approved</b>. 
            Please make sure to arrive on time and let us know if you have any questions.<br><br>

            📅 <b>Appointment Date:</b> ${data.date}<br>
            ⏰ <b>Appointment Time:</b> ${data.time}<br>
            ✅ <b>Appointment Status:</b> ${data.status}<br>

            Looking forward to seeing you soon!<br><br>

            Best regards,<br>
            <b>Le Luxe Clinic Team</b>
        `;
    } else if (data.status === "Declined") {
        subject = `Appointment Request Cancelled by: ${data.fullname}`;
        message = `
            Good Day!,<br><br>
    
            My appointment request has been <b>cancelled</b>.<br>
            ❌ <b>Reason for Decline:</b> ${data.declineReason || "No reason provided"}<br>
            Please review the details and take any necessary action.<br><br>
    
            Best regards,<br>
            <b>${data.fullname}</b>
        `;
    } else if (data.rescheduledDate) {
        subject = ` Appointment Rescheduled by: ${data.fullname} `;
        message = `
            Good Day,<br><br>
    
            ${data.fullname} has <b>rescheduled their appointment</b> at <b>Le Luxe Clinic</b>.<br><br>
    
            📅 <b>User Name:</b> ${data.fullname}<br>
            🔄 <b>New Appointment Date:</b> ${data.rescheduledDate}<br>
            ⏰ <b>Appointment Time:</b> ${data.time}<br>
            ✅ <b>Appointment Status:</b> ${data.status}<br><br>
    
            Please review the new appointment details and confirm if needed.<br><br>
    
            Best regards,<br>
            <b>Le Luxe Clinic Team</b>
        `;
    }


    const mailOptions = {
        from: data.email,
        to: `${process.env.EMAIL_USER}, ${data.email}`,
        subject,
        html: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { code: 200, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { code: 500, message: "Error sending email", error };
    }
};
