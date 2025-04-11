"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleGuard } from "@/components/auth/role-guard";
import { motion } from "framer-motion";
import { Database, Server, Code, Globe, Edit, Trash2, ArrowLeft, Link as LinkIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function SystemDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Mock data for the system
  const system = {
    id,
    name: "Customer Portal",
    description: "Main customer-facing web application",
    domain: {
      id: "domain-1",
      name: "Customer Experience"
    },
    owner: "Jane Smith",
    components: [
      {
        id: "component-1",
        name: "User Authentication Service",
        description: "Handles user authentication and authorization",
        type: "service",
      },
      {
        id: "component-2",
        name: "Product Catalog Service",
        description: "Manages product information and catalog",
        type: "service",
      },
      {
        id: "component-3",
        name: "Order Management Service",
        description: "Handles order processing and management",
        type: "service",
      },
    ],
    apis: [
      {
        id: "api-1",
        name: "User API",
        description: "API for user management",
        version: "v2.0.0",
      },
      {
        id: "api-2",
        name: "Products API",
        description: "API for product catalog",
        version: "v1.5.0",
      },
    ],
    metadata: {
      createdAt: "2025-01-20T00:00:00.000Z",
      updatedAt: "2025-03-25T00:00:00.000Z",
      version: "2.1",
      status: "active",
      tags: ["web", "customer", "portal"],
    },
    documentation: {
      overview: "The Customer Portal is the main web application that customers use to interact with our products and services.",
      architecture: "The portal follows a microservices architecture with separate services for authentication, product management, and order processing.",
      guidelines: "All components should implement proper error handling and logging.",
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/catalog")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Catalog
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{system.name}</h1>
          <p className="text-muted-foreground">{system.description}</p>
          <div className="flex items-center mt-1">
            <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
            <Link href={`/dashboard/catalog/domains/${system.domain.id}`} className="text-sm text-primary hover:underline">
              {system.domain.name}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RoleGuard
            allowedRoles={["platform_admin", "tenant_admin"]}
            fallback={null}
          >
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </RoleGuard>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Component
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Components
                  </CardTitle>
                  <Code className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{system.components.length}</div>
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
                    APIs
                  </CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{system.apis.length}</div>
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
                    Status
                  </CardTitle>
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{system.metadata.status}</div>
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
                    Version
                  </CardTitle>
                  <Code className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{system.metadata.version}</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>
                  Components in this system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {system.components.map((component) => (
                    <Link key={component.id} href={`/dashboard/catalog/components/${component.id}`}>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="font-medium">{component.name}</div>
                        <div className="text-sm text-muted-foreground">{component.description}</div>
                        <div className="mt-2 flex items-center text-sm">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {component.type}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>APIs</CardTitle>
                <CardDescription>
                  APIs in this system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {system.apis.map((api) => (
                    <Link key={api.id} href={`/dashboard/catalog/apis/${api.id}`}>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="font-medium">{api.name}</div>
                        <div className="text-sm text-muted-foreground">{api.description}</div>
                        <div className="mt-2 flex items-center text-sm">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {api.version}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
                <CardDescription>
                  Additional information about this system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Owner</div>
                    <div className="text-sm text-muted-foreground">
                      {system.owner}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Created At</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(system.metadata.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Updated At</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(system.metadata.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Tags</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {system.metadata.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="components" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Components</CardTitle>
                <CardDescription>
                  Manage components in this system
                </CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Component
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {system.components.map((component) => (
                  <div key={component.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">{component.name}</div>
                      <div className="text-sm text-muted-foreground">{component.description}</div>
                      <div className="mt-1 flex items-center text-sm">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {component.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <LinkIcon className="mr-1 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="apis" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>APIs</CardTitle>
                <CardDescription>
                  Manage APIs in this system
                </CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add API
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {system.apis.map((api) => (
                  <div key={api.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">{api.name}</div>
                      <div className="text-sm text-muted-foreground">{api.description}</div>
                      <div className="mt-1 flex items-center text-sm">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {api.version}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <LinkIcon className="mr-1 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Documentation for this system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Overview</h3>
                <p className="text-muted-foreground">{system.documentation.overview}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Architecture</h3>
                <p className="text-muted-foreground">{system.documentation.architecture}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Guidelines</h3>
                <p className="text-muted-foreground">{system.documentation.guidelines}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <RoleGuard
            allowedRoles={["platform_admin", "tenant_admin"]}
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    You don't have permission to manage system settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Contact a system administrator to make changes to system settings.</p>
                </CardContent>
              </Card>
            }
          >
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Manage system settings and configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">System Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    value={system.name}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    value={system.description}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Owner</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    value={system.owner}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Domain</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value={system.domain.id}>{system.domain.name}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    value={system.metadata.tags.join(", ")}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
                
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Permanently delete this system
                  </p>
                  <div className="mt-4">
                    <Button variant="destructive">Delete System</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </RoleGuard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
