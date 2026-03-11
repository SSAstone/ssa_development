import { z } from "zod";

export const productItemContentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    body: z.string().min(1, "Body is required"),
});

export const productItemNestedSchema = z.object({
    label: z.string().min(1, "Label is required"),
    content: z.array(productItemContentSchema),
});

export const productItemSchema = z.object({
    label: z.string().min(1, "Label is required"),
    content: z.array(productItemContentSchema),
    items: z.array(productItemNestedSchema),
});

export const productFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    name: z.string().min(1, "Name is required"),
    image: z.any().refine((val) => val !== null && val !== undefined, "Image is required"),
    description: z.string().min(1, "Description is required"),
    productItems: z.array(productItemSchema),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const contactSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

