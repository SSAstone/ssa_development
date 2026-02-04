import React from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Eye } from "lucide-react"
import { getProducts } from "@/actions/product"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default async function Page() {
    const products = await getProducts()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground">Manage your product offerings and details.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/product/new" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" /> New Product
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.length === 0 ? (
                    <div className="col-span-full p-12 border-2 border-dashed rounded-xl text-center flex flex-col items-center justify-center bg-muted/20">
                        <p className="text-muted-foreground mb-4">No products found. Create your first product to get started.</p>
                        <Button asChild variant="outline">
                            <Link href="/admin/product/new">Create Product</Link>
                        </Button>
                    </div>
                ) : (
                    products.map((p) => (
                        <Card key={p.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <CardHeader className="bg-muted/30 pb-4">
                                <CardTitle>{p.title}</CardTitle>
                                <CardDescription className="line-clamp-2">{p.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4 flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">
                                    Created: {new Date(p.createdAt).toLocaleDateString()}
                                </span>
                                <Button size="sm" variant="ghost" asChild>
                                    <Link href={`/admin/product/${p.id}`} className="flex items-center gap-2">
                                        <Eye className="w-4 h-4" /> View
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}