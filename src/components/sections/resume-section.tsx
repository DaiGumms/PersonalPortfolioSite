import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import Link from 'next/link';

export default function ResumeDownloadSection() {
  return (
    <div className="py-24 bg-surface-lowest">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="border-0 shadow-ambient-lg bg-foreground rounded-[2rem] overflow-hidden text-surface-lowest">
          <CardContent className="p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative">

            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-3xl opacity-50 pointer-events-none" />

            <div className="md:w-7/12 space-y-4 relative z-10 text-center md:text-left">
              <h3 className="text-4xl md:text-5xl font-bold font-display leading-tight text-white">
                View My Full Story
              </h3>
              <p className="text-lg text-slate-300 font-sans leading-relaxed max-w-xl mx-auto md:mx-0">
                Detailed breakdown of my technical expertise, professional experience, and academic background.
              </p>
            </div>

            <div className="md:w-5/12 flex flex-col sm:flex-row gap-4 justify-center md:justify-end relative z-10 w-full">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 shadow-ambient transition-all w-full sm:w-auto">
                <Link href="/DavidMorganGumm-Resume.pdf" download="DavidMorganGumm-Resume.pdf">
                  <Download className="mr-2 h-5 w-5" /> Download Resume
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-0 bg-surface/10 hover:bg-surface/20 text-white rounded-full px-8 h-14 transition-all w-full sm:w-auto">
                <Link href="/DavidMorganGumm-Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Eye className="mr-2 h-5 w-5" /> Preview PDF
                </Link>
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
