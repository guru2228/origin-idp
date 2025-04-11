"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FileText, Book, Database, ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateDocumentPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  
  // Mock data for categories
  const categories = [
    { id: "cat-1", name: "Getting Started" },
    { id: "cat-2", name: "AI Studio" },
    { id: "cat-3", name: "Spectrum SDLC" },
    { id: "cat-4", name: "Platform Catalog" },
    { id: "cat-5", name: "Metrics Dashboard" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real implementation, this would save the document to the database
    // and generate vector embeddings for semantic search
    router.push("/dashboard/knowledge-base");
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
        <h1 className="text-3xl font-bold tracking-tight">Create New Document</h1>
        <p className="text-muted-foreground">
          Add a new document to the knowledge base
        </p>
      </div>

      <Tabs defaultValue="editor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="editor">Document Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="embeddings">Vector Embeddings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
              <CardDescription>
                Enter the basic information for this document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input 
                    placeholder="Document title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <Input 
                    placeholder="Enter tags separated by commas" 
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Example: getting-started, tutorial, api
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea 
                    placeholder="Document content in Markdown format" 
                    className="min-h-[300px] font-mono"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Markdown formatting is supported
                  </p>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Document
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{title || "Document Title"}</CardTitle>
              <CardDescription>
                {category || "Category"} • Preview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                {content ? (
                  content.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={index} className="text-3xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-bold mt-5 mb-3">{line.substring(3)}</h2>;
                    } else if (line.startsWith('### ')) {
                      return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>;
                    } else if (line.startsWith('- ')) {
                      return <li key={index} className="ml-6 mb-1">{line.substring(2)}</li>;
                    } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || 
                              line.startsWith('4. ') || line.startsWith('5. ') || line.startsWith('6. ')) {
                      return <li key={index} className="ml-6 mb-1 list-decimal">{line.substring(3)}</li>;
                    } else if (line === '') {
                      return <br key={index} />;
                    } else {
                      return <p key={index} className="mb-4">{line}</p>;
                    }
                  })
                ) : (
                  <p className="text-muted-foreground">Document preview will appear here</p>
                )}
              </div>
              
              {tags && (
                <div className="mt-6">
                  <div className="text-sm font-medium mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {tags.split(',').map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-muted px-2 py-0.5 rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="embeddings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vector Embeddings</CardTitle>
              <CardDescription>
                Configure vector embeddings for semantic search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center mb-2">
                    <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium">Embedding Configuration</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Embedding Model</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="openai-ada-002">OpenAI Ada 002 (1536 dimensions)</option>
                        <option value="openai-text-embedding-3-small">OpenAI Text Embedding 3 Small (1536 dimensions)</option>
                        <option value="openai-text-embedding-3-large">OpenAI Text Embedding 3 Large (3072 dimensions)</option>
                        <option value="cohere-embed-english-v3.0">Cohere Embed English v3.0 (1024 dimensions)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Chunking Strategy</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="paragraph">Paragraph-based</option>
                        <option value="fixed">Fixed-size chunks (1000 tokens)</option>
                        <option value="semantic">Semantic chunking</option>
                        <option value="none">No chunking (embed entire document)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Metadata to Include</label>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input type="checkbox" id="include-title" className="mr-2" checked />
                          <label htmlFor="include-title">Title</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="include-category" className="mr-2" checked />
                          <label htmlFor="include-category">Category</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="include-tags" className="mr-2" checked />
                          <label htmlFor="include-tags">Tags</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="include-author" className="mr-2" checked />
                          <label htmlFor="include-author">Author</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-sm font-medium mb-2">About Vector Embeddings</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Vector embeddings are numerical representations of text that capture semantic meaning. 
                    When you save this document, its content will be processed and stored as vectors in our pgvector database.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This enables semantic search, allowing users to find this document based on meaning rather than just keywords,
                    and makes it available for use in RAG pipelines.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
