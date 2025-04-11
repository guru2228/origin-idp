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
  ArrowLeft, Edit, Trash2, FileText, Book, Folder, Tag, Clock, 
  User, Search, PlusCircle, ArrowUpCircle, Database, Server
} from "lucide-react";
import Link from "next/link";

export default function KnowledgeBaseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for the knowledge base
  const knowledgeBase = {
    id,
    name: "Platform Documentation",
    description: "Official documentation for the Origin platform",
    documents: 156,
    owner: "Platform Team",
    updated: "2025-04-01T00:00:00.000Z",
    created: "2024-10-15T00:00:00.000Z",
    vectorStore: "platform-docs-embeddings",
    categories: [
      { id: "cat-1", name: "Getting Started", documents: 12 },
      { id: "cat-2", name: "AI Studio", documents: 28 },
      { id: "cat-3", name: "Spectrum SDLC", documents: 24 },
      { id: "cat-4", name: "Platform Catalog", documents: 18 },
      { id: "cat-5", name: "Metrics Dashboard", documents: 15 },
    ],
    documents: [
      {
        id: "doc-1",
        title: "Getting Started with Origin Platform",
        category: "Getting Started",
        author: "Jane Smith",
        updated: "2025-04-10T00:00:00.000Z",
        tags: ["getting-started", "overview"],
      },
      {
        id: "doc-2",
        title: "AI Studio Overview",
        category: "AI Studio",
        author: "John Doe",
        updated: "2025-04-08T00:00:00.000Z",
        tags: ["ai-studio", "overview"],
      },
      {
        id: "doc-3",
        title: "Creating RAG Pipelines",
        category: "AI Studio",
        author: "Alex Johnson",
        updated: "2025-04-05T00:00:00.000Z",
        tags: ["ai-studio", "rag", "pipelines"],
      },
      {
        id: "doc-4",
        title: "Spectrum SDLC Integration Guide",
        category: "Spectrum SDLC",
        author: "Sarah Williams",
        updated: "2025-04-02T00:00:00.000Z",
        tags: ["spectrum", "integration"],
      },
      {
        id: "doc-5",
        title: "Platform Catalog Management",
        category: "Platform Catalog",
        author: "Mike Brown",
        updated: "2025-03-30T00:00:00.000Z",
        tags: ["catalog", "management"],
      },
    ],
    recentSearches: [
      "RAG pipelines",
      "vector embeddings",
      "AI agents",
      "metrics dashboard",
      "authentication",
    ],
  };

  // Filter functions
  const filterDocuments = (documents, query) => {
    if (!query) return documents;
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(query.toLowerCase()) || 
      doc.category.toLowerCase().includes(query.toLowerCase()) ||
      doc.author.toLowerCase().includes(query.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filteredDocuments = filterDocuments(knowledgeBase.documents, searchQuery);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/knowledge-base")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Knowledge Base
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{knowledgeBase.name}</h1>
          <p className="text-muted-foreground">{knowledgeBase.description}</p>
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
            <PlusCircle className="mr-2 h-4 w-4" />
            New Document
          </Button>
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
                Documents
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{knowledgeBase.documents.length}</div>
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
                Categories
              </CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{knowledgeBase.categories.length}</div>
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
                Vector Store
              </CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">{knowledgeBase.vectorStore}</div>
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
                Last Updated
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Date(knowledgeBase.updated).toLocaleDateString()}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all-documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-documents">All Documents</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="semantic-search">Semantic Search</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-documents" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc, index) => (
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
                          {doc.category}
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
                          {doc.tags.map(tag => (
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
              transition={{ duration: 0.3, delay: filteredDocuments.length * 0.1 }}
            >
              <Link href={`/dashboard/knowledge-base/${id}/document/create`}>
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
        
        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {knowledgeBase.categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/dashboard/knowledge-base/${id}/category/${category.id}`}>
                  <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {category.documents} documents
                        </CardDescription>
                      </div>
                      <div className="rounded-full p-2 bg-primary/10">
                        <Folder className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground mr-1" />
                          <span>
                            {filteredDocuments.filter(doc => doc.category === category.name).length} documents
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
              transition={{ duration: 0.3, delay: knowledgeBase.categories.length * 0.1 }}
            >
              <Link href={`/dashboard/knowledge-base/${id}/category/create`}>
                <Card className="h-full border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-col items-center justify-center h-[140px]">
                    <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <CardTitle className="text-muted-foreground">
                      Create New Category
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="semantic-search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Semantic Search</CardTitle>
              <CardDescription>
                Search documents using natural language queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a question about the platform..."
                    className="flex-1"
                  />
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recent Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {knowledgeBase.recentSearches.map((search, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSearchQuery(search)}
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex items-center mb-2">
                    <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Vector Database Information</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">Vector Store:</div>
                      <div>{knowledgeBase.vectorStore}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">Embedding Model:</div>
                      <div>OpenAI Ada 002</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">Vector Dimensions:</div>
                      <div>1536</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">Total Vectors:</div>
                      <div>2,450</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">Last Updated:</div>
                      <div>{new Date(knowledgeBase.updated).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
