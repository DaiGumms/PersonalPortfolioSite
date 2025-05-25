
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Database, Users, Briefcase, Zap, BarChart3, DraftingCompass, UserCheck, Workflow, Award, Building2, GraduationCap, BookOpen, FileText } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const skills = [
  { name: 'Data Platform Architecture (Azure)', icon: DraftingCompass, description: 'Designing scalable and resilient cloud solutions in Azure (Synapse, ADF, Databricks).' },
  { name: 'Database Management & Modelling', icon: Database, description: 'Expertise in SQL, Data Modelling, and database performance optimisation.' },
  { name: 'Team Leadership & Mentoring', icon: Users, description: 'Mentoring and leading agile data teams, fostering a culture of learning and growth.' },
  { name: 'Analytical Development', icon: BarChart3, description: 'Analytical reporting on modern platforms (Power BI, Tableau).' },
  { name: 'Stakeholder Management', icon: UserCheck, description: 'Effectively managing expectations and communication with diverse stakeholders.' },
  { name: 'Agile Project Management', icon: Workflow, description: 'Delivering data projects on time and within budget using Agile methodologies.' },
];

const experiences = [
  {
    role: 'Data Platform Manager',
    company: 'Oliver James',
    period: 'Nov 2023 - Present',
    description: 'Leading the Data Engineering & Software functions. Responsible for data platform strategy, architecture, development lifecycle, and cross-functional collaboration to enhance data capabilities across the business.',
    type: 'promotion',
  },
  {
    role: 'Data Engineering Lead',
    company: 'Oliver James',
    period: 'Aug 2022 - Nov 2023',
    description: 'Led a team of data engineers in designing and implementing scalable data pipelines and analytics solutions. Championed best practices in data engineering and contributed to significant platform enhancements.',
    type: 'promotion',
  },
  {
    role: 'Senior Data Engineer',
    company: 'Oliver James',
    period: 'Oct 2021 - Aug 2022',
    description: 'Developed and maintained ETL/ELT processes, built data models, and supported BI initiatives. Key contributor to migrating legacy systems to a modern Azure-based data platform.',
    type: 'promotion',
  },
  {
    role: 'Data Developer',
    company: 'Oliver James',
    period: 'Feb 2021 - Oct 2021',
    description: 'Focused on SQL development, database administration, and creating reports to support business decisions. Gained foundational experience in data warehousing and BI.',
    type: 'new_company',
  },
  {
    role: 'SQL Developer & Software Tester',
    company: 'Marvin Consulting',
    period: 'Jul 2018 - Feb 2021',
    description: 'Developed SQL solutions and performed software testing for transformational projects. Gained experience in quality assurance and database development.',
    type: 'new_company',
  },
];

const education = [
  {
    name: 'Computer Science (BSc) 2:1 Hons',
    institution: 'University of Liverpool',
    year: '2018',
    icon: GraduationCap, 
  },
   {
    name: 'Management & Leadership (Level 5)',
    institution: 'Chartered Managers Institute',
    year: 'In Progress',
    icon: BookOpen, 
  },
  {
    name: 'Azure Fundamentals',
    institution: 'Microsoft',
    year: '2019',
    icon: Award, 
  }
];

export default function AboutMeSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          About Me
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 bg-card shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <CardHeader>
              <CardTitle className="text-2xl text-accent">Personal Statement</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Hello! I&apos;m David Morgan-Gumm, a passionate and results-oriented Data Platform Manager at Oliver James. I have a proven track record of designing, developing, and deploying innovative data solutions.
              </p>
              <p>
                My journey in tech has been driven by a curiosity for how things work and a desire to build tools that make a tangible impact. I thrive in collaborative environments and enjoy tackling complex challenges that push the boundaries of technology and data.
              </p>
              <p>
                When I&apos;m not architecting data platforms or leading my team, you can find me exploring new tech trends, contributing to open-source projects, or sharing insights on sqlsquared.co.uk.
              </p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-card shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <CardHeader>
              <CardTitle className="text-2xl text-accent">Key Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center text-center p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transform hover:scale-105 transition-all duration-300 ease-in-out"> 
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
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">My Journey</h3>
          <Carousel
            opts={{
              align: "start",
              loop: experiences.length > 1,
            }}
            className="w-full max-w-2xl mx-auto"
          >
            <CarouselContent>
              {experiences.map((exp, index) => (
                <CarouselItem key={index} className="md:basis-full lg:basis-full">
                  <div className="p-1 h-full">
                    <Card className="bg-card shadow-lg h-full flex flex-col"> {/* Removed hover animation classes */}
                      <CardHeader>
                        <div>
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                             <div className="flex items-center">
                              <CardTitle className="text-xl text-accent mb-1 sm:mb-0">{exp.role}</CardTitle>
                               {exp.type === 'promotion' && <Award className="ml-2 h-5 w-5 text-yellow-500" />}
                               {exp.type === 'new_company' && <Building2 className="ml-2 h-5 w-5 text-blue-500" />}
                            </div>
                            <Badge variant="secondary" className="text-sm whitespace-nowrap">{exp.period}</Badge>
                          </div>
                          <p className="text-md font-medium text-foreground">{exp.company}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground text-sm">{exp.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {experiences.length > 1 && (
              <>
                <CarouselPrevious variant="outline" className="absolute -left-4 top-1/2 -translate-y-1/2 sm:-left-10 md:-left-12 bg-card/80 hover:bg-accent hover:text-accent-foreground" />
                <CarouselNext variant="outline" className="absolute -right-4 top-1/2 -translate-y-1/2 sm:-right-10 md:-right-12 bg-card/80 hover:bg-accent hover:text-accent-foreground" />
              </>
            )}
          </Carousel>
        </div>

        <div className="mt-16"> 
           <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground"> 
              <div className="flex items-center justify-center space-x-2">   
                 <span className="text-accent">Education & Qualifications</span> 
             </div>
          </h3>
          <div className="flex flex-row gap-6 w-full overflow-x-auto pb-4 px-2"> 
            {education.map((edu, index) => (
              <div key={index} className="flex flex-col items-center gap-2 p-4 bg-primary/10 rounded-lg text-center flex-shrink-0 w-40 hover:bg-primary/20 transform hover:scale-105 transition-all duration-300 ease-in-out"> 
                {edu.icon && <edu.icon className="h-10 w-10 text-accent" />}
                <div className="flex flex-col items-center gap-1 w-full"> 
                  <p className="text-sm font-semibold text-foreground leading-tight">{edu.name}</p> 
                  <p className="text-xs text-muted-foreground leading-tight">{edu.institution}</p> 
                  <p className="text-xs text-muted-foreground leading-tight">{edu.year}</p> 
                </div>
              </div>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
}

