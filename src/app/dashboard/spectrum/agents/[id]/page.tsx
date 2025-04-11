"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleGuard } from "@/components/auth/role-guard";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Trash2, Play, Pause, Code, FileText, Bug, GitBranch, Workflow, Lightbulb, Braces, Bot } from "lucide-react";
import Link from "next/link";

export default function SpectrumAgentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(true);

  // Mock data for the agent
  const agent = {
    id,
    name: "Code Generator",
    description: "Generates code based on specifications",
    type: "development",
    status: "active",
    model: "GPT-4",
    owner: "John Doe",
    created: "2025-02-10T00:00:00.000Z",
    updated: "2025-03-15T00:00:00.000Z",
    configuration: {
      temperature: 0.5,
      maxTokens: 4096,
      topP: 0.95,
      frequencyPenalty: 0.2,
      presencePenalty: 0.2,
    },
    usage: {
      totalCalls: 850,
      averageLatency: "380ms",
      tokensConsumed: "3.8M",
      lastWeekCalls: 210,
    },
    prompt: `You are a Code Generator AI that helps developers generate code based on specifications.

Instructions:
1. Generate code that follows best practices and includes comments.
2. Focus on readability, maintainability, and performance.
3. Provide explanations for your implementation choices.
4. If you're unsure about something, ask clarifying questions.

Context: You have access to the company's code repositories and documentation.`,
    integrations: [
      {
        id: "integration-1",
        name: "GitHub",
        status: "connected",
      },
      {
        id: "integration-2",
        name: "VS Code Extension",
        status: "installed",
      },
    ],
  };

  const toggleStatus = () => {
    setIsRunning(!isRunning);
  };

  // Get the appropriate icon based on agent type
  const getAgentIcon = (type: string) => {
    switch (type) {
      case "planning":
        return <Lightbulb className="h-4 w-4 text-muted-foreground" />;
      case "development":
        return <Code className="h-4 w-4 text-muted-foreground" />;
      case "testing":
        return <Bug className="h-4 w-4 text-muted-foreground" />;
      case "deployment":
        return <GitBranch className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Bot className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/spectrum")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Spectrum
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{agent.name}</h1>
          <p className="text-muted-foreground">{agent.description}</p>
          <div className="flex items-center mt-1">
            {getAgentIcon(agent.type)}
            <span className="ml-1 text-sm capitalize">{agent.type} Agent</span>
          </div>
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
              <Bot className="h-4 w-4 text-muted-foreground" />
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
              <div className="h-4 w-4 text-muted-foreground" />
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
                        <div className="text-sm text-muted-foreground capitalize">{agent.type}</div>
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
                  <CardTitle>Capabilities</CardTitle>
                  <CardDescription>
                    What this agent can do
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agent.type === "development" && (
                      <>
                        <div className="flex items-center p-2 border rounded-md">
                          <Code className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Generate Code</div>
                            <div className="text-sm text-muted-foreground">Creates code based on specifications</div>
                          </div>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <Braces className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Explain Code</div>
                            <div className="text-sm text-muted-foreground">Provides explanations for code</div>
                          </div>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Document Code</div>
                            <div className="text-sm text-muted-foreground">Generates documentation for code</div>
                          </div>
                        </div>
                      </>
                    )}
                    {agent.type === "planning" && (
                      <>
                        <div className="flex items-center p-2 border rounded-md">
                          <Lightbulb className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Analyze Requirements</div>
                            <div className="text-sm text-muted-foreground">Reviews and improves requirements</div>
                          </div>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Generate User Stories</div>
                            <div className="text-sm text-muted-foreground">Creates user stories from requirements</div>
                          </div>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <Workflow className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Estimate Effort</div>
                            <div className="text-sm text-muted-foreground">Provides effort estimates for tasks</div>
                          </div>
                        </div>
                      </>
                    )}
                    {agent.type === "testing" && (
                      <>
                        <div className="flex items-center p-2 border rounded-md">
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Generate Test Cases</div>
                            <div className="text-sm text-muted-foreground">Creates test cases from requirements</div>
                          </div>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <Bug className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Analyze Bugs</div>
                            <div className="text-sm text-muted-foreground">Reviews bugs and suggests fixes</div>
                          </div>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <Code className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Optimize Test Coverage</div>
                            <div className="text-sm text-muted-foreground">Suggests improvements to test coverage</div>
                          </div>
                        </div>
                      </>
                    )}
                    {agent.type === "deployment" && (
                      <>
                        <div className="flex items-center p-2 border rounded-md">
                          <GitBranch className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Validate Deployments</div>
                            <div className="text-sm text-muted-foreground">Checks deployment configurations</div>
                          </div>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Generate Release Notes</div>
                            <div className="text-sm text-muted-foreground">Creates release notes from changes</div>
                          </div>
                        </div>
                        <div className="flex items-center p-2 border rounded-md">
                          <Workflow className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Optimize Infrastructure</div>
                            <div className="text-sm text-muted-foreground">Suggests infrastructure improvements</div>
                          </div>
                        </div>
                      </>
                    )}
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
                    <Workflow className="h-16 w-16 text-muted mb-2" />
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
                {agent.integrations.map((integration) => (
                  <div key={integration.id} className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {integration.name === "GitHub" && <GitBranch className="h-5 w-5 mr-2" />}
                        {integration.name === "VS Code Extension" && <Code className="h-5 w-5 mr-2" />}
                        <div>
                          <div className="font-medium">{integration.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Status: <span className="text-green-500 capitalize">{integration.status}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </div>
                ))}
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Workflow className="h-5 w-5 mr-2" />
                      <div>
                        <div className="font-medium">CI/CD Pipeline</div>
                        <div className="text-sm text-muted-foreground">Integrate with CI/CD workflows</div>
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bot className="h-5 w-5 mr-2" />
                      <div>
                        <div className="font-medium">Slack</div>
                        <div className="text-sm text-muted-foreground">Use this agent in Slack channels</div>
                      </div>
                    </div>
                    <Button variant="outline">Connect</Button>
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
