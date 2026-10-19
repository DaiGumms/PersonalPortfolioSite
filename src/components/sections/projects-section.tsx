'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, LayoutGrid, CheckCircle, Layers, GitMerge, Globe, BarChart2, Phone, Building2, Cloud, GitBranch, Workflow, Database, LayoutDashboard, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { findLogos } from '@/lib/tech-logos';
import EchelonShowcaseSection from '@/components/sections/echelon-showcase-section';

const sqlSquared = {
  title: 'sql_squared',
  description: 'Founded and manage a thriving data community. We host podcasts, publish technical articles, and organize regular events to foster knowledge sharing and networking among data professionals.',
  links: [
    { type: 'Website', url: 'https://www.sqlsquared.co.uk', icon: <ExternalLink className="mr-2 h-4 w-4" /> },
    { type: 'Blog', url: 'https://www.sqlsquared.co.uk/blog', icon: <ExternalLink className="mr-2 h-4 w-4" /> },
    { type: 'Podcast', url: 'https://www.sqlsquared.co.uk/podcast', icon: <ExternalLink className="mr-2 h-4 w-4" /> },
    { type: 'YouTube', url: 'https://www.youtube.com/@sql_squared', icon: <PlayCircle className="mr-2 h-4 w-4" /> },
  ],
};

