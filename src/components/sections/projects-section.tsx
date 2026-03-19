'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, LayoutGrid, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const sqlSquared = {
  title: 'sql_squared',
  description: 'Founded and manage a thriving data community. We host podcasts, publish technical articles, and organize regular events to foster knowledge sharing and networking among data professionals.',
  links: [
    { type: 'Website', url: 'https://www.sqlsquared.co.uk', icon: <ExternalLink className="mr-2 h-4 w-4" /> },
    { type: 'Podcast', url: 'https://www.sqlsquared.co.uk/podcast', icon: <ExternalLink className="mr-2 h-4 w-4" /> },
  ],
};

const projects = [
  {
    title: 'K-Means Rust',
    description: 'Implementation of the K-Means clustering algorithm in Rust.',
    image: '/images/projects/kmeans.jpg',
    imageHint: 'Rust programming language logo or data clustering abstract',
    techStack: ['Rust'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Achieve-AI',
    description: 'An AI-powered application to help you achieve your goals by breaking them down into actionable steps.',
    image: '/images/projects/achieve-ai.jpg',
    imageHint: 'AI target goal dashboard',
    techStack: ['Next.js', 'React', 'TypeScript', 'OpenAI API'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Oasis',
    description: 'A serene and calming web experience designed to help users relax and de-stress.',
    image: '/images/projects/oasis.jpg',
    imageHint: 'peaceful desert oasis',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Chatwithme',
    description: 'A real-time chat application featuring user authentication and real-time messaging.',
    image: '/images/projects/chatwithme.jpg',
    imageHint: 'messaging app interface',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Implementing Microsoft Fabric',
    description: 'End-to-end implementation of Microsoft Fabric for enterprise data analytics, integrating Power BI, Synapse, and Data Factory into a unified SaaS platform.',
    image: '/images/projects/fabric.jpg',
    imageHint: 'Microsoft Fabric architecture',
    techStack: ['Microsoft Fabric', 'Power BI', 'Synapse Analytics', 'Data Factory'],
    liveLink: '#',
    githubLink: '#',
  },
];

export default function ProjectsSection() {
  return (
    <div className="py-24 bg-surface-lowest">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center mb-16 space-y-4">
           <h2 className="text-sm font-semibold text-primary uppercase tracking-widest">Selected Work</h2>
           <h3 className="text-4xl font-bold font-display text-foreground">
              Projects & Initiatives
           </h3>
           <p className="text-secondary text-lg max-w-2xl mx-auto">
             A showcase of major architectural implementations, platform migrations, and community contributions.
           </p>
        </div>

        {/* sql_squared Highlight Feature */}
        <Card className="border-0 shadow-ambient bg-surface-low rounded-[2rem] overflow-hidden mb-16 hover:shadow-ambient-lg transition-all duration-300">
           <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                 <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                    Community Project
                 </div>
                 <h4 className="text-3xl font-bold text-foreground font-display mb-4">
                    {sqlSquared.title}
                 </h4>
                 <p className="text-secondary text-lg leading-relaxed mb-8">
                    {sqlSquared.description}
                 </p>
                 <div className="flex flex-wrap gap-4 mt-auto">
                    {sqlSquared.links.map((link) => (
                      <Button key={link.type} variant="outline" asChild className="border border-surface-high/50 bg-surface-lowest text-foreground hover:bg-surface hover:text-primary rounded-full transition-all">
                        <Link href={link.url} target="_blank" rel="noopener noreferrer">
                           {link.icon} {link.type}
                        </Link>
                      </Button>
                    ))}
                 </div>
              </div>
              <div className="lg:w-1/2 bg-surface flex items-center justify-center p-12 min-h-[300px] relative">
                  {/* Decorative background blur */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent blur-2xl" />
                  <div className="relative w-full max-w-sm aspect-square mix-blend-multiply opacity-90 transition-transform duration-500 hover:scale-105">
                     <Image
                        src="/images/squiggle.png"
                        alt="sql_squared brand abstract"
                        fill
                        className="object-contain"
                     />
                  </div>
              </div>
           </div>
        </Card>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="border-0 shadow-ambient bg-surface-low rounded-2xl overflow-hidden group flex flex-col hover:shadow-ambient-lg transition-all duration-300 hover:-translate-y-1">
               <CardContent className="p-8 flex flex-col flex-grow">
                  <h5 className="text-2xl font-bold text-foreground font-display mb-3">{project.title}</h5>
                  <p className="text-secondary mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center text-sm font-semibold text-foreground mb-3">
                        <LayoutGrid className="mr-2 h-4 w-4 text-primary" /> Stack
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 rounded-md bg-surface text-secondary text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.achievements && (
                      <div>
                        <div className="flex items-center text-sm font-semibold text-foreground mb-3">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" /> Impact
                        </div>
                        <ul className="space-y-2">
                          {project.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-secondary flex items-start">
                              <span className="text-primary mr-2 mt-0.5">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
               </CardContent>

               {/* Footer Actions */}
               {(project.liveLink !== '#' || project.githubLink !== '#') && (
                 <div className="p-6 pt-0 mt-auto flex gap-3">
                    {project.liveLink !== '#' && (
                      <Button variant="ghost" asChild className="text-primary hover:bg-primary/10 hover:text-primary rounded-full px-4">
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live
                        </Link>
                      </Button>
                    )}
                    {project.githubLink !== '#' && (
                      <Button variant="ghost" asChild className="text-secondary hover:bg-surface hover:text-foreground rounded-full px-4">
                        <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> Source
                        </Link>
                      </Button>
                    )}
                 </div>
               )}
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
