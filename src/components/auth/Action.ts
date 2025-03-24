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

export const create = async (values: UserCreateInput) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: values.email,
                fullname: values.fullname,
                password: values.password,
                role: values.role ?? "user",
                createdAt: new Date(),
            },
        });

        return { code: 200, message: `${model} created successfully`, user };
    } catch (error) {
        return {
            code: 500,
            message: "Server Error",
        };
    }
};


export const login = async (values: { email: string; password: string }) => {
    const { email, password } = values;
  
    try {
  
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return { success: false, message: "User not found or email not verified." };
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return { success: false, message: "Invalid email or password." };
      }
  
      const local = await cookies();
      
      const token = JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role
      });
  
      local.set('user_token', token, { path: '/', httpOnly: true, secure: true });
  
      local.set("isLoggedIn", "true");
  
      return { success: true, message: "Login successful", user, token };
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, message: "Something went wrong." };
    }
  };
  
export const sendLink = async (values: { email: string }) => {
    const { email } = values;

    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
        throw new Error("JWT secret is not defined in environment variables.");
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return { success: false, message: "User not found." };
        }

        const resetToken = jwt.sign({ email: user.email }, secret, {
            expiresIn: '1h',
        });

        const resetUrl = `${process.env.NEXT_PUBLIC_LOCAL_PORT}/auth/reset-password?token=${resetToken}`;

        const emailResponse = await emailContent({
            email: user.email,
            fullname: user.fullname,
            resetUrl,
        });

        if (emailResponse.code !== 200) {
            return { success: false, message: "Error sending email." };
        }

        return { success: true, message: "Password reset link sent successfully." };

    } catch (error) {
        console.error("Error in sendLink:", error);
        return { success: false, message: "Something went wrong." };
    }
};
export const resetPassword = async (values: { email: string, newPassword: string }) => {
    const { email, newPassword } = values;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email },
            data: { password: hashedNewPassword },
        });

        return { success: true, message: "Password updated successfully" };
    } catch (error) {
        console.error("Error resetting password:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return { success: false, message: "Database error occurred" };
        }

        return { success: false, message: "Error resetting password" };
    }
};

export const emailContent = async (data: { email: string, fullname: string, resetUrl: string }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const subject = "Password Reset Request";
    const message = `
        Hello ${data.fullname},<br><br>
        We received a request to reset your password. Please click the link below to reset your password.<br><br>
        <a href="${data.resetUrl}">Reset Password</a><br><br>
        If you did not request this, please ignore this email.<br><br>
        Best regards,<br>
        <b>Le Luxe Clinic</b>
    `;

    const mailOptions = {
        from: `"Your Company" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject,
        html: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { code: 200, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { code: 500, message: "Error sending email", error };
    }
};


export const logout = async () => {
    try {
      const local = await cookies();
  
      const keys = ["user_token", "isLoggedIn", "accountID"];
      keys.forEach((key) => {
        local.delete(key);
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
  