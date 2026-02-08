"use client"

import { useState } from 'react'
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
    const [sideIndices, setSideIndices] = useState<number[]>([])

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
                <div className="flex items-center justify-center text-white relative">
                    <div className="w-3/6">
                        <div className="absolute inset-0">
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

                                </div>
                                <div className="w-3/6 h-full flex-shrink-0"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/6 overflow-hidden h-full">
                        <div className="w-full ml-auto pt-20 pb-12 pl-16">
                            <div className="grid grid-cols-4 gap-1 rotate-3">
                                {logos.map((logo, index) => {
                                    const Icon = logo.icon
                                    return (
                                        <div
                                            key={index}
                                            className={`relative flex items-center bg-gray-900 justify-center h-32 text-5xl transition-all duration-500 ease-in-out cursor-pointer ${hoveredIndex === index ? 'z-20 border border-gray-700' : sideIndices.includes(index) ? 'z-10' : 'z-0'}`}
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
                                            <Icon className="w-8 h-8 text-white" />
                                            <div className={`absolute inset-0 bg-gray-700 opacity-0 transition-opacity duration-300 flex items-center justify-center ${hoveredIndex === index ? 'opacity-100' : ''}`}>
                                                <span className="text-lg font-semibold">{logo.name}</span>
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