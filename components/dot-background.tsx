"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DotBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `radial-gradient(${theme === "dark" ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.2)"} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  )
}

