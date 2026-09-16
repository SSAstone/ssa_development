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
    SiUnity,
    SiExpress
} from "react-icons/si";

export const logos = [
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", glow: "rgba(247, 223, 30, 0.45)" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", glow: "rgba(49, 120, 198, 0.45)" },
    { name: "React.js", icon: SiReact, color: "#61DAFB", glow: "rgba(97, 218, 251, 0.45)" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", glow: "rgba(255, 255, 255, 0.35)" },
    { name: "Nuxt.js", icon: SiNuxtdotjs, color: "#00DC82", glow: "rgba(0, 220, 130, 0.45)" },
    { name: "Express.js", icon: SiExpress, color: "#F5F5F5", glow: "rgba(245, 245, 245, 0.35)" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", glow: "rgba(71, 162, 72, 0.45)" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28", glow: "rgba(255, 202, 40, 0.45)" },
    { name: "Dart", icon: SiDart, color: "#0175C2", glow: "rgba(1, 117, 194, 0.45)" },
    { name: "Flutter", icon: SiFlutter, color: "#54C5F8", glow: "rgba(84, 197, 248, 0.45)" },
    { name: "Swift", icon: SiSwift, color: "#F05138", glow: "rgba(240, 81, 56, 0.45)" },
    { name: "SwiftUI", icon: GrSwift, color: "#FA7343", glow: "rgba(250, 115, 67, 0.45)" },
    { name: "C#", icon: TbBrandCSharp, color: "#9B4993", glow: "rgba(155, 73, 147, 0.45)" },
    { name: "Unity", icon: SiUnity, color: "#FFFFFF", glow: "rgba(255, 255, 255, 0.35)" },
    { name: "Stripe", icon: SiStripe, color: "#635BFF", glow: "rgba(99, 91, 255, 0.45)" },
    { name: "PostgreSQL", icon: BiLogoPostgresql, color: "#4169E1", glow: "rgba(65, 105, 225, 0.45)" },
];

import {
    Code,
    TabletSmartphone,
    Gamepad2,
    ChevronsLeftRightEllipsis,
    ArrowUpRight,
    Sparkles
} from "lucide-react";

export const services = [
    {
        title: "Web Development",
        description:
            "Modern, fast, and scalable web applications using React, Next.js, and TypeScript.",
        icon: ChevronsLeftRightEllipsis,
        tag: "Full-Stack & SPA",
        color: "#38BDF8",
        glow: "rgba(56, 189, 248, 0.35)",
        accentGradient: "from-sky-500/15 via-primary/10 to-transparent",
    },
    {
        title: "Mobile App Development",
        description:
            "High-quality iOS and Android apps using Flutter and SwiftUI with smooth UX.",
        icon: TabletSmartphone,
        tag: "iOS & Android",
        color: "#C084FC",
        glow: "rgba(192, 132, 252, 0.35)",
        accentGradient: "from-purple-500/15 via-pink-500/10 to-transparent",
    },
    {
        title: "Custom Software Solutions",
        description:
            "Tailor-made software systems to automate workflows and solve complex business problems.",
        icon: Code,
        tag: "Enterprise & Cloud",
        color: "#34D399",
        glow: "rgba(52, 211, 153, 0.35)",
        accentGradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
    },
    {
        title: "Game Development",
        description:
            "Immersive 2D and 3D gaming experiences crafted in Unity and C#, from concept to polished release.",
        icon: Gamepad2,
        tag: "2D & 3D Interactive",
        color: "#FB923C",
        glow: "rgba(251, 146, 60, 0.35)",
        accentGradient: "from-amber-500/15 via-orange-500/10 to-transparent",
    },
];

interface ServiceCardItemProps {
    service: (typeof services)[number];
    index: number;
    isActive: boolean;
    onHover: (index: number) => void;
    onLeave: () => void;
}

