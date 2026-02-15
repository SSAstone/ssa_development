import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

// Placeholder data for portfolio items
const projects = [
    {
        title: "FinTech Dashboard",
        category: "Web Application",
        image: "bg-gradient-to-br from-purple-500/20 to-blue-500/20",
        description: "Real-time financial analytics platform for a global banking client.",
    },
    {
        title: "HealthCare Connect",
        category: "Mobile App",
        image: "bg-gradient-to-br from-teal-500/20 to-emerald-500/20",
        description: "Telemedicine app connecting patients with specialists instantly.",
    },
    {
        title: "E-Commerce Rebrand",
        category: "UI/UX Design",
        image: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
        description: "Complete design overhaul for a leading fashion retailer.",
    },
    {
        title: "Smart Logistics",
        category: "Enterprise Software",
        image: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
        description: "AI-driven supply chain management system.",
    },
];

export function Portfolio() {
    return (
        <section id="products" className="py-24 bg-background border-t border-border/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2">Our Work</span>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Featured Projects</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Success stories from our collaboration with industry leaders and startups.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-2xl border border-border bg-background aspect-[4/3] md:aspect-[16/9] transition-all hover:shadow-xl">
                            {/* Image Placeholder */}
                            <div className={`absolute inset-0 ${project.image} transition-transform duration-500 group-hover:scale-105`} />

                            {/* Overlay Content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                                    <span className="text-primary text-sm font-semibold mb-2 block opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl font-bold mb-2 text-foreground">{project.title}</h3>
                                    <p className="text-muted-foreground mb-4 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {project.description}
                                    </p>
                                    <Button variant="link" className="!p-0 h-auto text-primary gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        View Case Study <ArrowUpRight className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button variant="outline" size="lg">
                        View All Projects
                    </Button>
                </div>
            </div>
        </section>
    );
}
