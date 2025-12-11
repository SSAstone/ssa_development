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
    return (
        <section id="services" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Services</h2>
                    <p className="text-muted-foreground text-lg">
                        We provide a comprehensive range of IT services to help your business thrive in the digital age.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                            <CardHeader>
                                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <service.icon className="size-6 text-primary" />
                                </div>
                                <CardTitle className="text-xl">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-muted-foreground/80">
                                    {service.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
