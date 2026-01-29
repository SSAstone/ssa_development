"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    return (
        <div className={"dark contents"}>
            <footer className={`border-t border-white/10 bg-background backdrop-blur-xl py-12 ${(pathname.includes("admin")) ? "hidden" : ""}`}>
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="size-6 rounded-lg bg-primary/20 flex items-center justify-center">
                                <span className="text-lg font-bold text-primary">I</span>
                            </div>
                            <span className="text-lg font-bold tracking-tight">InnoTech</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Building the future with technology.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</Link>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} InnoTech Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
