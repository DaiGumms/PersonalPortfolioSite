"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'About' },
  { href: '/journey', label: 'Journey' },
  { href: '/projects', label: 'Projects' },
  { href: '/community', label: 'Community' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ onItemClick, isMobile }: { onItemClick?: () => void; isMobile: boolean }) => (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return isMobile ? (
          <SheetClose asChild key={item.label}>
            <Button
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start text-base font-medium",
                isActive ? "text-primary bg-primary/10" : "text-secondary hover:text-primary hover:bg-surface-low"
              )}
            >
              <Link href={item.href} onClick={onItemClick}>
                {item.label}
              </Link>
            </Button>
          </SheetClose>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-secondary"
            )}
          >
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-t-full" />
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-surface-high/50" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold font-display text-foreground">David Morgan-Gumm</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavLinks isMobile={false} />
        </nav>

        {/* Right Action (Get in Touch) */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-ambient"
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-surface-lowest p-6 border-l border-surface-high">
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <Link href="/" className="flex items-center" onClick={() => { setIsMobileMenuOpen(false); }}>
                    <span className="text-xl font-bold font-display text-foreground">David Morgan-Gumm</span>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-secondary hover:text-primary">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-2">
                  <NavLinks onItemClick={() => setIsMobileMenuOpen(false)} isMobile={true} />
                </nav>

                <div className="mt-auto">
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-full shadow-ambient"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
