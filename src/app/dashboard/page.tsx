"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/layout/theme-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Maximize2, Minimize2, GripVertical, Plus, X, 
  BarChart, LineChart, PieChart, Activity, 
  ArrowUpRight, ArrowDownRight, Layers, Code
} from "lucide-react";

// Define widget types
type WidgetType = {
  id: string;
  title: string;
  type: string;
  size: "small" | "medium" | "large";
  content: React.ReactNode;
};

export default function ConfigurableDashboard() {
  const { contentDensity, animationsEnabled } = useTheme();
  const [widgets, setWidgets] = useState<WidgetType[]>([]);
  const [availableWidgets, setAvailableWidgets] = useState<WidgetType[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Initialize widgets
  useEffect(() => {
    // Load from localStorage if available
    const savedWidgets = localStorage.getItem('dashboard-widgets');
    if (savedWidgets) {
      try {
        setWidgets(JSON.parse(savedWidgets));
      } catch (e) {
        console.error("Error loading saved widgets:", e);
        setWidgets(getDefaultWidgets());
      }
    } else {
      setWidgets(getDefaultWidgets());
    }

    // Set available widgets
    setAvailableWidgets(getAllAvailableWidgets());
  }, []);

  // Save widgets to localStorage when they change
  useEffect(() => {
    if (widgets.length > 0) {
      localStorage.setItem('dashboard-widgets', JSON.stringify(widgets));
    }
  }, [widgets]);

  // Default widgets
  const getDefaultWidgets = (): WidgetType[] => [
    {
      id: "widget-1",
      title: "Deployment Frequency",
      type: "chart",
      size: "medium",
      content: (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold">14</div>
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+28.5%</span>
            </div>
          </div>
          <div className="flex-1 flex items-end">
            <div className="w-full h-[80%] flex items-end space-x-2">
              {[40, 25, 35, 30, 45, 35, 55, 40, 45, 50, 60, 55].map((height, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-primary/20 rounded-t-sm" 
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "widget-2",
      title: "Active Workspaces",
      type: "stat",
      size: "small",
      content: (
        <div className="flex flex-col h-full justify-between">
          <div className="text-3xl font-bold">24</div>
          <div className="flex items-center text-green-500 text-sm mt-2">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+12.3%</span>
          </div>
        </div>
      )
    },
    {
      id: "widget-3",
      title: "AI Agent Usage",
      type: "chart",
      size: "medium",
      content: (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold">1,254</div>
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+42.8%</span>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-t from-primary/5 to-transparent rounded-md"></div>
              <div className="absolute inset-0 flex items-end">
                <svg className="w-full h-[80%]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path 
                    d="M0,100 L0,60 C10,50 20,40 30,45 C40,50 50,90 60,80 C70,70 80,30 90,20 L100,10 L100,100 Z" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "widget-4",
      title: "Code Quality",
      type: "stat",
      size: "small",
      content: (
        <div className="flex flex-col h-full justify-between">
          <div className="text-3xl font-bold">A+</div>
          <div className="flex items-center text-green-500 text-sm mt-2">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+2 grades</span>
          </div>
        </div>
      )
    },
    {
      id: "widget-5",
      title: "Recent Releases",
      type: "list",
      size: "large",
      content: (
        <div className="space-y-2">
          {[
            { name: "v2.4.0", date: "2025-04-10", status: "completed" },
            { name: "v2.3.2", date: "2025-03-28", status: "completed" },
            { name: "v2.3.1", date: "2025-03-15", status: "completed" },
            { name: "v2.3.0", date: "2025-03-01", status: "completed" }
          ].map((release, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded-md">
              <div className="font-medium">{release.name}</div>
              <div className="text-sm text-muted-foreground">{release.date}</div>
              <div className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                {release.status}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: "widget-6",
      title: "Knowledge Base Health",
      type: "chart",
      size: "medium",
      content: (
        <div className="h-full flex items-center justify-center">
          <div className="relative h-32 w-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="hsl(var(--muted))" 
                strokeWidth="10" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="10" 
                strokeDasharray="251.2" 
                strokeDashoffset="50.24" 
                transform="rotate(-90 50 50)" 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-bold">80%</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // All available widgets
  const getAllAvailableWidgets = (): WidgetType[] => [
    ...getDefaultWidgets(),
    {
      id: "widget-7",
      title: "Team Velocity",
      type: "chart",
      size: "medium",
      content: (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold">42 pts</div>
            <div className="flex items-center text-red-500 text-sm">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span>-8.5%</span>
            </div>
          </div>
          <div className="flex-1 flex items-end">
            <div className="w-full h-[80%] flex items-end space-x-2">
              {[60, 65, 55, 70, 50, 45, 40, 45, 50, 42, 44, 42].map((height, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-primary/20 rounded-t-sm" 
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "widget-8",
      title: "Active AI Agents",
      type: "stat",
      size: "small",
      content: (
        <div className="flex flex-col h-full justify-between">
          <div className="text-3xl font-bold">18</div>
          <div className="flex items-center text-green-500 text-sm mt-2">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+5 new</span>
          </div>
        </div>
      )
    },
    {
      id: "widget-9",
      title: "System Health",
      type: "chart",
      size: "large",
      content: (
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="space-y-2">
            <div className="text-sm font-medium">CPU Usage</div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[35%]"></div>
            </div>
            <div className="text-sm">35%</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Memory Usage</div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[62%]"></div>
            </div>
            <div className="text-sm">62%</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Storage Usage</div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[78%]"></div>
            </div>
            <div className="text-sm">78%</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Network Usage</div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[42%]"></div>
            </div>
            <div className="text-sm">42%</div>
          </div>
        </div>
      )
    }
  ];

  // Add a widget to the dashboard
  const addWidget = (widgetId: string) => {
    const widgetToAdd = availableWidgets.find(w => w.id === widgetId);
    if (widgetToAdd && !widgets.some(w => w.id === widgetId)) {
      setWidgets([...widgets, widgetToAdd]);
    }
  };

  // Remove a widget from the dashboard
  const removeWidget = (widgetId: string) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    if (!isEditMode) return;
    setIsDragging(true);
    setDraggedWidget(widgetId);
    e.dataTransfer.setData("text/plain", widgetId);
    
    // Set drag image
    const dragImage = document.createElement("div");
    dragImage.classList.add("drag-image");
    dragImage.textContent = "Dragging Widget";
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    
    // Remove the element after drag starts
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetWidgetId: string) => {
    if (!isEditMode || !draggedWidget) return;
    e.preventDefault();
    
    const draggedWidgetId = e.dataTransfer.getData("text/plain");
    if (draggedWidgetId === targetWidgetId) return;
    
    const newWidgets = [...widgets];
    const draggedIndex = newWidgets.findIndex(w => w.id === draggedWidgetId);
    const targetIndex = newWidgets.findIndex(w => w.id === targetWidgetId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [removed] = newWidgets.splice(draggedIndex, 1);
      newWidgets.splice(targetIndex, 0, removed);
      setWidgets(newWidgets);
    }
    
    setIsDragging(false);
    setDraggedWidget(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedWidget(null);
  };

  // Get widget size class
  const getWidgetSizeClass = (size: string) => {
    switch (size) {
      case "small":
        return "col-span-1";
      case "medium":
        return "col-span-2";
      case "large":
        return "col-span-3";
      default:
        return "col-span-1";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Your personalized overview of platform metrics and activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? (
              <>
                <Minimize2 className="mr-2 h-4 w-4" />
                Exit Edit Mode
              </>
            ) : (
              <>
                <Maximize2 className="mr-2 h-4 w-4" />
                Customize Dashboard
              </>
            )}
          </Button>
        </div>
      </div>

      {isEditMode && (
        <Card>
          <CardContent className="p-4">
            <Tabs defaultValue="charts">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Add Widgets</h3>
                <TabsList>
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                  <TabsTrigger value="lists">Lists</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="charts" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {availableWidgets
                    .filter(w => w.type === "chart" && !widgets.some(widget => widget.id === w.id))
                    .map(widget => (
                      <Card key={widget.id} className="cursor-pointer hover:border-primary transition-colors">
                        <CardContent className="p-4 flex items-center justify-between" onClick={() => addWidget(widget.id)}>
                          <div className="flex items-center">
                            {widget.size === "medium" ? (
                              <BarChart className="h-5 w-5 mr-2 text-primary" />
                            ) : widget.size === "large" ? (
                              <LineChart className="h-5 w-5 mr-2 text-primary" />
                            ) : (
                              <PieChart className="h-5 w-5 mr-2 text-primary" />
                            )}
                            <span>{widget.title}</span>
                          </div>
                          <Plus className="h-4 w-4" />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="stats" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {availableWidgets
                    .filter(w => w.type === "stat" && !widgets.some(widget => widget.id === w.id))
                    .map(widget => (
                      <Card key={widget.id} className="cursor-pointer hover:border-primary transition-colors">
                        <CardContent className="p-4 flex items-center justify-between" onClick={() => addWidget(widget.id)}>
                          <div className="flex items-center">
                            <Activity className="h-5 w-5 mr-2 text-primary" />
                            <span>{widget.title}</span>
                          </div>
                          <Plus className="h-4 w-4" />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="lists" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {availableWidgets
                    .filter(w => w.type === "list" && !widgets.some(widget => widget.id === w.id))
                    .map(widget => (
                      <Card key={widget.id} className="cursor-pointer hover:border-primary transition-colors">
                        <CardContent className="p-4 flex items-center justify-between" onClick={() => addWidget(widget.id)}>
                          <div className="flex items-center">
                            <Layers className="h-5 w-5 mr-2 text-primary" />
                            <span>{widget.title}</span>
                          </div>
                          <Plus className="h-4 w-4" />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 dashboard-grid ${
        contentDensity === "compact" ? "gap-2" : contentDensity === "spacious" ? "gap-6" : "gap-4"
      }`}>
        {widgets.map(widget => (
          <motion.div
            key={widget.id}
            className={`${getWidgetSizeClass(widget.size)} ${isMobile ? "col-span-1" : ""}`}
            layout={animationsEnabled}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            draggable={isEditMode}
            onDragStart={(e) => handleDragStart(e, widget.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, widget.id)}
            onDragEnd={handleDragEnd}
          >
            <Card className={`h-full ${isDragging && draggedWidget === widget.id ? "border-dashed border-primary" : ""}`}>
              <CardContent className={`p-4 h-full ${
                contentDensity === "compact" ? "p-2" : contentDensity === "spacious" ? "p-6" : "p-4"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{widget.title}</h3>
                  {isEditMode && (
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" className="h-6 w-6 cursor-grab">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeWidget(widget.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="h-[calc(100%-2rem)]">
                  {widget.content}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {widgets.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10">
          <Code className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No widgets added</h3>
          <p className="text-muted-foreground text-center mb-4">
            Your dashboard is empty. Click the "Customize Dashboard" button to add widgets.
          </p>
          <Button onClick={() => setIsEditMode(true)}>
            <Maximize2 className="mr-2 h-4 w-4" />
            Customize Dashboard
          </Button>
        </div>
      )}
    </div>
  );
}
