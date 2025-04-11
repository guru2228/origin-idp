"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, PlusCircle, Building, CreditCard, Users, Calendar, ArrowUpCircle } from "lucide-react";
import Link from "next/link";

export default function SubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for tenants
  const tenants = [
    {
      id: "tenant-1",
      name: "Origin Inc.",
      plan: "Enterprise",
      users: 25,
      status: "active",
      billingCycle: "annual",
      nextBilling: "2025-12-15T00:00:00.000Z",
      features: ["Unlimited Workspaces", "Unlimited AI Agents", "Priority Support", "Custom Integrations"],
    },
    {
      id: "tenant-2",
      name: "Acme Corp",
      plan: "Professional",
      users: 12,
      status: "active",
      billingCycle: "monthly",
      nextBilling: "2025-05-01T00:00:00.000Z",
      features: ["10 Workspaces", "20 AI Agents", "Standard Support", "Basic Integrations"],
    },
    {
      id: "tenant-3",
      name: "Startup Labs",
      plan: "Starter",
      users: 5,
      status: "active",
      billingCycle: "monthly",
      nextBilling: "2025-05-05T00:00:00.000Z",
      features: ["3 Workspaces", "5 AI Agents", "Email Support", "No Integrations"],
    },
  ];

  const subscriptionPlans = [
    {
      id: "plan-1",
      name: "Starter",
      description: "Perfect for small teams and startups",
      price: "$99/month",
      features: [
        "3 Workspaces",
        "5 AI Agents",
        "Basic Knowledge Base",
        "Standard Metrics",
        "Email Support",
      ],
      popular: false,
    },
    {
      id: "plan-2",
      name: "Professional",
      description: "Ideal for growing teams and businesses",
      price: "$299/month",
      features: [
        "10 Workspaces",
        "20 AI Agents",
        "Advanced Knowledge Base",
        "Detailed Metrics",
        "Priority Support",
        "Basic Integrations",
      ],
      popular: true,
    },
    {
      id: "plan-3",
      name: "Enterprise",
      description: "For large organizations with complex needs",
      price: "Custom Pricing",
      features: [
        "Unlimited Workspaces",
        "Unlimited AI Agents",
        "Enterprise Knowledge Base",
        "Custom Metrics",
        "Dedicated Support",
        "Custom Integrations",
        "SLA Guarantees",
      ],
      popular: false,
    },
  ];

  // Filter functions
  const filterItems = (items, query) => {
    if (!query) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.plan.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredTenants = filterItems(tenants, searchQuery);

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Active</span>;
      case "inactive":
        return <span className="text-xs bg-gray-500/10 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>;
      case "trial":
        return <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Trial</span>;
      case "expired":
        return <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">Expired</span>;
      default:
        return <span className="text-xs bg-gray-500/10 text-gray-500 px-2 py-0.5 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenant Administration</h1>
          <p className="text-muted-foreground">
            Manage tenants, subscriptions, and billing
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Tenant
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search tenants..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Tenants
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tenants.length}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscriptions
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tenants.filter(tenant => tenant.status === "active").length}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tenants.reduce((total, tenant) => total + tenant.users, 0)}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Renewals
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tenants.filter(tenant => 
                  new Date(tenant.nextBilling) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                ).length}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="tenants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tenants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Management</CardTitle>
              <CardDescription>
                View and manage platform tenants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Tenant</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Plan</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Users</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Next Billing</th>
                      <th className="px-4 py-3.5 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredTenants.map((tenant, index) => (
                      <motion.tr
                        key={tenant.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <td className="px-4 py-4 text-sm">
                          <Link href={`/dashboard/subscriptions/${tenant.id}`} className="font-medium hover:underline">
                            {tenant.name}
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-sm">{tenant.plan}</td>
                        <td className="px-4 py-4 text-sm">{tenant.users}</td>
                        <td className="px-4 py-4 text-sm">{getStatusBadge(tenant.status)}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          {new Date(tenant.nextBilling).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm text-right">
                          <Button variant="ghost" size="sm">Manage</Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`h-full ${plan.popular ? 'border-primary' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-md rounded-tr-md">
                      Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-2 text-2xl font-bold">{plan.price}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: (index * 0.1) + (featureIndex * 0.05) }}
                            className="flex items-center"
                          >
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <Button className="w-full">
                        {plan.name === "Enterprise" ? "Contact Sales" : "Select Plan"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Check component for feature lists
function Check(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
