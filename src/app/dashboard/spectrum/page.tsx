"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, PlusCircle, Code, FileText, Bug, GitBranch, Zap, Sparkles, Bot, Workflow, Lightbulb, Braces } from "lucide-react";
import Link from "next/link";

export default function SpectrumPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for Spectrum AI SDLC agents
  const planningAgents = [
    {
      id: "planning-1",
      name: "Requirements Analyzer",
      description: "Analyzes requirements and suggests improvements",
      status: "active",
    },
    {
      id: "planning-2",
      name: "User Story Generator",
      description: "Generates user stories from requirements",
      status: "active",
    },
    {
      id: "planning-3",
      name: "Effort Estimator",
      description: "Estimates effort for tasks and stories",
      status: "active",
    },
  ];

  const developmentAgents = [
    {
      id: "dev-1",
      name: "Code Generator",
      description: "Generates code based on specifications",
      status: "active",
    },
    {
      id: "dev-2",
      name: "Code Reviewer",
      description: "Reviews code for quality and security issues",
      status: "active",
    },
    {
      id: "dev-3",
      name: "Refactoring Assistant",
      description: "Suggests code refactoring improvements",
      status: "active",
    },
  ];

  const testingAgents = [
    {
      id: "test-1",
      name: "Test Case Generator",
      description: "Generates test cases from requirements",
      status: "active",
    },
    {
      id: "test-2",
      name: "Bug Analyzer",
      description: "Analyzes bugs and suggests fixes",
      status: "active",
    },
    {
      id: "test-3",
      name: "Test Coverage Optimizer",
      description: "Suggests improvements to test coverage",
      status: "active",
    },
  ];

  const deploymentAgents = [
    {
      id: "deploy-1",
      name: "Deployment Validator",
      description: "Validates deployment configurations",
      status: "active",
    },
    {
      id: "deploy-2",
      name: "Release Notes Generator",
      description: "Generates release notes from changes",
      status: "active",
    },
    {
      id: "deploy-3",
      name: "Infrastructure Optimizer",
      description: "Suggests infrastructure optimizations",
      status: "active",
    },
  ];

  // Filter functions
  const filterItems = (items, query) => {
    if (!query) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredPlanningAgents = filterItems(planningAgents, searchQuery);
  const filteredDevelopmentAgents = filterItems(developmentAgents, searchQuery);
  const filteredTestingAgents = filterItems(testingAgents, searchQuery);
  const filteredDeploymentAgents = filterItems(deploymentAgents, searchQuery);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Spectrum AI SDLC</h1>
          <p className="text-muted-foreground">
            AI-powered agents for every stage of the software development lifecycle
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search agents..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="planning" className="space-y-4">
        <TabsList>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="planning" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlanningAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/spectrum/agents/${agent.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{agent.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {agent.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>Planning</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                            {agent.status}
                          </span>
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
              transition={{ duration: 0.3, delay: filteredPlanningAgents.length * 0.1 }}
            >
              <Link href="/dashboard/spectrum/agents/create?type=planning">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create Planning Agent
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="development" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDevelopmentAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/spectrum/agents/${agent.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{agent.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {agent.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Braces className="h-4 w-4 text-muted-foreground" />
                          <span>Development</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                            {agent.status}
                          </span>
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
              transition={{ duration: 0.3, delay: filteredDevelopmentAgents.length * 0.1 }}
            >
              <Link href="/dashboard/spectrum/agents/create?type=development">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create Development Agent
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="testing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTestingAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/spectrum/agents/${agent.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{agent.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {agent.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Bug className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Bot className="h-4 w-4 text-muted-foreground" />
                          <span>Testing</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                            {agent.status}
                          </span>
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
              transition={{ duration: 0.3, delay: filteredTestingAgents.length * 0.1 }}
            >
              <Link href="/dashboard/spectrum/agents/create?type=testing">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create Testing Agent
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="deployment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDeploymentAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/spectrum/agents/${agent.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{agent.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {agent.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <GitBranch className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Workflow className="h-4 w-4 text-muted-foreground" />
                          <span>Deployment</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                            {agent.status}
                          </span>
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
              transition={{ duration: 0.3, delay: filteredDeploymentAgents.length * 0.1 }}
            >
              <Link href="/dashboard/spectrum/agents/create?type=deployment">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create Deployment Agent
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Spectrum AI SDLC Overview</CardTitle>
          <CardDescription>
            AI-powered agents to enhance your software development lifecycle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full p-3 bg-primary/10 mb-3">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">Planning</h3>
              <p className="text-sm text-muted-foreground">
                AI agents that help with requirements analysis, user story generation, and effort estimation.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full p-3 bg-primary/10 mb-3">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">Development</h3>
              <p className="text-sm text-muted-foreground">
                AI agents that assist with code generation, code review, and refactoring suggestions.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full p-3 bg-primary/10 mb-3">
                <Bug className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">Testing</h3>
              <p className="text-sm text-muted-foreground">
                AI agents that generate test cases, analyze bugs, and optimize test coverage.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full p-3 bg-primary/10 mb-3">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">Deployment</h3>
              <p className="text-sm text-muted-foreground">
                AI agents that validate deployments, generate release notes, and optimize infrastructure.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
