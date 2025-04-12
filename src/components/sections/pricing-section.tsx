import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams just getting started",
      price: billingCycle === "monthly" ? 49 : 470,
      features: [
        "Up to 5 team members",
        "Basic AI assistance",
        "Component catalog",
        "Workspace management",
        "Email support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      description: "Ideal for growing development teams",
      price: billingCycle === "monthly" ? 99 : 950,
      features: [
        "Up to 20 team members",
        "Advanced AI assistance",
        "Component catalog",
        "Workspace management",
        "Analytics dashboard",
        "Code generation",
        "Priority support"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs",
      price: billingCycle === "monthly" ? 249 : 2390,
      features: [
        "Unlimited team members",
        "Premium AI assistance",
        "Component catalog",
        "Workspace management",
        "Advanced analytics",
        "Code generation",
        "Security compliance",
        "Custom integrations",
        "Dedicated support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];
  
  const handleMouseEnter = (index: number) => {
    // This function is used for future enhancements
    console.log(`Mouse entered card ${index}`);
  };
  
  const handleMouseLeave = () => {
    // This function is used for future enhancements
    console.log("Mouse left card");
  };
  
  return (
    <section id="pricing" className="py-20 bg-muted/30">
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
            Simple, Transparent Pricing
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
            Choose the plan that works best for your team
          </motion.p>
        </div>
        
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-muted rounded-full p-1 flex">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === "monthly" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === "yearly" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              <span className="ml-1 text-xs font-normal text-primary">
                (Save 20%)
              </span>
            </button>
          </div>
        </motion.div>
        
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 ${
                plan.popular ? "border-primary" : ""
              }`}
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
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground mt-1">{plan.description}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <motion.li 
                    key={j}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (j * 0.1) }}
                  >
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <Link href="/auth/login">
                <Button 
                  className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="mt-2">
            Need a custom plan? <Link href="/contact" className="text-primary font-medium hover:underline">Contact us</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
