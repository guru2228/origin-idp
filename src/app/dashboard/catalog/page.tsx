"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Database, Server, Code, Globe, PlusCircle, Search } from "lucide-react";
import Link from "next/link";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for catalog items
  const domains = [
    {
      id: "domain-1",
      name: "Customer Experience",
      description: "Customer-facing applications and services",
      systems: 4,
    },
    {
      id: "domain-2",
      name: "Data Platform",
      description: "Data processing and analytics services",
      systems: 3,
    },
    {
      id: "domain-3",
      name: "Infrastructure",
      description: "Core infrastructure and platform services",
      systems: 5,
    },
  ];

  const systems = [
    {
      id: "system-1",
      name: "Customer Portal",
      description: "Main customer-facing web application",
      domain: "Customer Experience",
      components: 8,
      status: "active",
    },
    {
      id: "system-2",
      name: "Mobile App Backend",
      description: "Backend services for mobile applications",
      domain: "Customer Experience",
      components: 6,
      status: "active",
    },
    {
      id: "system-3",
      name: "Analytics Platform",
      description: "Data analytics and reporting platform",
      domain: "Data Platform",
      components: 5,
      status: "active",
    },
    {
      id: "system-4",
      name: "Data Lake",
      description: "Central data repository for all services",
      domain: "Data Platform",
      components: 4,
      status: "active",
    },
    {
      id: "system-5",
      name: "API Gateway",
      description: "Centralized API management and routing",
      domain: "Infrastructure",
      components: 3,
      status: "active",
    },
  ];

  const components = [
    {
      id: "component-1",
      name: "User Authentication Service",
      description: "Handles user authentication and authorization",
      system: "Customer Portal",
      type: "service",
      status: "active",
    },
    {
      id: "component-2",
      name: "Product Catalog Service",
      description: "Manages product information and catalog",
      system: "Customer Portal",
      type: "service",
      status: "active",
    },
    {
      id: "component-3",
      name: "Order Management Service",
      description: "Handles order processing and management",
      system: "Customer Portal",
      type: "service",
      status: "active",
    },
    {
      id: "component-4",
      name: "User Profile API",
      description: "API for user profile management",
      system: "Mobile App Backend",
      type: "api",
      status: "active",
    },
    {
      id: "component-5",
      name: "Notification Service",
      description: "Handles push notifications and alerts",
      system: "Mobile App Backend",
      type: "service",
      status: "active",
    },
    {
      id: "component-6",
      name: "Data Ingestion Pipeline",
      description: "Ingests and processes data from various sources",
      system: "Analytics Platform",
      type: "pipeline",
      status: "active",
    },
    {
      id: "component-7",
      name: "Reporting Engine",
      description: "Generates reports and visualizations",
      system: "Analytics Platform",
      type: "service",
      status: "active",
    },
  ];

  const apis = [
    {
      id: "api-1",
      name: "User API",
      description: "API for user management",
      component: "User Authentication Service",
      version: "v2.0.0",
      status: "active",
    },
    {
      id: "api-2",
      name: "Products API",
      description: "API for product catalog",
      component: "Product Catalog Service",
      version: "v1.5.0",
      status: "active",
    },
    {
      id: "api-3",
      name: "Orders API",
      description: "API for order management",
      component: "Order Management Service",
      version: "v1.2.0",
      status: "active",
    },
    {
      id: "api-4",
      name: "Profiles API",
      description: "API for user profiles",
      component: "User Profile API",
      version: "v1.0.0",
      status: "active",
    },
    {
      id: "api-5",
      name: "Notifications API",
      description: "API for sending notifications",
      component: "Notification Service",
      version: "v1.1.0",
      status: "active",
    },
  ];

  // Define item type interface
  interface Item {
    name: string;
    description: string;
    [key: string]: any;
  }

  // Filter functions
  const filterItems = (items: Item[], query: string): Item[] => {
    if (!query) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredDomains = filterItems(domains, searchQuery);
  const filteredSystems = filterItems(systems, searchQuery);
  const filteredComponents = filterItems(components, searchQuery);
  const filteredApis = filterItems(apis, searchQuery);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Catalog</h1>
          <p className="text-muted-foreground">
            Manage your domains, systems, components, and APIs
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search catalog..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="domains" className="space-y-4">
        <TabsList>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="systems">Systems</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="domains" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDomains.map((domain, index) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/catalog/domains/${domain.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{domain.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {domain.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Server className="h-4 w-4 text-muted-foreground" />
                          <span>{domain.systems} systems</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: filteredDomains.length * 0.1 }}
            >
              <Link href="/dashboard/catalog/domains/create">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New Domain
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="systems" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSystems.map((system, index) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/catalog/systems/${system.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{system.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {system.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Server className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>{system.domain}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Code className="h-4 w-4 text-muted-foreground" />
                          <span>{system.components} components</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: filteredSystems.length * 0.1 }}
            >
              <Link href="/dashboard/catalog/systems/create">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New System
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="components" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredComponents.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/catalog/components/${component.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{component.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {component.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Server className="h-4 w-4 text-muted-foreground" />
                          <span>{component.system}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span>{component.type}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: filteredComponents.length * 0.1 }}
            >
              <Link href="/dashboard/catalog/components/create">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New Component
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="apis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredApis.map((api, index) => (
              <motion.div
                key={api.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/catalog/apis/${api.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{api.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {api.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Database className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Code className="h-4 w-4 text-muted-foreground" />
                          <span>{api.component}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {api.version}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: filteredApis.length * 0.1 }}
            >
              <Link href="/dashboard/catalog/apis/create">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New API
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
