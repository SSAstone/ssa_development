"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    console.log("user----", user);

    if (!user || user.password === null) {
        // In a real app, you shouldn't reveal if the user exists
        return { error: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return { error: "Invalid email or password" };
    }

    // Create the session
    const expires = new Date(Date.now() + 120 * 60 * 1000); // 2 hours
    const session = await encrypt({ user: { id: user.id, email: user.email, role: user.role }, expires });

    // Save the session in a cookie
    (await cookies()).set("session", session, { expires, httpOnly: true });

    // Redirect based on role
    if (user.role === "admin") {
        redirect("/admin");
    } else if (user.role === "teacher") {
        redirect("/dashboard/teacher");
    } else if (user.role === "student") {
        redirect("/dashboard/student");
    } else {
        redirect("/");
    }
}

export async function logout() {
    (await cookies()).set("session", "", { expires: new Date(0) });
    redirect("/login");
}
