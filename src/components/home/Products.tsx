import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box } from "lucide-react";

const products = [
    {
        title: "EcoTrack Analytics",
        description: "A comprehensive dashboard for monitoring environmental impact and sustainability metrics in real-time.",
        tags: ["React", "D3.js", "Node.js"],
        cta: "Learn More",
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        title: "SecureVault",
        description: "Enterprise-grade password management and file encryption solution for distributed teams.",
        tags: ["Next.js", "Rust", "Cryptography"],
        cta: "View Product",
        color: "bg-purple-500/10 text-purple-500",
    },
    {
        title: "TaskFlow AI",
        description: "AI-powered project management tool that predicts bottlenecks and optimizes team workflows.",
        tags: ["Python", "TensorFlow", "FastAPI"],
        cta: "Try Demo",
        color: "bg-green-500/10 text-green-500",
    },
];

export function Products() {
    return (
        <div className={"dark contents"}>

            <section id="products" className="py-24 bg-background border-t border-border/50">
                <div className="container mx-auto px-4 md:px-0">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Products</h2>
                            <p className="text-muted-foreground text-lg">
                                Innovative tools and platforms we've built to solve real-world problems.
                            </p>
                        </div>
                        <Button variant="outline" className="gap-2 text-primary">
                            View All Products <ArrowRight className="size-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

                                <div>
                                    <div className={`size-12 rounded-xl ${product.color} flex items-center justify-center mb-6`}>
                                        <Box className="size-6" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                                    <p className="text-muted-foreground mb-6">
                                        {product.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {product.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center text-sm font-medium text-primary cursor-pointer group-hover:underline">
                                    {product.cta} <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>

    );
}
