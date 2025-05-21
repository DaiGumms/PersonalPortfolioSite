
"use client";

import Link from 'next/link';
import { CodeXml, Home, User, Briefcase, Brain, Users, BookOpen, Download, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#leadership', label: 'Leadership', icon: Brain },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#community', label: 'Community', icon: Users },
  { href: '#blog', label: 'Blog/Events', icon: BookOpen },
  { href: '#resume', label: 'Resume', icon: Download },
  { href: '#ai-tool', label: 'AI Tool', icon: CodeXml },
  { href: '#contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          <Button key={item.label} variant="ghost" asChild className="text-foreground hover:bg-primary/20 hover:text-accent-foreground w-full justify-start">
            <Link href={item.href} onClick={onItemClick}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ) : (
          <TooltipProvider key={item.label} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild className="text-foreground hover:bg-primary/20 hover:text-accent-foreground">
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
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-background"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2">
          <CodeXml className="h-7 w-7 text-accent" />
          <span className="text-xl font-bold text-foreground">PersonalPortfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLinks isMobile={false} />
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
                   <Link href="#home" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <CodeXml className="h-7 w-7 text-accent" />
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
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
