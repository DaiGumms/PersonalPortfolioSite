import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DownloadCloud, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ResumeDownloadSection() {
  return (
    <section id="resume" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-2xl mx-auto bg-card shadow-xl text-center p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="items-center">
            <div className="p-4 bg-primary/20 rounded-full mb-6">
              <FileText className="h-12 w-12 text-accent" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
              Download My Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg text-muted-foreground mb-8">
              Get a comprehensive overview of my skills, experience, and achievements. Download my resume to learn more about my professional background.
            </CardDescription>
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105">
              {/* Replace with the actual path to your resume PDF */}
              <Link href="/resume-placeholder.pdf" target="_blank" download="DavidMorganGumm-Resume.pdf">
                <DownloadCloud className="mr-2 h-5 w-5" />
                Download Resume (PDF)
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              (Note: This is a placeholder link. Replace with your actual resume file.)
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
