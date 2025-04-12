import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PersonaSection() {
  const [activePersona, setActivePersona] = useState(0);
  
  const personas = [
    {
      title: "Developer",
      description: "Build and deploy faster with integrated tools and AI assistance",
      features: [
        "AI-powered code generation",
        "Integrated CI/CD pipelines",
        "Component library access",
        "Automated testing tools",
        "Performance monitoring"
      ],
      icon: "👨‍💻"
    },
    {
      title: "Designer",
      description: "Create beautiful interfaces with powerful design tools",
      features: [
        "Design system management",
        "Component prototyping",
        "Collaboration tools",
        "Version control for designs",
        "Design-to-code conversion"
      ],
      icon: "🎨"
    },
    {
      title: "Product Manager",
      description: "Manage your product roadmap and track progress efficiently",
      features: [
        "Feature planning tools",
        "Sprint management",
        "Analytics dashboard",
        "User feedback collection",
        "Release management"
      ],
      icon: "📊"
    }
  ];
  
  const handlePersonaChange = (index: number) => {
    setActivePersona(index);
  };
  
  return (
    <section id="personas" className="py-20 bg-background">
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
            Built for Every Team Member
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
            Discover how Origin IDP empowers different roles in your organization
          </motion.p>
        </div>
        
        <motion.div 
          className="flex justify-center mb-10 space-x-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {personas.map((persona, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activePersona === i 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => handlePersonaChange(i)}
            >
              <span className="mr-2">{persona.icon}</span>
              {persona.title}
            </button>
          ))}
        </motion.div>
        
        <motion.div
          key={activePersona}
          className="bg-card border rounded-lg p-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-6">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  <span className="text-4xl">{personas[activePersona].icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{personas[activePersona].title}</h3>
                <p className="text-muted-foreground">{personas[activePersona].description}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {personas[activePersona].features.map((feature, j) => (
                  <motion.li 
                    key={j}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (j * 0.1) }}
                  >
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <Link href="/auth/login">
                <Button>Get Started</Button>
              </Link>
            </div>
            
            <div className="relative">
              <motion.div
                className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg aspect-video flex items-center justify-center overflow-hidden"
                animate={{ 
                  boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 30px rgba(0,0,0,0.1)", "0px 0px 0px rgba(0,0,0,0)"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Animated elements */}
                  <motion.div 
                    className="absolute w-20 h-20 bg-primary/10 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      x: [0, 30, 0],
                      y: [0, -30, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <motion.div 
                    className="absolute w-16 h-16 bg-secondary/10 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      x: [0, -40, 0],
                      y: [0, 40, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <motion.div 
                    className="absolute w-24 h-24 bg-accent/10 rounded-full"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      x: [0, 50, 0],
                      y: [0, 50, 0],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  {/* Central icon */}
                  <div className="relative z-10 bg-background rounded-full p-6 shadow-lg">
                    <span className="text-5xl">{personas[activePersona].icon}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
