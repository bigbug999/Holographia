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
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const updatePosition = (clientX: number, clientY: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
    
    // Calculate hypotenuse for brightness effect
    const centerX = 50
    const centerY = 50
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
    setHyp(distance / 50) // Normalize to 0-1 range
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    updatePosition(e.clientX, e.clientY, rect)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    updatePosition(touch.clientX, touch.clientY, rect)
  }

  return (
    <Tilt rotationFactor={rotationFactor}>
      <div
        className={cn(
          "card-tilt",
          className
        )}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{
          "--posx": `${mousePosition.x}%`,
          "--posy": `${mousePosition.y}%`,
          "--hyp": hyp,
          "--space": "5%",
          "--angle": "133deg",
          "--imgsize": "50%",
          "--radius": "4.55% / 3.5%",
          "--img-repeat": "repeat",
          "--transition-timing": isMobile ? "cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          "--transition-duration": isMobile ? "300ms" : "0ms",
        } as React.CSSProperties}
        {...props}
      >
        <div
          className={cn("card-front", "absolute inset-0")}
          style={{
            "--posx": `${mousePosition.x}%`,
            "--posy": `${mousePosition.y}%`,
            "--hyp": hyp,
            "--space": "5%",
            "--angle": "133deg",
            "--imgsize": "50%",
            "--radius": "4.55% / 3.5%",
            "--img-repeat": "repeat",
            "--transition-timing": isMobile ? "cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            "--transition-duration": isMobile ? "300ms" : "0ms",
          } as React.CSSProperties}
        />
        <div
          className="absolute inset-0 pointer-events-none rounded-[4.55%/3.5%] border-2 border-zinc-600"
          style={{
            mixBlendMode: "exclusion",
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            perspective: "1000px",
            WebkitBackfaceVisibility: "hidden",
            WebkitPerspective: "1000px",
            transition: isMobile ? "all var(--transition-duration) var(--transition-timing)" : "none",
            backgroundImage: `
              url('/img/cosmos-top-trans.png'),
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
                rgba(0, 0, 0, .2) 12%,
                rgba(0, 0, 0, .3) 20%,
                rgba(0, 0, 0, .4) 120%
              )
            `,
            backgroundBlendMode: "exclusion, hue, hard-light, exclusion",
            backgroundSize: "50%, 200% 700%, 300%, 200%",
            backgroundPosition: "center, 50% calc(100% - var(--posy)), calc(100% - var(--posx)) calc(100% - var(--posy)), calc(100% - var(--posx)) calc(100% - var(--posy))",
            backgroundRepeat: "var(--img-repeat), no-repeat, no-repeat, no-repeat",
            filter: "brightness(calc((var(--hyp) * 0.3) + 0.5)) contrast(1.2) saturate(1.1)",
            WebkitFilter: "brightness(calc((var(--hyp) * 0.3) + 0.5)) contrast(1.2) saturate(1.1)",
            opacity: 0.3
          }}
        />
        {/* Spotlight effect layer */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[4.55%/3.5%]"
          style={{
            background: `radial-gradient(
              circle at var(--posx) var(--posy),
              rgba(255, 255, 255, 0.15) 0%,
              rgba(255, 255, 255, 0.1) 20%,
              rgba(255, 255, 255, 0.05) 40%,
              transparent 60%
            )`,
            mixBlendMode: "overlay",
            transition: isMobile ? "all var(--transition-duration) var(--transition-timing)" : "none",
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