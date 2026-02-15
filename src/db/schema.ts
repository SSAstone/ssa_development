import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    password: text("password").notNull(),
    role: text("role").notNull().default("user"),
});

export const product = pgTable("product", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }),
    name: varchar("name", { length: 255 }).notNull(),
    image: text("image"),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productRelations = relations(product, ({ many }) => ({
    productItems: many(productItem),
}));

export const productItem = pgTable("product_item", {
    id: serial("id").primaryKey(),
    productId: integer("product_id").references(() => product.id, { onDelete: "cascade" }),
    label: varchar("label", { length: 255 }).notNull(),
    content: jsonb("content").$type<{
        title: string;
        body: string;
    }[]>().default([]),
    items: jsonb("items").$type<{
        label: string;
        content: {
            title: string;
            body: string;
        }[];
    }[]>().default([]),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productItemRelations = relations(productItem, ({ one }) => ({
    product: one(product, {
        fields: [productItem.productId],
        references: [product.id],
    }),
}));

export const service = pgTable("service", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});