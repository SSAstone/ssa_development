"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "Products", href: "/products" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Technologies", href: "#technologies" },
        { name: "Contact", href: "/contact" }
    ];

    return (
        <div className={"dark contents"}>
            <header className={`sticky top-0 z-50 w-full border-b border-white/10 bg-background backdrop-blur-xl ${(pathname.includes("admin")) ? "hidden" : ""}`}>
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-0">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <span className="text-xl font-bold text-primary">@</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">future</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button asChild size="sm" className="ml-4">
                            <Link href="#contact">Get Started</Link>
                        </Button>
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="shrink-0">
                                    <Menu className="size-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <nav className="flex flex-col gap-4 mt-8">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="text-lg font-medium hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    <Button asChild className="mt-4">
                                        <Link href="#contact">Get Started</Link>
                                    </Button>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </div>

    );
}
