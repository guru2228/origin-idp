"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleGuard } from "@/components/auth/role-guard";
import { motion } from "framer-motion";
import { Users, Settings, FolderKanban, PlusCircle, Edit, Trash2, UserPlus } from "lucide-react";
import Link from "next/link";

export default function WorkspaceDetailPage() {
  const { id } = useParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Mock data for the workspace
  const workspace = {
    id,
    name: "Frontend Platform",
    description: "Frontend components and design system",
    teams: [
      {
        id: "team-1",
        name: "Design System",
        description: "Core design system components",
        members: 5,
      },
      {
        id: "team-2",
        name: "Web Frontend",
        description: "Web application frontend",
        members: 4,
      },
      {
        id: "team-3",
        name: "Mobile Frontend",
        description: "Mobile application frontend",
        members: 3,
      },
    ],
    members: [
      {
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        role: "Owner",
      },
      {
        id: "user-2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Contributor",
      },
      {
        id: "user-3",
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "Viewer",
      },
    ],
    integrations: {
      github: {
        connected: true,
        organization: "acme-org",
        teams: ["frontend", "design"],
      },
      jira: {
        connected: true,
        project: "FE-PLATFORM",
      },
      rally: {
        connected: false,
      },
    },
    createdAt: "2025-01-15T00:00:00.000Z",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{workspace.name}</h1>
          <p className="text-muted-foreground">{workspace.description}</p>
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
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
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
                    Total Teams
                  </CardTitle>
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{workspace.teams.length}</div>
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
                    Total Members
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{workspace.members.length}</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Teams</CardTitle>
                <CardDescription>
                  Teams in this workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workspace.teams.map((team) => (
                    <div key={team.id} className="border rounded-lg p-4">
                      <div className="font-medium">{team.name}</div>
                      <div className="text-sm text-muted-foreground">{team.description}</div>
                      <div className="mt-2 flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{team.members} members</span>
                      </div>
                    </div>
                  ))}
                  <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-muted-foreground">
                    <PlusCircle className="h-8 w-8 mb-2" />
                    <div>Create New Team</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Members</CardTitle>
                <CardDescription>
                  Recently added members to this workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workspace.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                      <div className="text-sm">{member.role}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Teams</CardTitle>
                <CardDescription>
                  Manage teams in this workspace
                </CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Team
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workspace.teams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">{team.name}</div>
                      <div className="text-sm text-muted-foreground">{team.description}</div>
                      <div className="mt-1 flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{team.members} members</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <UserPlus className="mr-1 h-4 w-4" />
                        Add Member
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
        
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Members</CardTitle>
                <CardDescription>
                  Manage members in this workspace
                </CardDescription>
              </div>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workspace.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">{member.role}</div>
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
        
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Manage external integrations for this workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-black flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">GitHub</div>
                      <div className="text-sm text-muted-foreground">
                        {workspace.integrations.github.connected 
                          ? `Connected to ${workspace.integrations.github.organization}`
                          : 'Not connected'}
                      </div>
                    </div>
                  </div>
                  <Button variant={workspace.integrations.github.connected ? "outline" : "default"}>
                    {workspace.integrations.github.connected ? "Configure" : "Connect"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-blue-600 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                        <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0-5.214 5.214h11.057c.555 0 1.006.45 1.006 1.005V24a5.218 5.218 0 0 0 5.215-5.215v-2.057h2.129A5.218 5.218 0 0 0 24 11.513H12.299a1.005 1.005 0 0 1-1.005-1.005V0a5.218 5.218 0 0 0-5.215 5.215v2.057H3.95a5.215 5.215 0 0 1 5.215-5.215h11.058c.555 0 1.005.45 1.005 1.005v11.483h2.058A5.218 5.218 0 0 0 18.074 0H6.299a1.005 1.005 0 0 0-1.006 1.005v10.508a1.005 1.005 0 0 0 1.006 1.005h11.989z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Jira</div>
                      <div className="text-sm text-muted-foreground">
                        {workspace.integrations.jira.connected 
                          ? `Connected to ${workspace.integrations.jira.project}`
                          : 'Not connected'}
                      </div>
                    </div>
                  </div>
                  <Button variant={workspace.integrations.jira.connected ? "outline" : "default"}>
                    {workspace.integrations.jira.connected ? "Configure" : "Connect"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-orange-600 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-8.5l7-4-7-4v8z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Rally</div>
                      <div className="text-sm text-muted-foreground">
                        {workspace.integrations.rally.connected 
                          ? 'Connected'
                          : 'Not connected'}
                      </div>
                    </div>
                  </div>
                  <Button variant={workspace.integrations.rally.connected ? "outline" : "default"}>
                    {workspace.integrations.rally.connected ? "Configure" : "Connect"}
                  </Button>
                </div>
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
                    You don't have permission to manage workspace settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Contact a workspace administrator to make changes to workspace settings.</p>
                </CardContent>
              </Card>
            }
          >
            <Card>
              <CardHeader>
                <CardTitle>Workspace Settings</CardTitle>
                <CardDescription>
                  Manage workspace settings and configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Workspace Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    value={workspace.name}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    value={workspace.description}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
                
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Permanently delete this workspace and all of its data
                  </p>
                  <div className="mt-4">
                    <Button variant="destructive">Delete Workspace</Button>
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
