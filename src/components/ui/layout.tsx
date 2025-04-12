import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  animate?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function Container({
  children,
  className,
  as: Component = "div",
  animate = false,
  maxWidth = "xl",
}: ContainerProps) {
  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

  const containerClasses = cn(
    "w-full mx-auto px-4 sm:px-6 md:px-8",
    maxWidthClasses[maxWidth],
    className
  );

  if (animate) {
    return (
      <motion.div
        className={containerClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  }

  return <Component className={containerClasses}>{children}</Component>;
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  animate?: boolean;
  id?: string;
}

export function Section({
  children,
  className,
  as: Component = "section",
  animate = false,
  id,
}: SectionProps) {
  const sectionClasses = cn("py-12 md:py-16 lg:py-20", className);

  if (animate) {
    return (
      <motion.section
        id={id}
        className={sectionClasses}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <Component id={id} className={sectionClasses}>
      {children}
    </Component>
  );
}

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: number;
  gap?: number;
  rowGap?: number;
  colGap?: number;
  as?: React.ElementType;
  animate?: boolean;
}

export function Grid({
  children,
  className,
  cols = 3,
  gap = 6,
  rowGap,
  colGap,
  as: Component = "div",
  animate = false,
}: GridProps) {
  const gridClasses = cn(
    "grid",
    `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols}`,
    gap && !rowGap && !colGap ? `gap-${gap}` : "",
    rowGap ? `row-gap-${rowGap}` : "",
    colGap ? `col-gap-${colGap}` : "",
    className
  );

  if (animate) {
    return (
      <motion.div
        className={gridClasses}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  }

  return <Component className={gridClasses}>{children}</Component>;
}

interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "col";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  wrap?: boolean;
  gap?: number;
  as?: React.ElementType;
  animate?: boolean;
}

export function Flex({
  children,
  className,
  direction = "row",
  justify = "start",
  align = "start",
  wrap = false,
  gap = 4,
  as: Component = "div",
  animate = false,
}: FlexProps) {
  const flexClasses = cn(
    "flex",
    direction === "col" ? "flex-col" : "flex-row",
    `justify-${justify}`,
    `items-${align}`,
    wrap && "flex-wrap",
    gap && `gap-${gap}`,
    className
  );

  if (animate) {
    return (
      <motion.div
        className={flexClasses}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  }

  return <Component className={flexClasses}>{children}</Component>;
}

interface SpacerProps {
  size?: number;
  axis?: "horizontal" | "vertical";
  className?: string;
}

export function Spacer({
  size = 4,
  axis = "vertical",
  className,
}: SpacerProps) {
  const spacerClasses = cn(
    axis === "horizontal" ? `w-${size} h-px` : `h-${size} w-px`,
    className
  );

  return <div className={spacerClasses} />;
}

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export function Divider({
  className,
  orientation = "horizontal",
  decorative = true,
}: DividerProps) {
  const dividerClasses = cn(
    "shrink-0 bg-border",
    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
    className
  );

  return (
    <div
      className={dividerClasses}
      // @ts-expect-error - decorative is a valid aria attribute
      aria-orientation={orientation}
      aria-hidden={decorative}
      role={decorative ? "none" : "separator"}
    />
  );
}

interface AspectRatioProps {
  children: React.ReactNode;
  className?: string;
  ratio?: number;
  as?: React.ElementType;
}

export function AspectRatio({
  children,
  className,
  ratio = 16 / 9,
  as: Component = "div",
}: AspectRatioProps) {
  const aspectRatioClasses = cn("relative w-full", className);

  return (
    <Component className={aspectRatioClasses}>
      <div className="pb-[calc(100%/var(--aspect-ratio))]" style={{ "--aspect-ratio": ratio } as React.CSSProperties} />
      <div className="absolute inset-0">{children}</div>
    </Component>
  );
}
