"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
    Center,
    Environment,
    Float,
    OrbitControls,
    Stars,
    Sparkles,
    ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

export default function Banner() {
    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            <CanvasFunction />
        </div>
    );
}

function CanvasFunction() {
    return (
        <div className="relative h-screen w-full flex items-center justify-center text-center">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[250px] md:w-[850px] md:h-[450px] bg-primary/15 blur-[140px] rounded-full opacity-50 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/2 -translate-x-1/2 w-[350px] h-[200px] md:w-[700px] md:h-[350px] bg-amber-500/10 blur-[120px] rounded-full opacity-30 pointer-events-none" />

            <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.65} />
                    <directionalLight position={[8, 12, 8]} intensity={1.8} color="#ffffff" />
                    <directionalLight position={[-8, -8, -6]} intensity={0.4} color="#94a3b8" />
                    <pointLight position={[-6, 5, 4]} color="#fef3c7" intensity={1.8} />
                    <pointLight position={[6, -4, 4]} color="#93c5fd" intensity={1.4} />
                    <pointLight position={[0, 7, 3]} color="#ffffff" intensity={1.2} />

                    <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.9}>
                        <SSA3DLogo />
                    </Float>

                    <ContactShadows
                        position={[0, -1.8, 0]}
                        opacity={0.5}
                        scale={10}
                        blur={2.8}
                        far={4}
                        color="#000000"
                    />

                    <Sparkles count={45} scale={7} size={2} speed={0.3} color="#fef3c7" />
                    <Stars count={500} speed={1.0} factor={2.5} fade />
                    <Environment preset="studio" />
                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={0.8}
                        maxPolarAngle={Math.PI / 1.75}
                        minPolarAngle={Math.PI / 2.35}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

function SSA3DLogo() {
    const svgData = useLoader(SVGLoader, "/ssa-logo.svg");
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
        }
    });

    const parsedShapes = useMemo(() => {
        return svgData.paths.map((path) => {
            const shapes = SVGLoader.createShapes(path);
            const colorHex = path.color.getHexString();
            const isFrontS = colorHex.toLowerCase() === "262626" || path.userData?.node?.parentElement?.id === "front_s";

            return {
                shapes,
                isFrontS,
                color: path.color,
            };
        });
    }, [svgData]);

    const frontSExtrudeSettings = useMemo(
        () => ({
            depth: 48,
            bevelEnabled: true,
            bevelThickness: 6,
            bevelSize: 4,
            bevelSegments: 6,
            curveSegments: 16,
        }),
        []
    );

    const bgExtrudeSettings = useMemo(
        () => ({
            depth: 20,
            bevelEnabled: true,
            bevelThickness: 4,
            bevelSize: 3,
            bevelSegments: 5,
            curveSegments: 16,
        }),
        []
    );

    return (
        <group ref={groupRef}>
            <Center scale={[0.0062, -0.0062, 0.0062]}>
                {parsedShapes.map((item, index) => {
                    const { shapes, isFrontS } = item;

                    if (isFrontS) {
                        return (
                            <group key={index} position={[0, 0, -24]}>
                                {shapes.map((shape, shapeIndex) => (
                                    <mesh key={shapeIndex} castShadow receiveShadow>
                                        <extrudeGeometry args={[shape, frontSExtrudeSettings]} />
                                        <meshPhysicalMaterial
                                            color="#dfc38a"
                                            roughness={0.2}
                                            metalness={0.92}
                                            clearcoat={1.0}
                                            clearcoatRoughness={0.06}
                                            reflectivity={0.98}
                                            emissive="#6b4c10"
                                            emissiveIntensity={0.08}
                                        />
                                    </mesh>
                                ))}
                            </group>
                        );
                    }

                    return (
                        <group key={index} position={[0, 0, -10]}>
                            {shapes.map((shape, shapeIndex) => (
                                <mesh key={shapeIndex} castShadow receiveShadow>
                                    <extrudeGeometry args={[shape, bgExtrudeSettings]} />
                                    <meshPhysicalMaterial
                                        color="#2c303d"
                                        roughness={0.22}
                                        metalness={0.94}
                                        clearcoat={0.9}
                                        clearcoatRoughness={0.1}
                                        reflectivity={0.92}
                                    />
                                </mesh>
                            ))}
                        </group>
                    );
                })}
            </Center>
        </group>
    );
}