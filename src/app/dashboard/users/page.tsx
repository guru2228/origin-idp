"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, PlusCircle, Users, UserPlus, Shield, Key, UserCog } from "lucide-react";
import Link from "next/link";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for users
  const users = [
    {
      id: "user-1",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Platform Admin",
      status: "active",
      lastActive: "2025-04-10T00:00:00.000Z",
      tenant: "Origin Inc.",
    },
    {
      id: "user-2",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Tenant Admin",
      status: "active",
      lastActive: "2025-04-09T00:00:00.000Z",
      tenant: "Origin Inc.",
    },
    {
      id: "user-3",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "Product Owner",
      status: "active",
      lastActive: "2025-04-08T00:00:00.000Z",
      tenant: "Origin Inc.",
    },
    {
      id: "user-4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "Engineer",
      status: "active",
      lastActive: "2025-04-07T00:00:00.000Z",
      tenant: "Origin Inc.",
    },
    {
      id: "user-5",
      name: "Mike Brown",
      email: "mike.brown@example.com",
      role: "Engineer",
      status: "inactive",
      lastActive: "2025-03-15T00:00:00.000Z",
      tenant: "Origin Inc.",
    },
  ];

  const roles = [
    {
      id: "role-1",
      name: "Platform Admin",
      description: "Full access to all platform features and settings",
      users: 1,
      permissions: 42,
    },
    {
      id: "role-2",
      name: "Tenant Admin",
      description: "Administrative access within a tenant",
      users: 1,
      permissions: 35,
    },
    {
      id: "role-3",
      name: "Product Owner",
      description: "Manage products, releases, and workspaces",
      users: 1,
      permissions: 28,
    },
    {
      id: "role-4",
      name: "Engineer",
      description: "Access to development tools and resources",
      users: 2,
      permissions: 20,
    },
  ];

  // Filter functions
  const filterItems = (items, query) => {
    if (!query) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      (item.email && item.email.toLowerCase().includes(query.toLowerCase())) ||
      (item.role && item.role.toLowerCase().includes(query.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filteredUsers = filterItems(users, searchQuery);
  const filteredRoles = filterItems(roles, searchQuery);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search users or roles..."
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
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
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
                Active Users
              </CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(user => user.status === "active").length}
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
                User Roles
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roles.length}</div>
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
                Permissions
              </CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {roles.reduce((total, role) => total + role.permissions, 0)}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage platform users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Name</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Email</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Role</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold">Last Active</th>
                      <th className="px-4 py-3.5 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers.map((user, index) => (
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
                        <td className="px-4 py-4 text-sm">{user.role}</td>
                        <td className="px-4 py-4 text-sm">{getStatusBadge(user.status)}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">
                          {new Date(user.lastActive).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>
                Manage roles and their associated permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {filteredRoles.map((role, index) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link href={`/dashboard/users/roles/${role.id}`}>
                      <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0">
                          <div>
                            <CardTitle>{role.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {role.description}
                            </CardDescription>
                          </div>
                          <div className="rounded-full p-2 bg-primary/10">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{role.users} users</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Key className="h-4 w-4 text-muted-foreground" />
                                <span>{role.permissions} permissions</span>
                              </div>
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
                  transition={{ duration: 0.3, delay: filteredRoles.length * 0.1 }}
                >
                  <Link href="/dashboard/users/roles/create">
                    <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                        <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                        <CardTitle className="text-muted-foreground">
                          Create New Role
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
