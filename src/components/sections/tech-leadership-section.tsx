'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Building2, Award, Briefcase, ChevronRight } from 'lucide-react';

const experiences = [
  {
    role: 'Data Platform Manager',
    company: 'Oliver James',
    period: 'Aug 2022 - Present',
    description: 'Leading a team of Data Engineers to design, build, and maintain a robust, scalable data platform. I focus on strategy, architecture, and empowering my team to deliver high-quality data solutions.',
    type: 'current',
    achievements: [
      'Architected cloud-native data warehouse using Azure Synapse and Databricks',
      'Implemented CI/CD pipelines reducing deployment time by 80%',
      'Mentored junior engineers and fostered a culture of continuous learning'
    ]
  },
  {
    role: 'Senior Data Engineer',
    company: 'Oliver James',
    period: 'Oct 2021 - Aug 2022',
    description: 'Developed and maintained ETL/ELT processes, built dimensional data models, and supported BI initiatives. Key contributor to migrating legacy systems to a modern Azure-based data platform, focusing on performance optimization and data quality improvements.',
    type: 'promotion',
    achievements: [
      'Designed star schema data models supporting business-critical reporting',
      'Improved data quality through implementation of validation frameworks'
    ]
  },
  {
    role: 'Data Developer',
    company: 'Oliver James',
    period: 'Feb 2021 - Oct 2021',
    description: 'Focused on SQL development, database administration, and creating reports to support business decisions. Gained foundational experience in data warehousing, BI development, and collaborated with business stakeholders to understand requirements.',
    type: 'new_company',
    achievements: [
      'Developed business intelligence reports and dashboards',
      'Automated manual processes saving many hours per week'
    ]
  },
  {
    role: 'SQL Developer & Software Tester',
    company: 'Evolution Recruitment',
    period: 'Jul 2018 - Feb 2021',
    description: 'Developed SQL solutions and performed comprehensive software testing for transformational projects. Gained experience in quality assurance, database development, and working with complex business requirements in fast-paced environments.',
    type: 'new_company',
    achievements: [
      'Created complex SQL queries and stored procedures for data extraction',
      'Delivered creative testing strategies and test cases adopted by the development team',
      'Identified and resolved critical software defects within our CRM'
    ]
  },
];

const education = [
  {
    name: 'Computer Science (BSc) 2:1 Hons',
    institution: 'University of Liverpool',
    year: '2018',
    description: 'Specialized in Software Engineering and Data Structures'
  },
  {
    name: 'Management & Leadership (Level 5)',
    institution: 'Chartered Managers Institute',
    year: 'In Progress',
    description: 'Advanced leadership and strategic management'
  },
  {
    name: 'Azure Fundamentals (AZ-900)',
    institution: 'Microsoft',
    year: '2019',
    description: 'Cloud computing and Azure services fundamentals'
  }
];

export default function TechLeadershipSection() {
  return (
    <div className="py-24 bg-surface-lowest">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-16 space-y-4">
           <h2 className="text-sm font-semibold text-primary uppercase tracking-widest">Career Journey</h2>
           <h3 className="text-4xl font-bold font-display text-foreground">
              Experience & Education
           </h3>
           <p className="text-secondary text-lg max-w-2xl mx-auto">
             A timeline of my professional roles and academic background, building expertise in data, engineering, and leadership.
           </p>
        </div>

        <div className="space-y-16">
          {/* Experience Timeline */}
          <div>
            <h4 className="text-2xl font-bold font-display text-foreground flex items-center mb-8">
              <Briefcase className="mr-3 h-6 w-6 text-primary" /> Professional Experience
            </h4>
            <div className="relative border-l border-surface-high/50 ml-3 md:ml-4 space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-8 md:pl-12">
                  <div className="absolute left-[-1.05rem] md:left-[-1.15rem] top-1 h-8 w-8 rounded-full bg-surface border-4 border-surface-lowest shadow-sm flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <Card className="border-0 shadow-ambient bg-surface-low rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-ambient-lg hover:-translate-y-1 group">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                        <div>
                          <h5 className="text-xl font-bold text-foreground font-display flex items-center gap-2">
                            {exp.role}
                            {exp.type === 'promotion' && <Award className="h-4 w-4 text-primary" title="Promotion" />}
                            {exp.type === 'new_company' && <Building2 className="h-4 w-4 text-secondary" title="New Company" />}
                          </h5>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface text-secondary text-sm font-medium shrink-0">
                          {exp.period}
                        </div>
                      </div>
                      <p className="text-secondary mb-6 leading-relaxed">
                        {exp.description}
                      </p>
                      {exp.achievements && (
                        <div className="bg-surface rounded-xl p-5">
                          <h6 className="text-sm font-semibold text-foreground mb-3 flex items-center uppercase tracking-wider">
                            Key Achievements
                          </h6>
                          <ul className="space-y-3">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start text-sm text-secondary">
                                <ChevronRight className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Education Grid */}
          <div className="pt-8">
            <h4 className="text-2xl font-bold font-display text-foreground flex items-center mb-8">
              <Award className="mr-3 h-6 w-6 text-primary" /> Education & Certifications
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {education.map((edu, index) => (
                  <Card key={index} className="border-0 shadow-ambient bg-surface-low rounded-2xl transition-all duration-300 hover:shadow-ambient-lg hover:-translate-y-1">
                    <CardContent className="p-6 flex flex-col h-full">
                       <div className="mb-4">
                         <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                            {edu.year}
                         </div>
                         <h5 className="text-lg font-bold text-foreground font-display leading-tight mb-2">{edu.name}</h5>
                         <p className="text-secondary font-medium">{edu.institution}</p>
                       </div>
                       <p className="text-secondary text-sm leading-relaxed mt-auto">
                         {edu.description}
                       </p>
                    </CardContent>
                  </Card>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
