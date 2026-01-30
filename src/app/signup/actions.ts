"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signup(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = (formData.get("role") as string) || "user";

    if (!name || !email || !password) {
        return { error: "All fields are required" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
            role: role as "user" | "admin" | "teacher" | "student",
        });
    } catch (error: any) {
        if (error.code === "23505") {
            return { error: "Email already exists" };
        }
        return { error: "Something went wrong" };
    }

    redirect("/login");
}
