"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "./Types";
import nodemailer from "nodemailer";


const model = "User";


type UserCreateInput = Prisma.UserCreateInput & {
    id?: number;
};

export const getUserById = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return { success: false, message: "User not found." };
        }

        return { success: true, user };
    } catch (error) {
        console.error("Error fetching user:", error);
        return { success: false, message: "Something went wrong." };
    }
};

export const updateEmail = async (values: { email: string, userId: string }) => {
    try {
        const { email, userId } = values;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { success: false, message: "Email already in use." };
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { email },
        });

        return { success: true, message: "Email updated successfully", user: updatedUser };
    } catch (error) {
        console.error("Error updating email:", error);
        return { success: false, message: "Something went wrong while updating the email." };
    }
};

export const updatePassword = async (values: { currentPassword: string, newPassword: string, userId: string }) => {
    const { currentPassword, newPassword, userId } = values;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return { success: false, message: "User not found." };
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "Current password is incorrect." };
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });

        return { success: true, message: "Password updated successfully" };
    } catch (error) {
        console.error("Error updating password:", error);
        return { success: false, message: "Something went wrong while updating the password." };
    }
};


export const deleteUser = async (userId: string) => {
    try {
        await prisma.appointment.deleteMany({
            where: { userId: userId },
        });

        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });

        return { success: true, message: "User deleted successfully", user: deletedUser };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, message: "Something went wrong while deleting the user." };
    }
};

export const logout = async () => {
    try {
        const session = await cookies();

        const keys = ["user_token", "isLoggedIn", "accountID"];
        keys.forEach((key) => {
            session.delete(key);
        });

        return {
            success: true,
            message: "Logged Out",
        };
    } catch (error) {
        console.error("Logout Error:", error);
        return { success: false, message: "Something went wrong during logout" };
    }
};
