"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleGuard } from "@/components/auth/role-guard";
import { motion } from "framer-motion";
import { Database, Server, Code, Globe, Edit, Trash2, ArrowLeft, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function DomainDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Mock data for the domain
  const domain = {
    id,
    name: "Customer Experience",
    description: "Customer-facing applications and services",
    owner: "John Doe",
    systems: [
      {
        id: "system-1",
        name: "Customer Portal",
        description: "Main customer-facing web application",
        components: 8,
      },
      {
        id: "system-2",
        name: "Mobile App Backend",
        description: "Backend services for mobile applications",
        components: 6,
      },
    ],
    metadata: {
      createdAt: "2025-01-15T00:00:00.000Z",
      updatedAt: "2025-03-20T00:00:00.000Z",
      version: "1.0",
      status: "active",
      tags: ["customer", "frontend", "experience"],
    },
    documentation: {
      overview: "The Customer Experience domain encompasses all customer-facing applications and services that provide direct interaction with our products and services.",
      architecture: "This domain follows a microservices architecture with separate systems for web and mobile experiences, sharing common backend services where appropriate.",
      guidelines: "All systems in this domain should follow the company's UX guidelines and accessibility standards.",
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
          <h1 className="text-3xl font-bold tracking-tight">{domain.name}</h1>
          <p className="text-muted-foreground">{domain.description}</p>
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
            <LinkIcon className="mr-2 h-4 w-4" />
            Link System
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="systems">Systems</TabsTrigger>
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
                    Systems
                  </CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{domain.systems.length}</div>
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
                    Status
                  </CardTitle>
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{domain.metadata.status}</div>
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
                    Owner
                  </CardTitle>
                  <div className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{domain.owner}</div>
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
                  <div className="text-2xl font-bold">{domain.metadata.version}</div>
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
                <CardTitle>Systems</CardTitle>
                <CardDescription>
                  Systems in this domain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {domain.systems.map((system) => (
                    <Link key={system.id} href={`/dashboard/catalog/systems/${system.id}`}>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="font-medium">{system.name}</div>
                        <div className="text-sm text-muted-foreground">{system.description}</div>
                        <div className="mt-2 flex items-center text-sm">
                          <Code className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{system.components} components</span>
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
                <CardTitle>Metadata</CardTitle>
                <CardDescription>
                  Additional information about this domain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Created At</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(domain.metadata.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Updated At</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(domain.metadata.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Tags</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {domain.metadata.tags.map((tag) => (
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
        
        <TabsContent value="systems" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Systems</CardTitle>
                <CardDescription>
                  Manage systems in this domain
                </CardDescription>
              </div>
              <Button>
                <LinkIcon className="mr-2 h-4 w-4" />
                Link System
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {domain.systems.map((system) => (
                  <div key={system.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">{system.name}</div>
                      <div className="text-sm text-muted-foreground">{system.description}</div>
                      <div className="mt-1 flex items-center text-sm">
                        <Code className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{system.components} components</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <LinkIcon className="mr-1 h-4 w-4" />
                        View
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
                Documentation for this domain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Overview</h3>
                <p className="text-muted-foreground">{domain.documentation.overview}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Architecture</h3>
                <p className="text-muted-foreground">{domain.documentation.architecture}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Guidelines</h3>
                <p className="text-muted-foreground">{domain.documentation.guidelines}</p>
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
                    You don't have permission to manage domain settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Contact a domain administrator to make changes to domain settings.</p>
                </CardContent>
              </Card>
            }
          >
            <Card>
              <CardHeader>
                <CardTitle>Domain Settings</CardTitle>
                <CardDescription>
                  Manage domain settings and configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Domain Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    value={domain.name}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    value={domain.description}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Owner</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    value={domain.owner}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    value={domain.metadata.tags.join(", ")}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
                
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Permanently delete this domain
                  </p>
                  <div className="mt-4">
                    <Button variant="destructive">Delete Domain</Button>
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
