"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tilt } from '@/components/motion-primitives/tilt'

interface HolographicCardProps extends React.ComponentProps<"div"> {
  variant?: "rare"
  rotationFactor?: number
}

export function HolographicCard({ 
  className,
  variant = "rare",
  rotationFactor = 15,
  ...props 
}: HolographicCardProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [hyp, setHyp] = React.useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
    
    // Calculate hypotenuse for brightness effect
    const centerX = 50
    const centerY = 50
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
    setHyp(distance / 50) // Normalize to 0-1 range
  }

  return (
    <Tilt rotationFactor={rotationFactor}>
      <div
        className={cn(
          "relative group bg-zinc-800 rounded-[4.55%/3.5%] border border-white/10",
          className
        )}
        onMouseMove={handleMouseMove}
        style={{
          "--posx": `${mousePosition.x}%`,
          "--posy": `${mousePosition.y}%`,
          "--hyp": hyp,
          "--space": "5%",
          "--angle": "133deg",
          "--imgsize": "50%",
          "--radius": "4.55% / 3.5%",
        } as React.CSSProperties}
        {...props}
      >
        <div
          className="absolute inset-0 pointer-events-none rounded-[4.55%/3.5%] border border-white/20"
          style={{
            mixBlendMode: "color-dodge",
            backgroundImage: `
              url('/img/illusion.png'),
              repeating-linear-gradient(0deg, 
                rgb(255, 119, 115) calc(var(--space) * 1),
                rgba(255, 237, 95, 1) calc(var(--space) * 2),
                rgba(168, 255, 95, 1) calc(var(--space) * 3),
                rgba(131, 255, 247, 1) calc(var(--space) * 4),
                rgba(120, 148, 255, 1) calc(var(--space) * 5),
                rgb(216, 117, 255) calc(var(--space) * 6),
                rgb(255, 119, 115) calc(var(--space) * 7)
              ),
              repeating-linear-gradient(var(--angle),
                #0e152e 0%,
                hsl(180, 10%, 60%) 3.8%,
                hsl(180, 29%, 66%) 4.5%,
                hsl(180, 10%, 60%) 5.2%,
                #0e152e 10%,
                #0e152e 12%
              ),
              radial-gradient(
                farthest-corner circle at var(--posx) var(--posy),
                rgba(0, 0, 0, .1) 12%,
                rgba(0, 0, 0, .15) 20%,
                rgba(0, 0, 0, .25) 120%
              )
            `,
            backgroundBlendMode: "exclusion, hue, hard-light, exclusion",
            backgroundSize: "var(--imgsize), 200% 700%, 300%, 200%",
            backgroundPosition: "center, 0% var(--posy), var(--posx) var(--posy), var(--posx) var(--posy)",
            filter: "brightness(calc((var(--hyp) * 0.3) + 0.5)) contrast(2) saturate(1.5)",
            WebkitFilter: "brightness(calc((var(--hyp) * 0.3) + 0.5)) contrast(2) saturate(1.5)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none rounded-[4.55%/3.5%] border border-white/20"
          style={{
            mixBlendMode: "exclusion",
            backgroundImage: `
              url('/img/illusion.png'),
              repeating-linear-gradient(0deg, 
                rgb(255, 119, 115) calc(var(--space) * 1),
                rgba(255, 237, 95, 1) calc(var(--space) * 2),
                rgba(168, 255, 95, 1) calc(var(--space) * 3),
                rgba(131, 255, 247, 1) calc(var(--space) * 4),
                rgba(120, 148, 255, 1) calc(var(--space) * 5),
                rgb(216, 117, 255) calc(var(--space) * 6),
                rgb(255, 119, 115) calc(var(--space) * 7)
              ),
              repeating-linear-gradient(var(--angle),
                #0e152e 0%,
                hsl(180, 10%, 60%) 3.8%,
                hsl(180, 29%, 66%) 4.5%,
                hsl(180, 10%, 60%) 5.2%,
                #0e152e 10%,
                #0e152e 12%
              ),
              radial-gradient(
                farthest-corner circle at calc(100% - var(--posx)) calc(100% - var(--posy)),
                rgba(0, 0, 0, .1) 12%,
                rgba(0, 0, 0, .15) 20%,
                rgba(0, 0, 0, .25) 120%
              )
            `,
            backgroundBlendMode: "exclusion, hue, hard-light, exclusion",
            backgroundSize: "var(--imgsize), 200% 700%, 300%, 200%",
            backgroundPosition: "center, 0% calc(100% - var(--posy)), calc(100% - var(--posx)) calc(100% - var(--posy)), calc(100% - var(--posx)) calc(100% - var(--posy))",
            filter: "brightness(calc((var(--hyp) * 0.3) + 0.5)) contrast(2) saturate(1.5)",
            WebkitFilter: "brightness(calc((var(--hyp) * 0.3) + 0.5)) contrast(2) saturate(1.5)",
            opacity: 0.5
          }}
        />
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 320 420" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Large diamond background */}
          <rect 
            x="60" 
            y="100" 
            width="200" 
            height="200" 
            rx="10" 
            transform="rotate(45 160 200)" 
            fill="#D9D9D9" 
          />
          {/* Large black circle in center */}
          <circle 
            cx="160" 
            cy="200" 
            r="70" 
            fill="black" 
          />
          {/* Top left small black circle */}
          <circle 
            cx="48" 
            cy="48" 
            r="24" 
            fill="black" 
          />
          {/* Bottom right small black circle */}
          <circle 
            cx="272" 
            cy="372" 
            r="24" 
            fill="black" 
          />
        </svg>
      </div>
    </Tilt>
  )
} 