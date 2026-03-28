"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    return (
        <div className={"dark contents"}>
            <footer className={`border-t border-white/10 bg-background backdrop-blur-xl py-8 md:py-12 ${(pathname.includes("admin") || pathname.includes("login")) ? "hidden" : ""}`}>
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            {/* <div className="px-2 rounded-lg bg-primary/20 flex items-center justify-center">
                                <span className="text-lg font-bold text-primary">SSA</span>
                            </div> */}
                            <Image src="/ssa.png" alt="Logo" width={64} height={48} className="rounded-lg md:w-[64px] md:h-[48px]" />
                            <span className="text-lg font-bold tracking-tight">InnoTech</span>
                        </Link>
                        <p className="text-sm text-muted-foreground text-center md:text-left">
                            Building the future with technology.
                        </p>
                    </div>

                    <div className="flex gap-6 items-center">
                        <Link href="https://www.linkedin.com/in/sk-shiam-ali-6a4b17284/" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</Link>
                        <Link href="https://github.com/SSAstone" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</Link>
                    </div>

                    <div className="text-sm text-muted-foreground text-center md:text-right">
                        © {new Date().getFullYear()} InnoTech Inc.<br className="md:hidden" /> All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
