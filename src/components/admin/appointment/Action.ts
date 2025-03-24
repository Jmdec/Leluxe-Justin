"use server";

import { Column } from "@/components/globals/types";
import prisma from "@/lib/prisma";
import { AppointmentRow, Appointment, AppointmentWithService, NotificationType } from "./Types";
import { formatDate } from "@fullcalendar/core/index.js";
import { Prisma } from "@prisma/client";
import nodemailer from "nodemailer";
import { User } from "@/components/auth/Types";

const model = "Appointment";
type AppointmentCreateInput = Prisma.AppointmentCreateInput & {
    id?: string;
    status?: string;
};

export const format = async (ufRecords: AppointmentWithService[]) => {
    const records: Appointment[] = [];

    ufRecords.forEach((ufRecord) => {
        const service = ufRecord.service;
        const category = service?.category;

        const record = {
            ...ufRecord,
           
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

export const getAppointments = async () => {
    let records;

    try {
        records = await prisma.appointment.findMany({
            include: {
                service: {
                    include: {
                        category: true,
                        type: true
                    }
                }
            }
        });
    } catch {
        return {
            code: 500,
            message: "Server Error",
            records: [],
        };
    }

    records = await format(records || []);
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
                userId: true,
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

        let message = "";
        if (values.status === "Accepted") {
            message = `Your appointment has been approved. See you on ${data.date} at ${data.time}.`;
        } else if (values.status === "Declined") {
            message = `Sorry, but your appointment has been declined. Reason: ${values.declineReason || "No reason provided."}`;
        } else if (values.rescheduledDate) {
            message = `Your appointment has been rescheduled to ${values.rescheduledDate}.`;
        }

        if (message) {
            await createNotification(data.userId, message);
        }

        return { code: 200, message: `Appointment updated successfully` };
    } catch (error) {
        console.error("Error updating appointment:", error);
        return { code: 500, message: "Server Error", error };
    }
};

export const createNotification = async (userId: string, message: string) => {
    try {
        await prisma.notification.create({
            data: {
                userId,
                message,
            },
        });
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

export const getNotifications = async (
    userId: string
): Promise<{ code: number; records: NotificationType[]; message?: string }> => {
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return { code: 200, records: notifications };
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return { code: 500, message: "Server error", records: [] };
    }
};

export const markNotificationsAsRead = async (userId: string) => {
    try {
        await prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
    } catch (error) {
        console.error("Error marking notifications as read:", error);
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
        subject = "Your Appointment Request Has Been Declined";
        message = `
            Hello ${data.fullname},<br><br>

            Unfortunately, we are unable to approve your appointment at <b>Le Luxe Clinic</b> at this time.<br>
            ❌ <b>Reason for Decline:</b> ${data.declineReason || "No reason provided"}<br>
            Please feel free to reach out if you'd like to reschedule.<br><br>

            Best regards,<br>
            <b>Le Luxe Clinic Team</b>
        `;
    } else if (data.rescheduledDate) {
        subject = "Your Appointment Has Been Rescheduled!";
        message = `
            Hello ${data.fullname},<br><br>

            Your appointment at <b>Le Luxe Clinic</b> has been <b>rescheduled</b>.<br><br>

            🔄 <b>New Appointment Date:</b> ${data.rescheduledDate}<br>
            ⏰ <b>Appointment Time:</b> ${data.time}<br>
            ✅ <b>Appointment Status:</b> ${data.status}<br>

            Please let us know if this new schedule works for you.<br><br>

            Best regards,<br>
            <b>Le Luxe Clinic Team</b>
        `;
    } else {
        subject = "We Received Your Inquiry";
        message = `
            Hello ${data.fullname},<br><br>

            Thank you for reaching out! We have received your inquiry and will get back to you as soon as possible.<br>
            If you have any urgent questions, feel free to contact us again.<br><br>

            Best regards,<br>
            <b>Le Luxe Clinic Team</b>
        `;
    }

    const mailOptions = {
        from: `"Le Luxe Clinic" <${process.env.EMAIL_USER}>`,
        to: data.email,
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
