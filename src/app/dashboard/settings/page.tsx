"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { 
  Palette, Check, Moon, Sun, Monitor, Layout, 
  PanelLeft, Maximize, Minimize, Save, RotateCcw
} from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#0284c7");
  const [accentColor, setAccentColor] = useState("#f97316");
  const [fontSize, setFontSize] = useState("medium");
  const [contentDensity, setContentDensity] = useState("comfortable");
  const [sidebarMode, setSidebarMode] = useState("expanded");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  // Colors
  const primaryColors = [
    { name: "Blue", value: "#0284c7" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Pink", value: "#ec4899" },
    { name: "Orange", value: "#f97316" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Indigo", value: "#6366f1" },
  ];
  
  const accentColors = [
    { name: "Orange", value: "#f97316" },
    { name: "Yellow", value: "#eab308" },
    { name: "Green", value: "#10b981" },
    { name: "Blue", value: "#0284c7" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Red", value: "#ef4444" },
    { name: "Teal", value: "#14b8a6" },
  ];

  // Ensure theme component works properly with SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme settings
  const applySettings = () => {
    // In a real implementation, this would save to user preferences
    // and apply the CSS variables to the root element
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
    
    // Apply font size
    document.documentElement.setAttribute('data-font-size', fontSize);
    
    // Apply content density
    document.documentElement.setAttribute('data-density', contentDensity);
    
    // Apply sidebar mode
    document.documentElement.setAttribute('data-sidebar', sidebarMode);
    
    // Apply animations setting
    document.documentElement.setAttribute('data-animations', animationsEnabled ? 'enabled' : 'disabled');
  };
  
  // Reset to defaults
  const resetToDefaults = () => {
    setPrimaryColor("#0284c7");
    setAccentColor("#f97316");
    setFontSize("medium");
    setContentDensity("comfortable");
    setSidebarMode("expanded");
    setAnimationsEnabled(true);
    setTheme("system");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Customize your platform experience
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetToDefaults}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button onClick={applySettings}>
            <Save className="mr-2 h-4 w-4" />
            Apply Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Choose your preferred color theme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`border rounded-lg p-4 cursor-pointer ${theme === 'light' ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setTheme('light')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Sun className="h-5 w-5 mr-2" />
                      <span className="font-medium">Light</span>
                    </div>
                    {theme === 'light' && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="h-24 bg-white border rounded-md shadow-sm"></div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`border rounded-lg p-4 cursor-pointer ${theme === 'dark' ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Moon className="h-5 w-5 mr-2" />
                      <span className="font-medium">Dark</span>
                    </div>
                    {theme === 'dark' && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="h-24 bg-gray-900 border border-gray-800 rounded-md shadow-sm"></div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`border rounded-lg p-4 cursor-pointer ${theme === 'system' ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setTheme('system')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Monitor className="h-5 w-5 mr-2" />
                      <span className="font-medium">System</span>
                    </div>
                    {theme === 'system' && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="h-24 bg-gradient-to-r from-white to-gray-900 border rounded-md shadow-sm"></div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
              <CardDescription>
                Customize the platform colors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Color</label>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {primaryColors.map((color) => (
                      <div
                        key={color.value}
                        className={`h-10 rounded-md cursor-pointer flex items-center justify-center ${
                          primaryColor === color.value ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setPrimaryColor(color.value)}
                      >
                        {primaryColor === color.value && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-2">
                    <Input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 p-1 mr-2"
                    />
                    <Input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Accent Color</label>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {accentColors.map((color) => (
                      <div
                        key={color.value}
                        className={`h-10 rounded-md cursor-pointer flex items-center justify-center ${
                          accentColor === color.value ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setAccentColor(color.value)}
                      >
                        {accentColor === color.value && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-2">
                    <Input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 p-1 mr-2"
                    />
                    <Input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="layout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Layout Preferences</CardTitle>
              <CardDescription>
                Configure how content is displayed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Density</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`border rounded-lg p-4 cursor-pointer ${contentDensity === 'comfortable' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setContentDensity('comfortable')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Layout className="h-5 w-5 mr-2" />
                          <span className="font-medium">Comfortable</span>
                        </div>
                        {contentDensity === 'comfortable' && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="space-y-3">
                        <div className="h-6 bg-primary/20 rounded-md w-full"></div>
                        <div className="h-6 bg-primary/20 rounded-md w-full"></div>
                        <div className="h-6 bg-primary/20 rounded-md w-full"></div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`border rounded-lg p-4 cursor-pointer ${contentDensity === 'compact' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setContentDensity('compact')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Minimize className="h-5 w-5 mr-2" />
                          <span className="font-medium">Compact</span>
                        </div>
                        {contentDensity === 'compact' && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="space-y-1">
                        <div className="h-5 bg-primary/20 rounded-md w-full"></div>
                        <div className="h-5 bg-primary/20 rounded-md w-full"></div>
                        <div className="h-5 bg-primary/20 rounded-md w-full"></div>
                        <div className="h-5 bg-primary/20 rounded-md w-full"></div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`border rounded-lg p-4 cursor-pointer ${contentDensity === 'spacious' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setContentDensity('spacious')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Maximize className="h-5 w-5 mr-2" />
                          <span className="font-medium">Spacious</span>
                        </div>
                        {contentDensity === 'spacious' && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="space-y-4">
                        <div className="h-7 bg-primary/20 rounded-md w-full"></div>
                        <div className="h-7 bg-primary/20 rounded-md w-full"></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sidebar Mode</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`border rounded-lg p-4 cursor-pointer ${sidebarMode === 'expanded' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setSidebarMode('expanded')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <PanelLeft className="h-5 w-5 mr-2" />
                          <span className="font-medium">Expanded</span>
                        </div>
                        {sidebarMode === 'expanded' && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex h-24">
                        <div className="w-1/4 bg-primary/20 rounded-l-md"></div>
                        <div className="w-3/4 bg-primary/10 rounded-r-md"></div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`border rounded-lg p-4 cursor-pointer ${sidebarMode === 'collapsed' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setSidebarMode('collapsed')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Minimize className="h-5 w-5 mr-2" />
                          <span className="font-medium">Collapsed</span>
                        </div>
                        {sidebarMode === 'collapsed' && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex h-24">
                        <div className="w-1/12 bg-primary/20 rounded-l-md"></div>
                        <div className="w-11/12 bg-primary/10 rounded-r-md"></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accessibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Settings</CardTitle>
              <CardDescription>
                Configure settings to improve accessibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Font Size</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`border rounded-lg p-4 cursor-pointer ${fontSize === 'small' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setFontSize('small')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Small</span>
                        {fontSize === 'small' && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-sm text-muted-foreground">Compact text for more content</p>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`border rounded-lg p-4 cursor-pointer ${fontSize === 'medium' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setFontSize('medium')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Medium</span>
                        {fontSize === 'medium' && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-muted-foreground">Standard text size</p>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`border rounded-lg p-4 cursor-pointer ${fontSize === 'large' ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setFontSize('large')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-lg">Large</span>
                        {fontSize === 'large' && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-lg text-muted-foreground">Larger text for better readability</p>
                    </motion.div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Animations</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="animations-toggle"
                      checked={animationsEnabled}
                      onChange={(e) => setAnimationsEnabled(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <label htmlFor="animations-toggle">Enable animations</label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Disable animations for reduced motion sensitivity
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contrast</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="contrast-normal"
                        name="contrast"
                        checked
                        className="h-4 w-4"
                      />
                      <label htmlFor="contrast-normal">Normal contrast</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="contrast-high"
                        name="contrast"
                        className="h-4 w-4"
                      />
                      <label htmlFor="contrast-high">High contrast</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="p-4 border rounded-md bg-muted/50">
        <div className="flex items-center">
          <Palette className="h-5 w-5 mr-2 text-primary" />
          <h3 className="font-medium">Theme Preview</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          This is how your selected theme will look
        </p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-10 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
              Primary Button
            </div>
            <div className="h-10 bg-secondary rounded-md flex items-center justify-center text-secondary-foreground">
              Secondary Button
            </div>
            <div className="h-10 bg-accent rounded-md flex items-center justify-center text-accent-foreground">
              Accent Button
            </div>
            <div className="h-10 bg-destructive rounded-md flex items-center justify-center text-destructive-foreground">
              Destructive Button
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="p-4 border rounded-md bg-card text-card-foreground">
              <h4 className="font-medium">Card Title</h4>
              <p className="text-sm text-muted-foreground">This is a card with some sample content to preview your theme.</p>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" checked />
              <input type="radio" className="h-4 w-4" checked />
              <div className="h-4 w-4 rounded-full bg-primary"></div>
              <div className="h-4 w-4 rounded-full bg-accent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