function ServiceCardItem({ service, index, isActive, onHover, onLeave }: ServiceCardItemProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const isHighlighted = isActive || isHovered;

    return (
        <div
            className="relative p-px overflow-hidden rounded-2xl group/card h-full transition-all duration-300 hover:-translate-y-1.5"
            style={{
                boxShadow: isHighlighted
                    ? `0 16px 36px -12px ${service.glow}, 0 0 20px -5px ${service.glow}`
                    : "none",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
                setIsHovered(true);
                onHover(index);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                onLeave();
            }}
        >
            {/* Static Border */}
            <div
                className={`absolute inset-0 border rounded-2xl transition-colors duration-500 pointer-events-none ${isHighlighted ? "border-transparent" : "border-white/10 group-hover/card:border-transparent"
                    }`}
            />

            {/* Moving Conic Light Border */}
            <div
                className={`absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_40%,var(--primary)_50%,transparent_60%,transparent_100%)] transition-opacity duration-700 pointer-events-none ${isHighlighted ? "opacity-100" : "opacity-0 group-hover/card:opacity-100"
                    }`}
            />

            {/* Interactive Spotlight Glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                style={{
                    background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${service.glow}, transparent 75%)`,
                }}
            />

            <Card className="relative h-full bg-card/95 backdrop-blur-xl border-none flex flex-col justify-between group transition-all duration-300 rounded-2xl overflow-hidden p-6 sm:p-7">
                {/* Background Accent Gradient */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.accentGradient} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                        {/* Header: Icon + Tag */}
                        <div className="flex items-center justify-between mb-4 sm:mb-5">
                            <div
                                className="size-12 sm:size-13 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-3"
                                style={{
                                    background: `radial-gradient(circle at center, ${service.glow} 0%, rgba(255,255,255,0.03) 100%)`,
                                    border: `1px solid ${isHighlighted ? service.color : "rgba(255,255,255,0.1)"}`,
                                    boxShadow: isHighlighted ? `0 0 16px ${service.glow}` : "none",
                                }}
                            >
                                <service.icon
                                    className="size-6 transition-all duration-300"
                                    style={{ color: isHighlighted ? service.color : "var(--primary)" }}
                                />
                            </div>

                            <span
                                className="text-xs font-medium tracking-wide px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-300"
                                style={{
                                    backgroundColor: isHighlighted ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.03)",
                                    border: `1px solid ${isHighlighted ? service.color : "rgba(255, 255, 255, 0.08)"}`,
                                    color: isHighlighted ? service.color : "oklch(0.7 0 0)",
                                }}
                            >
                                {service.tag}
                            </span>
                        </div>

                        {/* Title */}
                        <CardTitle className="text-sm sm:text-base font-bold flex items-center justify-between mb-2.5 text-foreground group-hover/card:text-white transition-colors">
                            <span>{service.title}</span>
                            <ArrowUpRight
                                className="w-4 h-4 transition-all duration-300 transform -translate-x-1 translate-y-1 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-0 group-hover/card:translate-y-0"
                                style={{ color: service.color }}
                            />
                        </CardTitle>

                        {/* Description */}
                        <CardDescription className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                            {service.description}
                        </CardDescription>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default function NewServices() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);
    const [activeLogoIndex, setActiveLogoIndex] = useState(0);
    const [sideIndices, setSideIndices] = useState<number[]>([]);
    const [isServiceHovered, setIsServiceHovered] = useState(false);

    useEffect(() => {
        if (isServiceHovered) return;
        const serviceInterval = setInterval(() => {
            setActiveServiceIndex((prev) => (prev + 1) % services.length);
        }, 3500);

        return () => clearInterval(serviceInterval);
    }, [isServiceHovered]);

    useEffect(() => {
        if (hoveredIndex !== null) return;
        const logoInterval = setInterval(() => {
            setActiveLogoIndex((prev) => (prev + 1) % logos.length);
        }, 2200);

        return () => clearInterval(logoInterval);
    }, [hoveredIndex]);

    const getSideIndices = (index: number) => {
        const side = [];
        if (index % 4 !== 0) side.push(index - 1);
        if (index % 4 !== 3) side.push(index + 1);
        if (index >= 4) side.push(index - 4);
        if (index < 12) side.push(index + 4);
        return side.filter((i) => i >= 0 && i < logos.length);
    };

    return (
        <div className="dark contents">
            <section id="services" className="py-24 bg-background relative overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="absolute top-1/3 left-10 w-96 h-96 bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

                <div className="md:flex items-center justify-center text-white relative p-4 md:p-0">
                    {/* Left Column: Services */}
                    <div className="md:w-3/6">
                        <div className="md:absolute inset-0">
                            <div className="container mx-auto flex justify-center">
                                <div className="w-full max-w-2xl">
                                    <div className="pb-8 sm:pb-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            What We Deliver
                                        </div>
                                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                                            Our Services
                                        </h2>
                                        <p className="text-muted-foreground text-base sm:text-lg">
                                            We provide a comprehensive range of cutting-edge IT services to accelerate your business in the digital era.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                                            {services.map((service, index) => (
                                                <ServiceCardItem
                                                    key={index}
                                                    service={service}
                                                    index={index}
                                                    isActive={activeServiceIndex === index}
                                                    onHover={(idx) => {
                                                        setIsServiceHovered(true);
                                                        setActiveServiceIndex(idx);
                                                    }}
                                                    onLeave={() => setIsServiceHovered(false)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-3/6 h-full flex-shrink-0" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interactive Tech Wall */}
                    <div className="md:w-3/6 overflow-hidden h-full">
                        <div className="w-full ml-auto pt-20 pb-12 md:pl-16">
                            <div className="grid grid-cols-4 gap-2.5 rotate-3 p-4">
                                {logos.map((logo, index) => {
                                    const Icon = logo.icon;
                                    const isHovered = hoveredIndex === index;
                                    const isSide = sideIndices.includes(index);
                                    const isActive = activeLogoIndex === index && hoveredIndex === null;

                                    return (
                                        <div
                                            key={index}
                                            className={`relative flex flex-col items-center justify-center h-28 sm:h-32 transition-all duration-300 ease-out cursor-pointer overflow-hidden p-px rounded-xl select-none ${isHovered
                                                ? "z-30 scale-110 -translate-x-3 -translate-y-3"
                                                : isSide
                                                    ? "z-20 scale-105 -translate-x-1.5 -translate-y-1.5"
                                                    : isActive
                                                        ? "z-10 scale-102"
                                                        : "z-0 scale-100"
                                                }`}
                                            style={{
                                                boxShadow: isHovered
                                                    ? `0 12px 30px -5px ${logo.glow}, 0 0 20px ${logo.glow}`
                                                    : isSide
                                                        ? "0 8px 20px -5px rgba(255, 255, 255, 0.15)"
                                                        : isActive
                                                            ? "0 0 15px rgba(168, 85, 247, 0.25)"
                                                            : "none",
                                            }}
                                            onMouseEnter={() => {
                                                setHoveredIndex(index);
                                                setSideIndices(getSideIndices(index));
                                            }}
                                            onMouseLeave={() => {
                                                setHoveredIndex(null);
                                                setSideIndices([]);
                                            }}
                                        >
                                            {/* Static Border */}
                                            <div
                                                className={`absolute inset-0 border border-border/70 rounded-xl transition-opacity duration-500 ${isActive || isHovered ? "opacity-0" : "opacity-100"
                                                    }`}
                                            />

                                            {/* Conic Moving Light Border */}
                                            <div
                                                className={`absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_40%,var(--primary)_50%,transparent_60%,transparent_100%)] transition-opacity duration-500 ${isActive || isHovered ? "opacity-100" : "opacity-0"
                                                    }`}
                                            />

                                            {/* Tile Body */}
                                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2 rounded-[11px] bg-card/90 backdrop-blur-md transition-colors duration-300 group overflow-hidden">
                                                {/* Background Hover Glow */}
                                                <div
                                                    className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                                                    style={{
                                                        background: `radial-gradient(circle at center, ${logo.glow} 0%, transparent 70%)`,
                                                        opacity: isHovered ? 0.45 : isSide ? 0.2 : 0,
                                                    }}
                                                />

                                                {/* Logo Icon */}
                                                <div
                                                    className="transition-all duration-300 flex items-center justify-center"
                                                    style={{
                                                        transform: isHovered ? "translateY(-4px) scale(1.15)" : "translateY(0) scale(1)",
                                                    }}
                                                >
                                                    <Icon
                                                        className="w-8 h-8 sm:w-9 sm:h-9 transition-all duration-300"
                                                        style={{
                                                            color: isHovered || isSide ? logo.color : "oklch(0.85 0 0)",
                                                            filter: isHovered
                                                                ? `drop-shadow(0 0 10px ${logo.glow})`
                                                                : "none",
                                                        }}
                                                    />
                                                </div>

                                                {/* Tech Name Label */}
                                                <span
                                                    className="text-xs sm:text-sm font-semibold tracking-wide text-white text-center transition-all duration-300 mt-1 max-w-full truncate px-1"
                                                    style={{
                                                        opacity: isHovered ? 1 : 0,
                                                        transform: isHovered ? "translateY(0)" : "translateY(6px)",
                                                        color: isHovered ? logo.color : "white",
                                                    }}
                                                >
                                                    {logo.name}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}