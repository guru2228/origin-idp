"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground",
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "border-primary/20 bg-primary/5",
        secondary: "border-secondary/20 bg-secondary/5",
        accent: "border-accent/20 bg-accent/5",
        destructive: "border-destructive/20 bg-destructive/5",
        success: "border-success/20 bg-success/5",
        warning: "border-warning/20 bg-warning/5",
        info: "border-info/20 bg-info/5",
        glass: "bg-background/80 backdrop-blur-sm border-border/50",
        gradient: "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      elevation: {
        none: "",
        sm: "shadow-sm",
        default: "shadow",
        md: "shadow-md",
        lg: "shadow-lg",
        glow: "shadow-glow-primary",
      },
      hover: {
        none: "",
        lift: "transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md",
        scale: "transition-all duration-300 ease-in-out hover:scale-[1.02]",
        border: "transition-all duration-300 ease-in-out hover:border-primary",
        glow: "transition-all duration-300 ease-in-out hover:shadow-glow-primary",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      elevation: "default",
      hover: "none",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
  animated?: boolean;
  is3D?: boolean;
  depth?: number;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    size, 
    elevation,
    hover,
    as: Component = "div",
    animated = true,
    is3D = false,
    depth = 1,
    children,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!is3D || !isHovered || !cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (normalized -1 to 1)
      const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -5 * depth;
      const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 5 * depth;
      
      setMousePosition({ x: rotateYValue, y: rotateXValue });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };

    const cardClasses = cn(
      cardVariants({ 
        variant, 
        size, 
        elevation,
        hover,
        className 
      }),
      is3D && "perspective-1000"
    );

    if (!animated) {
      return (
        <Component
          ref={ref}
          className={cardClasses}
          {...props}
        >
          {children}
        </Component>
      );
    }

    return (
      <motion.div
        ref={cardRef}
        className={cardClasses}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={is3D ? {
          transformStyle: "preserve-3d",
          rotateX: mousePosition.y,
          rotateY: mousePosition.x,
        } : undefined}
        whileHover={!is3D ? { scale: hover === "scale" ? 1.02 : 1 } : undefined}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.1 }}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <motion.h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <motion.p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <motion.div 
    ref={ref} 
    className={cn("p-6 pt-0", className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
