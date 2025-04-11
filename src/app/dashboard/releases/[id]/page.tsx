"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleGuard } from "@/components/auth/role-guard";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Edit, Trash2, Calendar, GitBranch, Clock, CheckCircle, 
  AlertCircle, Tag, Package, ArrowUpCircle, FileText, User, Server
} from "lucide-react";
import Link from "next/link";

export default function ReleaseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [releaseStatus, setReleaseStatus] = useState("in_progress");

  // Mock data for the release
  const release = {
    id,
    name: "v2.5.0",
    description: "Major feature release with AI Studio improvements",
    status: "in_progress",
    date: "2025-05-15T00:00:00.000Z",
    owner: "Jane Smith",
    components: [
      { id: "comp-1", name: "AI Studio", changes: 32 },
      { id: "comp-2", name: "Spectrum SDLC", changes: 18 },
      { id: "comp-3", name: "Platform Catalog", changes: 12 },
      { id: "comp-4", name: "Metrics Dashboard", changes: 25 },
    ],
    changes: [
      { id: "change-1", title: "Add RAG pipeline visualization", component: "AI Studio", author: "John Doe", status: "completed" },
      { id: "change-2", title: "Improve vector store management", component: "AI Studio", author: "Jane Smith", status: "in_progress" },
      { id: "change-3", title: "Enhance code generation agent", component: "Spectrum SDLC", author: "Alex Johnson", status: "in_review" },
      { id: "change-4", title: "Fix metrics dashboard performance", component: "Metrics Dashboard", author: "Sarah Williams", status: "completed" },
      { id: "change-5", title: "Update component dependency graph", component: "Platform Catalog", author: "Mike Brown", status: "in_progress" },
    ],
    dependencies: [
      { id: "dep-1", name: "Database Schema Migration", status: "completed" },
      { id: "dep-2", name: "API Version Update", status: "in_progress" },
      { id: "dep-3", name: "Frontend Asset Build", status: "pending" },
    ],
    notes: "This release focuses on enhancing the AI capabilities of the platform, particularly in the AI Studio and Spectrum SDLC modules. It also includes performance improvements for the metrics dashboard and updates to the platform catalog.",
    created: "2025-03-01T00:00:00.000Z",
    updated: "2025-04-10T00:00:00.000Z",
  };

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "scheduled":
        return <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Scheduled</span>;
      case "in_progress":
        return <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full">In Progress</span>;
      case "ready":
        return <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Ready</span>;
      case "completed":
        return <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Completed</span>;
      case "in_review":
        return <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded-full">In Review</span>;
      case "pending":
        return <span className="text-xs bg-gray-500/10 text-gray-500 px-2 py-0.5 rounded-full">Pending</span>;
      default:
        return <span className="text-xs bg-gray-500/10 text-gray-500 px-2 py-0.5 rounded-full">{status}</span>;
    }
  };

  const updateReleaseStatus = (newStatus) => {
    setReleaseStatus(newStatus);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/releases")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Releases
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{release.name}</h1>
          <p className="text-muted-foreground">{release.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <RoleGuard
            allowedRoles={["platform_admin", "tenant_admin", "product_owner"]}
            fallback={null}
          >
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </RoleGuard>
          <div className="flex items-center gap-2">
            <select 
              className="p-2 border rounded-md"
              value={releaseStatus}
              onChange={(e) => updateReleaseStatus(e.target.value)}
            >
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="ready">Ready</option>
              <option value="completed">Completed</option>
            </select>
            <Button>Update Status</Button>
          </div>
        </div>
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
                Release Date
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Date(release.date).toLocaleDateString()}</div>
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
                Components
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{release.components.length}</div>
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
                Changes
              </CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{release.changes.length}</div>
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
                Status
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{releaseStatus.replace('_', ' ')}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="changes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="changes">Changes</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
          <TabsTrigger value="notes">Release Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="changes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Changes</CardTitle>
              <CardDescription>
                All changes included in this release
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {release.changes.map((change, index) => (
                  <motion.div
                    key={change.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="p-4 border rounded-md"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{change.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <span className="inline-flex items-center mr-3">
                            <Package className="h-3 w-3 mr-1" />
                            {change.component}
                          </span>
                          <span className="inline-flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {change.author}
                          </span>
                        </div>
                      </div>
                      <div>
                        {getStatusBadge(change.status)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="components" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
              <CardDescription>
                Components affected by this release
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {release.components.map((component, index) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="p-4 border rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{component.name}</div>
                      <div className="flex items-center">
                        <GitBranch className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{component.changes} changes</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dependencies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dependencies</CardTitle>
              <CardDescription>
                Dependencies required for this release
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {release.dependencies.map((dependency, index) => (
                  <motion.div
                    key={dependency.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="p-4 border rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Server className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div className="font-medium">{dependency.name}</div>
                      </div>
                      <div>
                        {getStatusBadge(dependency.status)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Release Notes</CardTitle>
              <CardDescription>
                Notes and documentation for this release
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Overview</h3>
                  <p className="text-muted-foreground">{release.notes}</p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>RAG pipeline visualization in AI Studio</li>
                    <li>Improved vector store management</li>
                    <li>Enhanced code generation agent in Spectrum SDLC</li>
                    <li>Performance improvements for metrics dashboard</li>
                    <li>Updated component dependency graph in Platform Catalog</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Known Issues</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Minor UI glitches in dark mode for vector store management</li>
                    <li>Performance degradation with large dependency graphs</li>
                  </ul>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Full Release Notes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
