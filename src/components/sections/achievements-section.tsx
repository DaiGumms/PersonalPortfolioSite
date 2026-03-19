'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, TrendingUp, Award, DollarSign, Clock } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const metrics = [
  {
    icon: TrendingUp,
    title: 'Platform Performance',
    value: '60%',
    description: 'Reduction in data processing time through optimisation initiatives',
    category: 'Technical',
  },
  {
    icon: DollarSign,
    title: 'Cost Savings',
    value: '£5K+',
    description: 'Monthly cost savings delivered through digital transformation initiatives',
    category: 'Business',
  },
  {
    icon: Users,
    title: 'Global Reach',
    value: '1000+',
    description: 'Users served by data platforms across 12+ countries',
    category: 'Impact',
  },
  {
    icon: Clock,
    title: 'Deployment Speed',
    value: '80%',
    description: 'Reduction in deployment time through CI/CD implementation',
    category: 'Technical',
  },
  {
    icon: Target,
    title: 'Data Quality',
    value: '90%+',
    description: 'Improvement in data quality through validation frameworks',
    category: 'Technical',
  },
  {
    icon: Award,
    title: 'Team Growth',
    value: '2',
    description: 'Junior engineers promoted under my direct mentorship',
    category: 'Leadership',
  },
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
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <section id="achievements" className="py-24 bg-surface-low overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">

        {/* Section header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            Highlights
          </span>
          <h2 className="text-4xl font-bold font-display text-foreground leading-tight mb-4">
            Key <em className="not-italic text-primary">Achievements.</em>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto font-sans leading-relaxed">
            A snapshot of the impact delivered across platforms, teams, and communities throughout my career.
          </p>
        </div>

        {/* Key Metrics */}
        <div>
          <h4
            className={cn(
              "text-xs font-semibold text-secondary uppercase tracking-widest text-center mb-8 transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-3"
            )}
          >
            Key Impact Metrics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((item, index) => (
              <Card
                key={item.title}
                className={cn(
                  "border-0 shadow-ambient bg-surface-lowest rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-ambient-lg hover:-translate-y-1",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${isVisible ? 200 + index * 80 : 0}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-4xl font-bold font-display text-primary mb-2">{item.value}</p>
                  <h5 className="text-base font-semibold text-foreground mb-1 font-display">{item.title}</h5>
                  <p className="text-sm text-secondary font-sans leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
