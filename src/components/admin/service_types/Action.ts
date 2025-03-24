"use server";

import { ActionResponse, Column, Destroy } from "@/components/globals/types";
import prisma from "@/lib/prisma";
import { TypesRow, Types} from "./Types";
import { Prisma } from "@prisma/client";
import * as Yup from "yup";
import { create as createSchema, update as updateSchema } from "./schema";
import { formatErrors } from "@/components/globals/Utils";
import { destroy as destroySchema } from "@/components/globals/schema";

type ServiceTypeCreateInput = Prisma.ServiceTypeCreateInput & {
  id?: string;
};

const model = "Service Types";

export const table_Format = async (columns: Column[], records: Types[]) => {
  const rows: TypesRow[] = [];

  records.forEach((record) => {
    const row: TypesRow = {
      id: String(record.id),
      name: record.name,
      actions: "",
    };
    rows.push(row);
  });
  return rows;
};

export const getTypes = async () => {
  let records;

  try {
    records = await prisma.serviceType.findMany({
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
    await prisma.serviceType.create({
      data: {
        name: values.name,
      },
    });
  } catch (error) {
    console.error("Error creating service type:", error);  // Log the error here
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
    await prisma.serviceType.update({ 
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
    await prisma.serviceType.delete({
      where: { id: Number(values.id) },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  };

  const response: ActionResponse = { code: 200, message: `Deleted ${model}` };
  return response;
};
