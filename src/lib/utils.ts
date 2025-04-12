import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts initials from a user's name
 * @param name The full name to extract initials from
 * @returns Up to two characters representing the initials
 */
export function getInitials(name: string): string {
  if (!name) return "";
  
  const parts = name.split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Generates a consistent color based on a string input
 * @param input String to generate color from (usually a name)
 * @returns A HSL color string
 */
export function generateAvatarColor(input: string): string {
  if (!input) return "hsl(var(--primary))";
  
  // Simple hash function to generate a number from a string
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert hash to HSL color
  // Use modulo to get a value between 0-360 for hue
  const h = Math.abs(hash % 360);
  // Fixed saturation and lightness for consistent, readable colors
  const s = 70;
  const l = 60;
  
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Converts a hex color to RGB values
 * @param hex Hex color string (e.g., "#ff0000")
 * @returns RGB values as {r, g, b}
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return { r, g, b };
}
