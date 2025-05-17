"use client"

import { useState, useEffect } from "react"

export const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) 
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile ?? false
}
