
"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/components/theme-provider';

export default function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Avoid rendering on server or during hydration mismatch for theme
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null; 
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full shadow-lg border-border bg-background/80 backdrop-blur-md hover:bg-accent hover:text-accent-foreground w-12 h-12"
              aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Moon className="h-6 w-6" />
              ) : (
                <Sun className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" align="center" className="bg-popover text-popover-foreground p-2 rounded-md shadow-md">
            <p>{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
