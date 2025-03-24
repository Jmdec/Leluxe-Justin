"use server";

import prisma from "@/lib/prisma";

export const countAppointments = async () => {
    let count;

    try {
        count = await prisma.appointment.count(
            {
                where: {
                    status: 'Accepted',
                },
            }
        );
    } catch (error) {
        console.error("Error fetching appointment count:", error);
        return {
            code: 500,
            message: "Server Error",
            count: 0,
        };
    }

    return {
        code: 200,
        message: "Fetched appointment count successfully",
        count,
    };
};

export const totalIncome = async () => {
    let sum = 0;

    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                status: "Accepted",
            },
            include: {
                service: true,
            },
        });

        sum = appointments.reduce((acc, appointment) => {
            if (appointment.service?.price) {
                acc += appointment.service.price.toNumber();
            }
            return acc;
        }, 0);
    } catch (error) {
        console.error("Error fetching appointment sum:", error);
        return {
            code: 500,
            message: "Server Error",
            sum: 0,
        };
    }

    return {
        code: 200,
        message: "Fetched appointment sum successfully",
        sum,
    };
};
export const getTotalBookings = async () => {
    const bookings = await prisma.appointment.groupBy({
        by: ['date'],
        _count: {
            id: true,
        },
        where: {
            status: 'Accepted',
        },
        orderBy: {
            date: 'asc',
        },
    });

  
    const processedBookings = bookings.map(booking => {
        const date = new Date(booking.date);
        return {
            originalDate: booking.date,
            day: date.getDate(),
            month: date.getMonth() + 1, 
            year: date.getFullYear(),
            count: booking._count.id,
        };
    });

    return {
        code: 200,
        message: "Fetched bookings data successfully",
        bookings: processedBookings,
    };
};
