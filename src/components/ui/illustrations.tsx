"use client";

import React from "react";
import { motion } from "framer-motion";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  secondaryColor?: string;
  animate?: boolean;
}

export const DevelopmentIllustration: React.FC<IllustrationProps> = ({
  className,
  width = 300,
  height = 200,
  color = "hsl(var(--primary))",
  secondaryColor = "hsl(var(--muted))",
  animate = true,
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const codeLineVariants = {
    hidden: { width: 0 },
    visible: (i: number) => ({
      width: "100%",
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  const floatVariants = {
    initial: { y: 0 },
    float: { y: [-5, 5, -5], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    pulse: { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
  };

  const rotateVariants = {
    initial: { rotate: 0 },
    rotate: { rotate: 360, transition: { duration: 20, repeat: Infinity, ease: "linear" } },
  };

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {/* Background elements */}
      <motion.circle
        cx="150"
        cy="100"
        r="80"
        fill={`${secondaryColor}20`}
        initial="initial"
        animate={animate ? "pulse" : "initial"}
        variants={pulseVariants}
      />
      
      <motion.path
        d="M50,100 Q150,30 250,100"
        stroke={`${color}40`}
        strokeWidth="2"
        fill="none"
        initial="initial"
        animate={animate ? "float" : "initial"}
        variants={floatVariants}
      />
      
      {/* Code editor */}
      <motion.rect
        x="70"
        y="60"
        width="160"
        height="120"
        rx="6"
        fill={secondaryColor}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <motion.rect
        x="70"
        y="60"
        width="160"
        height="20"
        rx="6"
        fill={color}
        initial={{ width: 0 }}
        animate={{ width: 160 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      
      {/* Window controls */}
      <motion.circle cx="80" cy="70" r="3" fill="#FF5F57" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />
      <motion.circle cx="90" cy="70" r="3" fill="#FFBD2E" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} />
      <motion.circle cx="100" cy="70" r="3" fill="#28CA42" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} />
      
      {/* Code lines */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <motion.rect
          key={i}
          x="80"
          y={90 + i * 10}
          width={Math.random() * 60 + 60}
          height="4"
          rx="2"
          fill={`${color}${70 - i * 10}`}
          custom={i}
          variants={codeLineVariants}
        />
      ))}
      
      {/* Floating elements */}
      <motion.g
        initial="initial"
        animate={animate ? "float" : "initial"}
        variants={floatVariants}
      >
        <motion.circle cx="50" cy="50" r="10" fill={`${color}60`} />
        <motion.circle cx="250" cy="150" r="15" fill={`${color}40`} />
        <motion.rect x="230" cy="50" width="20" height="20" rx="4" fill={`${color}50`} />
      </motion.g>
      
      {/* Rotating gear */}
      <motion.g
        initial="initial"
        animate={animate ? "rotate" : "initial"}
        variants={rotateVariants}
        style={{ originX: "40px", originY: "150px" }}
      >
        <path
          d="M40,140 L45,135 L50,140 L45,145 Z M40,150 L35,155 L40,160 L45,155 Z M30,150 L25,145 L30,140 L35,145 Z M50,150 L55,145 L50,140 L45,145 Z"
          fill={color}
        />
        <circle cx="40" cy="150" r="5" fill={secondaryColor} />
      </motion.g>
      
      {/* AI element */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <circle cx="240" cy="60" r="15" fill={`${color}70`} />
        <text x="240" y="65" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">AI</text>
      </motion.g>
    </motion.svg>
  );
};

export const AnalyticsIllustration: React.FC<IllustrationProps> = ({
  className,
  width = 300,
  height = 200,
  color = "hsl(var(--primary))",
  secondaryColor = "hsl(var(--muted))",
  animate = true,
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const barVariants = {
    hidden: { height: 0 },
    visible: (i: number) => ({
      height: [0, 30 + Math.random() * 50],
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        delay: 0.5,
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    pulse: { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
  };

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {/* Background elements */}
      <motion.circle
        cx="150"
        cy="100"
        r="80"
        fill={`${secondaryColor}20`}
        initial="initial"
        animate={animate ? "pulse" : "initial"}
        variants={pulseVariants}
      />
      
      {/* Chart background */}
      <motion.rect
        x="50"
        y="50"
        width="200"
        height="120"
        rx="6"
        fill={secondaryColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* X and Y axis */}
      <motion.path
        d="M60,150 L250,150 M60,150 L60,60"
        stroke={color}
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Bar chart */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <motion.rect
          key={i}
          x={70 + i * 22}
          y={150}
          width="15"
          height={0}
          fill={`${color}${90 - i * 5}`}
          custom={i}
          variants={barVariants}
          style={{ originY: "100%" }}
        />
      ))}
      
      {/* Line chart */}
      <motion.path
        d="M60,120 C100,100 130,130 160,90 S220,70 250,100"
        stroke={`${color}80`}
        strokeWidth="3"
        fill="none"
        variants={lineVariants}
      />
      
      {/* Data points */}
      {[
        { x: 60, y: 120 },
        { x: 100, y: 100 },
        { x: 130, y: 130 },
        { x: 160, y: 90 },
        { x: 190, y: 80 },
        { x: 220, y: 70 },
        { x: 250, y: 100 },
      ].map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="5"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
        />
      ))}
      
      {/* Floating elements */}
      <motion.g
        initial={{ y: 0 }}
        animate={animate ? { y: [-5, 5, -5] } : { y: 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.circle cx="40" cy="40" r="10" fill={`${color}60`} />
        <motion.circle cx="260" cy="40" r="15" fill={`${color}40`} />
        <motion.rect x="250" cy="160" width="20" height="20" rx="4" fill={`${color}50`} />
      </motion.g>
      
      {/* Stats indicator */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <rect x="180" y="70" width="50" height="25" rx="4" fill="white" />
        <text x="205" y="87" textAnchor="middle" fontSize="12" fill={color} fontWeight="bold">+42%</text>
      </motion.g>
    </motion.svg>
  );
};

export const CollaborationIllustration: React.FC<IllustrationProps> = ({
  className,
  width = 300,
  height = 200,
  color = "hsl(var(--primary))",
  secondaryColor = "hsl(var(--muted))",
  animate = true,
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const floatVariants = {
    initial: { y: 0 },
    float: (i: number) => ({
      y: [-5, 5, -5],
      transition: {
        delay: i * 0.2,
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    pulse: { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
  };

  const connectionVariants = {
    hidden: { pathLength: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      transition: {
        delay: 0.5 + i * 0.2,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {/* Background elements */}
      <motion.circle
        cx="150"
        cy="100"
        r="80"
        fill={`${secondaryColor}20`}
        initial="initial"
        animate={animate ? "pulse" : "initial"}
        variants={pulseVariants}
      />
      
      {/* Connection lines */}
      <motion.path
        d="M100,100 L150,60"
        stroke={`${color}60`}
        strokeWidth="2"
        strokeDasharray="1"
        custom={0}
        variants={connectionVariants}
      />
      <motion.path
        d="M100,100 L150,140"
        stroke={`${color}60`}
        strokeWidth="2"
        strokeDasharray="1"
        custom={1}
        variants={connectionVariants}
      />
      <motion.path
        d="M150,60 L200,100"
        stroke={`${color}60`}
        strokeWidth="2"
        strokeDasharray="1"
        custom={2}
        variants={connectionVariants}
      />
      <motion.path
        d="M150,140 L200,100"
        stroke={`${color}60`}
        strokeWidth="2"
        strokeDasharray="1"
        custom={3}
        variants={connectionVariants}
      />
      <motion.path
        d="M150,60 L150,140"
        stroke={`${color}60`}
        strokeWidth="2"
        strokeDasharray="1"
        custom={4}
        variants={connectionVariants}
      />
      
      {/* People nodes */}
      {[
        { x: 100, y: 100, label: "Dev" },
        { x: 150, y: 60, label: "PM" },
        { x: 200, y: 100, label: "QA" },
        { x: 150, y: 140, label: "UX" },
      ].map((node, i) => (
        <motion.g
          key={i}
          custom={i}
          initial="initial"
          animate={animate ? "float" : "initial"}
          variants={floatVariants}
        >
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="20"
            fill={`${color}${80 - i * 10}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 * i, duration: 0.5, type: "spring" }}
          />
          <motion.text
            x={node.x}
            y={node.y + 5}
            textAnchor="middle"
            fontSize="10"
            fill="white"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 * i + 0.3 }}
          >
            {node.label}
          </motion.text>
        </motion.g>
      ))}
      
      {/* Central node */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
      >
        <motion.circle
          cx="150"
          cy="100"
          r="25"
          fill={color}
          animate={animate ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.text
          x="150"
          y="105"
          textAnchor="middle"
          fontSize="12"
          fill="white"
          fontWeight="bold"
        >
          Team
        </motion.text>
      </motion.g>
      
      {/* Floating elements */}
      <motion.g
        initial={{ y: 0 }}
        animate={animate ? { y: [-8, 8, -8] } : { y: 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.circle cx="50" cy="50" r="10" fill={`${color}40`} />
        <motion.circle cx="250" cy="150" r="15" fill={`${color}30`} />
        <motion.rect x="240" cy="40" width="20" height="20" rx="4" fill={`${color}20`} />
      </motion.g>
      
      {/* Data flow animation */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          cx={0}
          cy={0}
          r="3"
          fill="white"
          initial={{ pathOffset: i * 0.2, pathLength: 0 }}
          animate={animate ? {
            pathOffset: [i * 0.2, i * 0.2 + 1],
            opacity: [0, 1, 0],
          } : {}}
          transition={{
            pathOffset: { duration: 3, repeat: Infinity, ease: "linear" },
            opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 },
          }}
          style={{
            offsetPath: "path('M100,100 C125,80 175,80 200,100')",
          }}
        />
      ))}
    </motion.svg>
  );
};

export const SecurityIllustration: React.FC<IllustrationProps> = ({
  className,
  width = 300,
  height = 200,
  color = "hsl(var(--primary))",
  secondaryColor = "hsl(var(--muted))",
  animate = true,
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    pulse: { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
  };

  const shieldVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.3,
      },
    },
  };

  const scanVariants = {
    hidden: { y: 0, opacity: 0 },
    visible: {
      y: [0, 80, 0],
      opacity: [0, 1, 0],
      transition: {
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 },
        opacity: { duration: 1, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 },
      },
    },
  };

  const lockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {/* Background elements */}
      <motion.circle
        cx="150"
        cy="100"
        r="80"
        fill={`${secondaryColor}20`}
        initial="initial"
        animate={animate ? "pulse" : "initial"}
        variants={pulseVariants}
      />
      
      {/* Shield */}
      <motion.path
        d="M150,40 C180,60 220,60 250,40 V100 C250,140 200,170 150,180 C100,170 50,140 50,100 V40 C80,60 120,60 150,40 Z"
        fill={`${color}20`}
        stroke={color}
        strokeWidth="2"
        variants={shieldVariants}
      />
      
      {/* Lock */}
      <motion.g variants={lockVariants}>
        <rect x="130" y="90" width="40" height="30" rx="4" fill={color} />
        <path
          d="M135,90 V80 C135,70 140,60 150,60 C160,60 165,70 165,80 V90"
          stroke={color}
          strokeWidth="5"
          fill="none"
        />
        <circle cx="150" cy="105" r="5" fill="white" />
        <rect x="148" y="105" width="4" height="8" fill="white" />
      </motion.g>
      
      {/* Scanning effect */}
      <motion.rect
        x="60"
        y="60"
        width="180"
        height="4"
        fill={`${color}60`}
        variants={animate ? scanVariants : {}}
      />
      
      {/* Binary data */}
      {[...Array(20)].map((_, i) => (
        <motion.text
          key={i}
          x={60 + (i % 10) * 18}
          y={50 + Math.floor(i / 10) * 15}
          fontSize="8"
          fill={`${color}80`}
          initial={{ opacity: 0 }}
          animate={{ opacity: Math.random() > 0.5 ? 1 : 0.3 }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </motion.text>
      ))}
      
      {/* Floating elements */}
      <motion.g
        initial={{ y: 0 }}
        animate={animate ? { y: [-5, 5, -5] } : { y: 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.circle cx="60" cy="40" r="10" fill={`${color}40`} />
        <motion.circle cx="240" cy="160" r="15" fill={`${color}30`} />
        <motion.rect x="230" cy="50" width="20" height="20" rx="4" fill={`${color}20`} />
      </motion.g>
      
      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="150"
          cy="100"
          r="40"
          stroke={color}
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={animate ? {
            scale: [0.8, 1.5],
            opacity: [0.8, 0],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.svg>
  );
};
