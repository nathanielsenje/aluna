
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/hooks/use-theme"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const handleCheckedChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={handleCheckedChange}
      aria-label="Toggle dark mode"
    />
  )
}
