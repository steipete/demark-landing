"use client"

import { useEffect, useState } from "react"

const SYMBOLS = [
  "<div>",
  "<h1>",
  "<a>",
  "<ul>",
  "<em>",
  "<strong>",
  "</>",
  "+",
  "-",
  "/",
  "=",
  ";:",
  "#",
  "[]",
  "✓",
  "%",
  "<p>",
  "<span>",
  "/>",
  "{ }",
  "class",
  "=>",
  "()",
  "CSS",
  "HTML",
  "JS",
  "MD",
  "px",
  "rem",
  "flex",
  "grid",
  "border",
  "padding",
  "margin",
  "color",
  "font",
  "width",
  "height",
]

interface SymbolItem {
  id: number
  text: string
  top: string
  left: string
  animationDuration: string
  animationDelay: string
  opacity: number
  fontSize: string
  transform: string
}

export default function AnimatedBackground() {
  const [symbols, setSymbols] = useState<SymbolItem[]>([])

  useEffect(() => {
    const generateSymbols = () => {
      const newSymbols: SymbolItem[] = []
      const count = typeof window !== "undefined" && window.innerWidth < 768 ? 30 : 60 // Fewer symbols on mobile
      for (let i = 0; i < count; i++) {
        newSymbols.push({
          id: i,
          text: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 10 + 10}s`, // 10s to 20s
          animationDelay: `${Math.random() * 5}s`, // 0s to 5s
          opacity: Math.random() * 0.15 + 0.05, // 0.05 to 0.2
          fontSize: `${Math.random() * 0.75 + 0.5}rem`, // 0.5rem to 1.25rem
          transform: `rotate(${Math.random() * 90 - 45}deg)`,
        })
      }
      setSymbols(newSymbols)
    }
    generateSymbols()
    window.addEventListener("resize", generateSymbols)
    return () => window.removeEventListener("resize", generateSymbols)
  }, [])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-demark-bg">
      {symbols.map((symbol) => (
        <span
          key={symbol.id}
          className="absolute text-demark-symbol-blue animate-float"
          style={{
            top: symbol.top,
            left: symbol.left,
            animationDuration: symbol.animationDuration,
            animationDelay: symbol.animationDelay,
            opacity: symbol.opacity,
            fontSize: symbol.fontSize,
            transform: symbol.transform,
            willChange: "transform, opacity",
          }}
        >
          {symbol.text}
        </span>
      ))}
    </div>
  )
}
