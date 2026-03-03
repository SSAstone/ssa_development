"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Globe, Smartphone, BrainCircuit, ShieldCheck, Cloud } from "lucide-react";

const services = [
    {
        title: "Web Development",
        description: "High-performance websites and web applications built with modern frameworks like React and Next.js.",
        icon: Globe,
    },
    {
        title: "Mobile App Development",
        description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.",
        icon: Smartphone,
    },
    {
        title: "Custom Software",
        description: "Tailored software solutions designed to streamline your business processes and increase efficiency.",
        icon: Code,
    },
    {
        title: "AI & Machine Learning",
        description: "Intelligent solutions leveraging the power of AI to automate tasks and provide data-driven insights.",
        icon: BrainCircuit,
    },
    {
        title: "Cybersecurity",
        description: "Comprehensive security services to protect your digital assets and ensure industry compliance.",
        icon: ShieldCheck,
    },
    {
        title: "Cloud Solutions",
        description: "Scalable cloud infrastructure and migration services to support your growing business needs.",
        icon: Cloud,
    },
];

export function Services() {
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveServiceIndex((prev) => (prev + 1) % services.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"dark contents"}>
            <section id="services" className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-0">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Services</h2>
                        <p className="text-muted-foreground text-lg">
                            We provide a comprehensive range of IT services to help your business thrive in the digital age.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="relative p-px overflow-hidden rounded-xl group/card h-full">
                                {/* Static Border (Previous Border) */}
                                <div className={`absolute inset-0 border border-border rounded-xl transition-opacity duration-1000 ${activeServiceIndex === index ? 'opacity-0' : 'opacity-100'}`} />

                                {/* Moving Light Border */}
                                <div
                                    className={`absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_45%,var(--primary)_50%,transparent_55%,transparent_100%)] transition-opacity duration-1000 ${activeServiceIndex === index ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'}`}
                                />

                                <Card className="relative h-full bg-card/95 backdrop-blur-md border-none flex flex-col group transition-all duration-300">
                                    <CardHeader>
                                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                            <service.icon className="size-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grow">
                                        <CardDescription className="text-base text-muted-foreground/80">
                                            {service.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>

    );
}
