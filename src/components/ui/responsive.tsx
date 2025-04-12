import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  breakpoints?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
  };
  as?: React.ElementType;
  animate?: boolean;
}

export function ResponsiveContainer({
  children,
  className,
  breakpoints = {},
  as: Component = "div",
  animate = false,
}: ResponsiveContainerProps) {
  const containerClasses = cn(
    "w-full",
    breakpoints.sm && `sm:${breakpoints.sm}`,
    breakpoints.md && `md:${breakpoints.md}`,
    breakpoints.lg && `lg:${breakpoints.lg}`,
    breakpoints.xl && `xl:${breakpoints.xl}`,
    breakpoints["2xl"] && `2xl:${breakpoints["2xl"]}`,
    className
  );

  if (animate) {
    return (
      <motion.div
        className={containerClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  }

  return <Component className={containerClasses}>{children}</Component>;
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  gap?: number;
  as?: React.ElementType;
  animate?: boolean;
}

export function ResponsiveGrid({
  children,
  className,
  columns = { default: 1 },
  gap = 4,
  as: Component = "div",
  animate = false,
}: ResponsiveGridProps) {
  const gridClasses = cn(
    "grid",
    `grid-cols-${columns.default}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    columns["2xl"] && `2xl:grid-cols-${columns["2xl"]}`,
    gap && `gap-${gap}`,
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

interface ResponsiveStackProps {
  children: React.ReactNode;
  className?: string;
  direction?: {
    default: "row" | "col";
    sm?: "row" | "col";
    md?: "row" | "col";
    lg?: "row" | "col";
    xl?: "row" | "col";
    "2xl"?: "row" | "col";
  };
  gap?: number;
  as?: React.ElementType;
  animate?: boolean;
}

export function ResponsiveStack({
  children,
  className,
  direction = { default: "col" },
  gap = 4,
  as: Component = "div",
  animate = false,
}: ResponsiveStackProps) {
  const stackClasses = cn(
    "flex",
    direction.default === "col" ? "flex-col" : "flex-row",
    direction.sm && `sm:flex-${direction.sm}`,
    direction.md && `md:flex-${direction.md}`,
    direction.lg && `lg:flex-${direction.lg}`,
    direction.xl && `xl:flex-${direction.xl}`,
    direction["2xl"] && `2xl:flex-${direction["2xl"]}`,
    gap && `gap-${gap}`,
    className
  );

  if (animate) {
    return (
      <motion.div
        className={stackClasses}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  }

  return <Component className={stackClasses}>{children}</Component>;
}

interface ResponsiveHideProps {
  children: React.ReactNode;
  className?: string;
  hideOn?: {
    default?: boolean;
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
    "2xl"?: boolean;
  };
  as?: React.ElementType;
}

export function ResponsiveHide({
  children,
  className,
  hideOn = {},
  as: Component = "div",
}: ResponsiveHideProps) {
  // @ts-expect-error - hideOn is a valid prop
  const hideClasses = cn(
    hideOn.default && "hidden",
    hideOn.sm && "sm:hidden",
    hideOn.md && "md:hidden",
    hideOn.lg && "lg:hidden",
    hideOn.xl && "xl:hidden",
    hideOn["2xl"] && "2xl:hidden",
    className
  );

  return <Component className={hideClasses}>{children}</Component>;
}

interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  size?: {
    default: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
  };
  align?: {
    default?: "left" | "center" | "right";
    sm?: "left" | "center" | "right";
    md?: "left" | "center" | "right";
    lg?: "left" | "center" | "right";
    xl?: "left" | "center" | "right";
    "2xl"?: "left" | "center" | "right";
  };
  as?: React.ElementType;
  animate?: boolean;
}

export function ResponsiveText({
  children,
  className,
  size = { default: "base" },
  align = {},
  as: Component = "p",
  animate = false,
}: ResponsiveTextProps) {
  const textClasses = cn(
    `text-${size.default}`,
    size.sm && `sm:text-${size.sm}`,
    size.md && `md:text-${size.md}`,
    size.lg && `lg:text-${size.lg}`,
    size.xl && `xl:text-${size.xl}`,
    size["2xl"] && `2xl:text-${size["2xl"]}`,
    align.default && `text-${align.default}`,
    align.sm && `sm:text-${align.sm}`,
    align.md && `md:text-${align.md}`,
    align.lg && `lg:text-${align.lg}`,
    align.xl && `xl:text-${align.xl}`,
    align["2xl"] && `2xl:text-${align["2xl"]}`,
    className
  );

  if (animate) {
    return (
      <motion.p
        className={textClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.p>
    );
  }

  return <Component className={textClasses}>{children}</Component>;
}

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: {
    default: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
    "2xl"?: string | number;
  };
  height?: string | number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  animate?: boolean;
}

export function ResponsiveImage({
  src,
  alt,
  className,
  width = { default: "full" },
  height = "auto",
  objectFit = "cover",
  animate = false,
}: ResponsiveImageProps) {
  // @ts-expect-error - width is a valid prop
  const imageClasses = cn(
    `w-${width.default}`,
    width.sm && `sm:w-${width.sm}`,
    width.md && `md:w-${width.md}`,
    width.lg && `lg:w-${width.lg}`,
    width.xl && `xl:w-${width.xl}`,
    width["2xl"] && `2xl:w-${width["2xl"]}`,
    height && `h-${height}`,
    `object-${objectFit}`,
    className
  );

  if (animate) {
    return (
      <motion.img
        src={src}
        alt={alt}
        className={imageClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    );
  }

  return <img src={src} alt={alt} className={imageClasses} />;
}
