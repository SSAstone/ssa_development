"use server";

import { db } from "@/db";
import { product, productItem } from "@/db/schema";
import { productFormSchema, ProductFormValues } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createProductAction(values: ProductFormValues) {
    try {
        const validatedFields = productFormSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields!" };
        }

        const { title, name, image, description, productItems } = validatedFields.data;

        const [newProduct] = await db.insert(product).values({
            title,
            name,
            image,
            description,
        }).returning();

        if (productItems && productItems.length > 0) {
            await db.insert(productItem).values(
                productItems.map((item) => ({
                    productId: newProduct.id,
                    label: item.label,
                    content: item.content,
                    items: item.items,
                }))
            );
        }

        revalidatePath("/admin/product");
        return { success: "Product created successfully!", id: newProduct.id };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Something went wrong!" };
    }
}

export async function getProducts() {
    try {
        const products = await db.select().from(product).orderBy(product.createdAt);
        return products;
    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}

export async function getProductById(id: number) {
    try {
        const data = await db.query.product.findFirst({
            where: (product, { eq }) => eq(product.id, id),
            with: {
                productItems: true,
            },
        });
        return data;
    } catch (error) {
        console.error("Database Error:", error);
        return null;
    }
}

export async function updateProductAction(id: number, values: ProductFormValues) {
    try {
        const validatedFields = productFormSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields!" };
        }

        const { title, name, image, description, productItems } = validatedFields.data;

        await db.transaction(async (tx) => {
            // 1. Update product main info
            await tx.update(product)
                .set({ title, name, image, description, updatedAt: new Date() })
                .where(eq(product.id, id));

            // 2. Delete existing items
            await tx.delete(productItem).where(eq(productItem.productId, id));

            // 3. Insert new items
            if (productItems && productItems.length > 0) {
                await tx.insert(productItem).values(
                    productItems.map((item) => ({
                        productId: id,
                        label: item.label,
                        content: item.content,
                        items: item.items,
                    }))
                );
            }
        });

        revalidatePath("/admin/product");
        revalidatePath(`/admin/product/${id}`);
        return { success: "Product updated successfully!" };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Something went wrong!" };
    }
}
