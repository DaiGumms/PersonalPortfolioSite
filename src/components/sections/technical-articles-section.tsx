'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, ExternalLink, Calendar, Clock, User, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const articles = [
  {
    title: 'Building Scalable Data Pipelines with Azure Synapse Analytics',
    description: 'A comprehensive guide to designing and implementing enterprise-scale data pipelines using Azure Synapse Analytics, covering best practices for performance optimization and cost management.',
    url: 'https://www.sqlsquared.co.uk/blog/azure-synapse-pipelines',
    category: 'Azure',
    readTime: '12 min read',
    publishDate: '2024-08-15',
    tags: ['Azure', 'Synapse', 'Data Engineering', 'ETL'],
    views: '2.3k',
    featured: true
  },
  {
    title: 'Data Platform Architecture: From Monolith to Microservices',
    description: 'Exploring the journey of modernizing legacy data platforms by adopting microservices architecture principles, with real-world examples and lessons learned.',
    url: 'https://www.sqlsquared.co.uk/blog/data-platform-modernization',
    category: 'Architecture',
    readTime: '15 min read',
    publishDate: '2024-07-22',
    tags: ['Architecture', 'Microservices', 'Data Platform', 'Modernization'],
    views: '1.8k',
    featured: true
  },
  {
    title: 'Implementing DevOps for Data: CI/CD Best Practices',
    description: 'A practical approach to implementing DevOps methodologies in data engineering projects, including automated testing, deployment strategies, and monitoring.',
    url: 'https://www.sqlsquared.co.uk/blog/devops-for-data',
    category: 'DevOps',
    readTime: '10 min read',
    publishDate: '2024-06-10',
    tags: ['DevOps', 'CI/CD', 'Data Engineering', 'Automation'],
    views: '3.1k',
    featured: false
  },
  {
    title: 'AI-Powered Data Quality: Automated Validation Frameworks',
    description: 'Leveraging AI and machine learning to build intelligent data quality frameworks that can automatically detect and remediate data issues at scale.',
    url: 'https://www.sqlsquared.co.uk/blog/ai-data-quality',
    category: 'AI/ML',
    readTime: '8 min read',
    publishDate: '2024-05-28',
    tags: ['AI', 'Machine Learning', 'Data Quality', 'Automation'],
    views: '2.7k',
    featured: false
  },
  {
    title: 'Building Data Communities: Lessons from sql_squared',
    description: 'Insights and strategies for building and nurturing vibrant data communities, sharing experiences from founding and growing the sql_squared community.',
    url: 'https://www.sqlsquared.co.uk/blog/building-data-communities',
    category: 'Community',
    readTime: '6 min read',
    publishDate: '2024-04-18',
    tags: ['Community', 'Leadership', 'Networking', 'Growth'],
    views: '1.5k',
    featured: false
  },
  {
    title: 'Real-time Analytics with Azure Data Explorer',
    description: 'Deep dive into building real-time analytics solutions using Azure Data Explorer (Kusto), covering query optimization and architectural patterns.',
    url: 'https://www.sqlsquared.co.uk/blog/azure-data-explorer-analytics',
    category: 'Azure',
    readTime: '14 min read',
    publishDate: '2024-03-25',
    tags: ['Azure', 'Real-time', 'Analytics', 'Kusto'],
    views: '2.2k',
    featured: false
  }
];

export default function TechnicalArticlesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Azure': return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
      case 'Architecture': return 'bg-purple-500/20 text-purple-700 dark:text-purple-300';
      case 'DevOps': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'AI/ML': return 'bg-orange-500/20 text-orange-700 dark:text-orange-300';
      case 'Community': return 'bg-pink-500/20 text-pink-700 dark:text-pink-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <section id="articles" className="py-16 md:py-24 bg-muted/50 overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-center mb-12 text-foreground transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          Technical Articles & Insights
        </h2>

        <p
          className={cn(
            "text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-5"
          )}
        >
          Sharing knowledge and insights about data engineering, cloud architecture, and technical leadership through articles, blogs, and community contributions.
        </p>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h3
              className={cn(
                "text-2xl font-semibold text-center mb-8 text-foreground transition-all duration-700 ease-out",
                isVisible ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-5"
              )}
            >
              Featured Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <Card
                  key={article.title}
                  className={cn(
                    "bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] group border-l-4 border-l-accent",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{
                    transitionDelay: `${isVisible ? 400 + index * 150 : 0}ms`
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary" className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                        Featured
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-accent transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(article.publishDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          {article.views} views
                        </div>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                      <Link href={article.url} target="_blank" rel="noopener noreferrer">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Read Article
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div>
          <h3
            className={cn(
              "text-2xl font-semibold text-center mb-8 text-foreground transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-5"
            )}
          >
            Recent Articles
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article, index) => (
              <Card
                key={article.title}
                className={cn(
                  "bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] group",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{
                  transitionDelay: `${isVisible ? 600 + index * 100 : 0}ms`
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      {article.views}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-foreground group-hover:text-accent transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(article.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="w-full text-accent hover:bg-accent/10">
                    <Link href={article.url} target="_blank" rel="noopener noreferrer">
                      Read More
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "text-center mt-12 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-5"
          )}
        >
          <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10">
            <Link href="https://www.sqlsquared.co.uk/blog" target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-2 h-5 w-5" />
              View All Articles on sql_squared
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
