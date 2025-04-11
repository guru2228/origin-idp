"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Shield, Key, Users } from "lucide-react";

export default function CreateRolePage() {
  const router = useRouter();
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  
  // Mock data for permissions
  const permissionCategories = [
    {
      name: "Administration",
      permissions: [
        { id: "perm-1", name: "User Management", granted: false },
        { id: "perm-2", name: "Role Management", granted: false },
        { id: "perm-3", name: "Tenant Management", granted: false },
      ]
    },
    {
      name: "Workspaces",
      permissions: [
        { id: "perm-4", name: "Workspace Creation", granted: false },
        { id: "perm-5", name: "Workspace Management", granted: false },
        { id: "perm-6", name: "Team Management", granted: false },
      ]
    },
    {
      name: "AI Studio",
      permissions: [
        { id: "perm-7", name: "Create AI Agents", granted: false },
        { id: "perm-8", name: "Manage Vector Stores", granted: false },
        { id: "perm-9", name: "Create RAG Pipelines", granted: false },
      ]
    },
    {
      name: "Metrics",
      permissions: [
        { id: "perm-10", name: "View Metrics Dashboard", granted: false },
        { id: "perm-11", name: "Export Metrics", granted: false },
        { id: "perm-12", name: "Configure Metrics", granted: false },
      ]
    },
  ];
  
  // Define permission type
  interface Permission {
    id: string;
    name: string;
    granted: boolean;
  }

  // Define permission category type
  interface PermissionCategory {
    name: string;
    permissions: Permission[];
  }
  
  const [permissions, setPermissions] = useState<Permission[]>(
    permissionCategories.reduce<Permission[]>((acc, category) => {
      return [...acc, ...category.permissions];
    }, [])
  );

  // Toggle permission
  const togglePermission = (permId: string) => {
    setPermissions(prev => 
      prev.map(perm => 
        perm.id === permId ? { ...perm, granted: !perm.granted } : perm
      )
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real implementation, this would save to the database
    router.push("/dashboard/users");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Role</h1>
        <p className="text-muted-foreground">
          Define a new role with specific permissions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
            <CardDescription>
              Basic information about the role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Role Name</label>
                <Input 
                  placeholder="e.g., Developer, QA Engineer, Product Manager" 
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Describe the purpose and scope of this role" 
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>
              Select the permissions for this role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {permissionCategories.map((category, categoryIndex) => (
                <div key={category.name} className="space-y-2">
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Permission</th>
                          <th className="px-4 py-3.5 text-right text-sm font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {category.permissions.map((permission, index) => {
                          const currentPerm = permissions.find(p => p.id === permission.id);
                          return (
                            <motion.tr
                              key={permission.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                              className="cursor-pointer hover:bg-muted/50"
                              onClick={() => togglePermission(permission.id)}
                            >
                              <td className="px-4 py-4 text-sm">{permission.name}</td>
                              <td className="px-4 py-4 text-sm text-right">
                                <div className="flex items-center justify-end">
                                  <input 
                                    type="checkbox" 
                                    checked={currentPerm?.granted || false}
                                    onChange={() => togglePermission(permission.id)}
                                    className="h-4 w-4"
                                  />
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Create Role
          </Button>
        </div>
      </form>
    </div>
  );
}
