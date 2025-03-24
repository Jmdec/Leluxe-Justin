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
import { OurTeam, OurTeamRow } from "./Types";
import { put } from "@vercel/blob";

type OurTeamCreateInput = Prisma.OurTeamCreateInput & {
  id?: string;
};

const model = "Our Team";

export const table_Format = async (columns: Column[], records: OurTeam[]) => {

  return records.map((record) => {
    const row: OurTeamRow = {
      id: String(record.id),
      name: record.name,
      position: record.position,
      imageUrl: record.imageUrl,
      actions: "",
    };

    columns.forEach((column) => {
      const key = column.key as keyof OurTeam;
      if (key === "imageUrl") {
        row.imageUrl = record.imageUrl;
      } else {
        row[key as keyof OurTeamRow] = record[key] ? String(record[key]) : "";
      }
    });

    return row;
  });
};

export const getAll = async () => {
  let records;

  try {
    records = await prisma.ourTeam.findMany();
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
    id: String(record.id),
  }));

  return {
    code: 200,
    message: `Fetched ${model}`,
    records: formattedRecords,
  };
};

export const create = async (values: OurTeamCreateInput): Promise<ActionResponse> => {
  const schema = createSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    throw new Error("Validation Error: " + JSON.stringify(formatErrors(ufErrors as Yup.ValidationError)));
  }

  try {
    await prisma.ourTeam.create({
      data: {
        name: values.name,
        position: values.position,
        imageUrl: values.imageUrl,
      },
    });

    return { code: 200, message: `Added ${values.name} successfully` };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    throw new Error("Server Error: Unable to save testimonial.");
  }
};


export const update = async (
  values: Prisma.OurTeamCreateInput & { id: number }
) => {
  const schema = updateSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (validationErrors) {
    const errors = formatErrors(validationErrors as Yup.ValidationError);
    return { code: 429, message: "Validation Error", errors };
  }

  try {
    await prisma.ourTeam.update({
      where: { id: values.id },
      data: {
        name: values.name,
        position: values.position,
        imageUrl: values.imageUrl,
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
    await prisma.ourTeam.delete({
      where: { id: Number(values.id) },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  };

  const response: ActionResponse = { code: 200, message: `Deleted ${model}` };
  return response;
};

