"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, PlusCircle, Calendar, GitBranch, Clock, CheckCircle, AlertCircle, Tag, Package, ArrowUpCircle } from "lucide-react";
import Link from "next/link";

export default function ReleasesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for releases
  const upcomingReleases = [
    {
      id: "release-1",
      name: "v2.5.0",
      description: "Major feature release with AI Studio improvements",
      status: "scheduled",
      date: "2025-05-15T00:00:00.000Z",
      owner: "Jane Smith",
      components: 12,
      changes: 87,
    },
    {
      id: "release-2",
      name: "v2.4.2",
      description: "Bug fixes and performance improvements",
      status: "in_progress",
      date: "2025-04-30T00:00:00.000Z",
      owner: "John Doe",
      components: 5,
      changes: 23,
    },
    {
      id: "release-3",
      name: "v2.4.1",
      description: "Security patches and dependency updates",
      status: "ready",
      date: "2025-04-20T00:00:00.000Z",
      owner: "Alex Johnson",
      components: 3,
      changes: 15,
    },
  ];

  const pastReleases = [
    {
      id: "release-4",
      name: "v2.4.0",
      description: "Spectrum AI SDLC integration",
      status: "completed",
      date: "2025-04-01T00:00:00.000Z",
      owner: "Jane Smith",
      components: 10,
      changes: 65,
    },
    {
      id: "release-5",
      name: "v2.3.0",
      description: "Workspace management enhancements",
      status: "completed",
      date: "2025-03-15T00:00:00.000Z",
      owner: "John Doe",
      components: 8,
      changes: 42,
    },
    {
      id: "release-6",
      name: "v2.2.0",
      description: "Platform catalog and metrics dashboard",
      status: "completed",
      date: "2025-02-28T00:00:00.000Z",
      owner: "Alex Johnson",
      components: 15,
      changes: 78,
    },
  ];

  // Define item type interface
  interface ReleaseItem {
    id: string;
    name: string;
    description: string;
    status: string;
    date: string;
    owner: string;
    components: number;
    changes: number;
  }

  // Filter functions
  const filterItems = (items: ReleaseItem[], query: string): ReleaseItem[] => {
    if (!query) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.owner.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredUpcomingReleases = filterItems(upcomingReleases, searchQuery);
  const filteredPastReleases = filterItems(pastReleases, searchQuery);

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Scheduled</span>;
      case "in_progress":
        return <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full">In Progress</span>;
      case "ready":
        return <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Ready</span>;
      case "completed":
        return <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Completed</span>;
      default:
        return <span className="text-xs bg-gray-500/10 text-gray-500 px-2 py-0.5 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Release Management</h1>
          <p className="text-muted-foreground">
            Plan, track, and manage software releases
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Release
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search releases..."
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
                Upcoming Releases
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingReleases.length}</div>
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
                Ready for Release
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {upcomingReleases.filter(r => r.status === "ready").length}
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
                In Progress
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {upcomingReleases.filter(r => r.status === "in_progress").length}
              </div>
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
                Total Releases
              </CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {upcomingReleases.length + pastReleases.length}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Releases</TabsTrigger>
          <TabsTrigger value="past">Past Releases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredUpcomingReleases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/releases/${release.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{release.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {release.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <ArrowUpCircle className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(release.date).toLocaleDateString()}</span>
                          </div>
                          <div>
                            {getStatusBadge(release.status)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span>{release.components} components</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitBranch className="h-4 w-4 text-muted-foreground" />
                            <span>{release.changes} changes</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Owner: {release.owner}
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
              transition={{ duration: 0.3, delay: filteredUpcomingReleases.length * 0.1 }}
            >
              <Link href="/dashboard/releases/create">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New Release
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPastReleases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/releases/${release.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{release.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {release.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Tag className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(release.date).toLocaleDateString()}</span>
                          </div>
                          <div>
                            {getStatusBadge(release.status)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span>{release.components} components</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitBranch className="h-4 w-4 text-muted-foreground" />
                            <span>{release.changes} changes</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Owner: {release.owner}
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
