import { Prisma } from "@prisma/client";
import { User } from "@/components/auth/Types";
import { Service } from "@/components/admin/services/Types";


export type Appointment = {
    id: number;
    userId : string;
    user? : User;
    serviceId?: number;
    service?: Service;
    fullname: string;
    email: string;
    phonenumber: string;
    date: Date;
    time: String;
    message: string;
    status: string;
    declineReason?: string | null;
    rescheduledDate?: Date | null;
};

export type AppointmentRow = {
    id: string;
    userId: string;
    service: string;
    category: string;
    fullname: string;
    email: string;
    phonenumber: string;
    date: string;
    time: string;
    rescheduledDate: string;
    message: string;
    status: string;
    actions: string;
};

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
    include: {
        service: {
            include: {
                category: true,
            },
        },
    },
}>;