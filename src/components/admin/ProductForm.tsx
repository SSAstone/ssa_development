"use client";

import React, { useTransition } from "react";
import { useForm, useFieldArray, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, ProductFormValues } from "@/lib/validations";
import { createProductAction, updateProductAction } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductFormProps {
    initialData?: ProductFormValues;
    productId?: number;
}

export default function ProductForm({ initialData, productId }: ProductFormProps) {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = React.useState<{ error?: string; success?: string }>({});
    const router = useRouter();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            productItems: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "productItems",
    });

    const onSubmit = (values: ProductFormValues) => {
        setStatus({});
        startTransition(async () => {
            let result;
            if (productId) {
                result = await updateProductAction(productId, values);
            } else {
                result = await createProductAction(values);
            }

            if ("error" in result && result.error) {
                setStatus({ error: result.error });
            } else if ("success" in result && result.success) {
                setStatus({ success: result.success });
                const finalId = productId || (result as any).id;

                if (!productId) {
                    reset();
                }

                setTimeout(() => {
                    router.push(`/admin/product/${finalId}`);
                }, 1500);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto p-4">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" asChild>
                    <Link href={productId ? `/admin/product/${productId}` : "/admin/product"}>
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">{productId ? "Edit Product" : "Create New Product"}</h1>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Product Title</Label>
                    <Input
                        id="title"
                        {...register("title")}
                        placeholder="e.g. Enterprise Solution"
                        className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        {...register("description")}
                        placeholder="Describe your product..."
                        className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Product Items</h2>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ label: "", content: [], items: [] })}
                        className="flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Item
                    </Button>
                </div>

                {fields.map((field, index) => (
                    <ProductItemSection
                        key={field.id}
                        index={index}
                        control={control}
                        register={register}
                        remove={remove}
                        errors={errors}
                    />
                ))}
            </div>

            {status.error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
                    {status.error}
                </div>
            )}

            {status.success && (
                <div className="p-3 bg-green-100 text-green-700 rounded-md border border-green-200">
                    {status.success}
                </div>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Saving..." : productId ? "Update Product" : "Create Product"}
            </Button>
        </form>
    );
}

function ProductItemSection({ index, control, register, remove, errors }: any) {
    const { fields: contentFields, append: appendContent, remove: removeContent } = useFieldArray({
        control,
        name: `productItems.${index}.content`,
    });

    const { fields: itemFields, append: appendItem, remove: removeItem } = useFieldArray({
        control,
        name: `productItems.${index}.items`,
    });

    return (
        <Card className="border-2 border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50">
                <CardTitle className="text-sm font-medium">Item #{index + 1}</CardTitle>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
                <div className="space-y-2">
                    <Label>Label</Label>
                    <Input
                        {...register(`productItems.${index}.label`)}
                        placeholder="Item Label"
                        className={errors.productItems?.[index]?.label ? "border-red-500" : ""}
                    />
                </div>

                {/* Content Section */}
                <div className="space-y-3 pl-4 border-l-2 border-blue-100">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-blue-700">Content Blocks</h4>
                        <Button
                            type="button"
                            variant="outline"
                            size="xs"
                            onClick={() => appendContent({ title: "", body: "" })}
                            className="h-7 text-xs"
                        >
                            Add Content
                        </Button>
                    </div>
                    {contentFields.map((cField, cIndex) => (
                        <div key={cField.id} className="flex gap-2 items-start">
                            <div className="flex-1 space-y-2">
                                <Input
                                    {...register(`productItems.${index}.content.${cIndex}.title`)}
                                    placeholder="Title"
                                    className="h-8 text-sm"
                                />
                                <Textarea
                                    {...register(`productItems.${index}.content.${cIndex}.body`)}
                                    placeholder="Body text"
                                    className="text-sm min-h-[60px]"
                                />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeContent(cIndex)}
                                className="mt-1"
                            >
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Nested Items Section */}
                <div className="space-y-3 pl-4 border-l-2 border-purple-100">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-purple-700">Sub-Items</h4>
                        <Button
                            type="button"
                            variant="outline"
                            size="xs"
                            onClick={() => appendItem({ label: "", content: [] })}
                            className="h-7 text-xs"
                        >
                            Add Sub-Item
                        </Button>
                    </div>
                    {itemFields.map((iField, iIndex) => (
                        <div key={iField.id} className="p-3 bg-purple-50 rounded-md space-y-3">
                            <div className="flex items-center justify-between">
                                <Input
                                    {...register(`productItems.${index}.items.${iIndex}.label`)}
                                    placeholder="Sub-item label"
                                    className="h-8 bg-white"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem(iIndex)}
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                            <NestedContentSection
                                itemIndex={iIndex}
                                parentIndex={index}
                                control={control}
                                register={register}
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function NestedContentSection({ itemIndex, parentIndex, control, register }: any) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `productItems.${parentIndex}.items.${itemIndex}.content`,
    });

    return (
        <div className="space-y-2 pl-4">
            <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Sub-item Content</span>
                <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={() => append({ title: "", body: "" })}
                    className="h-6 text-[10px]"
                >
                    Add Sub-Content
                </Button>
            </div>
            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                    <div className="flex-1 space-y-1">
                        <Input
                            {...register(`productItems.${parentIndex}.items.${itemIndex}.content.${index}.title`)}
                            placeholder="Sub-title"
                            className="h-7 text-[12px] bg-white"
                        />
                        <Textarea
                            {...register(`productItems.${parentIndex}.items.${itemIndex}.content.${index}.body`)}
                            placeholder="Sub-body"
                            className="text-[12px] min-h-[40px] bg-white"
                        />
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                        <Trash2 className="w-3 h-3" />
                    </Button>
                </div>
            ))}
        </div>
    );
}
