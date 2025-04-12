"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Database, BarChart3, Cpu, Shield, ChevronDown, Star, Users, Zap } from "lucide-react";

import "./styles/hover-links.css";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const springHeroY = useSpring(heroY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const calculateMouseTransform = (depth = 1) => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    const moveX = (mousePosition.x - centerX) / 50 * depth;
    const moveY = (mousePosition.y - centerY) / 50 * depth;
    return { x: moveX, y: moveY };
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-40 w-full border-b backdrop-blur" 
        style={{ backgroundColor: 'hsla(var(--background), 0.95)', backdropFilter: 'blur(4px)' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div 
              className="h-8 w-8 rounded-md flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: 'hsl(var(--primary))' }}
              whileHover={{ 
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              >
                <Zap className="h-5 w-5 text-white" />
              </motion.div>
            </motion.div>
            <motion.span 
              className="font-bold text-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Origin
            </motion.span>
          </motion.div>
          <nav className="hidden md:flex gap-6">
            {["Features", "Benefits", "Testimonials"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
              >
                <Link href={`#${item.toLowerCase()}`} className="text-sm font-medium hover-link">
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/auth/login">
                <Button variant="outline" className="relative overflow-hidden group">
                  <motion.span
                    className="absolute inset-0 bg-primary/10 rounded-md"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  Log in
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/auth/login">
                <Button className="relative overflow-hidden group">
                  <motion.span
                    className="absolute inset-0 bg-white/20 rounded-md"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative py-20 md:py-32 overflow-hidden" 
          style={{ background: 'linear-gradient(to bottom, hsl(var(--background)), hsl(var(--muted)))' }}
        >
          {/* Animated background elements */}
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/10"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ 
                  scale: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                  y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                }}
                transition={{ 
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.2
                  }}
                >
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    AI-Powered Internal Developer Platform
                  </h1>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.4
                  }}
                >
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Streamline your development workflow with our AI-powered platform. Manage workspaces, catalog components, and leverage AI to accelerate your development process.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.6
                  }}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Link href="/auth/login">
                    <Button size="lg" className="gap-1.5 relative overflow-hidden group">
                      <motion.span
                        className="absolute inset-0 bg-white/20 rounded-md"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      Get Started
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="relative overflow-hidden group">
                      <motion.span
                        className="absolute inset-0 bg-primary/10 rounded-md"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="pt-8 flex items-center gap-4"
                >
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-background"
                        style={{ 
                          backgroundColor: `hsl(${i * 60}, 70%, 60%)`,
                          zIndex: 4 - i
                        }}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.2 + (i * 0.1), duration: 0.3 }}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6, duration: 0.5 }}
                    >
                      Trusted by <span className="font-medium">2,000+</span> developers
                    </motion.span>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                style={{ y: springHeroY, opacity: heroOpacity }}
                className="mx-auto w-full max-w-[500px] lg:max-w-none perspective-1000"
              >
                <motion.div
                  className="relative aspect-video overflow-hidden rounded-xl border shadow-xl"
                  style={{ 
                    backgroundColor: 'hsl(var(--background))',
                    transformStyle: "preserve-3d",
                    ...calculateMouseTransform(0.5)
                  }}
                  initial={{ opacity: 0, scale: 0.8, rotateX: 10, rotateY: -10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotateX: 0,
                    rotateY: 0,
                    ...calculateMouseTransform(0.5)
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                    delay: 0.8
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  {/* 3D Platform UI Mockup */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
                  
                  {/* Header bar */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-muted/50 flex items-center px-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                  </div>
                  
                  {/* Sidebar */}
                  <div className="absolute top-8 left-0 bottom-0 w-16 bg-muted/30 border-r border-border/50">
                    {[Cpu, Database, Code, BarChart3, Users].map((Icon, i) => (
                      <motion.div 
                        key={i}
                        className="w-full h-12 flex items-center justify-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + (i * 0.1) }}
                      >
                        <Icon className="h-5 w-5 text-primary/70" />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Main content */}
                  <div className="absolute top-8 left-16 right-0 bottom-0 p-4">
                    <motion.div 
                      className="w-full h-8 bg-muted/40 rounded-md mb-3"
                      initial={{ width: 0 }}
                      animate={{ width: "70%" }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className="aspect-video bg-primary/10 rounded-md flex items-center justify-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.3 + (i * 0.1) }}
                        >
                          <motion.div 
                            className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                            animate={{ 
                              scale: [1, 1.1, 1],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop",
                              delay: i * 0.5
                            }}
                          >
                            <Star className="h-4 w-4 text-primary" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating elements around the UI */}
                <motion.div
                  className="absolute -top-6 -right-6 bg-primary/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg"
                  initial={{ opacity: 0, y: 20, rotate: 5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 1.5, type: "spring" }}
                  style={{ ...calculateMouseTransform(1.2) }}
                >
                  AI-Powered
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg flex items-center gap-1.5"
                  initial={{ opacity: 0, y: -20, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 1.6, type: "spring" }}
                  style={{ ...calculateMouseTransform(1.5) }}
                >
                  <Star className="h-4 w-4 text-yellow-500" />
                  Developer Friendly
                </motion.div>
              </motion.div>
            </div>
            
            {/* Scroll indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <motion.p 
                className="text-sm text-muted-foreground mb-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll to explore
              </motion.p>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20" style={{ backgroundColor: 'hsl(var(--background))' }}>
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <motion.h2 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Powerful Features
              </motion.h2>
              <motion.p 
                className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Everything you need to manage your development workflow in one place.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg"
              >
                <motion.div 
                  className="p-3 rounded-full" 
                  style={{ backgroundColor: 'hsla(var(--primary), 0.1)' }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'hsla(var(--primary), 0.2)' 
                  }}
                >
                  <Database className="h-6 w-6" style={{ color: 'hsl(var(--primary))' }} />
                </motion.div>
                <h3 className="text-xl font-bold">Platform Catalog</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage your components, systems, domains, and APIs in a centralized catalog.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg"
              >
                <motion.div 
                  className="p-3 rounded-full" 
                  style={{ backgroundColor: 'hsla(var(--primary), 0.1)' }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'hsla(var(--primary), 0.2)' 
                  }}
                >
                  <Cpu className="h-6 w-6" style={{ color: 'hsl(var(--primary))' }} />
                </motion.div>
                <h3 className="text-xl font-bold">AI Studio</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Build and deploy AI agents, RAG pipelines, and vector stores with ease.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg"
              >
                <motion.div 
                  className="p-3 rounded-full" 
                  style={{ backgroundColor: 'hsla(var(--primary), 0.1)' }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'hsla(var(--primary), 0.2)' 
                  }}
                >
                  <Code className="h-6 w-6" style={{ color: 'hsl(var(--primary))' }} />
                </motion.div>
                <h3 className="text-xl font-bold">Spectrum AI SDLC</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Accelerate your development lifecycle with AI-powered tools for planning, coding, and testing.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg"
              >
                <motion.div 
                  className="p-3 rounded-full" 
                  style={{ backgroundColor: 'hsla(var(--primary), 0.1)' }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'hsla(var(--primary), 0.2)' 
                  }}
                >
                  <BarChart3 className="h-6 w-6" style={{ color: 'hsl(var(--primary))' }} />
                </motion.div>
                <h3 className="text-xl font-bold">Engineering Metrics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Track and visualize key engineering metrics to improve team performance.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg"
              >
                <motion.div 
                  className="p-3 rounded-full" 
                  style={{ backgroundColor: 'hsla(var(--primary), 0.1)' }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'hsla(var(--primary), 0.2)' 
                  }}
                >
                  <Shield className="h-6 w-6" style={{ color: 'hsl(var(--primary))' }} />
                </motion.div>
                <h3 className="text-xl font-bold">Multi-Tenant Security</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Secure your platform with role-based access control and tenant isolation.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--muted))' }}>
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/5"
                style={{
                  width: `${Math.random() * 500 + 200}px`,
                  height: `${Math.random() * 500 + 200}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  x: [0, Math.random() * 50 - 25, 0],
                  y: [0, Math.random() * 50 - 25, 0],
                }}
                transition={{ 
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center space-y-4 mb-12">
              <motion.h2 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Why Choose Origin
              </motion.h2>
              <motion.p 
                className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Transform your development workflow with our AI-powered platform.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-6"
              >
                {[
                  {
                    title: "Increased Developer Productivity",
                    description: "Streamline workflows and reduce context switching with our integrated platform."
                  },
                  {
                    title: "Accelerated Development Cycles",
                    description: "Leverage AI to automate repetitive tasks and accelerate your development cycles."
                  },
                  {
                    title: "Improved Collaboration",
                    description: "Foster collaboration between teams with shared workspaces and knowledge bases."
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    whileHover={{ x: 5 }}
                  >
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mx-auto w-full max-w-[500px] lg:max-w-none perspective-1000"
              >
                <motion.div 
                  className="aspect-square overflow-hidden rounded-xl border shadow-xl relative"
                  style={{ 
                    backgroundColor: 'hsl(var(--background))',
                    transformStyle: "preserve-3d"
                  }}
                  whileHover={{ 
                    rotateY: 5,
                    rotateX: -5,
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="relative"
                    >
                      <motion.div 
                        className="absolute -inset-4 rounded-full bg-primary/10"
                        animate={{ 
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      />
                      <motion.div 
                        className="text-5xl md:text-6xl font-bold text-primary"
                        animate={{ 
                          rotateY: [0, 360],
                        }}
                        transition={{ 
                          duration: 20,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear"
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        AI
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Floating elements */}
                  {[
                    { icon: Code, position: "top-10 left-10", delay: 0.5 },
                    { icon: Database, position: "top-10 right-10", delay: 0.7 },
                    { icon: Cpu, position: "bottom-10 left-10", delay: 0.9 },
                    { icon: BarChart3, position: "bottom-10 right-10", delay: 1.1 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className={`absolute ${item.position} p-3 rounded-full bg-background/80 backdrop-blur shadow-lg`}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: item.delay, type: "spring" }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <item.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--background))' }}>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <motion.h2 
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Ready to Transform Your Development Workflow?
                </motion.h2>
                <motion.p 
                  className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Get started with Origin today and experience the power of AI-driven development.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-2 min-[400px]:flex-row"
              >
                <Link href="/auth/login">
                  <Button size="lg" className="gap-1.5 relative overflow-hidden group">
                    <motion.span
                      className="absolute inset-0 bg-white/20 rounded-md"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    Get Started
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="relative overflow-hidden group">
                    <motion.span
                      className="absolute inset-0 bg-primary/10 rounded-md"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Background animation */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              className="absolute -bottom-1/2 left-1/2 transform -translate-x-1/2 w-[200%] aspect-square rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(var(--primary), 0.05) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="border-t py-6 md:py-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 Origin. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Terms", "Privacy", "Contact"].map((item, i) => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="#" className="text-sm font-medium hover-link">
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
