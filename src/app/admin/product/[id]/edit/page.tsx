import React from 'react'
import { getProductById } from "@/actions/product"
import { notFound } from "next/navigation"
import ProductForm from "@/components/admin/ProductForm"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const productData = await getProductById(parseInt(id))

    if (!productData) {
        notFound()
    }

    // Map database structure to form structure if necessary
    const initialData = {
        title: productData.title,
        description: productData.description,
        productItems: productData.productItems.map(item => ({
            label: item.label,
            content: item.content as any, // Cast to any to bypass strict type check for JSONB
            items: item.items as any
        }))
    }

    return (
        <div className="container py-10">
            <ProductForm initialData={initialData} productId={productData.id} />
        </div>
    )
}
