"use client"

import React, { useState } from 'react'

const logos = [
  { name: 'PayPal', icon: 'P' },
  { name: 'Cloudflare', icon: '☁️' },
  { name: 'CircleCI', icon: '○' },
  { name: 'Atlassian', icon: '🔵' },
  { name: 'Currency', icon: '💱' },
  { name: 'Facebook', icon: 'f' },
  { name: 'X', icon: 'X' },
  { name: 'Google Ads', icon: '🔶' },
  { name: 'Intercom', icon: '▤' },
  { name: 'Zapier', icon: '⚡' },
  { name: 'Delta', icon: '🔺' },
  { name: 'Stripe', icon: 'stripe' },
  { name: 'Bumble', icon: '🐝' },
  { name: 'Vimeo', icon: 'V' },
  { name: 'YouTube', icon: '▶️' },
  { name: 'Google Maps', icon: '🌎' }
]

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [sideIndices, setSideIndices] = useState<number[]>([])

  const getSideIndices = (index: number) => {
    const sideIndices = []
    if (index % 4 !== 0) sideIndices.push(index - 1)
    if (index % 4 !== 3) sideIndices.push(index + 1)
    if (index >= 4) sideIndices.push(index - 4)
    if (index < 12) sideIndices.push(index + 4)
    return sideIndices.filter(i => i >= 0 && i < logos.length)
  }

  return (
    <div className='h-screen flex items-center justify-center bg-gray-950 text-white'>
      <div className="w-2/5">
        <h1 className="text-4xl font-bold mb-4">Services</h1>
      </div>
      <div className="w-3/5">
        <div className="w-full max-w-3xl mx-auto">
          <div className="grid grid-cols-4 gap-1 rotate-3">
            {logos.map((logo, index) => (
              <div
                key={index}
                className={`relative flex items-center bg-gray-900 justify-center h-32 text-5xl transition-all duration-500 ease-in-out cursor-pointer ${hoveredIndex === index ? 'z-20 border border-gray-700' : sideIndices.includes(index) ? 'z-10' : 'z-0'}`}
                style={{
                  transform: hoveredIndex === index
                    ? 'scale(1.1) translate(-20px, -20px)' 
                    : sideIndices.includes(index)
                    ? 'scale(1.05) translate(-10px, -10px)'
                    : 'scale(1) translate(0, 0)',
                  boxShadow: hoveredIndex === index
                    ? '3px 3px 20px rgba(255, 255, 255, 0.3), 4px 4px 30px rgba(255, 255, 255, 0.2), 5px 5px 40px rgba(255, 255, 255, 0.1)'
                    : sideIndices.includes(index)
                    ? '2px 2px 15px rgba(255, 255, 255, 0.2), 3px 3px 25px rgba(255, 255, 255, 0.15), 4px 4px 35px rgba(255, 255, 255, 0.1)'
                    : 'none',
                }}
                onMouseEnter={() => {
                  setHoveredIndex(index)
                  setSideIndices(getSideIndices(index))
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null)
                  setSideIndices([])
                }}
              >
                {logo.icon}
                <div className={`absolute inset-0 bg-gray-700 opacity-0 transition-opacity duration-300 flex items-center justify-center ${hoveredIndex === index ? 'opacity-100' : ''}`}>
                  <span className="text-lg font-semibold">{logo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}