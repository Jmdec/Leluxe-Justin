import { Prisma } from "@prisma/client";
import { Category } from "../service_category/Types";
import { Types } from "../service_types/Types";

export type Service = {
    id: number;
    name: string;
    description: string;
    category?: Category;
    categoryId?: number;
    type?: Types;
    typeId?: number;
    price: number;
    duration: number;
    durationUnit: string;
    imageUrl: string;
};

export type ServiceRow = {
    id: string;
    name: string;
    description: string;
    category: string;
    type: string;
    price: string;
    duration: string;
    durationUnit: string;
    actions: string;
    imageUrl: string;
};

export type ServiceWithCategory = Prisma.ServiceGetPayload<{
    include: {
        category: true;
        type: true;
    };
}>;

