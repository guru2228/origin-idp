"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  animate?: boolean;
}

const maxWidthMap = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

const paddingMap = {
  none: "px-0",
  sm: "px-4",
  md: "px-6",
  lg: "px-8",
};

export function Container({
  children,
  className,
  as: Component = "div",
  maxWidth = "2xl",
  padding = "md",
  animate = true,
}: ContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return animate ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "mx-auto w-full",
        maxWidthMap[maxWidth],
        paddingMap[padding],
        className
      )}
    >
      <Component>{children}</Component>
    </motion.div>
  ) : (
    <div
      className={cn(
        "mx-auto w-full",
        maxWidthMap[maxWidth],
        paddingMap[padding],
        className
      )}
    >
      <Component>{children}</Component>
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "primary" | "accent";
  paddingY?: "none" | "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}

const backgroundMap = {
  default: "bg-background",
  muted: "bg-muted",
  primary: "bg-primary/5",
  accent: "bg-accent/5",
};

const paddingYMap = {
  none: "py-0",
  sm: "py-8",
  md: "py-12",
  lg: "py-16",
  xl: "py-20",
};

export function Section({
  children,
  className,
  id,
  background = "default",
  paddingY = "lg",
  animate = true,
}: SectionProps) {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
      } 
    },
  };

  return animate ? (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className={cn(
        backgroundMap[background],
        paddingYMap[paddingY],
        "relative overflow-hidden",
        className
      )}
    >
      {children}
    </motion.section>
  ) : (
    <section
      id={id}
      className={cn(
        backgroundMap[background],
        paddingYMap[paddingY],
        "relative overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
}

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  mdCols?: 1 | 2 | 3 | 4 | 5 | 6;
  lgCols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "none" | "sm" | "md" | "lg";
  animate?: boolean;
}

const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const mdColsMap = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

const lgColsMap = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

const gapMap = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export function Grid({
  children,
  className,
  cols = 1,
  mdCols = 2,
  lgCols = 3,
  gap = "md",
  animate = true,
}: GridProps) {
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1,
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
      } 
    },
  };

  // Add variants to children
  const childrenWithVariants = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && animate) {
      return React.cloneElement(child as React.ReactElement, {
        // @ts-ignore - adding variants prop
        variants: itemVariants,
      });
    }
    return child;
  });

  return animate ? (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={gridVariants}
      className={cn(
        "grid",
        colsMap[cols],
        mdColsMap[mdCols],
        lgColsMap[lgCols],
        gapMap[gap],
        className
      )}
    >
      {childrenWithVariants}
    </motion.div>
  ) : (
    <div
      className={cn(
        "grid",
        colsMap[cols],
        mdColsMap[mdCols],
        lgColsMap[lgCols],
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: "none" | "sm" | "md" | "lg";
  animate?: boolean;
}

const directionMap = {
  row: "flex-row",
  col: "flex-col",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export function Flex({
  children,
  className,
  direction = "row",
  align = "start",
  justify = "start",
  wrap = false,
  gap = "md",
  animate = true,
}: FlexProps) {
  const flexVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1,
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: direction === "row" ? -10 : 0, y: direction === "col" ? -10 : 0 },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
      } 
    },
  };

  // Add variants to children
  const childrenWithVariants = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && animate) {
      return React.cloneElement(child as React.ReactElement, {
        // @ts-ignore - adding variants prop
        variants: itemVariants,
      });
    }
    return child;
  });

  return animate ? (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={flexVariants}
      className={cn(
        "flex",
        directionMap[direction],
        alignMap[align],
        justifyMap[justify],
        wrap && "flex-wrap",
        gapMap[gap],
        className
      )}
    >
      {childrenWithVariants}
    </motion.div>
  ) : (
    <div
      className={cn(
        "flex",
        directionMap[direction],
        alignMap[align],
        justifyMap[justify],
        wrap && "flex-wrap",
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

interface SpacerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  axis?: "horizontal" | "vertical";
  className?: string;
}

const spacerSizeMap = {
  xs: "4",
  sm: "8",
  md: "12",
  lg: "16",
  xl: "20",
};

export function Spacer({ size = "md", axis = "vertical", className }: SpacerProps) {
  const width = axis === "horizontal" ? `w-${spacerSizeMap[size]}` : "w-full";
  const height = axis === "vertical" ? `h-${spacerSizeMap[size]}` : "h-full";
  
  return <div className={cn(width, height, className)} />;
}

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export function Divider({ 
  className, 
  orientation = "horizontal", 
  decorative = true 
}: DividerProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
    />
  );
}

interface AspectRatioProps {
  children: React.ReactNode;
  className?: string;
  ratio?: number;
}

export function AspectRatio({ 
  children, 
  className, 
  ratio = 16 / 9 
}: AspectRatioProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div style={{ paddingBottom: `${(1 / ratio) * 100}%` }} />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
