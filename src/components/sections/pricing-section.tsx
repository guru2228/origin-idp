"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatedCard, AnimatedCardContent, AnimatedCardBackground } from "@/components/ui/animated-card";
import { Check, X, Sparkles, Zap, ArrowRight, CreditCard } from "lucide-react";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  features: {
    included: string[];
    excluded: string[];
  };
  highlight?: boolean;
  badge?: string;
  cta: string;
}

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const pricingTiers: PricingTier[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small teams just getting started with AI-powered development.",
      price: {
        monthly: 49,
        annually: 39,
      },
      features: {
        included: [
          "Up to 5 team members",
          "Basic AI code assistance",
          "Component catalog",
          "Standard support",
          "1 AI agent"
        ],
        excluded: [
          "Advanced AI features",
          "Custom workflows",
          "Priority support",
          "Team analytics",
          "Enterprise security"
        ]
      },
      cta: "Start Free Trial"
    },
    {
      id: "professional",
      name: "Professional",
      description: "Ideal for growing teams that need more power and flexibility.",
      price: {
        monthly: 99,
        annually: 79,
      },
      highlight: true,
      badge: "Most Popular",
      features: {
        included: [
          "Up to 20 team members",
          "Advanced AI code assistance",
          "Component catalog",
          "Priority support",
          "5 AI agents",
          "Custom workflows",
          "Team analytics"
        ],
        excluded: [
          "Enterprise security",
          "Dedicated account manager",
          "Custom integrations"
        ]
      },
      cta: "Get Started"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For organizations that need ultimate scalability and security.",
      price: {
        monthly: 249,
        annually: 199,
      },
      features: {
        included: [
          "Unlimited team members",
          "Advanced AI code assistance",
          "Component catalog",
          "24/7 priority support",
          "Unlimited AI agents",
          "Custom workflows",
          "Team analytics",
          "Enterprise security",
          "Dedicated account manager",
          "Custom integrations"
        ],
        excluded: []
      },
      cta: "Contact Sales"
    }
  ];

  if (!isMounted) return null;

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly");
  };

  return (
    <section 
      id="pricing" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--muted))' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.5 : 0 }}
          transition={{ duration: 1 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="pricing-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#pricing-gradient)" />
          </svg>
        </motion.div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <motion.h2 
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the plan that's right for your team. All plans include a 14-day free trial.
          </motion.p>
        </div>

        {/* Billing toggle */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-background rounded-full p-1 flex items-center shadow-sm">
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all relative",
                billingCycle === "monthly" ? "text-primary-foreground" : "text-muted-foreground"
              )}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
              {billingCycle === "monthly" && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  layoutId="billingCycleIndicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all relative",
                billingCycle === "annually" ? "text-primary-foreground" : "text-muted-foreground"
              )}
              onClick={() => setBillingCycle("annually")}
            >
              Annually
              <span className="ml-1 text-xs font-bold text-green-500">Save 20%</span>
              {billingCycle === "annually" && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  layoutId="billingCycleIndicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              <AnimatedCard 
                depth={tier.highlight ? 1.5 : 1}
                hoverScale={tier.highlight ? 1.05 : 1.03}
                className={cn(
                  "h-full",
                  tier.highlight ? "border-primary shadow-lg" : ""
                )}
              >
                {(mousePosition, isHovered) => (
                  <>
                    <AnimatedCardBackground>
                      <div className={cn(
                        "absolute inset-0",
                        tier.highlight 
                          ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" 
                          : "bg-gradient-to-br from-muted/50 to-transparent"
                      )} />
                      
                      {/* Animated background elements for highlighted tier */}
                      {tier.highlight && (
                        <>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute rounded-full bg-primary/10"
                              style={{
                                width: `${Math.random() * 60 + 20}px`,
                                height: `${Math.random() * 60 + 20}px`,
                                left: `${Math.random() * 80 + 10}%`,
                                top: `${Math.random() * 80 + 10}%`,
                                opacity: 0.3,
                              }}
                              animate={{ 
                                x: [0, Math.random() * 20 - 10, 0],
                                y: [0, Math.random() * 20 - 10, 0],
                                scale: [1, Math.random() * 0.3 + 0.9, 1],
                              }}
                              transition={{ 
                                duration: Math.random() * 5 + 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatedCardBackground>
                    
                    <AnimatedCardContent className="p-6 flex flex-col h-full">
                      {/* Badge */}
                      {tier.badge && (
                        <div className="absolute -top-3 right-6">
                          <motion.div
                            className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Sparkles className="h-3 w-3" />
                            {tier.badge}
                          </motion.div>
                        </div>
                      )}
                      
                      {/* Header */}
                      <div className="mb-5">
                        <h3 className="text-2xl font-bold">{tier.name}</h3>
                        <p className="text-muted-foreground mt-1">{tier.description}</p>
                      </div>
                      
                      {/* Price */}
                      <div className="mb-5">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">
                            ${tier.price[billingCycle]}
                          </span>
                          <span className="text-muted-foreground ml-2">
                            /month
                          </span>
                        </div>
                        {billingCycle === "annually" && (
                          <div className="text-sm text-green-500 font-medium mt-1">
                            Billed annually (${tier.price.annually * 12}/year)
                          </div>
                        )}
                      </div>
                      
                      {/* Features */}
                      <div className="space-y-4 mb-8 flex-grow">
                        <ul className="space-y-2">
                          {tier.features.included.map((feature, i) => (
                            <motion.li 
                              key={`included-${i}`}
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + (i * 0.05) }}
                            >
                              <div className="mt-1 text-green-500 bg-green-500/10 p-0.5 rounded-full">
                                <Check className="h-3.5 w-3.5" />
                              </div>
                              <span className="text-sm">{feature}</span>
                            </motion.li>
                          ))}
                          {tier.features.excluded.map((feature, i) => (
                            <motion.li 
                              key={`excluded-${i}`}
                              className="flex items-start gap-2 text-muted-foreground"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + ((tier.features.included.length + i) * 0.05) }}
                            >
                              <div className="mt-1 text-muted-foreground bg-muted p-0.5 rounded-full">
                                <X className="h-3.5 w-3.5" />
                              </div>
                              <span className="text-sm">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* CTA Button */}
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          className={cn(
                            "w-full gap-1.5 relative overflow-hidden group",
                            tier.highlight ? "" : "bg-muted text-foreground hover:bg-muted/80"
                          )}
                        >
                          <motion.span
                            className="absolute inset-0 bg-white/20 rounded-md"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5 }}
                          />
                          {tier.cta}
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {tier.id === "enterprise" ? (
                              <CreditCard className="h-4 w-4" />
                            ) : (
                              <ArrowRight className="h-4 w-4" />
                            )}
                          </motion.div>
                        </Button>
                      </motion.div>
                      
                      {/* Highlight effect for popular plan */}
                      {tier.highlight && hoveredTier === tier.id && (
                        <motion.div
                          className="absolute -inset-px rounded-lg border-2 border-primary"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          layoutId="highlightBorder"
                        />
                      )}
                    </AnimatedCardContent>
                  </>
                )}
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
        
        {/* Enterprise callout */}
        <motion.div
          className="mt-16 bg-background border rounded-lg p-8 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 z-0">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="enterprise-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="100" height="100" fill="url(#enterprise-gradient)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
            >
              <Zap className="h-8 w-8 text-primary" />
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-2">Need a custom solution?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Contact our sales team for a custom quote tailored to your organization's specific needs.
              We offer flexible enterprise plans with additional features and support.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" variant="outline" className="gap-1.5">
                Contact Sales
                <CreditCard className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