const projects: {
  title: string;
  description: string;
  techStack: string[];
  achievements: string[];
  liveLink: string;
  githubLink: string;
  icon: LucideIcon;
}[] = [
    {
      title: 'Enterprise Analytical Data Warehouse',
      description: "Designed and delivered a new analytical SQL data warehouse at Brabners as the foundation for business-wide reporting. Structured around medallion architecture, it centralises data from multiple business systems, underpins Power BI reporting suites, and sets the groundwork for master data management and Azure cloud adoption.",
      techStack: ['SQL Server', 'Azure SQL Database', 'Medallion Architecture', 'Power BI', 'GitHub Actions', 'Infrastructure as Code (IaC)', 'CI/CD', 'Automated Testing', 'Data Modeling'],
      achievements: ['Single centralised foundation for business-wide Power BI reporting', 'Medallion architecture for scalable, maintainable dataflows', 'Foundation for system integration, MDM and cloud adoption'],
      liveLink: '#',
      githubLink: '#',
      icon: Database,
    },
    {
      title: 'Central Intelligence Tools',
      description: "Built Central Intelligence Tools, an internal application that acts as the hub for tooling across the firm. Over time it will link third-party systems together from one place, letting fee earners open matters and manage their business workflows more easily.",
      techStack: ['React', 'Next.js', 'TypeScript', 'Azure App Service', 'GitHub Actions', 'Infrastructure as Code (IaC)', 'CI/CD', 'Automated Testing', 'Claude Code', 'Agentic Development'],
      achievements: ['Central hub for internal tooling and system integration', 'Simpler matter opening and workflow management for fee earners', 'Automated testing and deployment from day one', 'Built with agentic development workflows, shortening lead time while keeping the codebase robust and secure'],
      liveLink: '#',
      githubLink: '#',
      icon: LayoutDashboard,
    },
    {
      title: 'Microsoft Fabric Enterprise Implementation',
      description: 'Led the strategic implementation and migration to Microsoft Fabric for an enterprise organization. Consolidated disparate data workloads into a unified SaaS analytics platform, enabling seamless data engineering, data science, and real-time analytics capabilities.',
      techStack: ['Microsoft Fabric', 'OneLake', 'Data Engineering', 'Power BI', 'Data Science', 'Spark', 'Lakehouse', 'Data Pipelines', 'Notebooks', 'Jupyter', 'Bicep', 'Delta Lake', 'Dataflows Gen2', 'PySpark', 'Fabric REST API', 'Semantic Models'],
      achievements: ['Unified analytics platform', 'Reduced infrastructure complexity', 'Accelerated time-to-insight'],
      liveLink: '#',
      githubLink: '#',
      icon: Layers,
    },
    {
      title: 'Enterprise Master Data Management with Tamr & Microsoft Fabric',
      description: 'Designed and implemented an enterprise Master Data Management solution using Tamr on top of Microsoft Fabric, enabling AI-powered entity resolution and deduplication of critical business data. Built automated pipelines to master golden records across key business domains and publish authoritative data to downstream third-party services and applications via event-driven and API-based integrations.',
      techStack: ['Tamr', 'Microsoft Fabric', 'OneLake', 'Azure Data Factory', 'REST APIs', 'Python', 'SQL', 'Event-driven Architecture', 'Data Governance', 'Entity Resolution', 'Azure Key Vault', 'Master Data Management (MDM)', 'Data Matching / Deduplication', 'Data Quality', 'Data Lineage', 'Azure Functions'],
      achievements: ['Golden record mastering across key business domains', 'Automated publishing to 3rd party services & applications', 'Improved data consistency and reduced duplication across the platform'],
      liveLink: '#',
      githubLink: '#',
      icon: GitMerge,
    },
    {
      title: 'SAP ByDesign ERP Integration Platform',
      description: 'Engineered robust, enterprise-scale data integration pipelines connecting SAP ByDesign ERP system with downstream financial reporting and forecasting tools. Implemented automated data validation, error handling, and reconciliation processes ensuring 99.9% data accuracy.',
      techStack: ['SAP ByDesign APIs', 'Azure Function Apps', 'Microsoft Fabric', 'Financial Reporting Tools', 'SOAP', 'OData', 'Python', 'ETL Pipelines', 'Data Validation', 'XML', 'Azure Key Vault', 'Azure Logic Apps', 'Infrastructure as Code (IaC)', 'Docker', 'CI/CD', 'YAML Pipelines', 'Application Insights', 'Azure Alerts'],
      achievements: ['99.9% data accuracy', 'Automated reconciliation', 'Enterprise-scale integration'],
      liveLink: '#',
      githubLink: '#',
      icon: Building2,
    },
    {
      title: 'Global Azure Synapse Platform Architecture & Delivery',
      description: 'Architected and delivered a comprehensive Azure data platform serving 1000+ users across 12+ countries. The platform processes large daily data volumes with a high degree of data quality improvement and major performance optimization. Features real-time analytics, automated data validation, and enterprise-grade security.',
      techStack: ['Azure Synapse Analytics', 'Azure Data Lake Storage Gen2', 'Azure Data Factory', 'Azure Logic Apps', 'Power BI', 'Azure SQL Database', 'Python', 'KQL', 'Azure DevOps', 'Bicep', 'Entra ID / RBAC', 'Dedicated SQL Pools', 'Synapse Pipelines', 'Azure Key Vault', 'Managed Private Endpoints / VNet', 'Data Validation'],
      achievements: ['Performance improvement', '£100k+ annual cost savings', '1500+ global users'],
      liveLink: '#',
      githubLink: '#',
      icon: Globe,
    },
    {
      title: 'LinkedIn Job Market Analytics & Whitespace Reporting',
      description: 'Built an enterprise-grade data warehousing solution ingesting and analysing daily global LinkedIn job market data using Azure Data Explorer. Integrated Azure Language and Cognitive Services to automatically extract, normalise, and map skills and industries from job postings, enabling accurate whitespace reporting that highlights unmet talent demand and emerging hiring trends for business intelligence teams.',
      techStack: ['Azure Data Explorer (Kusto)', 'Kusto Query Language (KQL)', 'Azure Language Services', 'Azure Cognitive Services', 'Azure Functions', 'Power BI', 'Python', 'REST APIs', 'JSON', 'Azure Storage', 'Materialized Views', 'Data Ingestion Pipelines', 'Time Series Analysis', 'Natural Language Processing (NLP)'],
      achievements: ['Daily job market data ingestion & processing', 'AI-powered skills & industry mapping via Azure Cognitive Services', 'Whitespace reporting to surface unmet talent demand'],
      liveLink: '#',
      githubLink: '#',
      icon: BarChart2,
    },
    {
      title: 'Global Telephony Platform Integration Suite',
      description: 'Developed comprehensive real-time integrations with multiple global telephony platforms using event-driven architecture. Built scalable ETL pipelines processing call data for in-depth analysis, global reporting, and business intelligence across international markets.',
      techStack: ['REST APIs', 'Azure Functions', 'Azure SQL Database', 'Power BI', 'Event-driven Architecture', 'C#', 'Python', 'JSON', 'Webhooks', 'Azure Logic Apps', 'ETL Pipelines'],
      achievements: ['Multi-platform integration', 'Real-time call analytics', 'Global reporting capabilities'],
      liveLink: '#',
      githubLink: '#',
      icon: Phone,
    },
    {
      title: 'Salesforce Data Lake & Analytics Platform',
      description: 'Implemented a comprehensive batch and real-time ETL solution for ingesting Salesforce sales data into Azure Data Lake. Built dimensional data models, implemented data governance frameworks, and created self-service analytics capabilities for business users.',
      techStack: ['Azure Data Factory', 'Salesforce APIs', 'SOQL', 'Azure Data Lake Storage', 'Azure Synapse', 'Power BI', 'Python', 'SQL', 'Dimensional Modeling', 'Data Governance', 'Data Modeling', 'ETL Pipelines'],
      achievements: ['Self-service analytics', 'Data governance framework', 'Real-time sales insights'],
      liveLink: '#',
      githubLink: '#',
      icon: Cloud,
    },
    {
      title: 'Enterprise Database DevOps & CI/CD Platform',
      description: 'Established comprehensive Database DevOps practices and implemented automated CI/CD pipelines for database changes across multiple environments. Reduced deployment risks by 90%, improved release velocity by 80%, and implemented automated testing frameworks.',
      techStack: ['Azure DevOps', 'CI/CD Pipelines', 'SQL Server Data Tools (SSDT)', 'Git', 'PowerShell', 'Azure SQL Database', 'Automated Testing', 'Bicep', 'YAML Pipelines', 'Schema Migrations', 'tSQLt'],
      achievements: ['90% risk reduction', '80% faster deployments', 'Automated testing framework'],
      liveLink: '#',
      githubLink: '#',
      icon: GitBranch,
    },
    {
      title: 'TalentLink to Fabric Data Integration Platform',
      description: 'Client-focused Microsoft Fabric platform integration reading recruitment data via GraphQL from TalentLink, structuring it into a SQL database using notebooks, with a multi-platform CI/CD deployment process combining Fabric deployment, YAML pipelines, and SSDT for maximum security, validation, and flexibility.',
      techStack: ['Microsoft Fabric', 'GraphQL', 'TalentLink API', 'Notebooks', 'SQL', 'Azure DevOps', 'YAML Pipelines', 'SSDT', 'CI/CD', 'Lakehouse', 'Data Pipelines', 'PySpark', 'Fabric Deployment Pipelines', 'Data Modeling', 'Azure Key Vault', 'Data Validation'],
      achievements: [
        'GraphQL ingestion from TalentLink into a structured SQL data model',
        'Hybrid Fabric + YAML + SSDT CI/CD pipeline for defense-in-depth validation',
        'Notebook-driven data structuring reduced manual transformation overhead',
        'Enterprise-grade security controls for a client-specific integration',
      ],
      liveLink: '#',
      githubLink: '#',
      icon: Workflow,
    },
  ];

