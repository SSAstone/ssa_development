import React from 'react'
import { getProductById } from "@/actions/product"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, Package, ListTree, Tags } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from '@/components/ui/badge'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await getProductById(parseInt(id))

    if (!product) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/product">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
                </div>
                <div className="ml-auto">
                    <Button asChild variant="outline">
                        <Link href={`/admin/product/${product.id}/edit`}>
                            Edit Product
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-primary" />
                                Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</h4>
                                <div
                                    className="prose prose-sm dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Created At</span>
                                <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Updated At</span>
                                <span>{new Date(product.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <ListTree className="h-5 w-5 text-primary" />
                        Product Items ({product.productItems.length})
                    </h2>

                    {product.productItems.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 text-center text-muted-foreground">
                                No items defined for this product.
                            </CardContent>
                        </Card>
                    ) : (
                        product.productItems.map((item: any) => (
                            <Card key={item.id} className="border-l-4 border-l-primary">
                                <CardHeader className='pb-4'>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">{item.label}</CardTitle>
                                        <Badge variant="secondary">Item #{item.id}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Main Content Sections */}
                                    {item.content && item.content.length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                                                <Tags className="h-3 w-3" /> Content Blocks
                                            </h4>
                                            <div className="grid gap-4">
                                                {item.content.map((c: any, i: number) => (
                                                    <div key={i} className="p-4 rounded-lg bg-muted/50 border border-muted">
                                                        <h5 className="font-semibold text-sm mb-2">{c.title}</h5>
                                                        <div
                                                            className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground"
                                                            dangerouslySetInnerHTML={{ __html: c.body }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Nested Items */}
                                    {item.items && item.items.length > 0 && (
                                        <div className="space-y-4 pt-2">
                                            <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Sub-Items</h4>
                                            <div className="grid gap-4 pl-4 border-l-2 border-muted">
                                                {item.items.map((subItem: any, i: number) => (
                                                    <div key={i} className="space-y-2">
                                                        <h5 className="font-medium text-sm flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            {subItem.label}
                                                        </h5>
                                                        <div className="grid gap-4 pl-4">
                                                            {subItem.content.map((sc: any, si: number) => (
                                                                <div key={si} className="space-y-1">
                                                                    <div className="font-semibold text-xs text-muted-foreground">{sc.title}</div>
                                                                    <div
                                                                        className="prose prose-sm dark:prose-invert max-w-none text-sm text-foreground"
                                                                        dangerouslySetInnerHTML={{ __html: sc.body }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}