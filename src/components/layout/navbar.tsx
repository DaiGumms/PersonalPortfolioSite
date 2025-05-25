
"use client";

import Link from 'next/link';
import { Home, User, Briefcase, Brain, Users, Download, Mail, Menu, X, Wand2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AISummaryToolSection from '@/components/sections/ai-summary-tool';

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#leadership', label: 'Leadership', icon: Brain },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#community', label: 'Community', icon: Users },
  { href: '#contact', label: 'Contact', icon: Mail },
  { href: '#resume', label: 'Resume', icon: Download },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAiToolDialogOpen, setIsAiToolDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ onItemClick, isMobile }: { onItemClick?: () => void; isMobile: boolean }) => (
    <>
      {navItems.map((item) =>
        isMobile ? (
          <SheetClose asChild key={item.label}>
            <Button variant="ghost" asChild className="text-foreground hover:bg-primary/20 hover:text-foreground w-full justify-start">
              <Link href={item.href} onClick={onItemClick}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          </SheetClose>
        ) : (
          <TooltipProvider key={item.label} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild className="text-foreground hover:bg-primary/20 hover:text-foreground">
                  <Link href={item.href} onClick={onItemClick}>
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      )}
    </>
  );

  return (
    <Dialog open={isAiToolDialogOpen} onOpenChange={setIsAiToolDialogOpen}>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-background"
      )}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#home" className="flex items-center gap-2">
            <Lightbulb className="h-7 w-7 text-accent" />
            <span className="text-xl font-bold text-foreground">David Morgan-Gumm</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLinks isMobile={false} />
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <DialogTrigger asChild>
                  <TooltipTrigger asChild>
                     <Button 
                       size="icon" 
                       className="ml-2 rounded-md bg-gradient-to-br from-primary via-accent to-secondary text-accent-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300 hover:from-secondary hover:to-primary"
                     >
                      <Wand2 className="h-5 w-5" />
                      <span className="sr-only">AI Summary Tool</span>
                    </Button>
                  </TooltipTrigger>
                </DialogTrigger>
                <TooltipContent side="bottom">
                  <p>AI Summary Enhancer</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-foreground" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-4">
                     <Link href="#home" className="flex items-center gap-2" onClick={() => { setIsMobileMenuOpen(false); }}>
                      <Lightbulb className="h-7 w-7 text-accent" />
                      <span className="text-xl font-bold text-foreground">Portfolio</span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6 text-foreground" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-2">
                    <NavLinks onItemClick={() => setIsMobileMenuOpen(false)} isMobile={true} />
                     <DialogTrigger asChild>
                        <Button variant="ghost" className="text-foreground hover:bg-primary/20 hover:text-accent-foreground w-full justify-start" onClick={() => {setIsMobileMenuOpen(false); setIsAiToolDialogOpen(true);}}>
                          <Wand2 className="mr-2 h-4 w-4" />
                          AI Summary Enhancer
                        </Button>
                    </DialogTrigger>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <DialogContent className="sm:max-w-[750px] p-0">
        <DialogTitle className="sr-only">AI Self-Summary Enhancer</DialogTitle>
        {/* AISummaryToolSection includes its own Card and padding, so we remove Dialog's default padding with p-0 */}
        <AISummaryToolSection />
      </DialogContent>
    </Dialog>
  );
}
