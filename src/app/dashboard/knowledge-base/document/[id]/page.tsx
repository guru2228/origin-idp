"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleGuard } from "@/components/auth/role-guard";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Edit, FileText, Book, Tag, Clock, 
  User, ArrowUpCircle, MessageSquare
} from "lucide-react";
import Link from "next/link";

export default function DocumentDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Mock data for the document
  const document = {
    id,
    title: "Getting Started with AI Studio",
    content: `
# Getting Started with AI Studio

## Introduction

AI Studio is a powerful platform for creating, managing, and deploying AI agents, RAG pipelines, and vector stores. This guide will help you get started with the platform and understand its core capabilities.

## Key Components

### AI Agents

AI agents are intelligent assistants that can perform various tasks within your development workflow. They can be configured with different models, prompts, and parameters to suit your specific needs.

To create a new AI agent:

1. Navigate to the AI Studio dashboard
2. Click on "Create Agent"
3. Select the agent type (Assistant, Function, etc.)
4. Configure the model parameters
5. Define the system prompt
6. Save and deploy your agent

### RAG Pipelines

Retrieval-Augmented Generation (RAG) pipelines combine the power of large language models with your own data. They retrieve relevant information from your knowledge base and use it to generate more accurate and contextual responses.

To create a RAG pipeline:

1. Navigate to the RAG Pipelines tab
2. Click on "Create Pipeline"
3. Connect to a vector store
4. Configure retrieval parameters
5. Set up the generation model
6. Test and deploy your pipeline

### Vector Stores

Vector stores are databases that store embeddings of your documents, enabling semantic search capabilities. They are essential for RAG pipelines and knowledge retrieval.

To create a vector store:

1. Navigate to the Vector Stores tab
2. Click on "Create Vector Store"
3. Select the embedding model
4. Configure storage options
5. Import your documents
6. Index your content

## Best Practices

- Start with a small set of documents to test your RAG pipeline
- Experiment with different embedding models to find the best fit for your data
- Use temperature settings to control creativity vs. determinism in responses
- Regularly update your vector store as new information becomes available
- Monitor usage patterns to optimize performance

## Next Steps

After getting familiar with the basics, explore advanced features such as:

- Custom embedding models
- Multi-step RAG pipelines
- Agent orchestration
- Integration with external systems
- Performance monitoring and optimization

For more detailed information, refer to the specific documentation for each component.
    `,
    knowledgeBase: "Platform Documentation",
    category: "AI Studio",
    author: "Jane Smith",
    created: "2025-03-15T00:00:00.000Z",
    updated: "2025-04-10T00:00:00.000Z",
    tags: ["ai-studio", "getting-started", "rag", "vector-stores"],
    relatedDocuments: [
      {
        id: "doc-3",
        title: "Creating RAG Pipelines",
        category: "AI Studio",
      },
      {
        id: "doc-5",
        title: "Vector Database Setup Guide",
        category: "AI Studio",
      },
      {
        id: "doc-7",
        title: "AI Agent Configuration",
        category: "AI Studio",
      },
    ],
    comments: [
      {
        id: "comment-1",
        author: "John Doe",
        content: "Great introduction! Could we add more examples for different use cases?",
        timestamp: "2025-04-05T00:00:00.000Z",
      },
      {
        id: "comment-2",
        author: "Sarah Williams",
        content: "I've updated the RAG pipeline section with more detailed steps.",
        timestamp: "2025-04-08T00:00:00.000Z",
      },
    ],
    embeddings: {
      model: "OpenAI Ada 002",
      dimensions: 1536,
      lastUpdated: "2025-04-10T00:00:00.000Z",
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{document.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
              <Book className="h-4 w-4" />
              <span>{document.knowledgeBase}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{document.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Updated {new Date(document.updated).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RoleGuard
            allowedRoles={["platform_admin", "tenant_admin", "product_owner"]}
            fallback={null}
          >
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </RoleGuard>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {document.tags.map(tag => (
          <span 
            key={tag} 
            className="text-xs bg-muted px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="comments">Comments ({document.comments.length})</TabsTrigger>
          <TabsTrigger value="related">Related Documents</TabsTrigger>
          <TabsTrigger value="embeddings">Embeddings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                {document.content.split('\n').map((line, index) => {
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
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>
                Discussion and feedback on this document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {document.comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="p-4 border rounded-md"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium">{comment.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-muted-foreground">
                      {comment.content}
                    </div>
                  </motion.div>
                ))}
                
                <div className="pt-4">
                  <textarea 
                    className="w-full p-3 border rounded-md min-h-[100px]" 
                    placeholder="Add a comment..."
                  />
                  <div className="flex justify-end mt-2">
                    <Button>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Add Comment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="related" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Related Documents</CardTitle>
              <CardDescription>
                Other documents you might find useful
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {document.relatedDocuments.map((relatedDoc, index) => (
                  <motion.div
                    key={relatedDoc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    <Link href={`/dashboard/knowledge-base/document/${relatedDoc.id}`}>
                      <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{relatedDoc.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {relatedDoc.category}
                            </div>
                          </div>
                          <ArrowUpCircle className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="embeddings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vector Embeddings</CardTitle>
              <CardDescription>
                Information about the document's vector embeddings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">Embedding Model:</div>
                      <div>{document.embeddings.model}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">Vector Dimensions:</div>
                      <div>{document.embeddings.dimensions}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">Last Updated:</div>
                      <div>{new Date(document.embeddings.lastUpdated).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">About Vector Embeddings</h3>
                  <p className="text-muted-foreground mb-2">
                    Vector embeddings are numerical representations of text that capture semantic meaning. 
                    They enable semantic search, allowing users to find documents based on meaning rather than just keywords.
                  </p>
                  <p className="text-muted-foreground">
                    This document's content has been processed and stored as vectors in our pgvector database, 
                    making it available for semantic search and RAG pipelines.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">
                    Regenerate Embeddings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
