import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-8 text-muted-foreground">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-center md:text-left mb-4 md:mb-0">
          &copy; {currentYear} David Morgan-Gumm. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="https://github.com/DaiGumms" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <Github className="h-6 w-6 hover:text-accent transition-colors" />
          </Link>
          <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <Linkedin className="h-6 w-6 hover:text-accent transition-colors" />
          </Link>
          <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
            <Twitter className="h-6 w-6 hover:text-accent transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
