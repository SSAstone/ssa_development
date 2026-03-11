"use server";

import { db } from "@/db";
import { contact } from "@/db/schema";
import { contactSchema, ContactFormValues } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";

export async function submitContactFormAction(values: ContactFormValues) {
    try {
        const validatedFields = contactSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields!" };
        }

        const { firstName, lastName, email, message } = validatedFields.data;

        await db.insert(contact).values({
            firstName,
            lastName,
            email,
            message,
        });

        revalidatePath("/admin/contacts");
        return { success: "Message sent successfully!" };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Something went wrong!" };
    }
}

export async function getContacts() {
    try {
        const contacts = await db.select().from(contact).orderBy(desc(contact.createdAt));
        return contacts;
    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}

export async function deleteContactAction(id: number) {
    try {
        await db.delete(contact).where(eq(contact.id, id));
        revalidatePath("/admin/contacts");
        return { success: "Contact deleted successfully!" };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Something went wrong!" };
    }
}
