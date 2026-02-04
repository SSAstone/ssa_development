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
    description: z.string().min(1, "Description is required"),
    productItems: z.array(productItemSchema),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
