import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Cpu, Database, Users, Briefcase, Zap } from 'lucide-react';

const skills = [
  { name: 'Software Development', icon: Cpu, description: 'Full-stack development with modern technologies.' },
  { name: 'Cloud Architecture', icon: Zap, description: 'Designing scalable and resilient cloud solutions (AWS, Azure, GCP).' },
  { name: 'Database Management', icon: Database, description: 'Expertise in SQL, NoSQL, and data modeling.' },
  { name: 'Team Leadership', icon: Users, description: 'Mentoring and leading agile development teams.' },
  { name: 'Problem Solving', icon: Lightbulb, description: 'Innovative solutions to complex technical challenges.' },
  { name: 'Project Management', icon: Briefcase, description: 'Delivering projects on time and within budget.' },
];

const experiences = [
  {
    role: 'Data Platform Manager',
    company: 'Oliver James',
    period: '2020 - Present',
    description: 'Leading data platform initiatives and managing a team to deliver robust and scalable data solutions. Responsible for architecture, development lifecycle, and cross-functional collaboration.',
  },
  {
    role: 'Full Stack Developer',
    company: 'Tech Forward LLC',
    period: '2017 - 2020',
    description: 'Developed and maintained web applications using React, Node.js, and Python. Contributed to significant performance improvements and feature enhancements.',
  },
];

export default function AboutMeSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          About Me
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-accent">Personal Statement</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Hello! I&apos;m David Morgan-Gumm, a passionate and results-oriented Data Platform Manager at Oliver James. I have a proven track record of designing, developing, and deploying innovative data solutions.
              </p>
              <p>
                My journey in tech has been driven by a curiosity for how things work and a desire to build tools that make a tangible impact. I thrive in collaborative environments and enjoy tackling complex challenges that push the boundaries of technology.
              </p>
              <p>
                When I&apos;m not architecting data platforms or leading my team, you can find me exploring new tech trends, contributing to open-source projects, or enjoying the great outdoors.
              </p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-accent">Key Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center text-center p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                    <skill.icon className="h-10 w-10 mb-3 text-accent" />
                    <h3 className="font-semibold text-foreground mb-1">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">My Journey</h3>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <Card key={exp.role + exp.company} className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <CardTitle className="text-xl text-accent mb-1 sm:mb-0">{exp.role}</CardTitle>
                    <Badge variant="secondary" className="text-sm">{exp.period}</Badge>
                  </div>
                  <p className="text-md font-medium text-foreground">{exp.company}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
