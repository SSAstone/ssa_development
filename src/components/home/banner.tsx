"use client"
import { Center, Environment, Float, MeshTransmissionMaterial, OrbitControls, Stars, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Typewriter from 'typewriter-effect';

export default function Banner() {
    return (
        <div className="h-screen flex items-center justify-center bg-cover bg-center">
            <CanvasFunction />
        </div>
    )
}

function CanvasFunction() {

    const config = {
        roughness: 1,
        ior: 1.5,
        transmission: 1,
        thickness: 1,
        clearcoat: 1,
        clearcoatRoughness: .1,
        reflectivity: .8,
    }

    return (
        <div className="h-screen w-full text-center">
            <div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-mainColor md:block notranslate mt-24">
                    <p className='flex gap-1'>Transforming Ideas into <span className="text-primary"><Typewriter
                        options={{
                            strings: [
                                "Web Development",
                                "Mobile App Development",
                                "Custom Software",
                                "Game Development",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    /></span></p>
                    {/* <h1 className="text-4xl font-bold">Transforming Ideas into <br className="hidden md:block" />
                        <span className="text-primary">Digital Reality</span>
                    </h1>
                    <Typewriter
                        options={{
                            strings: [
                                "Web Development Needs",
                                "Mobile App Development Needs",
                                "Custom Project Needs",
                                "Wireframing Services Needs",
                                "Software Testing Needs",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    /> */}
                </div>
            </div>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <Float speed={5} rotationIntensity={1} floatIntensity={1}>
                    <TextComponent config={config} />
                    <Stars count={500} speed={500} saturation={1} />
                    <Environment preset="studio" blur={0.5} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <OrbitControls enableZoom={false} />
                </Float>
            </Canvas>
            <div className="absolute top-1/5 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
            <div className="absolute bottom-1/5 right-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary/20 blur-[80px] rounded-full opacity-30 pointer-events-none" />
        </div>
    )
}

interface TextProps {
    config: {
        roughness: number
        ior: number
        transmission: number
        thickness: number
    }
}

function TextComponent({ config }: TextProps) {
    return (
        <group>
            <Center scale={[1, 1, 1]} position={[0, 0.8, 0]}>
                <Text3D
                    font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
                    size={0.75}
                    scale={2}
                    height={0.2}
                    curveSegments={4}
                    bevelEnabled
                    bevelThickness={0.01}
                    bevelSize={0.02}
                    bevelSegments={10}
                >
                    {/* at.future */}
                    SSA
                    {/* <div className="">ss</div> */}
                    <MeshTransmissionMaterial {...config} />
                </Text3D>
            </Center>
        </group>
    )
}