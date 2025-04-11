"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, PlusCircle, FileText, Book, Folder, Tag, Clock, User, ArrowUpCircle } from "lucide-react";
import Link from "next/link";

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for knowledge base
  const knowledgeBases = [
    {
      id: "kb-1",
      name: "Platform Documentation",
      description: "Official documentation for the Origin platform",
      documents: 156,
      owner: "Platform Team",
      updated: "2025-04-01T00:00:00.000Z",
    },
    {
      id: "kb-2",
      name: "Development Guidelines",
      description: "Best practices and guidelines for development",
      documents: 87,
      owner: "Engineering Team",
      updated: "2025-03-15T00:00:00.000Z",
    },
    {
      id: "kb-3",
      name: "API Documentation",
      description: "Documentation for all platform APIs",
      documents: 124,
      owner: "API Team",
      updated: "2025-03-28T00:00:00.000Z",
    },
  ];

  const recentDocuments = [
    {
      id: "doc-1",
      title: "Getting Started with AI Studio",
      knowledgeBase: "Platform Documentation",
      author: "Jane Smith",
      updated: "2025-04-10T00:00:00.000Z",
      tags: ["ai-studio", "getting-started"],
    },
    {
      id: "doc-2",
      title: "Spectrum SDLC Integration Guide",
      knowledgeBase: "Platform Documentation",
      author: "John Doe",
      updated: "2025-04-08T00:00:00.000Z",
      tags: ["spectrum", "integration"],
    },
    {
      id: "doc-3",
      title: "Code Review Best Practices",
      knowledgeBase: "Development Guidelines",
      author: "Alex Johnson",
      updated: "2025-04-05T00:00:00.000Z",
      tags: ["code-review", "best-practices"],
    },
    {
      id: "doc-4",
      title: "Platform API Authentication",
      knowledgeBase: "API Documentation",
      author: "Sarah Williams",
      updated: "2025-04-02T00:00:00.000Z",
      tags: ["api", "authentication"],
    },
    {
      id: "doc-5",
      title: "Vector Database Setup Guide",
      knowledgeBase: "Platform Documentation",
      author: "Mike Brown",
      updated: "2025-03-30T00:00:00.000Z",
      tags: ["vector-db", "setup"],
    },
  ];

  // Define item type interface
  interface Item {
    name?: string;
    description?: string;
    title?: string;
    knowledgeBase?: string;
    tags?: string[];
    [key: string]: any;
  }

  // Filter functions
  const filterItems = (items: Item[], query: string): Item[] => {
    if (!query) return items;
    return items.filter(item => 
      (item.name && item.name.toLowerCase().includes(query.toLowerCase())) || 
      (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
      (item.title && item.title.toLowerCase().includes(query.toLowerCase())) ||
      (item.knowledgeBase && item.knowledgeBase.toLowerCase().includes(query.toLowerCase())) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
    );
  };

  const filteredKnowledgeBases = filterItems(knowledgeBases, searchQuery);
  const filteredRecentDocuments = filterItems(recentDocuments, searchQuery);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Search and manage documentation and knowledge
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            New Document
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Knowledge Base
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search knowledge base..."
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
                Knowledge Bases
              </CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{knowledgeBases.length}</div>
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
                Total Documents
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {knowledgeBases.reduce((total, kb) => total + kb.documents, 0)}
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
                Recent Updates
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentDocuments.filter(doc => 
                  new Date(doc.updated) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length}
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
                Contributors
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(recentDocuments.map(doc => doc.author)).size}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="knowledge-bases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="knowledge-bases">Knowledge Bases</TabsTrigger>
          <TabsTrigger value="recent-documents">Recent Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="knowledge-bases" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredKnowledgeBases.map((kb, index) => (
              <motion.div
                key={kb.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/knowledge-base/${kb.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{kb.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {kb.description}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Book className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{kb.documents} documents</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(kb.updated).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Owner: {kb.owner}
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
              transition={{ duration: 0.3, delay: filteredKnowledgeBases.length * 0.1 }}
            >
              <Link href="/dashboard/knowledge-base/create">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New Knowledge Base
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="recent-documents" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecentDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/knowledge-base/document/${doc.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{doc.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {doc.knowledgeBase}
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{doc.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(doc.updated).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {doc.tags && doc.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="text-xs bg-muted px-2 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
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
              transition={{ duration: 0.3, delay: filteredRecentDocuments.length * 0.1 }}
            >
              <Link href="/dashboard/knowledge-base/document/create">
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New Document
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
