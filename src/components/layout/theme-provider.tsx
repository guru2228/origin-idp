"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
};

type ThemeProviderState = {
  theme: string;
  setTheme: (theme: string) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  contentDensity: string;
  setContentDensity: (density: string) => void;
  sidebarMode: string;
  setSidebarMode: (mode: string) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  primaryColor: "#0284c7",
  setPrimaryColor: () => null,
  accentColor: "#f97316",
  setAccentColor: () => null,
  fontSize: "medium",
  setFontSize: () => null,
  contentDensity: "comfortable",
  setContentDensity: () => null,
  sidebarMode: "expanded",
  setSidebarMode: () => null,
  animationsEnabled: true,
  setAnimationsEnabled: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "origin-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(defaultTheme);
  const [primaryColor, setPrimaryColor] = useState("#0284c7");
  const [accentColor, setAccentColor] = useState("#f97316");
  const [fontSize, setFontSize] = useState("medium");
  const [contentDensity, setContentDensity] = useState("comfortable");
  const [sidebarMode, setSidebarMode] = useState("expanded");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("light", "dark");
    
    // Add the appropriate theme class
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      root.style.colorScheme = systemTheme;
    } else {
      root.classList.add(theme);
      root.style.colorScheme = theme;
    }
    
    // Apply other theme settings
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--accent-color', accentColor);
    root.setAttribute('data-font-size', fontSize);
    root.setAttribute('data-density', contentDensity);
    root.setAttribute('data-sidebar', sidebarMode);
    root.setAttribute('data-animations', animationsEnabled ? 'enabled' : 'disabled');
    
    // Save settings to localStorage
    localStorage.setItem(storageKey, JSON.stringify({
      theme,
      primaryColor,
      accentColor,
      fontSize,
      contentDensity,
      sidebarMode,
      animationsEnabled
    }));
  }, [
    theme, 
    primaryColor, 
    accentColor, 
    fontSize, 
    contentDensity, 
    sidebarMode, 
    animationsEnabled,
    storageKey
  ]);

  // Load settings from localStorage on initial render
  useEffect(() => {
    const storedSettings = localStorage.getItem(storageKey);
    
    if (storedSettings) {
      try {
        const settings = JSON.parse(storedSettings);
        setTheme(settings.theme || defaultTheme);
        setPrimaryColor(settings.primaryColor || "#0284c7");
        setAccentColor(settings.accentColor || "#f97316");
        setFontSize(settings.fontSize || "medium");
        setContentDensity(settings.contentDensity || "comfortable");
        setSidebarMode(settings.sidebarMode || "expanded");
        setAnimationsEnabled(settings.animationsEnabled !== undefined ? settings.animationsEnabled : true);
      } catch (e) {
        console.error("Error parsing stored theme settings:", e);
      }
    }
  }, [storageKey, defaultTheme]);

  const value = {
    theme,
    setTheme,
    primaryColor,
    setPrimaryColor,
    accentColor,
    setAccentColor,
    fontSize,
    setFontSize,
    contentDensity,
    setContentDensity,
    sidebarMode,
    setSidebarMode,
    animationsEnabled,
    setAnimationsEnabled,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
