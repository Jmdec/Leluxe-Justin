"use server";

import { ActionResponse, Column, Destroy } from "@/components/globals/types";
import prisma from "@/lib/prisma";
import {FAQsRow,FAQs} from "./Types";
import { Prisma } from "@prisma/client";
import * as Yup from "yup";
import { create as createSchema, update as updateSchema } from "./schema";
import { formatErrors } from "@/components/globals/Utils";
import { destroy as destroySchema } from "@/components/globals/schema";

type FaqsCreateInput = Prisma.FaqsCreateInput & {
  id?: string;
};

const model = "FAQs";

export const formatTable = async (columns: Column[], records: FAQs[] = []) => {
  return records.map((record) => ({
    id: String(record.id),
    question: record.question,
    answer: record.answer,
    actions: "",
  }));
};


export const getFAQs = async () => {
  let records;

  try {
    records = await prisma.faqs.findMany();
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



export const create = async (values: FaqsCreateInput): Promise<ActionResponse> => {
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
    await prisma.faqs.create({
      data: {
        question: values.question,
        answer: values.answer,
      },
    });
  } catch (error) {
    console.error(`Error creating  ${model}` , error);  
    const response: ActionResponse = {
      code: 500,
      message: 'Server Error',
    };
    return response;
  }

  const response: ActionResponse = { code: 200, message: `Added ${values.question} successfully` };
  return response;
};

export const update = async (
  values: Prisma.FaqsCreateInput & { id: number }
) => {
  const schema = updateSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (validationErrors) {
    const errors = formatErrors(validationErrors as Yup.ValidationError);
    return { code: 429, message: "Validation Error", errors };
  }

  try {
    await prisma.faqs.update({ 
      where: { id: values.id },
      data: {
        question: values.question,
        answer: values.answer,
      },
    });

    return { code: 200, message: `${model} updated successfully` };
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return { code: 500, message: "Server Error" };
  }
};


export const destroy = async (values: Destroy | null): Promise<ActionResponse> => {
  if (!values) {
    console.error("Destroy function received null values.");
    return { code: 400, message: "Invalid request payload" };
  }

  const schema = destroySchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = (ufErrors as Yup.ValidationError).inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));

    return {
      code: 400,
      message: "Validation Error",
    };
  }

  const id = Number(values.id);
  if (isNaN(id)) {
    return { code: 400, message: "Invalid ID" };
  }

  try {
    await prisma.faqs.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Delete Error:", error);

    return { code: 500, message: "Server Error. Unable to delete category." };
  }

  return { code: 200, message: `Deleted ${model}` };
};
