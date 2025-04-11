"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleGuard } from "@/components/auth/role-guard";
import { motion } from "framer-motion";
import { Database, Server, Code, Edit, Trash2, ArrowLeft, BrainCircuit, Workflow, Play, Pause, RefreshCw, BarChart } from "lucide-react";
import Link from "next/link";

export default function AgentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(true);

  // Mock data for the agent
  const agent = {
    id,
    name: "Code Assistant",
    description: "AI agent for code generation and review",
    type: "assistant",
    status: "active",
    model: "GPT-4",
    owner: "Jane Smith",
    created: "2025-02-15T00:00:00.000Z",
    updated: "2025-03-20T00:00:00.000Z",
    ragPipelines: [
      {
        id: "pipeline-2",
        name: "Code Repository RAG",
      }
    ],
    vectorStores: [
      {
        id: "vectorstore-2",
        name: "Code Repository Embeddings",
      }
    ],
    configuration: {
      temperature: 0.7,
      maxTokens: 4096,
      topP: 0.95,
      frequencyPenalty: 0.5,
      presencePenalty: 0.5,
    },
    usage: {
      totalCalls: 1250,
      averageLatency: "450ms",
      tokensConsumed: "5.2M",
      lastWeekCalls: 320,
    },
    prompt: `You are a Code Assistant AI that helps developers with code generation, review, and optimization.

Instructions:
1. When generating code, follow best practices and include comments.
2. For code reviews, focus on security, performance, and readability.
3. Provide explanations for your suggestions.
4. If you're unsure about something, ask clarifying questions.

Context: You have access to the company's code repositories and documentation.`,
  };

  const toggleStatus = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/ai-studio")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to AI Studio
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{agent.name}</h1>
          <p className="text-muted-foreground">{agent.description}</p>
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
          <Button variant="outline" onClick={toggleStatus}>
            {isRunning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start
              </>
            )}
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
                Status
              </CardTitle>
              <div className={`h-4 w-4 rounded-full ${isRunning ? 'bg-green-500' : 'bg-yellow-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isRunning ? 'Running' : 'Paused'}</div>
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
                Model
              </CardTitle>
              <BrainCircuit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.model}</div>
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
                Total Calls
              </CardTitle>
              <Workflow className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.usage.totalCalls}</div>
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
                Avg. Latency
              </CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agent.usage.averageLatency}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Agent Details</CardTitle>
                  <CardDescription>
                    Basic information about this agent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium">Type</div>
                        <div className="text-sm text-muted-foreground">{agent.type}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Owner</div>
                        <div className="text-sm text-muted-foreground">{agent.owner}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Created</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(agent.created).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Updated</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(agent.updated).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">Description</div>
                      <div className="text-sm text-muted-foreground mt-1">{agent.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Connected Resources</CardTitle>
                  <CardDescription>
                    Resources used by this agent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">RAG Pipelines</div>
                      {agent.ragPipelines.map(pipeline => (
                        <Link 
                          key={pipeline.id} 
                          href={`/dashboard/ai-studio/rag-pipelines/${pipeline.id}`}
                          className="block p-2 border rounded-md hover:bg-muted/50 transition-colors mb-2"
                        >
                          <div className="flex items-center">
                            <Workflow className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{pipeline.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Vector Stores</div>
                      {agent.vectorStores.map(store => (
                        <Link 
                          key={store.id} 
                          href={`/dashboard/ai-studio/vector-stores/${store.id}`}
                          className="block p-2 border rounded-md hover:bg-muted/50 transition-colors mb-2"
                        >
                          <div className="flex items-center">
                            <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{store.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Configuration</CardTitle>
              <CardDescription>
                Configure the behavior of this agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Model</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="claude-3-opus">Claude 3 Opus</option>
                    <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                    <option value="llama-3-70b">Llama 3 70B</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Temperature: {agent.configuration.temperature}</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="2" 
                    step="0.1" 
                    value={agent.configuration.temperature} 
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Deterministic (0)</span>
                    <span>Balanced (1)</span>
                    <span>Creative (2)</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Tokens</label>
                  <input 
                    type="number" 
                    value={agent.configuration.maxTokens} 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Top P: {agent.configuration.topP}</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.05" 
                    value={agent.configuration.topP} 
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Frequency Penalty: {agent.configuration.frequencyPenalty}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="2" 
                      step="0.1" 
                      value={agent.configuration.frequencyPenalty} 
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Presence Penalty: {agent.configuration.presencePenalty}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="2" 
                      step="0.1" 
                      value={agent.configuration.presencePenalty} 
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Configuration</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Prompt</CardTitle>
              <CardDescription>
                Define the behavior and capabilities of this agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea 
                  className="w-full h-[300px] p-4 font-mono text-sm border rounded-md"
                  value={agent.prompt}
                />
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Prompt</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>
                  Agent usage over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-full h-[250px] bg-muted/20 rounded-md flex flex-col items-center justify-center">
                    <BarChart className="h-16 w-16 text-muted mb-2" />
                    <div className="text-sm text-muted-foreground">
                      Usage Chart
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Usage Details</CardTitle>
                <CardDescription>
                  Detailed usage information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">Total API Calls</div>
                    <div className="text-2xl font-bold">{agent.usage.totalCalls}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium">Last Week Calls</div>
                    <div className="text-2xl font-bold">{agent.usage.lastWeekCalls}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium">Average Latency</div>
                    <div className="text-2xl font-bold">{agent.usage.averageLatency}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium">Tokens Consumed</div>
                    <div className="text-2xl font-bold">{agent.usage.tokensConsumed}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect this agent to other systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Server className="h-5 w-5 mr-2" />
                      <div>
                        <div className="font-medium">GitHub</div>
                        <div className="text-sm text-muted-foreground">Connect to GitHub repositories</div>
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Code className="h-5 w-5 mr-2" />
                      <div>
                        <div className="font-medium">VS Code Extension</div>
                        <div className="text-sm text-muted-foreground">Use this agent in VS Code</div>
                      </div>
                    </div>
                    <Button variant="outline">Install</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      <div>
                        <div className="font-medium">Slack</div>
                        <div className="text-sm text-muted-foreground">Use this agent in Slack channels</div>
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Workflow className="h-5 w-5 mr-2" />
                      <div>
                        <div className="font-medium">CI/CD Pipeline</div>
                        <div className="text-sm text-muted-foreground">Integrate with CI/CD workflows</div>
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
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
