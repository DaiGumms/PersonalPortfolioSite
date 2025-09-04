'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, Target, TrendingUp, Award, Lightbulb, DollarSign, Clock } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const achievements = [
  {
    icon: TrendingUp,
    title: 'Platform Performance',
    value: '60%',
    description: 'Reduction in data processing time through optimization initiatives',
    category: 'technical'
  },
  {
    icon: DollarSign,
    title: 'Cost Savings',
    value: '£2M+',
    description: 'Annual cost savings through digital transformation initiatives',
    category: 'business'
  },
  {
    icon: Users,
    title: 'Global Reach',
    value: '1000+',
    description: 'Users served by data platforms across 15+ countries',
    category: 'impact'
  },
  {
    icon: Clock,
    title: 'Deployment Speed',
    value: '80%',
    description: 'Reduction in deployment time through CI/CD implementation',
    category: 'technical'
  },
  {
    icon: Target,
    title: 'Data Quality',
    value: '95%',
    description: 'Improvement in data quality through validation frameworks',
    category: 'technical'
  },
  {
    icon: Award,
    title: 'Team Growth',
    value: '3/6',
    description: 'Junior engineers promoted under my mentorship',
    category: 'leadership'
  }
];

const recognitions = [
  {
    title: 'Data Community Leader',
    organization: 'sql_squared Community',
    description: 'Founded and lead a thriving data community with 2000+ members',
    year: '2022',
    type: 'community'
  },
  {
    title: 'Technical Excellence Award',
    organization: 'Oliver James',
    description: 'Recognized for outstanding technical leadership and innovation',
    year: '2024',
    type: 'professional'
  },
  {
    title: 'Conference Speaker',
    organization: 'DataMinds, SQLBits, PASS',
    description: 'Regular speaker at major data and technology conferences',
    year: '2023-2024',
    type: 'speaking'
  },
  {
    title: 'Mentorship Excellence',
    organization: 'Oliver James',
    description: 'Recognized for exceptional mentoring and team development',
    year: '2023',
    type: 'leadership'
  }
];

export default function AchievementsSection() {
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
      case 'technical': return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
      case 'business': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'impact': return 'bg-purple-500/20 text-purple-700 dark:text-purple-300';
      case 'leadership': return 'bg-orange-500/20 text-orange-700 dark:text-orange-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const getRecognitionColor = (type: string) => {
    switch (type) {
      case 'community': return 'bg-purple-500/20 text-purple-700 dark:text-purple-300';
      case 'professional': return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
      case 'speaking': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'leadership': return 'bg-orange-500/20 text-orange-700 dark:text-orange-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <section id="achievements" className="py-16 md:py-24 bg-muted/30 overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-center mb-12 text-foreground transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          Achievements & Recognition
        </h2>

        {/* Key Metrics */}
        <div className="mb-16">
          <h3
            className={cn(
              "text-2xl font-semibold text-center mb-8 text-foreground transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-5"
            )}
          >
            Key Impact Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={achievement.title}
                className={cn(
                  "bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{
                  transitionDelay: `${isVisible ? 300 + index * 100 : 0}ms`
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <achievement.icon className="h-8 w-8 text-accent" />
                    <Badge variant="secondary" className={getCategoryColor(achievement.category)}>
                      {achievement.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-bold text-accent">{achievement.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-foreground mb-2">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recognition & Awards */}
        <div>
          <h3
            className={cn(
              "text-2xl font-semibold text-center mb-8 text-foreground transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-5"
            )}
          >
            Recognition & Awards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recognitions.map((recognition, index) => (
              <Card
                key={recognition.title}
                className={cn(
                  "bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02]",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{
                  transitionDelay: `${isVisible ? 700 + index * 150 : 0}ms`
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-accent mb-1">{recognition.title}</CardTitle>
                      <p className="text-sm font-medium text-foreground">{recognition.organization}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="text-xs">
                        {recognition.year}
                      </Badge>
                      <Badge variant="secondary" className={getRecognitionColor(recognition.type)}>
                        {recognition.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{recognition.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
