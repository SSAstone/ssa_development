"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GrSwift } from "react-icons/gr";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandCSharp } from "react-icons/tb";

import {
    SiJavascript,
    SiReact,
    SiNextdotjs,
    SiMongodb,
    SiFirebase,
    SiDart,
    SiFlutter,
    SiSwift,
    SiStripe,
    SiTypescript,
    SiNuxtdotjs,
    SiGooglemaps,
    SiUnity,
    SiExpress
} from "react-icons/si";

export const logos = [
    { name: "JavaScript", icon: SiJavascript },
    { name: "TypeScript", icon: SiTypescript },
    { name: "React.js", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Nuxt.js", icon: SiNuxtdotjs },
    { name: "Express.js", icon: SiExpress },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Firebase", icon: SiFirebase },
    { name: "Dart", icon: SiDart },
    { name: "Flutter", icon: SiFlutter },
    { name: "Swift", icon: SiSwift },
    { name: "SwiftUI", icon: GrSwift },
    { name: "C#", icon: TbBrandCSharp },
    { name: "Unity", icon: SiUnity },
    { name: "Stripe", icon: SiStripe },
    { name: "Postgres", icon: BiLogoPostgresql },
];



import {
    Code,
    TabletSmartphone,
    Cloud,
    BrainCircuit,
    Gamepad2,
    ChevronsLeftRightEllipsis
} from "lucide-react";

export const services = [
    {
        title: "Web Development",
        description:
            "Modern, fast, and scalable web applications using React, Next.js, and TypeScript.",
        icon: ChevronsLeftRightEllipsis,
    },
    {
        title: "Mobile App Development",
        description:
            "High-quality iOS and Android apps using Flutter and SwiftUI with smooth UX.",
        icon: TabletSmartphone,
    },
    {
        title: "Custom Software Solutions",
        description:
            "Tailor-made software systems to automate workflows and solve complex business problems.",
        icon: Code,
    },
    {
        title: "Game Development",
        description:
            "Immersive 2D and 3D gaming experiences crafted in Unity and C#, from concept to polished release.",
        icon: Gamepad2,
    },
    // {
    //     title: "AI & Machine Learning",
    //     description:
    //         "AI-powered features including automation, recommendations, and data intelligence.",
    //     icon: BrainCircuit,
    // },
    // {
    //     title: "Cloud & Backend Solutions",
    //     description:
    //         "Secure, scalable cloud systems using Firebase, Neon, and modern backend architectures.",
    //     icon: Cloud,
    // },
];


export default function NewServices() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [activeServiceIndex, setActiveServiceIndex] = useState(0)
    const [activeLogoIndex, setActiveLogoIndex] = useState(0)
    const [sideIndices, setSideIndices] = useState<number[]>([])

    useEffect(() => {
        const serviceInterval = setInterval(() => {
            setActiveServiceIndex((prev) => (prev + 1) % services.length)
        }, 3000)

        const logoInterval = setInterval(() => {
            setActiveLogoIndex((prev) => (prev + 1) % logos.length)
        }, 2000)

        return () => {
            clearInterval(serviceInterval)
            clearInterval(logoInterval)
        }
    }, [])

    const getSideIndices = (index: number) => {
        const sideIndices = []
        if (index % 4 !== 0) sideIndices.push(index - 1)
        if (index % 4 !== 3) sideIndices.push(index + 1)
        if (index >= 4) sideIndices.push(index - 4)
        if (index < 12) sideIndices.push(index + 4)
        return sideIndices.filter(i => i >= 0 && i < logos.length)
    }

    return (
        <div className={"dark contents"}>
            <section id="services" className="py-24 bg-background">
                <div className="md:flex items-center justify-center text-white relative p-4 md:p-0">
                    <div className="md:w-3/6">
                        <div className="md:absolute inset-0">
                            <div className="container mx-auto flex justify-center">
                                <div className="">
                                    <div className="pb-10">
                                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Services</h2>
                                        <p className="text-muted-foreground text-lg">
                                            We provide a comprehensive range of IT services to help your business thrive in the digital age.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

                                </div>
                                <div className="md:w-3/6 h-full flex-shrink-0"></div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-3/6 overflow-hidden h-full">
                        <div className="w-full ml-auto pt-20 pb-12 md:pl-16">
                            <div className="grid grid-cols-4 gap-1 rotate-3">
                                {logos.map((logo, index) => {
                                    const Icon = logo.icon
                                    const isActive = activeLogoIndex === index;
                                    return (
                                        <div
                                            key={index}
                                            className={`relative flex items-center bg-gray-900 justify-center h-32 text-5xl transition-all duration-500 ease-in-out cursor-pointer overflow-hidden p-px rounded-sm ${hoveredIndex === index ? 'z-20' : sideIndices.includes(index) ? 'z-10' : 'z-0'}`}
                                            style={{
                                                transform: hoveredIndex === index
                                                    ? 'scale(1.1) translate(-20px, -20px)'
                                                    : sideIndices.includes(index)
                                                        ? 'scale(1.05) translate(-10px, -10px)'
                                                        : 'scale(1) translate(0, 0)',
                                                boxShadow: hoveredIndex === index
                                                    ? '3px 3px 20px rgba(255, 255, 255, 0.3), 4px 4px 30px rgba(255, 255, 255, 0.2), 5px 5px 40px rgba(255, 255, 255, 0.1)'
                                                    : sideIndices.includes(index)
                                                        ? '2px 2px 15px rgba(255, 255, 255, 0.2), 3px 3px 25px rgba(255, 255, 255, 0.15), 4px 4px 35px rgba(255, 255, 255, 0.1)'
                                                        : 'none',
                                            }}
                                            onMouseEnter={() => {
                                                setHoveredIndex(index)
                                                setSideIndices(getSideIndices(index))
                                            }}
                                            onMouseLeave={() => {
                                                setHoveredIndex(null)
                                                setSideIndices([])
                                            }}
                                        >
                                            {/* Static Border (Hidden when active) */}
                                            <div className={`absolute inset-0 border-gray-800 rounded-sm transition-opacity duration-1000 ${isActive ? 'opacity-0' : 'opacity-100'}`} />

                                            {/* Moving Light Border */}
                                            <div
                                                className={`absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_45%,var(--primary)_50%,transparent_55%,transparent_100%)] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                            />

                                            <div className="relative z-10 w-full h-full flex items-center justify-center bg-gray-900">
                                                <Icon className="w-8 h-8 text-white" />
                                                <div className={`absolute inset-0 bg-gray-700 opacity-0 transition-opacity duration-300 flex items-center justify-center ${hoveredIndex === index ? 'opacity-100' : ''}`}>
                                                    <span className="text-lg font-semibold">{logo.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}