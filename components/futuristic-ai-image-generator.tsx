'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function FuturisticAiImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stars = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2,
      opacity: Math.random(),
    }))

    const canvas = document.getElementById('starfield') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    if (ctx) {
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        stars.forEach(star => {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
          ctx.fillRect(star.x, star.y, star.size, star.size)
          star.y = (star.y + 0.5) % canvas.height
        })
        requestAnimationFrame(animate)
      }

      animate()
    }
  }, [])

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const encodedPrompt = encodeURIComponent(prompt)
      const response = await fetch(`https://curly-wind-65ba.jiighj.workers.dev/?prompt=${encodedPrompt}`)
      if (!response.ok) {
        throw new Error('Failed to generate image')
      }
      const imageBlob = await response.blob()
      const imageObjectURL = URL.createObjectURL(imageBlob)
      setImageUrl(imageObjectURL)
    } catch (error) {
      console.error('Error generating image:', error)
      // You might want to set an error state here and display it to the user
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white overflow-hidden relative">
      <canvas id="starfield" className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 pointer-events-none" />

      <header className="relative py-6 px-4 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
              Private AI
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300 relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto space-y-12">
          <h2 className="text-4xl font-bold text-center mb-8 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            Visualize the Future
          </h2>
          <div className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Describe your vision..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-lg pl-4 pr-12 py-3 text-lg"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              </div>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={!prompt || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 focus:ring-offset-gray-900 text-lg py-6 rounded-lg relative overflow-hidden group transition-all duration-300 ease-out"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease" />
              {loading ? 'Generating...' : 'Materialize Image'}
            </Button>
          </div>
          {imageUrl && (
            <div className="mt-12 bg-gray-800 p-1 rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient" />
                <img
                  src={imageUrl}
                  alt="Generated image"
                  className="w-full h-auto rounded-lg relative z-10 transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="relative py-8 px-4 text-center z-10">
        <p>&copy; 2024 Private AI. All rights reserved.</p>
        <p className="mt-2 text-sm text-blue-400">Shaping tomorrow's reality, today</p>
      </footer>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-4 bg-purple-500 rounded-full animate-ping opacity-20 animation-delay-150"></div>
            <div className="absolute inset-8 bg-pink-500 rounded-full animate-ping opacity-20 animation-delay-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-purple-500 rounded-full animate-spin animation-delay-150 animation-reverse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-pink-500 rounded-full animate-spin animation-delay-300"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg font-bold animate-pulse">Generating...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}