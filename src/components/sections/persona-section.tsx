"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedCard, AnimatedCardContent, AnimatedCardBackground } from "@/components/ui/animated-card";
import { Users, Code, Database, BarChart3, Cpu, Shield, Zap, Star } from "lucide-react";

interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: React.ElementType;
  color: string;
  benefits: string[];
}

export function PersonaSection() {
  const [activePersona, setActivePersona] = useState<string>("developer");
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const personas: Persona[] = [
    {
      id: "developer",
      name: "Developer",
      role: "Software Engineer",
      description: "Build and deploy applications faster with AI-powered assistance and streamlined workflows.",
      icon: Code,
      color: "from-blue-500 to-cyan-400",
      benefits: [
        "AI-powered code generation and review",
        "Automated testing and debugging",
        "Streamlined deployment pipelines",
        "Integrated knowledge base access"
      ]
    },
    {
      id: "architect",
      name: "Architect",
      role: "System Designer",
      description: "Design scalable, maintainable systems with comprehensive visualization and documentation tools.",
      icon: Database,
      color: "from-purple-500 to-indigo-400",
      benefits: [
        "System visualization and modeling",
        "Automated architecture validation",
        "Component catalog management",
        "Technical debt tracking"
      ]
    },
    {
      id: "manager",
      name: "Manager",
      role: "Team Lead",
      description: "Track team performance, manage resources, and optimize workflows with real-time metrics.",
      icon: BarChart3,
      color: "from-green-500 to-emerald-400",
      benefits: [
        "Real-time team performance metrics",
        "Resource allocation optimization",
        "Automated progress reporting",
        "Bottleneck identification"
      ]
    },
    {
      id: "devops",
      name: "DevOps",
      role: "Infrastructure Engineer",
      description: "Automate infrastructure management and optimize deployment pipelines for reliability and speed.",
      icon: Cpu,
      color: "from-orange-500 to-amber-400",
      benefits: [
        "Infrastructure as code generation",
        "Automated scaling and optimization",
        "Performance monitoring and alerts",
        "Security compliance automation"
      ]
    }
  ];

  const getPersona = (id: string) => personas.find(p => p.id === id) || personas[0];
  const currentPersona = getPersona(activePersona);

  if (!isMounted) return null;

  return (
    <section 
      id="personas" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--background))' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.6 : 0 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-primary/5 to-transparent rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.6 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <motion.h2 
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            Built for Every Team Member
          </motion.h2>
          <motion.p 
            className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Origin adapts to different roles and needs, providing tailored experiences for everyone on your team.
          </motion.p>
        </div>

        {/* Persona selector */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {personas.map((persona, index) => (
            <motion.button
              key={persona.id}
              className={cn(
                "px-4 py-2 rounded-full flex items-center gap-2 transition-all",
                activePersona === persona.id 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "bg-muted hover:bg-muted/80"
              )}
              onClick={() => setActivePersona(persona.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
              transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
            >
              <persona.icon className="h-4 w-4" />
              <span>{persona.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Persona content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${currentPersona.color}`}>
                    <currentPersona.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{currentPersona.name}</h3>
                </div>
                <p className="text-muted-foreground">{currentPersona.role}</p>
                <p className="text-xl">{currentPersona.description}</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Key Benefits</h4>
                <ul className="space-y-3">
                  {currentPersona.benefits.map((benefit, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="mt-1 text-primary">
                        <Star className="h-4 w-4" />
                      </div>
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatedCard 
            depth={1.5}
            hoverScale={1.05}
            className="aspect-square max-w-[500px] mx-auto"
          >
            {(mousePosition, isHovered) => (
              <>
                <AnimatedCardBackground>
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentPersona.color}/10`} />
                  
                  {/* Animated background elements */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute rounded-full bg-gradient-to-r ${currentPersona.color}/20`}
                      style={{
                        width: `${Math.random() * 100 + 50}px`,
                        height: `${Math.random() * 100 + 50}px`,
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        opacity: 0.3,
                      }}
                      animate={{ 
                        x: [0, Math.random() * 30 - 15, 0],
                        y: [0, Math.random() * 30 - 15, 0],
                        scale: [1, Math.random() * 0.3 + 0.9, 1],
                      }}
                      transition={{ 
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  ))}
                </AnimatedCardBackground>
                
                <AnimatedCardContent className="h-full flex flex-col items-center justify-center p-6">
                  <motion.div 
                    className="relative"
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <motion.div 
                      className={`p-6 rounded-full bg-gradient-to-r ${currentPersona.color} shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <currentPersona.icon className="h-12 w-12 text-white" />
                    </motion.div>
                    
                    {/* Orbiting elements */}
                    {[...Array(3)].map((_, i) => {
                      const angle = (i * 120) + (Date.now() / 2000);
                      const radius = 70;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      
                      return (
                        <motion.div
                          key={i}
                          className="absolute w-10 h-10 rounded-full bg-background shadow-md flex items-center justify-center"
                          style={{
                            x, 
                            y,
                            zIndex: y > 0 ? -1 : 1,
                          }}
                          animate={{
                            x: [x, Math.cos(angle + 2 * Math.PI/3) * radius, Math.cos(angle + 4 * Math.PI/3) * radius, x],
                            y: [y, Math.sin(angle + 2 * Math.PI/3) * radius, Math.sin(angle + 4 * Math.PI/3) * radius, y],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          {i === 0 ? <Zap className="h-5 w-5 text-primary" /> : 
                           i === 1 ? <Shield className="h-5 w-5 text-primary" /> :
                           <Users className="h-5 w-5 text-primary" />}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                  
                  <motion.div 
                    className="mt-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${currentPersona.color}`}>
                      {currentPersona.role}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Optimized workflow for {currentPersona.name.toLowerCase()}s
                    </p>
                  </motion.div>
                </AnimatedCardContent>
              </>
            )}
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
