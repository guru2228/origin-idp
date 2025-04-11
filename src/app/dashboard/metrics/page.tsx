"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { BarChart3, LineChart, PieChart, Activity, Calendar, Download, Filter } from "lucide-react";

// Mock chart component - in a real implementation, we would use a charting library like Recharts
const MockChart = ({ type, height = 300 }) => {
  return (
    <div 
      className={`w-full h-[${height}px] bg-muted/20 rounded-md flex flex-col items-center justify-center`}
      style={{ height: `${height}px` }}
    >
      {type === "bar" && <BarChart3 className="h-16 w-16 text-muted mb-2" />}
      {type === "line" && <LineChart className="h-16 w-16 text-muted mb-2" />}
      {type === "pie" && <PieChart className="h-16 w-16 text-muted mb-2" />}
      {type === "activity" && <Activity className="h-16 w-16 text-muted mb-2" />}
      <div className="text-sm text-muted-foreground">
        {type.charAt(0).toUpperCase() + type.slice(1)} Chart
      </div>
    </div>
  );
};

export default function MetricsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [team, setTeam] = useState("all");

  // Mock data for metrics
  const metrics = {
    summary: {
      deploymentFrequency: "4.2/week",
      leadTime: "2.3 days",
      changeFailureRate: "3.8%",
      mttr: "45 minutes",
    },
    teams: [
      { id: "all", name: "All Teams" },
      { id: "team-1", name: "Frontend Team" },
      { id: "team-2", name: "Backend Team" },
      { id: "team-3", name: "Mobile Team" },
      { id: "team-4", name: "Data Team" },
    ],
    timeRanges: [
      { id: "7d", name: "Last 7 Days" },
      { id: "30d", name: "Last 30 Days" },
      { id: "90d", name: "Last 90 Days" },
      { id: "1y", name: "Last Year" },
    ],
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Engineering Metrics</h1>
          <p className="text-muted-foreground">
            Track and analyze your engineering team's performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {metrics.timeRanges.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  {range.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-auto">
          <Select value={team} onValueChange={setTeam}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select team" />
            </SelectTrigger>
            <SelectContent>
              {metrics.teams.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                Deployment Frequency
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.summary.deploymentFrequency}</div>
              <p className="text-xs text-muted-foreground">
                +12% from previous period
              </p>
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
                Lead Time for Changes
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.summary.leadTime}</div>
              <p className="text-xs text-muted-foreground">
                -8% from previous period
              </p>
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
                Change Failure Rate
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.summary.changeFailureRate}</div>
              <p className="text-xs text-muted-foreground">
                -2.1% from previous period
              </p>
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
                Mean Time to Recovery
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.summary.mttr}</div>
              <p className="text-xs text-muted-foreground">
                -15% from previous period
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="dora" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dora">DORA Metrics</TabsTrigger>
          <TabsTrigger value="velocity">Team Velocity</TabsTrigger>
          <TabsTrigger value="quality">Code Quality</TabsTrigger>
          <TabsTrigger value="custom">Custom Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dora" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Deployment Frequency</CardTitle>
                  <CardDescription>
                    How often code is deployed to production
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MockChart type="bar" height={300} />
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
                  <CardTitle>Lead Time for Changes</CardTitle>
                  <CardDescription>
                    Time from code commit to production deployment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MockChart type="line" height={300} />
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Change Failure Rate</CardTitle>
                  <CardDescription>
                    Percentage of deployments causing failures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MockChart type="line" height={300} />
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Mean Time to Recovery</CardTitle>
                  <CardDescription>
                    Time to restore service after a failure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MockChart type="bar" height={300} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="velocity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Story Points Completed</CardTitle>
                <CardDescription>
                  Story points completed per sprint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="bar" height={300} />
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Cycle Time</CardTitle>
                <CardDescription>
                  Average time to complete a task
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="line" height={300} />
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Sprint Burndown</CardTitle>
                <CardDescription>
                  Remaining work in current sprint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="line" height={300} />
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Team Capacity</CardTitle>
                <CardDescription>
                  Available capacity vs. utilized capacity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="bar" height={300} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="quality" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Code Coverage</CardTitle>
                <CardDescription>
                  Percentage of code covered by tests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="line" height={300} />
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Technical Debt</CardTitle>
                <CardDescription>
                  Estimated effort to fix code issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="bar" height={300} />
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Bug Density</CardTitle>
                <CardDescription>
                  Number of bugs per 1000 lines of code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="line" height={300} />
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Code Complexity</CardTitle>
                <CardDescription>
                  Cyclomatic complexity trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="line" height={300} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Metrics</CardTitle>
              <CardDescription>
                Create and configure your own metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Custom Metrics Yet</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-4">
                  Create custom metrics to track specific aspects of your engineering process that matter to your team.
                </p>
                <Button>Create Custom Metric</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
