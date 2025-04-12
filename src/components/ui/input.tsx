"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  animated?: boolean;
  variant?: "default" | "filled" | "outline" | "ghost";
}

export function Input({
  className,
  type,
  label,
  error,
  icon,
  iconPosition = "left",
  animated = true,
  variant = "default",
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    props.onBlur?.(e);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);
  };
  
  const getVariantClasses = () => {
    switch (variant) {
      case "filled":
        return "bg-muted border-transparent focus-within:bg-background";
      case "outline":
        return "bg-transparent border-input";
      case "ghost":
        return "bg-transparent border-transparent";
      default:
        return "bg-background border-input";
    }
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      
      <div
        className={cn(
          "relative flex items-center rounded-md border shadow-sm transition-colors",
          getVariantClasses(),
          error ? "border-destructive" : "focus-within:border-primary",
          props.disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {icon && iconPosition === "left" && (
          <div className="flex h-full items-center px-3 text-muted-foreground">
            {icon}
          </div>
        )}
        
        <div className="relative flex-1">
          {animated && label && (
            <motion.label
              className="absolute left-3 text-muted-foreground pointer-events-none"
              initial={false}
              animate={{
                top: isFocused || hasValue ? -8 : 14,
                left: isFocused || hasValue ? 0 : 3,
                scale: isFocused || hasValue ? 0.8 : 1,
                color: isFocused ? "var(--primary)" : "var(--muted-foreground)",
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.label>
          )}
          
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              icon && iconPosition === "left" && "pl-0",
              icon && iconPosition === "right" && "pr-0",
              animated && label && "pt-2"
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
        </div>
        
        {icon && iconPosition === "right" && (
          <div className="flex h-full items-center px-3 text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <motion.p
          className="text-sm text-destructive"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
