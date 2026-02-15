import React from 'react'
import { getProductById } from "@/actions/product"
import { notFound } from "next/navigation"
import { ProductFormValues } from "@/lib/validations"
import ProductForm from "@/components/admin/ProductForm"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const productData = await getProductById(parseInt(id))

    if (!productData) {
        notFound()
    }

    // Map database structure to form structure if necessary
    const initialData: ProductFormValues = {
        title: productData.title ?? "",
        name: productData.name,
        image: productData.image ?? "",
        description: productData.description,
        productItems: productData.productItems.map(item => ({
            label: item.label,
            content: (item.content as any) ?? [],
            items: (item.items as any) ?? []
        }))
    }

    return (
        <div className="container py-10">
            <ProductForm initialData={initialData} productId={productData.id} />
        </div>
    )
}
