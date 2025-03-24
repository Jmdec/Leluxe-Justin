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
import { BlogsRow, Blogs } from "./Types";
import { formatDate, formatErrors } from "@/components/globals/Utils";
import fs from "fs";
import path from "path";

type BlogsCreateInput = Prisma.BlogsCreateInput & {
    id?: number;
};

const model = "Blogs";

export const format = async (blogs: unknown[]): Promise<Blogs[]> => {
    return (blogs as Record<string, unknown>[]).map((blogs) => ({
        id: Number(blogs.id ?? ""),
        date: blogs.date ? new Date(blogs.date as string) : new Date(),
        title: String(blogs.title ?? ""),
        description: String(blogs.description ?? ""),
        author: String(blogs.author ?? ""),
        link: String(blogs.link ?? ""),
        imageUrl: String(blogs.imageUrl ?? ""),
    }));
};

export const tableFormat = async (columns: Column[], records: Blogs[]) => {
    const rows: BlogsRow[] = [];

    records.forEach((record) => {
        const date = formatDate(record.date)
        const row: BlogsRow = {
            id: String(record.id),
            date: date || "",
            title: record.title,
            description: record.description,
            author: record.author,
            link: record.link,
            imageUrl: record.imageUrl,
            actions: ""
        };

        columns.forEach((column) => {
            const key = column.key as keyof Blogs;
            if (key === "imageUrl") {
                row.imageUrl = record.imageUrl;
            } else {
                row[key as keyof BlogsRow] = record[key] ? String(record[key]) : "";
            }
        });
        rows.push(row);
    });
    return rows;
};

export const getBlogs = async () => {
    let records;

    try {
        records = await prisma.blogs.findMany({
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

export const create = async (values: BlogsCreateInput) => {
    const schema = createSchema;

    try {
        await schema.validate(values, { abortEarly: false });
    } catch (ufErrors) {
        throw new Error("Validation Error: " + JSON.stringify(formatErrors(ufErrors as Yup.ValidationError)));
    }

    try {
        await prisma.blogs.create({
            data: {
                date: new Date(values.date),
                title: values.title,
                description: values.description,
                author: values.author,
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

    const response: ActionResponse = { code: 200, message: "Added Blogs" };
    return response;
};

export const update = async (values: BlogsCreateInput & { id: number }) => {
    const schema = updateSchema;

    try {
        await schema.validate(values, { abortEarly: false });
    } catch (validationErrors) {
        const errors = formatErrors(validationErrors as Yup.ValidationError);
        return { code: 429, message: "Validation Error", errors };
    }

    try {
        await prisma.blogs.update({
            where: { id: values.id },
            data: {
                date: new Date(values.date),
                title: values.title,
                description: values.description,
                author: values.author,
                link: values.link,
                imageUrl: values.imageUrl,
            },
        });

        return { code: 200, message: "Blogs updated successfully" };
    } catch (error) {
        console.error("Error updating blogs:", error);
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
        await prisma.blogs.delete({
            where: { id: Number(values.id) },
        });

        return { code: 200, message: "Blogs deleted successfully" };
    } catch (error) {
        console.error("Error deleting Blogs:", error);
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
