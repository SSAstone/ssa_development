"use client"
import { Center, Environment, Float, MeshTransmissionMaterial, OrbitControls, Stars, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

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
    thickness: 1
  }

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Float speed={5} rotationIntensity={1} floatIntensity={1}>
        <TextComponent config={config} />
        <Stars count={5000} speed={5} saturation={0} />
        <Environment preset="studio" blur={0.5} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <OrbitControls enableZoom={false} />
      </Float>
    </Canvas>
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
      <Center scale={[0.8, 1, 1]} position={[0, 1, 0]}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.75}
          scale={2}
          height={0.25}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.02}
          bevelSegments={10}
        >
          SSA
          <MeshTransmissionMaterial {...config} />
        </Text3D>
      </Center>
      
      <Center scale={[0.6, 1, 1]} position={[0, -0.33, 0]}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          scale={2}
          height={0.3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.02}
          bevelSegments={10}
        >
          development
          <MeshTransmissionMaterial {...config} />
        </Text3D>
      </Center>
    </group>
  )
}
