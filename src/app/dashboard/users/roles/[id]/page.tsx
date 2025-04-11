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
  ArrowLeft, Edit, Shield, Key, Users, Check, X, 
  Save, Trash2
} from "lucide-react";
import Link from "next/link";

export default function RoleDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Mock data for the role
  const role = {
    id,
    name: "Platform Admin",
    description: "Full access to all platform features and settings",
    users: [
      { id: "user-1", name: "Jane Smith", email: "jane.smith@example.com" }
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
    created: "2024-10-15T00:00:00.000Z",
    updated: "2025-03-01T00:00:00.000Z",
  };

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditedRole] = useState({
    name: role.name,
    description: role.description,
    permissions: [...role.permissions]
  });

  // Toggle permission
  const togglePermission = (permId: string) => {
    if (!isEditing) return;
    
    setEditedRole(prev => ({
      ...prev,
      permissions: prev.permissions.map(perm => 
        perm.id === permId ? { ...perm, granted: !perm.granted } : perm
      )
    }));
  };

  // Save changes
  const saveChanges = () => {
    // In a real implementation, this would save to the database
    setIsEditing(false);
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
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div>
            {isEditing ? (
              <Input 
                value={editedRole.name}
                onChange={(e) => setEditedRole(prev => ({ ...prev, name: e.target.value }))}
                className="text-2xl font-bold h-10"
              />
            ) : (
              <h1 className="text-3xl font-bold tracking-tight">{role.name}</h1>
            )}
            {isEditing ? (
              <Input 
                value={editedRole.description}
                onChange={(e) => setEditedRole(prev => ({ ...prev, description: e.target.value }))}
                className="text-muted-foreground mt-1"
              />
            ) : (
              <p className="text-muted-foreground mt-1">{role.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RoleGuard
            allowedRoles={["platform_admin"]}
            fallback={null}
          >
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={saveChanges}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Role
              </Button>
            )}
          </RoleGuard>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Users with this Role
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{role.users.length}</div>
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
                Permissions
              </CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{role.permissions.filter(p => p.granted).length}</div>
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
                Last Updated
              </CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{new Date(role.updated).toLocaleDateString()}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="permissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="users">Users with this Role</TabsTrigger>
        </TabsList>
        
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Permissions granted to users with this role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array.from(new Set(role.permissions.map(p => p.category))).map((category, categoryIndex) => (
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
                          {role.permissions
                            .filter(p => p.category === category)
                            .map((permission, index) => (
                              <motion.tr
                                key={permission.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                                className={isEditing ? "cursor-pointer hover:bg-muted/50" : ""}
                                onClick={() => togglePermission(permission.id)}
                              >
                                <td className="px-4 py-4 text-sm">{permission.name}</td>
                                <td className="px-4 py-4 text-sm text-right">
                                  {isEditing ? (
                                    editedRole.permissions.find(p => p.id === permission.id)?.granted ? (
                                      <span className="inline-flex items-center text-green-500">
                                        <Check className="h-4 w-4 mr-1" />
                                        Granted
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center text-red-500">
                                        <X className="h-4 w-4 mr-1" />
                                        Denied
                                      </span>
                                    )
                                  ) : (
                                    permission.granted ? (
                                      <span className="inline-flex items-center text-green-500">
                                        <Check className="h-4 w-4 mr-1" />
                                        Granted
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center text-red-500">
                                        <X className="h-4 w-4 mr-1" />
                                        Denied
                                      </span>
                                    )
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
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Users with this Role</CardTitle>
              <CardDescription>
                Users who have been assigned this role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Name</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Email</th>
                      <th className="px-4 py-3.5 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {role.users.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <td className="px-4 py-4 text-sm">
                          <Link href={`/dashboard/users/${user.id}`} className="font-medium hover:underline">
                            {user.name}
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="px-4 py-4 text-sm text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Assign Users to Role
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <RoleGuard
        allowedRoles={["platform_admin"]}
        fallback={null}
      >
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-500">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions that affect this role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-md border-red-200 dark:border-red-800">
              <div>
                <h3 className="font-medium">Delete Role</h3>
                <p className="text-sm text-muted-foreground">
                  This will permanently delete this role and remove it from all users.
                </p>
              </div>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Role
              </Button>
            </div>
          </CardContent>
        </Card>
      </RoleGuard>
    </div>
  );
}
