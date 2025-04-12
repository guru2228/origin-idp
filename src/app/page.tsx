"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div className="flex flex-col min-h-screen" onMouseMove={handleMouseMove}>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                    Origin
                  </span>{" "}
                  AI-powered Internal Developer Platform
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-xl text-muted-foreground md:text-2xl max-w-[600px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Accelerate development, streamline workflows, and enhance collaboration with our comprehensive platform.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/auth/login">
                  <motion.button 
                    className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </Link>
                <Link href="#features">
                  <motion.button 
                    className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-lg font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="relative h-[400px] lg:h-[500px] perspective-1000"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {/* 3D Platform Mockup */}
                <motion.div 
                  className="w-full h-full max-w-[500px] rounded-xl bg-card border shadow-2xl overflow-hidden"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${(mousePosition.x - window.innerWidth / 2) / 50}deg) rotateX(${-(mousePosition.y - window.innerHeight / 2) / 50}deg)`,
                  }}
                >
                  {/* Platform UI */}
                  <div className="w-full h-full bg-background p-4">
                    <div className="h-8 bg-muted rounded-md mb-4 flex items-center px-4">
                      <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-warning mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-success"></div>
                      <div className="ml-4 h-4 w-40 bg-muted-foreground/20 rounded"></div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 h-[calc(100%-2rem)]">
                      <div className="col-span-1 bg-muted rounded-md p-3">
                        <div className="h-4 w-20 bg-muted-foreground/20 rounded mb-4"></div>
                        <div className="space-y-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div 
                              key={i}
                              className="h-8 bg-muted-foreground/10 rounded"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.5 + (i * 0.1) }}
                            ></motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="col-span-3 bg-card rounded-md p-3">
                        <div className="h-8 bg-muted rounded-md mb-4 flex items-center px-4">
                          <div className="h-4 w-32 bg-muted-foreground/20 rounded"></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div 
                              key={i}
                              className="h-24 bg-muted rounded-md"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.7 + (i * 0.1) }}
                            ></motion.div>
                          ))}
                        </div>
                        
                        <motion.div 
                          className="h-40 bg-muted rounded-md"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"
                  animate={{ 
                    y: [0, 15, 0],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                ></motion.div>
                
                <motion.div 
                  className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl"
                  animate={{ 
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                ></motion.div>
                
                {/* Floating UI Elements */}
                <motion.div 
                  className="absolute -right-20 top-1/4 w-16 h-16 bg-card rounded-lg shadow-lg border flex items-center justify-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ 
                    delay: 1,
                    duration: 5, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -left-16 bottom-1/3 w-20 h-12 bg-card rounded-lg shadow-lg border p-2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [0, 10, 0],
                    rotate: [0, -3, 0],
                  }}
                  transition={{ 
                    delay: 1.2,
                    duration: 6, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >
                  <div className="h-2 w-12 bg-muted-foreground/20 rounded mb-1"></div>
                  <div className="h-2 w-8 bg-muted-foreground/20 rounded"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02]"></div>
          
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
          
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <motion.div 
              className="w-1 h-2 bg-muted-foreground rounded-full mt-2"
              animate={{ 
                y: [0, 4, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            ></motion.div>
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
              Powerful Features for Modern Development
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
              Everything you need to accelerate your development workflow
            </motion.p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[
              {
                title: "AI-Powered Assistance",
                description: "Leverage advanced AI to generate code, troubleshoot issues, and optimize your workflow.",
                icon: "🤖"
              },
              {
                title: "Component Catalog",
                description: "Access a rich library of reusable components to accelerate your development process.",
                icon: "🧩"
              },
              {
                title: "Integrated CI/CD",
                description: "Seamlessly build, test, and deploy your applications with automated pipelines.",
                icon: "🚀"
              },
              {
                title: "Collaborative Workspaces",
                description: "Work together in real-time with your team on shared projects and resources.",
                icon: "👥"
              },
              {
                title: "Comprehensive Analytics",
                description: "Gain insights into your development process with detailed metrics and reports.",
                icon: "📊"
              },
              {
                title: "Security & Compliance",
                description: "Ensure your code meets industry standards with built-in security scanning.",
                icon: "🔒"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all duration-300"
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
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Accelerate Your Development Workflow
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Origin IDP streamlines your development process, allowing your team to focus on what matters most: building great software.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "40% Faster Development",
                    description: "Reduce time-to-market with streamlined workflows and AI assistance."
                  },
                  {
                    title: "30% Fewer Bugs",
                    description: "Improve code quality with automated testing and AI-powered code reviews."
                  },
                  {
                    title: "50% Better Collaboration",
                    description: "Enhance team productivity with integrated communication and sharing tools."
                  }
                ].map((benefit, i) => (
                  <motion.div 
                    key={i}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="relative h-[400px] lg:h-[500px]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {/* 3D AI Visualization */}
                <motion.div 
                  className="relative w-full h-full max-w-[500px] rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden"
                  animate={{ 
                    boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 20px 50px rgba(0,0,0,0.1)", "0px 0px 0px rgba(0,0,0,0)"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Animated background elements */}
                    <motion.div 
                      className="absolute w-full h-full"
                      animate={{ 
                        background: [
                          "radial-gradient(circle at 30% 30%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
                          "radial-gradient(circle at 70% 70%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
                          "radial-gradient(circle at 30% 70%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
                          "radial-gradient(circle at 70% 30%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
                          "radial-gradient(circle at 30% 30%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
                        ]
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                    
                    {/* Floating nodes */}
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-4 h-4 rounded-full bg-primary/30"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{ 
                          x: [
                            Math.random() * 50 - 25,
                            Math.random() * 50 - 25,
                            Math.random() * 50 - 25,
                          ],
                          y: [
                            Math.random() * 50 - 25,
                            Math.random() * 50 - 25,
                            Math.random() * 50 - 25,
                          ],
                          opacity: [0.3, 0.7, 0.3],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 10 + (i * 2),
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    ))}
                    
                    {/* Connection lines would be drawn with SVG or Canvas in a real implementation */}
                    
                    {/* Central AI icon */}
                    <motion.div 
                      className="relative z-10 bg-background rounded-full p-6 shadow-lg"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0px 0px 0px rgba(0,0,0,0.1)",
                          "0px 0px 30px rgba(var(--primary-rgb), 0.3)",
                          "0px 0px 0px rgba(0,0,0,0.1)"
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <span className="text-5xl">🧠</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
