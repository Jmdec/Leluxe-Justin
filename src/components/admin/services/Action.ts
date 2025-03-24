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
import { Service, ServiceRow, ServiceWithCategory } from "./Types";

type ServiceCreateInput = Prisma.ServiceCreateInput & {
  categoryId?: string;
  typeId?: string;
};

const model = "Services";

export const format = async (ufRecords: ServiceWithCategory[]) => {
  const records: Service[] = [];

  ufRecords.forEach((ufRecord) => {
    const category = ufRecord.category;
    const type = ufRecord.type;

    const record: Service = {
      ...ufRecord,
      category: category
        ? {
          ...category,
          id: Number(category.id),
          name: category.name as string,
        }
        : undefined,

      type: type
        ? {
          ...type,
          id: Number(type.id),
          name: type.name as string,
        }
        : undefined,
      typeId: ufRecord.typeId ? Number(ufRecord.typeId) : undefined,
      categoryId: ufRecord.categoryId ? Number(ufRecord.categoryId) : undefined,
      price: Number(ufRecord.price),
      name: String(ufRecord.name),
      id: Number(ufRecord.id),
      duration: Number(ufRecord.duration),
      durationUnit: String(ufRecord.durationUnit),
      description: String(ufRecord.description),
      imageUrl: String(ufRecord.imageUrl),
    };

    records.push(record);
  });

  return records;
};

export const tableFormat = async (columns: Column[], records: Service[]) => {
  const rows: ServiceRow[] = [];

  records.forEach((record) => {
    const row: Partial<ServiceRow> = {};

    columns.forEach((column) => {
      const key = column.key;
      let value: string | number = "";

      switch (key) {
        case "category":
          value = record.category?.name ?? "";
          break;

        case "type":
          value = record.type?.name ?? "";
          break;

        case "price":
          value = record.price ?? 0;
          break;

        default:
          value = String(record[key as keyof Service] ?? "");
          break;
      }

      (row as any)[key] = value;
    });

    rows.push(row as ServiceRow);
  });

  return rows;
};


export const getAll = async (categoryId?: string, typeId?: string) => {
  let records;

  try {
    records = await prisma.service.findMany({
      where: {
        ...(categoryId ? { category: { id: Number(categoryId) } } : {}),
        ...(typeId ? { type: { id: Number(typeId) } } : {}),
      },
      include: {
        category: true,
        type: true,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      code: 500,
      message: "Server Error",
      records: [],
    };
  }

  records = await format(records);
  return {
    code: 200,
    message: `Fetched ${model}`,
    records,
  };
};

export const create = async (values: Omit<Prisma.ServiceCreateInput, 'category' | 'type'> & { categoryId: Number, typeId: Number }) => {
  const schema = createSchema;

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
    await prisma.service.create({
      data: {
        category: { connect: { id: Number(values.categoryId) } },
        ...(values.typeId ? { type: { connect: { id: Number(values.typeId) } } } : {}),
        name: values.name,
        description: values.description,
        price: Number(values.price),
        duration: Number(values.duration),
        durationUnit: String(values.durationUnit),
        imageUrl: String(values.imageUrl),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        code: 500,
        message: "Server Error",
        error: error.message,
      };
    } else {
      console.error("Unknown error:", error);

      return {
        code: 500,
        message: "An unknown error occurred",
      };
    }
  }


  const response: ActionResponse = { code: 200, message: `Added ${model}` };
  return response;
};


export const update = async (
  values: Omit<Prisma.ServiceCreateInput, "category" | "type"> & {
    id: number;
    categoryId: number;
    typeId?: number;
  }
) => {
  const schema = updateSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (validationErrors) {
    const errors = formatErrors(validationErrors as Yup.ValidationError);
    return { code: 429, message: "Validation Error", errors };
  }

  try {
    await prisma.service.update({
      where: { id: values.id },
      data: {
        category: { connect: { id: values.categoryId } },
        ...(values.typeId ? { type: { connect: { id: Number(values.typeId) } } } : {}),
        name: values.name,
        description: values.description,
        price: Number(values.price),
        duration: values.duration,
        durationUnit: values.durationUnit,
        imageUrl: String(values.imageUrl),
      },
    });

    return { code: 200, message: "Service updated successfully" };
  } catch (error) {
    console.error("Error updating service:", error);
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
    await prisma.service.delete({
      where: { id: Number(values.id) },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  const model = "Service";

  const response: ActionResponse = { code: 200, message: `Deleted ${model}` };

  console.log('Response:', response);

  return response;
};
