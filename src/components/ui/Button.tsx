"use client"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", className = "", disabled, ...props }, ref) => {
    const baseStyles =
      "rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400/50 disabled:opacity-50 disabled:cursor-not-allowed"

    const variantStyles = {
      primary: "bg-gradient-to-r from-violet-500 to-purple-500 text-white neomorphic-btn",
      secondary: "glass-card glass-card-hover text-gray-800",
      ghost: "bg-transparent hover:bg-white/10 text-gray-700",
    }

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-6 py-3 text-lg",
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    )
  },
)

Button.displayName = "Button"
