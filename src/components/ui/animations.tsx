"use client";

import { useState, useRef } from "react";
import { motion, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?: "fade" | "slide" | "scale" | "rotate" | "flip" | "bounce";
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  staggerChildren?: number;
  viewport?: boolean;
  once?: boolean;
  amount?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction,
  distance = 50,
  viewport = true,
  once = true,
}: AnimationProps) {
  const getInitialProps = () => {
    const initial = { opacity: 0 };
    
    if (direction === "up") {
      return { ...initial, y: distance };
    } else if (direction === "down") {
      return { ...initial, y: -distance };
    } else if (direction === "left") {
      return { ...initial, x: distance };
    } else if (direction === "right") {
      return { ...initial, x: -distance };
    }
    
    return initial;
  };
  
  const getAnimateProps = () => {
    const animate = { opacity: 1 };
    
    if (direction === "up" || direction === "down") {
      return { ...animate, y: 0 };
    } else if (direction === "left" || direction === "right") {
      return { ...animate, x: 0 };
    }
    
    return animate;
  };
  
  return (
    <motion.div
      className={className}
      initial={getInitialProps()}
      whileInView={viewport ? getAnimateProps() : undefined}
      animate={!viewport ? getAnimateProps() : undefined}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={viewport ? { once } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  viewport = true,
  once = true,
}: AnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={viewport ? { opacity: 1, scale: 1 } : undefined}
      animate={!viewport ? { opacity: 1, scale: 1 } : undefined}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={viewport ? { once } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerChildren = 0.1,
  delay = 0,
  viewport = true,
  once = true,
}: AnimationProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView={viewport ? "visible" : undefined}
      animate={!viewport ? "visible" : undefined}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
      viewport={viewport ? { once } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  type = "fade",
  direction = "up",
  distance = 20,
  duration = 0.5,
}: Omit<AnimationProps, "delay" | "viewport" | "once" | "staggerChildren">) {
  const getVariants = () => {
    if (type === "fade") {
      const initial = { opacity: 0 };
      const animate = { opacity: 1 };
      
      if (direction === "up") {
        return {
          hidden: { ...initial, y: distance },
          visible: { ...animate, y: 0 },
        };
      } else if (direction === "down") {
        return {
          hidden: { ...initial, y: -distance },
          visible: { ...animate, y: 0 },
        };
      } else if (direction === "left") {
        return {
          hidden: { ...initial, x: distance },
          visible: { ...animate, x: 0 },
        };
      } else if (direction === "right") {
        return {
          hidden: { ...initial, x: -distance },
          visible: { ...animate, x: 0 },
        };
      }
    } else if (type === "scale") {
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      };
    } else if (type === "rotate") {
      return {
        hidden: { opacity: 0, rotate: -5 },
        visible: { opacity: 1, rotate: 0 },
      };
    } else if (type === "flip") {
      return {
        hidden: { opacity: 0, rotateX: 90 },
        visible: { opacity: 1, rotateX: 0 },
      };
    } else if (type === "bounce") {
      return {
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
          }
        },
      };
    }
    
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  };
  
  return (
    <motion.div
      className={className}
      variants={getVariants()}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export function Transition({
  children,
  className,
  type = "fade",
  direction = "up",
  distance = 20,
  duration = 0.5,
  delay = 0,
}: AnimationProps) {
  const getInitialProps = () => {
    if (type === "fade") {
      const initial = { opacity: 0 };
      
      if (direction === "up") {
        return { ...initial, y: distance };
      } else if (direction === "down") {
        return { ...initial, y: -distance };
      } else if (direction === "left") {
        return { ...initial, x: distance };
      } else if (direction === "right") {
        return { ...initial, x: -distance };
      }
      
      return initial;
    } else if (type === "scale") {
      return { opacity: 0, scale: 0.9 };
    } else if (type === "rotate") {
      return { opacity: 0, rotate: -5 };
    } else if (type === "flip") {
      return { opacity: 0, rotateX: 90 };
    } else if (type === "bounce") {
      return { opacity: 0, y: 50 };
    }
    
    return { opacity: 0 };
  };
  
  const getAnimateProps = () => {
    if (type === "fade") {
      const animate = { opacity: 1 };
      
      if (direction === "up" || direction === "down") {
        return { ...animate, y: 0 };
      } else if (direction === "left" || direction === "right") {
        return { ...animate, x: 0 };
      }
      
      return animate;
    } else if (type === "scale") {
      return { opacity: 1, scale: 1 };
    } else if (type === "rotate") {
      return { opacity: 1, rotate: 0 };
    } else if (type === "flip") {
      return { opacity: 1, rotateX: 0 };
    } else if (type === "bounce") {
      return { opacity: 1, y: 0 };
    }
    
    return { opacity: 1 };
  };
  
  const getTransition = () => {
    if (type === "bounce") {
      return {
        duration,
        delay,
        type: "spring",
        stiffness: 400,
        damping: 10,
      };
    }
    
    return {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    };
  };
  
  return (
    <motion.div
      className={cn("", className)}
      initial={getInitialProps()}
      animate={getAnimateProps()}
      transition={getTransition()}
    >
      {children}
    </motion.div>
  );
}

export function HoverEffect({
  children,
  className,
  type = "scale",
  amount = 1.05,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "scale" | "lift" | "glow" | "rotate" | "pulse" | "shake";
  amount?: number;
}) {
  const getWhileHoverProps = () => {
    if (type === "scale") {
      return { scale: amount };
    } else if (type === "lift") {
      return { y: -5 * amount };
    } else if (type === "glow") {
      return { 
        boxShadow: `0 0 ${8 * amount}px rgba(var(--primary-rgb), ${0.5 * amount})`,
      };
    } else if (type === "rotate") {
      return { rotate: 5 * amount };
    } else if (type === "pulse") {
      return { 
        scale: [1, 1 + (0.05 * amount), 1],
        transition: {
          duration: 0.8,
          repeat: Infinity,
          repeatType: "loop",
        }
      };
    } else if (type === "shake") {
      return { 
        x: [0, -5 * amount, 5 * amount, -5 * amount, 5 * amount, 0],
        transition: {
          duration: 0.6,
        }
      };
    }
    
    return { scale: 1.05 };
  };
  
  return (
    <motion.div
      className={className}
      whileHover={getWhileHoverProps()}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollAnimation({
  children,
  className,
  type = "fade",
  direction = "up",
  distance = 50,
  duration = 0.5,
  amount = 0.2,
  once = true,
}: Omit<AnimationProps, "delay" | "staggerChildren" | "viewport">) {
  // This is needed for the animation system to work correctly
  // @ts-expect-error - useRef is used for DOM references
  const ref = useRef<HTMLDivElement>(null);
  
  const getInitialProps = () => {
    if (type === "fade") {
      const initial = { opacity: 0 };
      
      if (direction === "up") {
        return { ...initial, y: distance };
      } else if (direction === "down") {
        return { ...initial, y: -distance };
      } else if (direction === "left") {
        return { ...initial, x: distance };
      } else if (direction === "right") {
        return { ...initial, x: -distance };
      }
      
      return initial;
    } else if (type === "scale") {
      return { opacity: 0, scale: 1 - amount };
    } else if (type === "rotate") {
      return { opacity: 0, rotate: -5 * amount };
    }
    
    return { opacity: 0 };
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialProps()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCounter({
  value,
  className,
  duration = 1,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, springConfig);
  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));
  
  // This effect is needed for the animation system
  useState(() => {
    motionValue.set(value);
  });
  
  return (
    <motion.span className={className}>
      {displayValue}
    </motion.span>
  );
}

export function AnimatedGradientText({
  children,
  className,
  colors = ["hsl(var(--primary))", "hsl(var(--accent))"],
  animate = true,
}: {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animate?: boolean;
}) {
  // Animation duration is set internally
  const animationDuration = 3;
  
  const gradientText = {
    backgroundSize: "300% 300%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
  };
  
  const animationProps = animate
    ? {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: {
          duration: animationDuration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        },
      }
    : {};
  
  return (
    <motion.span
      className={className}
      style={gradientText}
      animate={animationProps}
    >
      {children}
    </motion.span>
  );
}
