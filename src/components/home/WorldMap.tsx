"use client";

import React, { Suspense, useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useLoader, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import {
    Globe,
    Compass,
    MapPin,
    ArrowUpRight,
    RotateCcw,
    Play,
    Pause,
    Building2,
    CheckCircle2,
    Search,
    Sun,
    Moon,
    Sparkles,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Types
export interface CountryInfo {
    id: string;
    name: string;
    iso2?: string;
    flag: string;
    continent: string;
    centerLat: number;
    centerLng: number;
    isHQ?: boolean;
    tag?: string;
    description?: string;
    activeProjects?: number;
    status?: string;
}

interface CountryPolygonData {
    id: string;
    name: string;
    flag: string;
    continent: string;
    centerLat: number;
    centerLng: number;
    bbox: [number, number, number, number];
    rings: [number, number][][];
}

// Key featured countries
const FEATURED_COUNTRIES: CountryInfo[] = [
    {
        id: "BGD",
        name: "Bangladesh",
        iso2: "BD",
        flag: "🇧🇩",
        continent: "Asia",
        centerLat: 23.8103,
        centerLng: 90.4125,
        isHQ: true,
        tag: "Global Headquarters & R&D Campus",
        description: "Primary engineering and innovation center driving end-to-end full-stack software development, cloud operations, and AI solutions.",
        activeProjects: 65,
        status: "Primary Engineering Hub",
    },
    {
        id: "USA",
        name: "United States of America",
        iso2: "US",
        flag: "🇺🇸",
        continent: "North America",
        centerLat: 38.9072,
        centerLng: -77.0369,
        tag: "North America Enterprise Solutions",
        description: "Enterprise software clients, Fintech solutions, and scalable cloud application deployments.",
        activeProjects: 34,
        status: "Active Delivery Market",
    },
    {
        id: "GBR",
        name: "United Kingdom",
        iso2: "GB",
        flag: "🇬🇧",
        continent: "Europe",
        centerLat: 51.5074,
        centerLng: -0.1278,
        tag: "UK & European Tech Consulting",
        description: "Modern web platforms, distributed systems, and cross-border digital transformation partners.",
        activeProjects: 22,
        status: "Active Delivery Market",
    },
    {
        id: "CAN",
        name: "Canada",
        iso2: "CA",
        flag: "🇨🇦",
        continent: "North America",
        centerLat: 45.4215,
        centerLng: -75.6972,
        tag: "Canada Enterprise Software",
        description: "Cloud-native microservices, mobile applications, and high-security enterprise solutions.",
        activeProjects: 16,
        status: "Active Delivery Market",
    },
    {
        id: "DEU",
        name: "Germany",
        iso2: "DE",
        flag: "🇩🇪",
        continent: "Europe",
        centerLat: 52.52,
        centerLng: 13.405,
        tag: "Central Europe Engineering Partner",
        description: "Industry 4.0 IoT portals, high-performance web applications, and UI/UX systems.",
        activeProjects: 15,
        status: "Active Delivery Market",
    },
    {
        id: "ARE",
        name: "United Arab Emirates",
        iso2: "AE",
        flag: "🇦🇪",
        continent: "Asia",
        centerLat: 25.2048,
        centerLng: 55.2708,
        tag: "Middle East Digital Hub",
        description: "Smart management systems, bespoke e-commerce engines, and real-time operational platforms.",
        activeProjects: 18,
        status: "Active Delivery Market",
    },
    {
        id: "SGP",
        name: "Singapore",
        iso2: "SG",
        flag: "🇸🇬",
        continent: "Asia",
        centerLat: 1.3521,
        centerLng: 103.8198,
        tag: "Southeast Asia Regional Gateway",
        description: "High-throughput APIs, financial applications, and cloud architecture deployments.",
        activeProjects: 19,
        status: "Active Delivery Market",
    },
    {
        id: "JPN",
        name: "Japan",
        iso2: "JP",
        flag: "🇯🇵",
        continent: "Asia",
        centerLat: 35.6762,
        centerLng: 139.6503,
        tag: "East Asia Enterprise Systems",
        description: "Automated business workflows, intelligent dashboards, and enterprise portals.",
        activeProjects: 14,
        status: "Active Delivery Market",
    },
    {
        id: "AUS",
        name: "Australia",
        iso2: "AU",
        flag: "🇦🇺",
        continent: "Oceania",
        centerLat: -33.8688,
        centerLng: 151.2093,
        tag: "Oceania Continuous Delivery",
        description: "Follow-the-sun digital engineering, high-availability web services, and client applications.",
        activeProjects: 12,
        status: "Active Delivery Market",
    },
    {
        id: "FRA",
        name: "France",
        iso2: "FR",
        flag: "🇫🇷",
        continent: "Europe",
        centerLat: 48.8566,
        centerLng: 2.3522,
        tag: "Western Europe Web Applications",
        description: "Custom SaaS platforms, responsive digital tools, and secure cloud integrations.",
        activeProjects: 11,
        status: "Active Delivery Market",
    },
    {
        id: "IND",
        name: "India",
        iso2: "IN",
        flag: "🇮🇳",
        continent: "Asia",
        centerLat: 28.6139,
        centerLng: 77.209,
        tag: "South Asia Cross-Border Tech",
        description: "Enterprise software collaboration, supply-chain platforms, and API infrastructure.",
        activeProjects: 17,
        status: "Active Delivery Market",
    },
    {
        id: "BRA",
        name: "Brazil",
        iso2: "BR",
        flag: "🇧🇷",
        continent: "South America",
        centerLat: -15.7975,
        centerLng: -47.8919,
        tag: "Latin America Digital Solutions",
        description: "Mobile applications, consumer platforms, and interactive web tools.",
        activeProjects: 9,
        status: "Active Delivery Market",
    },
    {
        id: "SAU",
        name: "Saudi Arabia",
        iso2: "SA",
        flag: "🇸🇦",
        continent: "Asia",
        centerLat: 24.7136,
        centerLng: 46.6753,
        tag: "Gulf Enterprise Modernization",
        description: "Digital transformation portals, management dashboards, and modern architectures.",
        activeProjects: 10,
        status: "Active Delivery Market",
    },
];

// Invert 3D local vector to Lat/Lng on sphere
function vector3ToLatLng(x: number, y: number, z: number, radius: number): { lat: number; lng: number } {
    const phi = Math.acos(Math.max(-1, Math.min(1, y / radius)));
    const lat = 90 - (phi * 180) / Math.PI;
    let theta = Math.atan2(z, -x);
    if (theta < 0) theta += 2 * Math.PI;
    const lng = (theta * 180) / Math.PI - 180;
    return { lat, lng };
}

// Ray-casting point-in-polygon algorithm
function pointInPolygon(point: [number, number], vs: [number, number][]): boolean {
    const x = point[0];
    const y = point[1];
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i][0];
        const yi = vs[i][1];
        const xj = vs[j][0];
        const yj = vs[j][1];
        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
}

// 3D Country Borders Component
function CountryBorders({
    segments,
    globeRadius = 2.4,
}: {
    segments: number[];
    globeRadius?: number;
}) {
    const lineMesh = useMemo(() => {
        if (!segments || segments.length === 0) return null;
        const geometry = new THREE.BufferGeometry();
        const r = globeRadius * 1.0025;
        const positions = new Float32Array(segments.length);
        for (let i = 0; i < segments.length; i++) {
            positions[i] = segments[i] * r;
        }
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const material = new THREE.LineBasicMaterial({
            color: new THREE.Color("#38bdf8"),
            transparent: true,
            opacity: 0.85,
        });

        return new THREE.LineSegments(geometry, material);
    }, [segments, globeRadius]);

    if (!lineMesh) return null;
    return <primitive object={lineMesh} />;
}

// 3D Earth Globe with Hover Raycasting
interface GlobeMeshProps {
    selectedCountry: CountryInfo;
    onSelectCountry: (c: CountryInfo) => void;
    onHoverCountry: (c: CountryInfo | null, e: ThreeEvent<PointerEvent> | null) => void;
    autoRotate: boolean;
    borderSegments: number[];
    themeMode: "day" | "night";
    polygonLookup: CountryPolygonData[];
}

function GlobeMesh({
    selectedCountry,
    onSelectCountry,
    onHoverCountry,
    autoRotate,
    borderSegments,
    themeMode,
    polygonLookup,
}: GlobeMeshProps) {
    const globeRadius = 2.4;
    const earthGroupRef = useRef<THREE.Group>(null);

    const [dayMap, darkMap, bumpMap] = useLoader(THREE.TextureLoader, [
        "/textures/earth-day.jpg",
        "/textures/earth-dark.jpg",
        "/textures/earth-topology.png",
    ]);

    const activeMap = themeMode === "day" ? dayMap : darkMap;

    // Fast country lookup for coordinates
    const findCountryAtCoords = useCallback(
        (lng: number, lat: number): CountryInfo | null => {
            if (!polygonLookup || polygonLookup.length === 0) return null;
            for (const c of polygonLookup) {
                const [minLng, minLat, maxLng, maxLat] = c.bbox;
                if (lng < minLng || lng > maxLng || lat < minLat || lat > maxLat) continue;
                for (const ring of c.rings) {
                    if (pointInPolygon([lng, lat], ring)) {
                        return {
                            id: c.id,
                            name: c.name,
                            flag: c.flag,
                            continent: c.continent,
                            centerLat: c.centerLat,
                            centerLng: c.centerLng,
                            isHQ: c.name.toLowerCase().includes("bangladesh"),
                        };
                    }
                }
            }
            return null;
        },
        [polygonLookup]
    );

    // Smooth rotation animation
    useFrame((_, delta) => {
        if (!earthGroupRef.current) return;

        if (!autoRotate && selectedCountry) {
            const targetRotY = -((selectedCountry.centerLng + 90) * Math.PI) / 180;
            const targetRotX = ((selectedCountry.centerLat - 12) * Math.PI) / 180 * 0.35;

            earthGroupRef.current.rotation.y = THREE.MathUtils.damp(
                earthGroupRef.current.rotation.y,
                targetRotY,
                3.5,
                delta
            );
            earthGroupRef.current.rotation.x = THREE.MathUtils.damp(
                earthGroupRef.current.rotation.x,
                targetRotX,
                3.5,
                delta
            );
        } else if (autoRotate) {
            earthGroupRef.current.rotation.y += delta * 0.15;
            earthGroupRef.current.rotation.x = THREE.MathUtils.damp(
                earthGroupRef.current.rotation.x,
                0.1,
                2.0,
                delta
            );
        }
    });

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        if (!earthGroupRef.current) return;
        const localHit = earthGroupRef.current.worldToLocal(e.point.clone());
        const { lat, lng } = vector3ToLatLng(localHit.x, localHit.y, localHit.z, globeRadius);
        const match = findCountryAtCoords(lng, lat);
        if (match) {
            onHoverCountry(match, e);
        } else {
            onHoverCountry(null, null);
        }
    };

    const handlePointerOut = () => {
        onHoverCountry(null, null);
    };

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (!earthGroupRef.current) return;
        const localHit = earthGroupRef.current.worldToLocal(e.point.clone());
        const { lat, lng } = vector3ToLatLng(localHit.x, localHit.y, localHit.z, globeRadius);
        const match = findCountryAtCoords(lng, lat);
        if (match) {
            onSelectCountry(match);
        }
    };

    return (
        <group ref={earthGroupRef}>
            {/* 1. Main Earth Globe with Interactive Hover & Click Raycasting (No static points) */}
            <mesh
                receiveShadow
                castShadow
                onPointerMove={handlePointerMove}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
            >
                <sphereGeometry args={[globeRadius, 64, 64]} />
                <meshStandardMaterial
                    map={activeMap}
                    bumpMap={bumpMap}
                    bumpScale={0.04}
                    roughness={themeMode === "day" ? 0.65 : 0.7}
                    metalness={0.1}
                    emissive={themeMode === "day" ? new THREE.Color("#0c1e33") : new THREE.Color("#020617")}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* 2. Vector Country Borders */}
            <CountryBorders segments={borderSegments} globeRadius={globeRadius} />

            {/* 3. Soft Atmospheric Halo Shell */}
            <mesh>
                <sphereGeometry args={[globeRadius * 1.018, 48, 48]} />
                <meshStandardMaterial
                    color="#38bdf8"
                    transparent
                    opacity={0.12}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}

