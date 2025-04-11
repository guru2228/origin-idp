"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RoleGuard } from "@/components/auth/role-guard";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Edit, Shield, Key, Users, UserCog, Clock, 
  Mail, Building, Check, X
} from "lucide-react";
import Link from "next/link";

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Mock data for the user
  const user = {
    id,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Platform Admin",
    status: "active",
    lastActive: "2025-04-10T00:00:00.000Z",
    created: "2024-10-15T00:00:00.000Z",
    tenant: "Origin Inc.",
    avatar: "https://ui.shadcn.com/avatars/01.png",
    workspaces: [
      { id: "ws-1", name: "Platform Development", role: "Admin" },
      { id: "ws-2", name: "AI Studio", role: "Member" },
      { id: "ws-3", name: "Documentation", role: "Viewer" },
    ],
    permissions: [
      { id: "perm-1", name: "User Management", granted: true, category: "Administration" },
      { id: "perm-2", name: "Role Management", granted: true, category: "Administration" },
      { id: "perm-3", name: "Tenant Management", granted: true, category: "Administration" },
      { id: "perm-4", name: "Workspace Creation", granted: true, category: "Workspaces" },
      { id: "perm-5", name: "Workspace Management", granted: true, category: "Workspaces" },
      { id: "perm-6", name: "Team Management", granted: true, category: "Workspaces" },
      { id: "perm-7", name: "Create AI Agents", granted: true, category: "AI Studio" },
      { id: "perm-8", name: "Manage Vector Stores", granted: true, category: "AI Studio" },
      { id: "perm-9", name: "Create RAG Pipelines", granted: true, category: "AI Studio" },
      { id: "perm-10", name: "View Metrics Dashboard", granted: true, category: "Metrics" },
    ],
    activity: [
      { id: "act-1", action: "Created workspace", target: "Platform Development", timestamp: "2025-04-10T10:30:00.000Z" },
      { id: "act-2", action: "Added user", target: "John Doe to AI Studio", timestamp: "2025-04-09T14:15:00.000Z" },
      { id: "act-3", action: "Created AI agent", target: "Code Review Assistant", timestamp: "2025-04-08T09:45:00.000Z" },
      { id: "act-4", action: "Updated knowledge base", target: "Platform Documentation", timestamp: "2025-04-07T16:20:00.000Z" },
      { id: "act-5", action: "Created release", target: "v2.5.0", timestamp: "2025-04-05T11:10:00.000Z" },
    ],
  };

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Active</span>;
      case "inactive":
        return <span className="text-xs bg-gray-500/10 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>;
      case "pending":
        return <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full">Pending</span>;
      default:
        return <span className="text-xs bg-gray-500/10 text-gray-500 px-2 py-0.5 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/users")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Users
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <UserCog className="h-8 w-8 text-primary" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span>{user.role}</span>
              </div>
              <div>
                {getStatusBadge(user.status)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RoleGuard
            allowedRoles={["platform_admin", "tenant_admin"]}
            fallback={null}
          >
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Button>
          </RoleGuard>
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
                Email
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium truncate">{user.email}</div>
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
                Tenant
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{user.tenant}</div>
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
                Last Active
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{new Date(user.lastActive).toLocaleDateString()}</div>
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
                Workspaces
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{user.workspaces.length}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="permissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Permissions</CardTitle>
              <CardDescription>
                Permissions granted to this user through their role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array.from(new Set(user.permissions.map(p => p.category))).map((category, categoryIndex) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-lg font-medium">{category}</h3>
                    <div className="rounded-md border">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3.5 text-left text-sm font-semibold">Permission</th>
                            <th className="px-4 py-3.5 text-right text-sm font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {user.permissions
                            .filter(p => p.category === category)
                            .map((permission, index) => (
                              <motion.tr
                                key={permission.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                              >
                                <td className="px-4 py-4 text-sm">{permission.name}</td>
                                <td className="px-4 py-4 text-sm text-right">
                                  {permission.granted ? (
                                    <span className="inline-flex items-center text-green-500">
                                      <Check className="h-4 w-4 mr-1" />
                                      Granted
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center text-red-500">
                                      <X className="h-4 w-4 mr-1" />
                                      Denied
                                    </span>
                                  )}
                                </td>
                              </motion.tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workspaces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Workspaces</CardTitle>
              <CardDescription>
                Workspaces this user has access to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Workspace</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Role</th>
                      <th className="px-4 py-3.5 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {user.workspaces.map((workspace, index) => (
                      <motion.tr
                        key={workspace.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <td className="px-4 py-4 text-sm">
                          <Link href={`/dashboard/workspaces/${workspace.id}`} className="font-medium hover:underline">
                            {workspace.name}
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{workspace.role}</td>
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
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                Recent activity for this user
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.activity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 border rounded-md"
                  >
                    <div className="rounded-full p-2 bg-primary/10 h-10 w-10 flex items-center justify-center">
                      <UserCog className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">
                          {activity.action}: <span className="text-primary">{activity.target}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
