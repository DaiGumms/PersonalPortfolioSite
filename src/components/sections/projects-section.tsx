import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink, Settings } from 'lucide-react';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with advanced product management, user authentication, and payment gateway integration.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'online shopping',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Firebase'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'AI Powered Analytics Dashboard',
    description: 'A dashboard that uses machine learning to provide insights from large datasets, featuring interactive charts and reports.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'data charts',
    techStack: ['Python', 'Flask', 'React', 'D3.js', 'PostgreSQL'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Mobile Task Manager',
    description: 'A cross-platform mobile application for task management with real-time collaboration features and offline support.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'mobile app',
    techStack: ['React Native', 'GraphQL', 'Node.js', 'MongoDB'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Open Source UI Library',
    description: 'A customizable and accessible component library for web developers, published on npm.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'code components',
    techStack: ['TypeScript', 'Storybook', 'Rollup.js', 'CSS-in-JS'],
    liveLink: '#',
    githubLink: '#',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          My Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="relative w-full h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={project.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-accent">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground h-20 overflow-y-auto">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-primary" />
                    Technology Stack:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary-foreground hover:bg-primary/30 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-3 border-t pt-4">
                {project.liveLink && project.liveLink !== '#' && (
                  <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent/10">
                    <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                )}
                {project.githubLink && project.githubLink !== '#' && (
                  <Button variant="ghost" asChild className="text-foreground hover:bg-primary/20 hover:text-accent-foreground">
                    <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Source Code
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
