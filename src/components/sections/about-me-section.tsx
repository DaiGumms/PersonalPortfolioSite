import { Card, CardContent } from '@/components/ui/card';
import { Database, Code, BrainCircuit, LineChart, Globe, Zap } from 'lucide-react';

const skills = [
  {
    name: 'Data Architecture',
    description: 'Designing scalable, robust data pipelines and warehousing solutions using modern cloud technologies.',
    icon: Database,
  },
  {
    name: 'Software Engineering',
    description: 'Building reliable applications and services with Python, TypeScript, and modern frameworks.',
    icon: Code,
  },
  {
    name: 'AI & Machine Learning',
    description: 'Implementing LLMs, RAG architectures, and predictive models to extract value from data.',
    icon: BrainCircuit,
  },
  {
    name: 'Business Intelligence',
    description: 'Transforming complex datasets into clear, actionable dashboards and reports for stakeholders.',
    icon: LineChart,
  },
  {
    name: 'Cloud Platforms',
    description: 'Extensive experience architecting and managing infrastructure on Azure and AWS ecosystems.',
    icon: Globe,
  },
  {
    name: 'Technical Leadership',
    description: 'Leading cross-functional engineering teams, mentoring developers, and driving technical strategy.',
    icon: Zap,
  },
];

export default function AboutMeSection() {
  return (
    <section className="py-24 bg-surface-lowest">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-16">

          {/* Left Column: Text */}
          <div className="md:w-5/12 space-y-8">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                About Me
              </span>
              <h2 className="text-4xl font-bold font-display text-foreground leading-tight">
                Bridging the gap between engineering and <em className="not-italic text-primary">insight.</em>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-secondary font-sans leading-relaxed">
              <p>
                I&apos;m David Morgan-Gumm, a Data Platform Manager at Oliver James with {new Date().getFullYear() - 2018} years of experience turning chaotic data ecosystems into streamlined, high-performance engines that drive business value.
              </p>
              <p>
                My approach combines rigorous software engineering practices with deep domain knowledge in data architecture. I believe the best solutions aren&apos;t just technically sound—they&apos;re intuitively designed for the people who use them.
              </p>
              <p>
                Beyond my day-to-day work, I&apos;m the founder of sql_squared, a community dedicated to sharing knowledge across the data landscape.
              </p>
            </div>
          </div>

          {/* Right Column: Skills Grid */}
          <div className="md:w-7/12">
            <div className="grid sm:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <Card
                  key={skill.name}
                  className="border-0 shadow-ambient bg-surface-low rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-ambient-lg hover:-translate-y-1"
                >
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-xl bg-surface flex items-center justify-center mb-6 text-primary shadow-sm">
                      <skill.icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3 font-display">{skill.name}</h4>
                    <p className="text-secondary font-sans leading-relaxed">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