// Fallback loader while assets stream in
function GlobeFallback() {
    return (
        <mesh>
            <sphereGeometry args={[2.4, 32, 32]} />
            <meshBasicMaterial color="#0f172a" wireframe transparent opacity={0.4} />
        </mesh>
    );
}

// Main Exported World Map Section Component
export default function WorldMap() {
    const [allCountries, setAllCountries] = useState<CountryInfo[]>(FEATURED_COUNTRIES);
    const [borderSegments, setBorderSegments] = useState<number[]>([]);
    const [polygonLookup, setPolygonLookup] = useState<CountryPolygonData[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(FEATURED_COUNTRIES[0]);
    const [hoveredCountry, setHoveredCountry] = useState<CountryInfo | null>(null);
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
    const [autoRotate, setAutoRotate] = useState<boolean>(true);
    const [themeMode, setThemeMode] = useState<"day" | "night">("day");
    const [mounted, setMounted] = useState<boolean>(false);

    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const orbitControlsRef = useRef<any>(null);

    useEffect(() => {
        setMounted(true);

        // Load borders
        fetch("/textures/world-borders.json")
            .then((res) => res.json())
            .then((data) => {
                if (data.segments) {
                    setBorderSegments(data.segments);
                }
                if (data.countries && data.countries.length > 0) {
                    const enriched: CountryInfo[] = data.countries.map((c: CountryInfo) => {
                        const feat = FEATURED_COUNTRIES.find(
                            (f) => f.name.toLowerCase() === c.name.toLowerCase() || f.id === c.id
                        );
                        if (feat) return feat;
                        return {
                            ...c,
                            tag: `${c.continent} Tech Delivery Reach`,
                            description: `Global software delivery and digital solutions support available for clients in ${c.name}.`,
                            activeProjects: 5 + (c.name.length % 12),
                            status: "Global Delivery Network",
                        };
                    });
                    setAllCountries(enriched);
                }
            })
            .catch((err) => {
                console.error("Failed to load world borders data:", err);
            });

        // Load compact country polygon boundaries for raycasting hover detection
        fetch("/textures/country-polygons.json")
            .then((res) => res.json())
            .then((data) => {
                setPolygonLookup(data);
            })
            .catch((err) => {
                console.error("Failed to load country polygon data:", err);
            });
    }, []);

    const handleSelectCountry = (country: CountryInfo) => {
        const enriched =
            allCountries.find(
                (c) => c.name.toLowerCase() === country.name.toLowerCase() || c.id === country.id
            ) || country;
        setSelectedCountry(enriched);
        setAutoRotate(false);
    };

    const handleZoomIn = () => {
        if (orbitControlsRef.current) {
            const controls = orbitControlsRef.current;
            const cam = controls.object;
            cam.position.multiplyScalar(0.85);
            if (cam.position.length() < 3.2) {
                cam.position.setLength(3.2);
            }
            controls.update();
        }
    };

    const handleZoomOut = () => {
        if (orbitControlsRef.current) {
            const controls = orbitControlsRef.current;
            const cam = controls.object;
            cam.position.multiplyScalar(1.18);
            if (cam.position.length() > 9.5) {
                cam.position.setLength(9.5);
            }
            controls.update();
        }
    };

    const handleResetHQ = () => {
        const hq = FEATURED_COUNTRIES.find((c) => c.isHQ) || FEATURED_COUNTRIES[0];
        setSelectedCountry(hq);
        setAutoRotate(true);
        if (orbitControlsRef.current) {
            const controls = orbitControlsRef.current;
            controls.object.position.set(0, 0.7, 6.2);
            controls.target.set(0, 0, 0);
            controls.update();
        }
    };

    const handleHoverCountry = useCallback(
        (country: CountryInfo | null, e: ThreeEvent<PointerEvent> | null) => {
            if (!country || !e) {
                setHoveredCountry(null);
                setTooltipPos(null);
                return;
            }
            if (canvasContainerRef.current) {
                const rect = canvasContainerRef.current.getBoundingClientRect();
                setTooltipPos({
                    x: e.nativeEvent.clientX - rect.left,
                    y: e.nativeEvent.clientY - rect.top,
                });
            }
            setHoveredCountry(country);
        },
        []
    );


    return (
        <section
            id="global-network"
            className="relative py-20 md:py-28 bg-background border-t border-border/40 overflow-hidden"
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[500px] h-[300px] md:w-[900px] md:h-[500px] bg-primary/10 blur-[150px] rounded-full opacity-50 pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-sky-500/10 blur-[140px] rounded-full opacity-40 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4 backdrop-blur-md">
                        <Globe className="size-3.5 animate-spin-slow text-primary" />
                        <span>Interactive 3D World Map</span>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">
                        Global Reach & Country Footprint
                    </h2>

                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                        Hover over any country to explore its location across the globe. Drag to rotate and explore worldwide coverage.
                    </p>
                </div>

                {/* Centered 3D Globe Canvas Container */}
                <div className="max-w-5xl mx-auto w-full">
                    <div
                        ref={canvasContainerRef}
                        className="relative aspect-square sm:aspect-[16/10] md:aspect-[16/9] w-full rounded-3xl border border-white/10 bg-gradient-to-b from-card/80 to-background/90 backdrop-blur-2xl overflow-hidden shadow-2xl select-none"
                    >
                        {/* Dynamic Floating Country Tooltip on Hover */}
                        {hoveredCountry && tooltipPos && (
                            <div
                                className="pointer-events-none absolute z-40 transform -translate-x-1/2 -translate-y-full mb-3 px-3.5 py-2 rounded-2xl bg-background/95 backdrop-blur-xl border border-primary/40 shadow-2xl flex items-center gap-2.5 transition-transform duration-75 animate-in fade-in zoom-in-95"
                                style={{
                                    left: `${tooltipPos.x}px`,
                                    top: `${tooltipPos.y}px`,
                                }}
                            >
                                <span className="text-2xl drop-shadow">{hoveredCountry.flag}</span>
                                <div className="text-left">
                                    <div className="flex items-center gap-1.5">
                                        <p className="text-sm font-bold text-foreground leading-tight">
                                            {hoveredCountry.name}
                                        </p>
                                        {hoveredCountry.isHQ && (
                                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                                HQ
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-muted-foreground">
                                        {hoveredCountry.continent}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Status & Control Bar atop Canvas */}
                        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
                            <div className="inline-flex items-center gap-2 bg-background/85 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-medium pointer-events-auto">
                                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                {hoveredCountry ? (
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-muted-foreground">Hovering:</span>
                                        <span className="text-foreground font-semibold">
                                            {hoveredCountry.flag} {hoveredCountry.name}
                                        </span>
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5">
                                        <span className="text-muted-foreground">Active Focus:</span>
                                        <span className="text-foreground font-semibold">
                                            {selectedCountry.flag} {selectedCountry.name}
                                        </span>
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2 pointer-events-auto">
                                {/* Zoom In & Out Buttons */}
                                <div className="flex items-center gap-1 bg-background/85 backdrop-blur-md p-0.5 rounded-full border border-white/10">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleZoomIn}
                                        className="h-7 w-7 p-0 rounded-full hover:bg-muted text-foreground"
                                        title="Zoom In (+)"
                                    >
                                        <ZoomIn className="size-3.5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleZoomOut}
                                        className="h-7 w-7 p-0 rounded-full hover:bg-muted text-foreground"
                                        title="Zoom Out (-)"
                                    >
                                        <ZoomOut className="size-3.5" />
                                    </Button>
                                </div>

                                {/* Day / Night Map Toggle */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setThemeMode(themeMode === "day" ? "night" : "day")}
                                    className="h-8 px-2.5 rounded-full bg-background/85 backdrop-blur-md border-white/10 text-xs hover:bg-muted"
                                    title="Toggle Map Style"
                                >
                                    {themeMode === "day" ? (
                                        <>
                                            <Moon className="size-3 mr-1 text-sky-400" /> Night View
                                        </>
                                    ) : (
                                        <>
                                            <Sun className="size-3 mr-1 text-amber-400" /> Day View
                                        </>
                                    )}
                                </Button>

                                {/* Auto-Spin Toggle */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setAutoRotate(!autoRotate)}
                                    className="h-8 px-2.5 rounded-full bg-background/85 backdrop-blur-md border-white/10 text-xs hover:bg-muted"
                                >
                                    {autoRotate ? (
                                        <>
                                            <Pause className="size-3 mr-1" /> Pause
                                        </>
                                    ) : (
                                        <>
                                            <Play className="size-3 mr-1" /> Spin
                                        </>
                                    )}
                                </Button>

                                {/* Focus HQ */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleResetHQ}
                                    className="h-8 px-2.5 rounded-full bg-background/85 backdrop-blur-md border-white/10 text-xs hover:bg-muted"
                                >
                                    <RotateCcw className="size-3 mr-1" /> Focus HQ
                                </Button>
                            </div>
                        </div>

                        {/* Interactive Hint Overlay */}
                        <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 text-xs text-muted-foreground/85 bg-background/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                            <Compass className="size-3.5 text-primary" />
                            <span>Hover over any country to see its name • Scroll or pinch to zoom • Drag to rotate</span>
                        </div>

                        {/* Three.js Canvas */}
                        {mounted ? (
                            <Canvas
                                camera={{ position: [0, 0.7, 6.2], fov: 46 }}
                                gl={{ antialias: true, alpha: true }}
                                className={`w-full h-full ${
                                    hoveredCountry ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
                                }`}
                            >
                                <Suspense fallback={<GlobeFallback />}>
                                    <ambientLight intensity={themeMode === "day" ? 1.15 : 0.7} />
                                    <directionalLight
                                        position={[12, 10, 8]}
                                        intensity={themeMode === "day" ? 1.8 : 1.3}
                                        color="#ffffff"
                                    />
                                    <directionalLight
                                        position={[-10, -6, -6]}
                                        intensity={0.6}
                                        color="#38bdf8"
                                    />
                                    <pointLight position={[-6, 4, 4]} color="#fef3c7" intensity={1.2} />
                                    <pointLight position={[6, -4, 4]} color="#38bdf8" intensity={1.0} />

                                    <Stars count={500} factor={2.5} speed={0.5} fade />

                                    <GlobeMesh
                                        selectedCountry={selectedCountry}
                                        onSelectCountry={handleSelectCountry}
                                        onHoverCountry={handleHoverCountry}
                                        autoRotate={autoRotate}
                                        borderSegments={borderSegments}
                                        themeMode={themeMode}
                                        polygonLookup={polygonLookup}
                                    />

                                    <OrbitControls
                                        ref={orbitControlsRef}
                                        enableZoom={true}
                                        minDistance={3.2}
                                        maxDistance={9.5}
                                        enablePan={false}
                                        autoRotate={false}
                                        minPolarAngle={Math.PI / 4}
                                        maxPolarAngle={(Math.PI * 3) / 4}
                                    />
                                </Suspense>
                            </Canvas>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
