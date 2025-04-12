import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  hoverScale?: number;
  rotateIntensity?: number;
  shadowIntensity?: number;
  glareIntensity?: number;
  borderRadius?: string;
  perspective?: number;
}

export function AnimatedCard({
  children,
  className,
  depth = 1,
  hoverScale = 1.05,
  rotateIntensity = 15,
  shadowIntensity = 0.5,
  glareIntensity = 0.2,
  borderRadius = "1rem",
  perspective = 1000,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // We're not using these variables directly in JSX, but they're needed for the animation system
  // to work correctly with the useSpring hook
  useSpring(x, { stiffness: 150, damping: 20 });
  useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(y, [-300, 300], [rotateIntensity, -rotateIntensity]);
  const rotateY = useTransform(x, [-300, 300], [-rotateIntensity, rotateIntensity]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setMousePosition({ x: mouseX, y: mouseY });
    x.set(mouseX);
    y.set(mouseY);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };
  
  const glarePosition = {
    x: mousePosition.x / (cardRef.current?.offsetWidth || 1) * 100,
    y: mousePosition.y / (cardRef.current?.offsetHeight || 1) * 100,
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      style={{
        perspective: `${perspective}px`,
        borderRadius,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: hoverScale }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: isHovered 
            ? `0 ${10 * shadowIntensity}px ${20 * shadowIntensity}px rgba(0, 0, 0, ${0.1 * shadowIntensity})` 
            : "none",
        }}
      >
        {children}
        
        {/* Glare effect */}
        {glareIntensity > 0 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isHovered 
                ? `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glareIntensity}), transparent 80%)` 
                : "none",
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
