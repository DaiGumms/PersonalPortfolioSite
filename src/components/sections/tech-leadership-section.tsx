
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Zap, Target } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const leadershipPoints = [
  {
    icon: Users,
    title: 'Team Building & Mentorship',
    description: 'Built and led high-performing engineering teams of 6+ professionals, fostering a culture of collaboration, continuous learning, and psychological safety. Successfully mentored junior engineers, resulting in promotions and significant career growth across the team.',
  },
  {
    icon: Zap,
    title: 'Strategic Technical Direction',
    description: 'Defined and executed comprehensive technical roadmaps aligned with business objectives across 12+ countries. Championed adoption of modern cloud technologies and architectural patterns, resulting in 60% performance improvements and £2M+ annual cost savings.',
  },
  {
    icon: Target,
    title: 'Agile Project Delivery',
    description: 'Successfully delivered many complex data platform projects on time and within budget by implementing agile methodologies, improving development processes by 80%, and ensuring effective stakeholder communication across global teams.',
  },
  {
    icon: CheckCircle,
    title: 'Innovation & Problem Solving',
    description: 'Led digital transformation initiatives solving critical business challenges through technological innovation. Drove research, prototyping, and implementation of cutting-edge solutions including AI/ML pipelines, real-time analytics, and automated data quality frameworks.',
  },
];

export default function TechLeadershipSection() {
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
      { threshold: 0.1 } // Trigger when 10% of the element is visible
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

  return (
    <section id="leadership" className="py-16 md:py-24 bg-muted/50 overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-center mb-12 text-foreground transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          Tech Leadership & Vision
        </h2>
        <p
          className={cn(
            "text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-5"
          )}
        >
          As a Data Platform Manager leading 6+ engineers, I focus on empowering people, driving innovation, and delivering enterprise-scale solutions. My approach combines strategic vision with hands-on technical expertise to tackle complex challenges and achieve ambitious goals that create lasting business value.
        </p>
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div
            className={cn(
              "lg:col-span-2 relative aspect-video lg:aspect-auto lg:h-[500px] order-last lg:order-first transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-x-0 delay-300" : "opacity-0 -translate-x-10"
            )}
          >
            <Image
              src="/images/Gemini_Generated_Image_v9b8dwv9b8dwv9b8.jpg"
              alt="Tech Leadership Concept"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-xl"
              data-ai-hint="leadership team meeting"
            />
          </div>
          <div
            className={cn(
              "lg:col-span-3 space-y-8 transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-x-0 delay-300" : "opacity-0 translate-x-10"
            )}
          >
            {leadershipPoints.map((point, index) => (
              <Card
                key={point.title}
                className={cn(
                  "bg-card shadow-md hover:shadow-lg transition-all duration-300 ease-out",
                  `delay-${300 + (index + 1) * 100}` // Stagger card animation
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <point.icon className="h-8 w-8 text-accent mr-4" />
                    <CardTitle className="text-xl text-primary">{point.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
