"use server";

import { Column, Destroy } from "@/components/globals/types";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { InquiryRow, Inquiry } from "./Types";
import { destroy as destroySchema } from "@/components/globals/schema";
import { formatErrors } from "@/components/globals/Utils";
import * as Yup from "yup";
import nodemailer from "nodemailer";
import { create as createSchema } from "./schema"

const model = "Inquiry";

type InquiryCreateInput = Prisma.InquiryCreateInput & {
    id?: number;
};

export const format = async (inquiry: unknown[]): Promise<Inquiry[]> => {
    return (inquiry as Record<string, unknown>[]).map((inquiry) => ({
        id: Number(inquiry.id ?? ""),
        fullname: String(inquiry.fullname ?? ""),
        message: String(inquiry.message ?? ""),
        reply: String(inquiry.reply ?? ""),
        phonenumber: String(inquiry.phonenumber ?? ""),
        email: String(inquiry.email ?? ""),

    }));
};

export const tableFormat = async (columns: Column[], records: Inquiry[]) => {
    const rows: InquiryRow[] = [];

    records.forEach((record) => {
        const row: InquiryRow = {
            id: String(record.id),
            fullname: record.fullname,
            email: record.email,
            phonenumber: record.phonenumber,
            message: record.message,
            reply: record.reply || 'No Reply',
            actions: "",
        };

        rows.push(row);
    });
    return rows;
};

export const create = async (values: InquiryCreateInput) => {
    console.log("Received Inquiry Values:", values);

    const schema = createSchema;

    try {
        await schema.validate(values, { abortEarly: false });
    } catch (validationErrors) {
        console.error("Validation Errors:", validationErrors);
        const errors = formatErrors(validationErrors as Yup.ValidationError);
        return {
            code: 429,
            message: "Validation Error",
            errors: errors,
        };
    }

    try {
        const newInquiry = await prisma.inquiry.create({
            data: {
                fullname: values.fullname,
                email: values.email,
                phonenumber: values.phonenumber,
                message: values.message,
                reply: values.reply || null,
            },
        });

        console.log("Inquiry Created Successfully:", newInquiry);

        await sendEmailToAdmin(newInquiry);
    } catch (error) {
        console.error("Database Error:", error); // Log the full error
        return {
            code: 500,
            message: "Server Error",
            error: error,
        };
    }

    return { code: 200, message: "Inquiry submitted successfully" };
};

export const sendEmailToAdmin = async (inquiry: Inquiry) => {
    console.log("Sending email for inquiry:", inquiry);

    console.log("Email User:", process.env.EMAIL_USER);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("Missing EMAIL_USER or EMAIL_PASS in environment variables");
        return { code: 500, message: "Email configuration error" };
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Inquiry Received",
            text: `You have received a new inquiry from ${inquiry.fullname}.`,
        });

        console.log("Admin email sent successfully");

        await transporter.sendMail({
            from: "Le Luxe Clinic",
            to: inquiry.email,
            subject: "We Received Your Inquiry",
            text: `Hello ${inquiry.fullname}, we received your inquiry.`,
        });

        console.log("Confirmation email sent to user");

        return { code: 200, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { code: 500, message: "Error sending email", error };
    }
};



export const getInquiry = async () => {
    let records;

    try {
        records = await prisma.inquiry.findMany({
        });
    } catch {
        const response = {
            code: 500,
            message: "Server Error",
            records: [],
        };
        return response;
    }

    records = await format(records || []);
    const response = {
        code: 200,
        message: `Fetched ${model}s`,
        records: records,
    };
    return response;
};

export const destroy = async (values: Destroy) => {
    const schema = destroySchema;

    try {
        await schema.validate(values, { abortEarly: false });
    } catch (ufErrors) {
        const errors = formatErrors(ufErrors as Yup.ValidationError);
        return { code: 429, message: "Validation Error", errors };
    }

    try {
        await prisma.inquiry.delete({
            where: { id: Number(values.id) },
        });

        return { code: 200, message: "Inquiry deleted successfully" };
    } catch (error) {
        console.error("Error deleting Inquiry:", error);
        return { code: 500, message: "Server Error", error };
    }
};

export const sendReply = async ({ id, reply }: { id: number; reply: string }) => {
    try {
        console.log("Received payload in server:", { id, reply });

        const inquiry = await prisma.inquiry.findUnique({
            where: { id: Number(id) },
            select: { email: true, fullname: true }, 
        });

        if (!inquiry) {
            return { code: 404, message: "Inquiry not found" };
        }

        await prisma.inquiry.update({
            where: { id: Number(id) },
            data: { reply },
        });

        console.log("Reply saved successfully");

        const emailResponse = await sendReplyEmail({ ...inquiry, reply });

        return { code: 200, message: "Reply sent successfully", emailResponse };
    } catch (error: any) {
        console.error("Error saving reply:", error.message);
        return { code: 500, message: "Failed to send reply", error: error.message };
    }
};

const sendReplyEmail = async (inquiry: { email: string; fullname: string; reply: string }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: '"Le Luxe Clinic" <' + process.env.EMAIL_USER + '>',
        to: inquiry.email,
        subject: "Reply to Your Inquiry",
        text: `Hello ${inquiry.fullname},\n\nThank you for reaching out. Here is our response to your inquiry:\n\n"${inquiry.reply}"\n\nBest regards,\nLe Luxe Clinic`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Reply email sent successfully to:", inquiry.email);
        return { code: 200, message: "Reply email sent successfully" };
    } catch (error: any) {
        console.error("Error sending reply email:", error.message);
        return { code: 500, message: "Error sending reply email", error: error.message };
    }
};