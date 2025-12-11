
const technologies = [
    "React", "Next.js", "TypeScript", "Node.js", "Python",
    "Tailwind CSS", "PostgreSQL", "AWS", "Docker", "Kubernetes",
    "GraphQL", "Figma", "Rust", "Go", "Flutter"
];

export function Technologies() {
    return (
        <section id="technologies" className="py-20 border-y border-white/5 bg-background">
            <div className="container mx-auto px-4 mb-10 text-center">
                <h2 className="text-2xl font-semibold mb-8 text-muted-foreground">Trusted Technologies We Use</h2>
            </div>

            {/* Marquee Effect Container */}
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-12 sm:gap-20 py-4">
                    {/* First set */}
                    {technologies.map((tech) => (
                        <span key={tech} className="text-2xl md:text-3xl font-bold text-foreground/20 hover:text-primary transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {technologies.map((tech) => (
                        <span key={`${tech}-dup`} className="text-2xl md:text-3xl font-bold text-foreground/20 hover:text-primary transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                    {/* Third set for safety on large screens */}
                    {technologies.map((tech) => (
                        <span key={`${tech}-dup2`} className="text-2xl md:text-3xl font-bold text-foreground/20 hover:text-primary transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-12 sm:gap-20 py-4" style={{ left: '100%' }}>
                    {/* Can be used for smoother animation if needed, but the above single div works with proper CSS animation */}
                </div>

                {/* Fade Edges */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
        </section>
    );
}
