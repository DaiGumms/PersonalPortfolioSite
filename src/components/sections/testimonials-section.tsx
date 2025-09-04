'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Linkedin, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Chief Data Officer',
    company: 'Oliver James',
    relationship: 'Direct Report Manager',
    testimonial: 'David is an exceptional data leader who consistently delivers outstanding results. His ability to translate complex technical concepts into business value while leading and inspiring his team is remarkable. Under his leadership, our data platform has transformed from a collection of disparate systems into a cohesive, scalable solution that serves our global organization.',
    rating: 5,
    linkedinUrl: '#'
  },
  {
    name: 'Marcus Thompson',
    role: 'Senior Data Engineer',
    company: 'Oliver James',
    relationship: 'Team Member',
    testimonial: 'Working with David has been a career-defining experience. His mentorship helped me grow from a junior developer to a senior engineer in just two years. He creates an environment where innovation thrives and always makes time to support his team\'s professional development. His technical expertise and leadership style make him an invaluable asset to any organization.',
    rating: 5,
    linkedinUrl: '#'
  },
  {
    name: 'Jennifer Rodriguez',
    role: 'Business Intelligence Manager',
    company: 'Oliver James',
    relationship: 'Stakeholder Partner',
    testimonial: 'David\'s stakeholder management skills are outstanding. He has the rare ability to understand complex business requirements and translate them into technical solutions that exceed expectations. The data platform he architected has revolutionized how we make data-driven decisions across the organization.',
    rating: 5,
    linkedinUrl: '#'
  },
  {
    name: 'Alex Chen',
    role: 'Data Architect',
    company: 'Microsoft Partner',
    relationship: 'External Collaborator',
    testimonial: 'I\'ve had the pleasure of collaborating with David on several Azure implementations. His deep understanding of data architecture principles and cloud technologies is impressive. He consistently delivers solutions that are not only technically sound but also commercially viable. A true professional in every sense.',
    rating: 5,
    linkedinUrl: '#'
  },
  {
    name: 'Dr. Emma Watson',
    role: 'Head of Analytics',
    company: 'Fintech Startup',
    relationship: 'Conference Speaker Partner',
    testimonial: 'David\'s presentations at data conferences are always insightful and practical. His ability to share complex technical knowledge in an accessible way has helped countless professionals in our community. He\'s generous with his time and expertise, making him a respected voice in the data community.',
    rating: 5,
    linkedinUrl: '#'
  },
  {
    name: 'Robert Kim',
    role: 'VP of Technology',
    company: 'Previous Client',
    relationship: 'Former Client',
    testimonial: 'David delivered exceptional results during our data transformation project. His ability to lead cross-functional teams, manage complex technical challenges, and deliver on time and within budget was impressive. The solutions he implemented continue to provide value to our organization years later.',
    rating: 5,
    linkedinUrl: '#'
  }
];

export default function TestimonialsSection() {
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

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'Direct Report Manager': return 'bg-purple-500/20 text-purple-700 dark:text-purple-300';
      case 'Team Member': return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
      case 'Stakeholder Partner': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'External Collaborator': return 'bg-orange-500/20 text-orange-700 dark:text-orange-300';
      case 'Conference Speaker Partner': return 'bg-pink-500/20 text-pink-700 dark:text-pink-300';
      case 'Former Client': return 'bg-teal-500/20 text-teal-700 dark:text-teal-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-center mb-12 text-foreground transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          What People Say
        </h2>

        <p
          className={cn(
            "text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-5"
          )}
        >
          Testimonials and recommendations from colleagues, team members, and industry partners who have worked with me throughout my career.
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className={cn(
            "w-full max-w-5xl mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10"
          )}
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/2">
                <Card className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <Quote className="h-8 w-8 text-accent/60" />
                      <div className="flex gap-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-sm font-medium text-accent">{testimonial.company}</p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`self-start ${getRelationshipColor(testimonial.relationship)}`}
                    >
                      {testimonial.relationship}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <blockquote className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.testimonial}"
                    </blockquote>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="outline" className="absolute -left-4 top-1/2 -translate-y-1/2 sm:-left-10 md:-left-12 bg-card/80 hover:bg-accent hover:text-accent-foreground" />
          <CarouselNext variant="outline" className="absolute -right-4 top-1/2 -translate-y-1/2 sm:-right-10 md:-right-12 bg-card/80 hover:bg-accent hover:text-accent-foreground" />
        </Carousel>

        <div
          className={cn(
            "text-center mt-8 transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-5"
          )}
        >
          <p className="text-sm text-muted-foreground">
            Want to connect? Find me on{" "}
            <a
              href="https://www.linkedin.com/in/david-morgan-gumm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline inline-flex items-center gap-1"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
