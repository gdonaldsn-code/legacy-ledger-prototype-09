import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-elevated",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Advanced Legacy Ledger variants
        hero: "bg-gradient-to-r from-electric-blue to-cyber-teal text-white hover:shadow-glow transform hover:scale-105 animate-pulse-glow",
        neural: "neural-gradient text-white shadow-neural hover:shadow-floating transform hover:scale-110 backdrop-blur-sm",
        glass: "glass-morphism text-navy-deep hover:bg-white/20 border-white/30 backdrop-blur-lg",
        trust: "bg-trust-accent text-trust-primary hover:bg-blue-soft shadow-trust hover:shadow-elevated",
        comfort: "bg-comfort-bg text-navy-deep hover:bg-blue-pale border border-blue-soft/30",
        quantum: "relative bg-gradient-to-r from-neon-purple via-electric-blue to-cyber-teal text-white before:absolute before:inset-0 before:bg-gradient-to-r before:from-neon-purple before:via-electric-blue before:to-cyber-teal before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 hover:shadow-glow",
      },
      size: {
        default: "h-12 px-8 py-3 text-base",
        sm: "h-9 rounded-lg px-6 text-sm",
        lg: "h-16 rounded-2xl px-12 text-lg",
        xl: "h-20 rounded-2xl px-16 text-xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
