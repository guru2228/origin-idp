"use client";

import React, { useState, useEffect } from "react";
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
  defaultClassName?: string;
}

export function ResponsiveContainer({
  children,
  className,
  breakpoints = {},
  defaultClassName = "",
}: ResponsiveContainerProps) {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return <div className={cn(defaultClassName, className)}>{children}</div>;
  }

  let responsiveClass = defaultClassName;

  if (windowWidth < 640 && breakpoints.sm) {
    responsiveClass = breakpoints.sm;
  } else if (windowWidth >= 640 && windowWidth < 768 && breakpoints.md) {
    responsiveClass = breakpoints.md;
  } else if (windowWidth >= 768 && windowWidth < 1024 && breakpoints.lg) {
    responsiveClass = breakpoints.lg;
  } else if (windowWidth >= 1024 && windowWidth < 1280 && breakpoints.xl) {
    responsiveClass = breakpoints.xl;
  } else if (windowWidth >= 1280 && breakpoints["2xl"]) {
    responsiveClass = breakpoints["2xl"];
  }

  return (
    <div className={cn(responsiveClass, className)}>
      {children}
    </div>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  gap?: {
    default: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
  };
  animated?: boolean;
}

export function ResponsiveGrid({
  children,
  className,
  cols = { default: 1 },
  gap = { default: "gap-4" },
  animated = true,
}: ResponsiveGridProps) {
  const getGridCols = () => {
    const { default: defaultCols, sm, md, lg, xl } = cols;
    
    return cn(
      `grid-cols-${defaultCols}`,
      sm && `sm:grid-cols-${sm}`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`,
      cols["2xl"] && `2xl:grid-cols-${cols["2xl"]}`
    );
  };

  const getGridGap = () => {
    const { default: defaultGap, sm, md, lg, xl } = gap;
    
    return cn(
      defaultGap,
      sm && `sm:${sm}`,
      md && `md:${md}`,
      lg && `lg:${lg}`,
      xl && `xl:${xl}`,
      gap["2xl"] && `2xl:${gap["2xl"]}`
    );
  };

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
    if (React.isValidElement(child) && animated) {
      return React.cloneElement(child as React.ReactElement, {
        // @ts-ignore - adding variants prop
        variants: itemVariants,
      });
    }
    return child;
  });

  return animated ? (
    <motion.div
      className={cn("grid", getGridCols(), getGridGap(), className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={gridVariants}
    >
      {childrenWithVariants}
    </motion.div>
  ) : (
    <div className={cn("grid", getGridCols(), getGridGap(), className)}>
      {children}
    </div>
  );
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
  gap?: {
    default: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
  };
  animated?: boolean;
}

export function ResponsiveStack({
  children,
  className,
  direction = { default: "col" },
  gap = { default: "gap-4" },
  animated = true,
}: ResponsiveStackProps) {
  const getStackDirection = () => {
    const { default: defaultDir, sm, md, lg, xl } = direction;
    
    return cn(
      `flex-${defaultDir}`,
      sm && `sm:flex-${sm}`,
      md && `md:flex-${md}`,
      lg && `lg:flex-${lg}`,
      xl && `xl:flex-${xl}`,
      direction["2xl"] && `2xl:flex-${direction["2xl"]}`
    );
  };

  const getStackGap = () => {
    const { default: defaultGap, sm, md, lg, xl } = gap;
    
    return cn(
      defaultGap,
      sm && `sm:${sm}`,
      md && `md:${md}`,
      lg && `lg:${lg}`,
      xl && `xl:${xl}`,
      gap["2xl"] && `2xl:${gap["2xl"]}`
    );
  };

  const stackVariants = {
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
    hidden: { opacity: 0, y: 10 },
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
    if (React.isValidElement(child) && animated) {
      return React.cloneElement(child as React.ReactElement, {
        // @ts-ignore - adding variants prop
        variants: itemVariants,
      });
    }
    return child;
  });

  return animated ? (
    <motion.div
      className={cn("flex", getStackDirection(), getStackGap(), className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={stackVariants}
    >
      {childrenWithVariants}
    </motion.div>
  ) : (
    <div className={cn("flex", getStackDirection(), getStackGap(), className)}>
      {children}
    </div>
  );
}

interface ResponsiveHideProps {
  children: React.ReactNode;
  className?: string;
  hideOn?: ("xs" | "sm" | "md" | "lg" | "xl" | "2xl")[];
  showOn?: ("xs" | "sm" | "md" | "lg" | "xl" | "2xl")[];
}

export function ResponsiveHide({
  children,
  className,
  hideOn = [],
  showOn = [],
}: ResponsiveHideProps) {
  const getVisibilityClasses = () => {
    const hideClasses = hideOn.map(size => {
      if (size === "xs") return "max-sm:hidden";
      if (size === "sm") return "sm:hidden";
      if (size === "md") return "md:hidden";
      if (size === "lg") return "lg:hidden";
      if (size === "xl") return "xl:hidden";
      if (size === "2xl") return "2xl:hidden";
      return "";
    });

    const showClasses = showOn.map(size => {
      if (size === "xs") return "max-sm:block";
      if (size === "sm") return "sm:block";
      if (size === "md") return "md:block";
      if (size === "lg") return "lg:block";
      if (size === "xl") return "xl:block";
      if (size === "2xl") return "2xl:block";
      return "";
    });

    return [...hideClasses, ...showClasses].join(" ");
  };

  return (
    <div className={cn(getVisibilityClasses(), className)}>
      {children}
    </div>
  );
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
    default: "left" | "center" | "right" | "justify";
    sm?: "left" | "center" | "right" | "justify";
    md?: "left" | "center" | "right" | "justify";
    lg?: "left" | "center" | "right" | "justify";
    xl?: "left" | "center" | "right" | "justify";
    "2xl"?: "left" | "center" | "right" | "justify";
  };
}

export function ResponsiveText({
  children,
  className,
  size = { default: "text-base" },
  align = { default: "left" },
}: ResponsiveTextProps) {
  const getTextSize = () => {
    const { default: defaultSize, sm, md, lg, xl } = size;
    
    return cn(
      defaultSize,
      sm && `sm:${sm}`,
      md && `md:${md}`,
      lg && `lg:${lg}`,
      xl && `xl:${xl}`,
      size["2xl"] && `2xl:${size["2xl"]}`
    );
  };

  const getTextAlign = () => {
    const { default: defaultAlign, sm, md, lg, xl } = align;
    
    return cn(
      `text-${defaultAlign}`,
      sm && `sm:text-${sm}`,
      md && `md:text-${md}`,
      lg && `lg:text-${lg}`,
      xl && `xl:text-${xl}`,
      align["2xl"] && `2xl:text-${align["2xl"]}`
    );
  };

  return (
    <div className={cn(getTextSize(), getTextAlign(), className)}>
      {children}
    </div>
  );
}

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: {
    default: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
  };
  animated?: boolean;
}

export function ResponsiveImage({
  src,
  alt,
  className,
  sizes = { default: "w-full" },
  animated = true,
}: ResponsiveImageProps) {
  const getImageSizes = () => {
    const { default: defaultSize, sm, md, lg, xl } = sizes;
    
    return cn(
      defaultSize,
      sm && `sm:${sm}`,
      md && `md:${md}`,
      lg && `lg:${lg}`,
      xl && `xl:${xl}`,
      sizes["2xl"] && `2xl:${sizes["2xl"]}`
    );
  };

  return animated ? (
    <motion.img
      src={src}
      alt={alt}
      className={cn(getImageSizes(), className)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    />
  ) : (
    <img
      src={src}
      alt={alt}
      className={cn(getImageSizes(), className)}
    />
  );
}
