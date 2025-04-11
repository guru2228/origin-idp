"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/layout/theme-provider";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { sidebarMode, setSidebarMode } = useTheme();

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

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector(".sidebar");
      const toggleButton = document.querySelector(".sidebar-toggle");

      if (
        isMobileOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setSidebarMode(sidebarMode === "expanded" ? "collapsed" : "expanded");
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={`sidebar-toggle fixed top-4 left-4 z-50 md:hidden ${
          isMobileOpen ? "left-[calc(var(--sidebar-width)-3rem)]" : "left-4"
        }`}
        onClick={toggleSidebar}
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <div
        className={`sidebar fixed top-0 left-0 h-full border-r z-40 transition-all duration-300 ${
          isMobile ? (isMobileOpen ? "open" : "") : ""
        }`}
        style={{ backgroundColor: 'hsl(var(--background))' }}
      >
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-[-12px] h-6 w-6 rounded-full border z-10"
            style={{ backgroundColor: 'hsl(var(--background))' }}
            onClick={toggleSidebar}
          >
            {sidebarMode === "expanded" ? (
              <ChevronLeft className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        )}
        
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
