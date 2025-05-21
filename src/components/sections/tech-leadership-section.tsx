import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Zap, Target } from 'lucide-react';
import Image from 'next/image';

const leadershipPoints = [
  {
    icon: Users,
    title: 'Team Building & Mentorship',
    description: 'Cultivated high-performing engineering teams by fostering a culture of collaboration, continuous learning, and psychological safety. Mentored junior and mid-level engineers, helping them grow their technical and leadership skills.',
  },
  {
    icon: Zap,
    title: 'Strategic Technical Direction',
    description: 'Defined and executed long-term technical roadmaps aligned with business objectives. Championed adoption of new technologies and architectural patterns to enhance scalability, performance, and maintainability.',
  },
  {
    icon: Target,
    title: 'Agile Project Delivery',
    description: 'Successfully delivered complex projects on time and within budget by implementing agile methodologies, improving development processes, and ensuring effective communication across stakeholders.',
  },
  {
    icon: CheckCircle,
    title: 'Innovation & Problem Solving',
    description: 'Led initiatives to solve critical business challenges through technological innovation. Drove the research, prototyping, and implementation of cutting-edge solutions that provided significant competitive advantages.',
  },
];

export default function TechLeadershipSection() {
  return (
    <section id="leadership" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Tech Leadership & Vision
        </h2>
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 relative aspect-video lg:aspect-auto lg:h-[500px] order-last lg:order-first">
            <Image
              src="https://placehold.co/600x750.png"
              alt="Tech Leadership Concept"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-xl"
              data-ai-hint="leadership team meeting"
            />
          </div>
          <div className="lg:col-span-3 space-y-8">
            <p className="text-lg text-muted-foreground mb-6">
              As a tech leader, I focus on empowering teams, driving innovation, and delivering impactful solutions. My approach combines strategic thinking with hands-on technical expertise to navigate complex challenges and achieve ambitious goals.
            </p>
            {leadershipPoints.map((point) => (
              <Card key={point.title} className="bg-card shadow-md hover:shadow-lg transition-shadow duration-300">
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