export default function ProjectsSection() {
  return (
    <div className="py-20 bg-surface-lowest">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center mb-12 space-y-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Selected Work
          </span>
          <h2 className="text-4xl font-bold font-display text-foreground">
            Projects & <em className="not-italic text-primary">Initiatives.</em>
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            A showcase of major architectural implementations, platform migrations, and community contributions.
          </p>
        </div>

        {/* sql_squared Highlight Feature */}
        <Card className="border-0 shadow-ambient bg-surface-low rounded-[2rem] overflow-hidden mb-12 hover:shadow-ambient-lg transition-all duration-300">
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
              {/* The artwork is black-on-white: multiply drops the white in light mode; in dark mode invert + hue-rotate
                  flips it to white-on-black with the squiggle's colours kept, and screen drops the black */}
              <div className="relative w-full max-w-sm aspect-square mix-blend-multiply opacity-90 transition-transform duration-500 hover:scale-105 dark:invert dark:hue-rotate-180 dark:mix-blend-screen">
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

        {/* sql_squared Podcast Player: the iframe Buzzsprout's embed script would inject, rendered directly so it
            survives client-side navigation (next/script won't re-run an already-loaded script on remount) */}
        <div className="mb-12">
          <iframe
            src="https://www.buzzsprout.com/2509445?client_source=large_player&iframe=true"
            title="The sql_squared Podcast"
            width="100%"
            height="375"
            loading="lazy"
            className="block w-full rounded-2xl"
          />
        </div>

        {/* Echelon flagship showcase, a SQL Squared Ltd product */}
        <EchelonShowcaseSection />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const logos = findLogos(project.techStack);
            return (
            <Card key={project.title} className="border-0 shadow-ambient bg-surface-low rounded-2xl overflow-hidden group flex flex-col hover:shadow-ambient-lg transition-all duration-300 hover:-translate-y-1">

              {/* Card icon header */}
              <div className="h-40 w-full bg-primary/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <project.icon className="h-8 w-8" />
                </div>
              </div>

              <CardContent className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <h5 className="text-2xl font-bold text-foreground font-display">{project.title}</h5>
                  {logos.length > 0 && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      {logos.map((logo) => (
                        <Image key={logo.src} src={logo.src} alt={logo.alt} width={18} height={18} title={logo.alt} />
                      ))}
                    </div>
                  )}
                </div>
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
            );
          })}
        </div>

      </div>
    </div>
  );
}
