"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ActionResponse, Destroy } from "@/components/globals/types";
import {
  create as createSchema,
  update as updateSchema
} from "./schema";
import { formatErrors } from "@/components/globals/Utils";
import * as Yup from "yup";
import { Column } from "@/components/globals/types";
import { destroy as destroySchema } from "@/components/globals/schema";
import { Testimonial, TestimonialRow } from "./Types";


type TestimonialsCreateInput = Prisma.TestimonialsCreateInput & {
  id?: string;
};

const model = "Testimonial";

export const table_Format = async (columns: Column[], records: Testimonial[]) => {
  return records.map((record) => {
    const row: TestimonialRow = {
      id: String(record.id),
      name: record.name,
      message: record.message,
      status: record.status,
      imageUrl: record.imageUrl,
      actions: "",
    };
    return row;
  });
};

export const getAll = async () => {
  let records;

  try {
    records = await prisma.testimonials.findMany();
  } catch (error) {
    console.error("Database Error:", error);
    return {
      code: 500,
      message: "Server Error",
      records: [],
    };
  }

  const formattedRecords = records.map((record) => ({
    ...record,
    id: record.id,
  }));

  return {
    code: 200,
    message: `Fetched ${model}`,
    records: formattedRecords,
  };
};

export const create = async (values: TestimonialsCreateInput): Promise<ActionResponse> => {
  const schema = createSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    throw new Error("Validation Error: " + JSON.stringify(formatErrors(ufErrors as Yup.ValidationError)));
  }

  try {
    await prisma.testimonials.create({
      data: {
        name: values.name,
        message: values.message,
        imageUrl: values.imageUrl,
        status: values.status,
      },
    });

    return { code: 200, message: `Added ${values.name} successfully` };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    throw new Error("Server Error: Unable to save testimonial.");
  }
};


export const edit = async (
  values: Prisma.TestimonialsCreateInput & { id: number }
) => {
  const schema = updateSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (validationErrors) {
    const errors = formatErrors(validationErrors as Yup.ValidationError);
    return { code: 429, message: "Validation Error", errors };
  }

  try {
    const updatedTestimonial = await prisma.testimonials.update({
      where: { id: values.id },
      data: {
        name: values.name,
        message: values.message,
        imageUrl: values.imageUrl, // Ensure this is correctly updated
      },
      select: {
        id: true,
        name: true,
        message: true,
        imageUrl: true, // Ensure this is returned
      },
    });

    return { code: 200, message: `${model} updated successfully` };
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return { code: 500, message: "Server Error" };
  }
};


export const update = async (values: { id: number; status: string }) => {
  try {
    const data = await prisma.testimonials.update({
      where: {
        id: values.id,
        status: "Pending"
      },
      data: {
        status: values.status,
      },
      select: {
        id: true,
        name: true,
        message: true,
        imageUrl: true,
        status: true,
      },
    });

  } catch (error) {
    console.error(`Error updating appointment ${model}`, error);
    return { code: 500, message: "Server Error", error };
  }
};


export const destroy = async (values: Destroy) => {
  const schema = destroySchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: errors,
    };
    return response;
  }

  try {
    await prisma.testimonials.delete({
      where: { id: Number(values.id) },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  };

  const response: ActionResponse = { code: 200, message: `Deleted ${model}` };
  return response;
};
