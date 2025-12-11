import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center py-20 md:py-32 lg:py-48 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-secondary/20 blur-[80px] rounded-full opacity-30 pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="mx-auto max-w-3xl space-y-6">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                        🚀 Innovating the Future
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Transforming Ideas into <br className="hidden md:block" />
                        <span className="text-primary">Digital Reality</span>
                    </h1>

                    <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        We build premium software solutions, cutting-edge websites, and robust applications tailored to elevate your business.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Button asChild size="lg" className="h-12 px-8 text-base">
                            <Link href="#contact">
                                Start a Project <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                            <Link href="#portfolio">
                                View Portfolio
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
