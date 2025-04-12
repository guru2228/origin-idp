"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  hoverScale?: number;
  borderRadius?: string;
  shadow?: string;
  backgroundColor?: string;
}

export function AnimatedCard({
  children,
  className,
  depth = 1,
  hoverScale = 1.03,
  borderRadius = "rounded-lg",
  shadow = "shadow-lg",
  backgroundColor = "bg-card",
}: AnimatedCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for smooth transitions
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Spring configs for smooth animation
  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  // Scale on hover with spring physics
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 200, damping: 20 });
  
  // Shadow based on hover state
  const boxShadow = useTransform(
    springScale,
    [1, hoverScale],
    [
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    ]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (normalized -1 to 1)
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -5 * depth;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 5 * depth;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
    
    // Update mouse position for potential parallax effects inside card
    setMousePosition({
      x: (e.clientX - centerX) / rect.width,
      y: (e.clientY - centerY) / rect.height
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(hoverScale);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  if (!isMounted) {
    return <div className={cn("border", borderRadius, shadow, backgroundColor, className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("border overflow-hidden perspective-1000", borderRadius, backgroundColor, className)}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        boxShadow,
        transformStyle: "preserve-3d",
        willChange: "transform, box-shadow"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {typeof children === 'function' ? children(mousePosition, isHovered) : children}
    </motion.div>
  );
}

export function AnimatedCardContent({
  children,
  depth = 0.5,
  className
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("relative z-10", className)}
      style={{
        transformStyle: "preserve-3d",
        transform: `translateZ(${depth * 20}px)`
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCardBackground({
  children,
  depth = -0.5,
  className
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("absolute inset-0 z-0", className)}
      style={{
        transformStyle: "preserve-3d",
        transform: `translateZ(${depth * 20}px)`
      }}
    >
      {children}
    </motion.div>
  );
}
