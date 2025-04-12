"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
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
    
    const handleMouseMove = (e: MouseEvent): void => {
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
              </motion.div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <ChevronDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
              >
                Powerful Features
              </motion.h2>
              <motion.p 
                className="mt-4 text-muted-foreground md:text-xl max-w-[700px] mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.1
                }}
              >
                Everything you need to streamline your development workflow
              </motion.p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "AI-Powered Assistance",
                  description: "Get intelligent suggestions and automate repetitive tasks with our AI assistant.",
                  icon: Cpu,
                  color: "bg-primary/10 text-primary"
                },
                {
                  title: "Component Catalog",
                  description: "Discover, share, and reuse components across your organization.",
                  icon: Database,
                  color: "bg-accent/10 text-accent"
                },
                {
                  title: "Workspace Management",
                  description: "Organize your projects and collaborate with your team in dedicated workspaces.",
                  icon: Users,
                  color: "bg-success/10 text-success"
                },
                {
                  title: "Integrated Analytics",
                  description: "Track performance metrics and gain insights into your development process.",
                  icon: BarChart3,
                  color: "bg-warning/10 text-warning"
                },
                {
                  title: "Code Generation",
                  description: "Generate boilerplate code and accelerate your development workflow.",
                  icon: Code,
                  color: "bg-info/10 text-info"
                },
                {
                  title: "Security Compliance",
                  description: "Ensure your code meets security standards with automated checks.",
                  icon: Shield,
                  color: "bg-destructive/10 text-destructive"
                }
              ].map((feature, i) => (
                <motion.div 
                  key={feature.title}
                  className="relative overflow-hidden rounded-lg border bg-background p-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.1 * i
                  }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                  Accelerate Your Development
                </h2>
                <p className="text-muted-foreground md:text-xl mb-8">
                  Our platform helps you build faster, collaborate better, and deliver higher quality software.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Reduce development time by up to 40%",
                    "Improve code quality and consistency",
                    "Enhance team collaboration and knowledge sharing",
                    "Streamline onboarding for new team members"
                  ].map((benefit, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p>{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.2
                }}
              >
                <div className="relative aspect-video overflow-hidden rounded-xl border shadow-xl bg-background">
                  {/* 3D AI Visualization */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="relative w-48 h-48"
                      animate={{ 
                        rotate: 360
                      }}
                      transition={{ 
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 rounded-full bg-primary/70"
                          style={{ 
                            left: "50%",
                            top: "50%",
                            transform: `rotate(${i * 45}deg) translateY(-80px) translateX(-50%)`,
                          }}
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            repeatType: "reverse"
                          }}
                        />
                      ))}
                      
                      <motion.div
                        className="absolute left-1/2 top-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 flex items-center justify-center"
                        animate={{ 
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <motion.div
                          className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center"
                          animate={{ 
                            scale: [1, 1.15, 1],
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 0.5
                          }}
                        >
                          <motion.div
                            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white"
                            animate={{ 
                              scale: [1, 1.2, 1],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse",
                              delay: 1
                            }}
                          >
                            <Cpu className="h-5 w-5" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Floating icons */}
                  {[Code, Database, BarChart3, Shield].map((Icon, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-10 h-10 rounded-full bg-background shadow-lg flex items-center justify-center"
                      style={{ 
                        left: `${20 + (i * 20)}%`,
                        top: `${20 + ((i % 2) * 50)}%`,
                      }}
                      animate={{ 
                        y: [0, -10, 0],
                      }}
                      transition={{ 
                        duration: 3 + i,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.5
                      }}
                    >
                      <Icon className="h-5 w-5 text-primary" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
