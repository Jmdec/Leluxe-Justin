"use server";

import { ActionResponse, Column, Destroy } from "@/components/globals/types";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as Yup from "yup";
import {
    create as createSchema,
    update as updateSchema
} from "./schema";
import { destroy as destroySchema } from "@/components/globals/schema";
import { NewsRow, News } from "./Types";
import { formatErrors } from "@/components/globals/Utils";
import { formatDate } from "@fullcalendar/core/index.js";
import fs from "fs";
import path from "path";


type NewsCreateInput = Prisma.NewsCreateInput & {
    id?: number;
};

const model = "News";

export const format = async (news: unknown[]): Promise<News[]> => {
    return (news as Record<string, unknown>[]).map((news) => ({
        id: Number(news.id ?? ""),
        date: news.date ? new Date(news.date as string) : new Date(),
        title: String(news.title ?? ""),
        description: String(news.description ?? ""),
        link: String(news.link ?? ""),
        imageUrl: String(news.imageUrl ?? ""),
    }));
};

export const tableFormat = async (columns: Column[], records: News[]) => {
    const rows: NewsRow[] = [];

    records.forEach((record) => {
        const date = formatDate(record.date)
        const row: NewsRow = {
            id: String(record.id),
            date: date || "",
            title: record.title,
            description: record.description,
            link: record.link,
            imageUrl: record.imageUrl,
            actions: ""
        };
        rows.push(row);
    });
    return rows;
};

export const getNews = async () => {
    let records;

    try {
        records = await prisma.news.findMany({
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

export const create = async (values: NewsCreateInput) => {
    const schema = createSchema;

    try {
        await schema.validate(values, { abortEarly: false });
    } catch (ufErrors) {
        const errors = formatErrors(ufErrors as Yup.ValidationError);
        const response: ActionResponse = {
            code: 429,
            message: 'Validation Error',
            errors: errors,
        };
        return response;
    }

    try {
        await prisma.news.create({
            data: {
                date: new Date(values.date),
                title: values.title,
                description: values.description,
                link: values.link,
                imageUrl: values.imageUrl,
            },
        });
    } catch (error) {
        const response: ActionResponse = {
            code: 500,
            message: "Server Error", error: error
        };
        return response;
    }

    const response: ActionResponse = { code: 200, message: "Added News" };
    return response;
};

export const update = async (values: NewsCreateInput & { id: number }) => {
    const schema = updateSchema;

    try {
        await schema.validate(values, { abortEarly: false });
    } catch (validationErrors) {
        const errors = formatErrors(validationErrors as Yup.ValidationError);
        return { code: 429, message: "Validation Error", errors };
    }

    try {
        await prisma.news.update({
            where: { id: values.id }, 
            data: {
                date: new Date(values.date),
                title: values.title,
                description: values.description,
                link: values.link,
                imageUrl: values.imageUrl,
            },
        });

        return { code: 200, message: "News updated successfully" };
    } catch (error) {
        console.error("Error updating news:", error);
        return { code: 500, message: "Server Error", error };
    }
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
        await prisma.news.delete({
            where: { id: Number(values.id) },
        });

        return { code: 200, message: "News deleted successfully" };
    } catch (error) {
        console.error("Error deleting news:", error);
        return { code: 500, message: "Server Error", error };
    }
};

export const uploadFile = async (formData: FormData) => {
    try {
        const file = formData.get("file") as File;
        if (!file) throw new Error("No file received");

        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadDir = path.join(process.cwd(), "public/uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const timestamp = Date.now();
        const fileExtension = path.extname(file.name);
        const fileName = `${timestamp}${fileExtension}`;
        const filePath = path.join(uploadDir, fileName);

        fs.writeFileSync(filePath, buffer);

        const fileUrl = `uploads/${fileName}`;

        return { url: fileUrl };
    } catch (error) {
        console.error("Upload failed:", error);
        return { error: "File upload failed" };
    }
};
