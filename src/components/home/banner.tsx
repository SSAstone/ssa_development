"use client"
import { Center, Environment, Float, MeshTransmissionMaterial, OrbitControls, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
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
        <span className="text-mainColor md:block notranslate">
          <h1 className="text-4xl font-bold">Our Services are here</h1>

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
          />
        </span>
      </div>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Float speed={5} rotationIntensity={1} floatIntensity={1}>
          <TextComponent config={config} />
          {/* <Stars count={5000} speed={5} saturation={0} /> */}
          <Environment preset="studio" blur={0.5} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <OrbitControls enableZoom={false} />
        </Float>
      </Canvas>
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
      <Center scale={[1, 1, 1]} position={[0, 1.5, 0]}>
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
          at.future
          <MeshTransmissionMaterial {...config} />
        </Text3D>
      </Center>
    </group>
  )
}
