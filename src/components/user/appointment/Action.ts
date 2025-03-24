"use server";

import { ActionResponse } from "@/components/globals/types";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const model = "Appointment";


export const create = async (values: Omit<Prisma.AppointmentCreateInput, 'service'> & { serviceId: number; userId: string }) => {
  try {
    if (!values || typeof values !== 'object') {
      throw new Error("Invalid values: must be an object");
    }

    const service = await prisma.service.findUnique({ where: { id: values.serviceId } });
    if (!service) {
      throw new Error(`Service with ID ${values.serviceId} does not exist.`);
    }

    const appointmentDate = new Date(values.date);
    if (isNaN(appointmentDate.getTime())) {
      throw new Error("Invalid date format.");
    }

    console.log("Formatted Values to Submit:", values);

    const appointment = await prisma.appointment.create({
      data: {
        userId: values.userId, 
        fullname: values.fullname,
        email: values.email,
        phonenumber: values.phonenumber,
        date: appointmentDate,
        time: values.time,
        serviceId: values.serviceId,
        message: values.message,
        status: "Pending",
      },
    });

    const response: ActionResponse = { code: 200, message: `Appointment submitted successfully` };
    return response;
  } catch (error: any) {
    console.error('Error creating appointment:', error.message || error);

    const response: ActionResponse = {
      code: 500,
      message: error.message || "Server Error",
    };
    return response;
  }
};
