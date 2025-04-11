"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Database, Server, Code, PlusCircle, Search, BrainCircuit, Layers, Cpu, Workflow } from "lucide-react";
import Link from "next/link";

export default function AIStudioPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for AI Studio items
  const agents = [
    {
      id: "agent-1",
      name: "Code Assistant",
      description: "AI agent for code generation and review",
      type: "assistant",
      status: "active",
    },
    {
      id: "agent-2",
      name: "Documentation Generator",
      description: "Generates documentation from code and comments",
      type: "assistant",
      status: "active",
    },
    {
      id: "agent-3",
      name: "Test Generator",
      description: "Creates test cases based on code functionality",
      type: "assistant",
      status: "active",
    },
  ];

  const ragPipelines = [
    {
      id: "pipeline-1",
      name: "Knowledge Base RAG",
      description: "Retrieval pipeline for internal knowledge base",
      documents: 1250,
      status: "active",
    },
    {
      id: "pipeline-2",
      name: "Code Repository RAG",
      description: "Retrieval pipeline for code repositories",
      documents: 3420,
      status: "active",
    },
    {
      id: "pipeline-3",
      name: "Documentation RAG",
      description: "Retrieval pipeline for technical documentation",
      documents: 850,
      status: "active",
    },
  ];

  const vectorStores = [
    {
      id: "vectorstore-1",
      name: "Knowledge Base Embeddings",
      description: "Vector store for knowledge base documents",
      vectors: "1.2M",
      status: "active",
    },
    {
      id: "vectorstore-2",
      name: "Code Repository Embeddings",
      description: "Vector store for code snippets and functions",
      vectors: "3.5M",
      status: "active",
    },
    {
      id: "vectorstore-3",
      name: "Documentation Embeddings",
      description: "Vector store for technical documentation",
      vectors: "850K",
      status: "active",
    },
  ];

  const mcpServers = [
    {
      id: "mcp-1",
      name: "Production MCP",
      description: "Production model control plane server",
      models: 5,
      status: "active",
    },
    {
      id: "mcp-2",
      name: "Development MCP",
      description: "Development model control plane server",
      models: 8,
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

  const filteredAgents = filterItems(agents, searchQuery);
  const filteredRagPipelines = filterItems(ragPipelines, searchQuery);
  const filteredVectorStores = filterItems(vectorStores, searchQuery);
  const filteredMcpServers = filterItems(mcpServers, searchQuery);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sage AI Studio</h1>
          <p className="text-muted-foreground">
            Manage your AI agents, RAG pipelines, vector stores, and MCP servers
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search AI Studio..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="agents">AI Agents</TabsTrigger>
          <TabsTrigger value="rag-pipelines">RAG Pipelines</TabsTrigger>
          <TabsTrigger value="vector-stores">Vector Stores</TabsTrigger>
          <TabsTrigger value="mcp-servers">MCP Servers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agents" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/ai-studio/agents/${agent.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{agent.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {agent.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <BrainCircuit className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {agent.type}
                          </span>
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
              transition={{ duration: 0.3, delay: filteredAgents.length * 0.1 }}
            >
              <Link href="/dashboard/ai-studio/agents/create">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New Agent
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="rag-pipelines" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRagPipelines.map((pipeline, index) => (
              <motion.div
                key={pipeline.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/ai-studio/rag-pipelines/${pipeline.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{pipeline.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {pipeline.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Workflow className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span>{pipeline.documents} documents</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                            {pipeline.status}
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
              transition={{ duration: 0.3, delay: filteredRagPipelines.length * 0.1 }}
            >
              <Link href="/dashboard/ai-studio/rag-pipelines/create">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New RAG Pipeline
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="vector-stores" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVectorStores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/ai-studio/vector-stores/${store.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{store.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {store.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Layers className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span>{store.vectors} vectors</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                            {store.status}
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
              transition={{ duration: 0.3, delay: filteredVectorStores.length * 0.1 }}
            >
              <Link href="/dashboard/ai-studio/vector-stores/create">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New Vector Store
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="mcp-servers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMcpServers.map((server, index) => (
              <motion.div
                key={server.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/ai-studio/mcp-servers/${server.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{server.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {server.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Cpu className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Server className="h-4 w-4 text-muted-foreground" />
                          <span>{server.models} models</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                            {server.status}
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
              transition={{ duration: 0.3, delay: filteredMcpServers.length * 0.1 }}
            >
              <Link href="/dashboard/ai-studio/mcp-servers/create">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New MCP Server
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
