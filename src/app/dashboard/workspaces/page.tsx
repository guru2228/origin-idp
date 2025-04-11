"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RoleGuard } from "@/components/auth/role-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Users, Settings, FolderKanban, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function WorkspacesPage() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const workspaces = [
    {
      id: "ws-1",
      name: "Frontend Platform",
      description: "Frontend components and design system",
      teams: 4,
      members: 12,
      createdAt: "2025-01-15T00:00:00.000Z",
    },
    {
      id: "ws-2",
      name: "Backend Services",
      description: "Core backend microservices",
      teams: 3,
      members: 8,
      createdAt: "2025-02-10T00:00:00.000Z",
    },
    {
      id: "ws-3",
      name: "Data Platform",
      description: "Data processing and analytics",
      teams: 2,
      members: 6,
      createdAt: "2025-03-05T00:00:00.000Z",
    },
    {
      id: "ws-4",
      name: "Mobile Apps",
      description: "iOS and Android applications",
      teams: 2,
      members: 7,
      createdAt: "2025-03-20T00:00:00.000Z",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workspaces</h1>
          <p className="text-muted-foreground">
            Manage your organization's workspaces and teams
          </p>
        </div>
        <RoleGuard
          allowedRoles={["platform_admin", "tenant_admin"]}
          fallback={
            <Button variant="outline" disabled>
              Create Workspace
            </Button>
          }
        >
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Workspace
          </Button>
        </RoleGuard>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Workspaces</TabsTrigger>
          <TabsTrigger value="my">My Workspaces</TabsTrigger>
          <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((workspace, index) => (
              <motion.div
                key={workspace.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/workspaces/${workspace.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{workspace.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {workspace.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <FolderKanban className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{workspace.teams} teams</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{workspace.members} members</span>
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
              transition={{ duration: 0.3, delay: workspaces.length * 0.1 }}
            >
              <RoleGuard
                allowedRoles={["platform_admin", "tenant_admin"]}
                fallback={
                  <Card className="h-full border-dashed opacity-50">
                    <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                      <CardTitle className="text-muted-foreground">
                        New Workspace
                      </CardTitle>
                      <CardDescription>
                        Contact an admin to create a new workspace
                      </CardDescription>
                    </CardHeader>
                  </Card>
                }
              >
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New Workspace
                    </CardTitle>
                  </CardHeader>
                </Card>
              </RoleGuard>
            </motion.div>
          </div>
        </TabsContent>
        <TabsContent value="my" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workspaces.slice(0, 2).map((workspace, index) => (
              <motion.div
                key={workspace.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/workspaces/${workspace.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{workspace.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {workspace.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <FolderKanban className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{workspace.teams} teams</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{workspace.members} members</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workspaces.slice(0, 3).map((workspace, index) => (
              <motion.div
                key={workspace.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/workspaces/${workspace.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{workspace.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {workspace.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <FolderKanban className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{workspace.teams} teams</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{workspace.members} members</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
