"use server";

import { ActionResponse, Column, Destroy } from "@/components/globals/types";
import prisma from "@/lib/prisma";
import { CategoryRow, Category} from "./Types";
import { Prisma } from "@prisma/client";
import * as Yup from "yup";
import { create as createSchema, update as updateSchema } from "./schema";
import { formatErrors } from "@/components/globals/Utils";
import { destroy as destroySchema } from "@/components/globals/schema";

type ServiceTypeCreateInput = Prisma.ServiceTypeCreateInput & {
  id?: string;
};

const model = "Service Category";

export const formatTable = async (columns: Column[], records: Category[]) => {
  const rows: CategoryRow[] = [];

  records.forEach((record) => {
    const row: CategoryRow = {
      id: String(record.id),
      name: record.name,
      actions: "",
    };
    rows.push(row);
  });
  return rows;
};

export const getCategories = async () => {
  let records;

  try {
    records = await prisma.category.findMany({
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      records: [],
    };
    return response;
  }

  records = await (records || []);
  const response = {
    code: 200,
    message: `Fetched ${model}`,
    records: records,
  };
  return response;
};

export const create = async (values: ServiceTypeCreateInput): Promise<ActionResponse> => {
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
    await prisma.category.create({
      data: {
        name: values.name,
      },
    });
  } catch (error) {
    console.error(`Error creating  ${model}` , error);  // Log the error here
    const response: ActionResponse = {
      code: 500,
      message: 'Server Error',
    };
    return response;
  }

  const response: ActionResponse = { code: 200, message: `Added ${values.name} successfully` };
  return response;
};

export const update = async (
  values: Prisma.CategoryCreateInput & { id: number }
) => {
  const schema = updateSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (validationErrors) {
    const errors = formatErrors(validationErrors as Yup.ValidationError);
    return { code: 429, message: "Validation Error", errors };
  }

  try {
    await prisma.category.update({ 
      where: { id: values.id },
      data: {
        name: values.name,
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
    await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Delete Error:", error);

    return { code: 500, message: "Server Error. Unable to delete category." };
  }

  return { code: 200, message: `Deleted Category` };
};
