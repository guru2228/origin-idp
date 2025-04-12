"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TransitionProps {
  children: React.ReactNode;
  className?: string;
  type?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "rotate" | "none";
  duration?: number;
  delay?: number;
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate";
  staggerChildren?: number;
  staggerDirection?: 1 | -1;
  viewport?: boolean;
  viewportAmount?: number;
  viewportOnce?: boolean;
  repeat?: boolean;
  repeatType?: "loop" | "reverse" | "mirror";
  repeatDelay?: number;
}

export function Transition({
  children,
  className,
  type = "fade",
  duration = 0.5,
  delay = 0,
  ease = "easeOut",
  staggerChildren = 0.1,
  staggerDirection = 1,
  viewport = false,
  viewportAmount = 0.1,
  viewportOnce = true,
  repeat = false,
  repeatType = "loop",
  repeatDelay = 0,
}: TransitionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  // Define animation variants based on type
  const variants = {
    initial: {
      opacity: type !== "none" ? 0 : 1,
      y: type === "slide-up" ? 20 : type === "slide-down" ? -20 : 0,
      x: type === "slide-left" ? 20 : type === "slide-right" ? -20 : 0,
      scale: type === "scale" ? 0.95 : 1,
      rotate: type === "rotate" ? -5 : 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration,
        delay,
        ease,
        staggerChildren,
        staggerDirection,
        repeat: repeat ? Infinity : 0,
        repeatType,
        repeatDelay,
      },
    },
    exit: {
      opacity: type !== "none" ? 0 : 1,
      y: type === "slide-up" ? -20 : type === "slide-down" ? 20 : 0,
      x: type === "slide-left" ? -20 : type === "slide-right" ? 20 : 0,
      scale: type === "scale" ? 0.95 : 1,
      rotate: type === "rotate" ? 5 : 0,
      transition: {
        duration,
        ease,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      viewport={viewport ? { amount: viewportAmount, once: viewportOnce } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={cn("w-full", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  staggerChildren?: number;
  viewport?: boolean;
  viewportAmount?: number;
  viewportOnce?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 20,
  staggerChildren = 0.1,
  viewport = true,
  viewportAmount = 0.1,
  viewportOnce = true,
}: FadeInProps) {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...directionMap[direction],
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ? { amount: viewportAmount, once: viewportOnce } : undefined}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  staggerDirection?: 1 | -1;
  viewport?: boolean;
  viewportAmount?: number;
  viewportOnce?: boolean;
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  staggerChildren = 0.1,
  staggerDirection = 1,
  viewport = true,
  viewportAmount = 0.1,
  viewportOnce = true,
}: StaggerContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren,
        staggerDirection,
      },
    },
  };

  // Add variants to children
  const childrenWithVariants = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        // @ts-ignore - adding variants prop
        variants: {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          },
        },
      });
    }
    return child;
  });

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ? { amount: viewportAmount, once: viewportOnce } : undefined}
      variants={containerVariants}
    >
      {childrenWithVariants}
    </motion.div>
  );
}

interface HoverEffectProps {
  children: React.ReactNode;
  className?: string;
  type?: "scale" | "lift" | "glow" | "rotate" | "pulse" | "shake" | "none";
  scale?: number;
  lift?: number;
  rotate?: number;
  duration?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

export function HoverEffect({
  children,
  className,
  type = "scale",
  scale = 1.05,
  lift = -5,
  rotate = 5,
  duration = 0.3,
  springConfig = { stiffness: 300, damping: 15, mass: 1 },
}: HoverEffectProps) {
  const getHoverAnimation = () => {
    switch (type) {
      case "scale":
        return { scale };
      case "lift":
        return { y: lift };
      case "glow":
        return { boxShadow: "0 0 15px 2px rgba(var(--primary-rgb), 0.3)" };
      case "rotate":
        return { rotate };
      case "pulse":
        return { scale: [1, 1.05, 1] };
      case "shake":
        return { x: [0, -5, 5, -5, 5, 0] };
      case "none":
        return {};
      default:
        return { scale };
    }
  };

  return (
    <motion.div
      className={className}
      whileHover={getHoverAnimation()}
      transition={
        type === "pulse" || type === "shake"
          ? { duration, repeat: 1, repeatType: "reverse" }
          : { type: "spring", ...springConfig }
      }
    >
      {children}
    </motion.div>
  );
}

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade" | "slide" | "scale" | "rotate" | "none";
  threshold?: number;
  triggerOnce?: boolean;
  duration?: number;
  delay?: number;
}

export function ScrollAnimation({
  children,
  className,
  animation = "fade",
  threshold = 0.1,
  triggerOnce = true,
  duration = 0.5,
  delay = 0,
}: ScrollAnimationProps) {
  const getAnimationVariants = () => {
    switch (animation) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "slide":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      case "rotate":
        return {
          hidden: { opacity: 0, rotate: -5 },
          visible: { opacity: 1, rotate: 0 },
        };
      case "none":
        return {
          hidden: {},
          visible: {},
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: threshold, once: triggerOnce }}
      variants={getAnimationVariants()}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  className,
  duration = 1,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const updateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentValue = progress * value;
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue);
      }
    };

    animationFrame = requestAnimationFrame(updateValue);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function AnimatedGradientText({
  children,
  className,
  colors = ["from-primary", "via-accent", "to-primary"],
  duration = 8,
  animate = true,
}: {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  duration?: number;
  animate?: boolean;
}) {
  const gradientClasses = colors.join(" ");
  
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        gradientClasses,
        animate && "animate-gradient-shift",
        className
      )}
      style={animate ? { backgroundSize: "200% 200%", animationDuration: `${duration}s` } : undefined}
    >
      {children}
    </span>
  );
}
