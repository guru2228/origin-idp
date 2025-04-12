import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 3D transform utility functions
export function create3DTransform(x = 0, y = 0, z = 0, rotateX = 0, rotateY = 0) {
  return `perspective(1000px) translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

export function calculateMouseTransform(mouseX: number, mouseY: number, rect: DOMRect, depth = 1) {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const moveX = (mouseX - centerX) / 50 * depth;
  const moveY = (mouseY - centerY) / 50 * depth;
  return { x: moveX, y: moveY };
}

// Animation utility functions
export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1
};

export const easingTransition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.5
};

// Color utility functions
export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hexToHSL(hex: string) {
  // Remove the # if it exists
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Find the min and max values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Calculate lightness
  let l = (max + min) / 2;
  
  let h = 0;
  let s = 0;
  
  if (max !== min) {
    // Calculate saturation
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    
    // Calculate hue
    if (max === r) {
      h = ((g - b) / (max - min)) + (g < b ? 6 : 0);
    } else if (max === g) {
      h = ((b - r) / (max - min)) + 2;
    } else {
      h = ((r - g) / (max - min)) + 4;
    }
    
    h = h * 60;
  }
  
  // Convert to percentages
  s = s * 100;
  l = l * 100;
  
  return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
}

// Responsive utility functions
export function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function isTablet() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isDesktop() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
}
