
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink, Settings, Podcast, BookOpen, Calendar, Users, Youtube } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const sqlSquared = {
  title: 'sql_squared',
  description: 'sql_squared is a vibrant data and AI community I founded, home to insightful podcasts, informative blogs, and engaging events for enthusiasts and professionals alike.',
  links: [
    { type: 'Podcast', icon: <Podcast className="mr-2 h-4 w-4" />, url: 'https://www.sqlsquared.co.uk/podcast' },
    { type: 'Blogs', icon: <BookOpen className="mr-2 h-4 w-4" />, url: 'https://www.sqlsquared.co.uk/blog' },
    { type: 'Events', icon: <Calendar className="mr-2 h-4 w-4" />, url: 'https://www.sqlsquared.co.uk/events' },
    { type: 'Community Forum', icon: <Users className="mr-2 h-4 w-4" />, url: 'https://www.sqlsquared.co.uk/forum' },
    { type: 'YouTube', icon: <Youtube className="mr-2 h-4 w-4" />, url: 'https://www.youtube.com/@sql_squared' },
  ]
};

const projects = [
  {
    title: 'Azure Analytical Data Platform',
    description: 'Designed and implemented a scalable and secure Azure Analytical Data Platform using Azure Synapse Analytics to consolidate disparate data sources for comprehensive business intelligence and reporting.',
    image: '/images/projects/DataPlatform.jpg',
    imageHint: 'Azure data platform',
    techStack: ['Azure Synapse', 'Azure Data Lake Storage', 'Azure Data Factory', 'Azure Logic Apps', 'Power BI', 'SQL', 'Python',],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Global LinkedIn Job Market Data Warehousing and Reporting',
    description: 'Built a data warehousing solution to ingest and analyze daily global LinkedIn job market data using Azure Data Explorer (Kusto) for real-time analytics and reporting.',
    image: '/images/projects/LinkedInJobData.jpg',
    imageHint: 'data warehousing',
    techStack: ['Azure Data Explorer', 'Kusto Query Language (KQL)', 'Azure Functions', 'Power BI'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Telephony Platform Integrations and Global Reporting',
    description: 'Developed real-time integrations with various global telephony platforms to extract, transform, and load call data using event-driven architecture for in-depth analysis and comprehensive global reporting.',
    image: '/images/projects/TelephonyData.jpg',
    imageHint: 'telephony reporting',
    techStack: ['REST APIs', 'Azure Functions', 'Azure SQL Database', 'Power BI'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'ERP Integrations to SAP ByDesign',
    description: 'Engineered robust data integration pipelines to connect SAP ByDesign ERP system with downstream financial reporting and forecasting tools, ensuring data consistency and accuracy.',
    image: '/images/projects/FinanceData.jpg',
    imageHint: 'ERP integration',
    techStack: ['SAP ByDesign APIs', 'Azure Data Factory', 'SQL Server', 'Financial Reporting Tools'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Batch ETL Ingestion of Sales Data',
    description: 'Implemented a reliable batch ETL process for ingesting sales data from various sources into a data lake for subsequent processing and analysis.',
    image: '/images/projects/SalesforceData.jpg',
    imageHint: 'batch data ingestion',
    techStack: ['Azure Data Factory', 'Salesforce', 'SQL', 'SOQL', 'Azure Data Lake Storage'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Database DevOps and CI/CD Implementation',
    description: 'Established Database DevOps practices and implemented Continuous Integration/Continuous Deployment (CI/CD) pipelines for database changes, improving release velocity and reducing deployment risks.',
    image: '/images/projects/DevOpsData.jpg',
    imageHint: 'DevOps CI/CD',
    techStack: ['Azure DevOps', 'CI/CD Pipelines', 'SQL Server Data Tools (SSDT)', 'Version Control (Git)'],
    liveLink: '#',
    githubLink: '#',
  },
];

export default function ProjectsSection() {
  const { theme } = useTheme();
  const sqlSquaredLogoSrc = theme === 'light' ? '/images/logo-square_light.png' : '/images/logo-square_dark.png';

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sqlSquaredBlockRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isSqlSquaredBlockVisible, setIsSqlSquaredBlockVisible] = useState(false);
  const [isProjectsGridVisible, setIsProjectsGridVisible] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const contentObserverOptions = { threshold: 0.2 };

    const createObserver = (
      ref: React.RefObject<HTMLElement>,
      setter: React.Dispatch<React.SetStateAction<boolean>>,
      options = observerOptions
    ) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setter(true);
            observer.unobserve(entry.target);
          }
        });
      }, options);
      if (ref.current) observer.observe(ref.current);
      return observer;
    };

    const titleObserver = createObserver(titleRef, setIsTitleVisible);
    const sqlSquaredBlockObserver = createObserver(sqlSquaredBlockRef, setIsSqlSquaredBlockVisible, contentObserverOptions);
    const projectsGridObserver = createObserver(projectsGridRef, setIsProjectsGridVisible, { ...observerOptions, threshold: 0.05 }); // Trigger sooner for the grid

    return () => {
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
      if (sqlSquaredBlockRef.current) sqlSquaredBlockObserver.unobserve(sqlSquaredBlockRef.current);
      if (projectsGridRef.current) projectsGridObserver.unobserve(projectsGridRef.current);
    };
  }, []);


  return (
    <section id="projects" className="py-16 md:py-24 bg-background overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <h2
          ref={titleRef}
          className={cn(
            "text-3xl md:text-4xl font-bold text-center mb-12 text-foreground transition-all duration-700 ease-out",
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          My Projects
        </h2>

        {/* sql_squared section */}
        <div
          ref={sqlSquaredBlockRef}
          className="grid lg:grid-cols-5 gap-12 items-center mb-16"
        >
          <div className={cn(
            "lg:col-span-3 space-y-8 transition-all duration-700 ease-out",
            isSqlSquaredBlockVisible ? "opacity-100 translate-x-0 delay-200" : "opacity-0 -translate-x-10"
          )}>
            <Card className="flex flex-col md:flex-row items-center bg-card shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1">
              <CardHeader className="flex-shrink-0 mb-4 md:mb-0 md:mr-8 p-0">
                <Image src={sqlSquaredLogoSrc} alt="sql_squared logo" width={100} height={100} />
              </CardHeader>
              <CardContent className="flex-grow p-0">
                <CardTitle className="text-2xl md:text-3xl font-bold text-accent mb-3">
                  {sqlSquared.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base mb-4">
                  {sqlSquared.description}
                </CardDescription>
                <div className="flex flex-wrap gap-4">
                  {sqlSquared.links.map((link) => (
                    <Button key={link.type} variant="outline" asChild className="border-accent text-accent hover:bg-accent/10 hover:text-accent/80 hover:border-accent/80">
                      <Link href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.icon} {link.type}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className={cn(
            "lg:col-span-2 lg:h-[400px] order-last lg:order-last transition-all duration-700 ease-out",
            isSqlSquaredBlockVisible ? "opacity-100 translate-x-0 delay-300" : "opacity-0 translate-x-10"
          )}>
            <div className="bg-background dark:bg-muted shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 h-full flex items-center justify-center relative overflow-hidden">
              <Link href="https://www.sqlsquared.co.uk" target="_blank" rel="noopener noreferrer" aria-label="Visit sqlsquared.co.uk">
                <Image
                  src={'/images/squiggle.png'}
                  alt={'sql_squared brand image'}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                  data-ai-hint="abstract data"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Existing projects grid */}
        <div
          ref={projectsGridRef}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={cn(
                "flex flex-col bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden group hover:scale-[1.02] hover:-translate-y-1",
                "transform",
                isProjectsGridVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionProperty: 'opacity, transform', transitionDuration: '700ms', transitionTimingFunction: 'ease-out', transitionDelay: `${isProjectsGridVisible ? index * 150 + 500 : 0}ms` }}
            >
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
                  <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent/10 hover:text-accent/80 hover:border-accent/80">
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

