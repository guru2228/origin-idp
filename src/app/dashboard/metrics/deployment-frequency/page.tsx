"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { BarChart3, LineChart, Download, Filter, Calendar, ArrowRight, ArrowLeft } from "lucide-react";

// Mock chart component - in a real implementation, we would use a charting library like Recharts
interface MockChartProps {
  type: 'bar' | 'line';
  height?: number;
}

const MockChart = ({ type, height = 300 }: MockChartProps) => {
  return (
    <div 
      className={`w-full h-[${height}px] bg-muted/20 rounded-md flex flex-col items-center justify-center`}
      style={{ height: `${height}px` }}
    >
      {type === "bar" && <BarChart3 className="h-16 w-16 text-muted mb-2" />}
      {type === "line" && <LineChart className="h-16 w-16 text-muted mb-2" />}
      <div className="text-sm text-muted-foreground">
        {type.charAt(0).toUpperCase() + type.slice(1)} Chart
      </div>
    </div>
  );
};

export default function MetricsDetailPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [team, setTeam] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: "2025-03-01",
    end: "2025-04-01",
  });

  // Mock data for metrics
  const metrics = {
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
      { id: "custom", name: "Custom Range" },
    ],
    deploymentFrequency: {
      current: "4.2/week",
      previous: "3.8/week",
      change: "+10.5%",
      trend: "up",
      data: [
        { date: "2025-03-01", value: 3 },
        { date: "2025-03-08", value: 4 },
        { date: "2025-03-15", value: 5 },
        { date: "2025-03-22", value: 4 },
        { date: "2025-03-29", value: 5 },
      ],
      byTeam: [
        { team: "Frontend Team", value: 5.1 },
        { team: "Backend Team", value: 3.8 },
        { team: "Mobile Team", value: 2.9 },
        { team: "Data Team", value: 4.7 },
      ],
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Metrics
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deployment Frequency</h1>
          <p className="text-muted-foreground">
            How often code is deployed to production
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
        {timeRange === "custom" && (
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full md:w-auto"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full md:w-auto"
            />
          </div>
        )}
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

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.deploymentFrequency.current}</div>
              <div className="flex items-center mt-1">
                <span className={`text-xs ${metrics.deploymentFrequency.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metrics.deploymentFrequency.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  from previous period
                </span>
              </div>
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
                Previous
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.deploymentFrequency.previous}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Previous period
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
                Industry Benchmark
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.5/week</div>
              <p className="text-xs text-muted-foreground mt-1">
                Elite performance: Daily
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="trend" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trend">Trend</TabsTrigger>
          <TabsTrigger value="by-team">By Team</TabsTrigger>
          <TabsTrigger value="by-system">By System</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trend" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Deployment Frequency Over Time</CardTitle>
                <CardDescription>
                  Weekly deployment frequency trend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="line" height={400} />
              </CardContent>
            </Card>
          </motion.div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Daily Deployments</CardTitle>
                  <CardDescription>
                    Number of deployments per day
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
                  <CardTitle>Deployment Distribution</CardTitle>
                  <CardDescription>
                    Distribution of deployments by day of week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MockChart type="bar" height={300} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="by-team" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Deployment Frequency by Team</CardTitle>
                <CardDescription>
                  Average deployments per week by team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="bar" height={400} />
              </CardContent>
            </Card>
          </motion.div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Team Trends</CardTitle>
                  <CardDescription>
                    Deployment frequency trends by team
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
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Team Comparison</CardTitle>
                  <CardDescription>
                    Comparison to previous period by team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MockChart type="bar" height={300} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="by-system" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Deployment Frequency by System</CardTitle>
                <CardDescription>
                  Average deployments per week by system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="bar" height={400} />
              </CardContent>
            </Card>
          </motion.div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>System Trends</CardTitle>
                  <CardDescription>
                    Deployment frequency trends by system
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
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>System Comparison</CardTitle>
                  <CardDescription>
                    Comparison to previous period by system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MockChart type="bar" height={300} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Industry Comparison</CardTitle>
                <CardDescription>
                  How your deployment frequency compares to industry benchmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MockChart type="bar" height={400} />
              </CardContent>
            </Card>
          </motion.div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Historical Comparison</CardTitle>
                  <CardDescription>
                    Comparison to previous periods
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
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Performance Categories</CardTitle>
                  <CardDescription>
                    Where you fall in industry performance categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MockChart type="bar" height={300} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between mt-4">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Lead Time for Changes
        </Button>
        <Button variant="outline">
          Change Failure Rate
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
