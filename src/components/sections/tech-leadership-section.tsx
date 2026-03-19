'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Building2, Award, Briefcase, ChevronRight } from 'lucide-react';

const experiences = [
  {
    role: 'Founder & Host',
    company: 'sql_squared',
    location: 'Manchester, UK',
    period: '2024 – Present',
    description: 'Founded and host sql_squared, a growing community platform for data professionals, producing high-quality technical content across articles, videos, and podcasts.',
    type: 'current',
    achievements: [
      'Develop and produce technical content covering complex data and AI topics for both expert and newcomer audiences',
      'Actively building a community for data professionals by fostering discussions around emerging industry trends and best practices',
    ],
  },
  {
    role: 'Data Platform Manager',
    company: 'Oliver James',
    location: 'Manchester, UK',
    period: 'Nov 2023 – Present',
    description: 'Define and execute the strategic roadmap for the data and development functions, leading a high-performing team of data engineers and developers while partnering with senior executives to champion a data-first culture.',
    type: 'promotion',
    achievements: [
      'Matured AGILE processes by solidifying sprint ceremonies, introducing a development change board, and improving release planning and business transparency',
      'Drove continuous platform innovation by translating emerging industry trends into actionable technical strategies, leveraging insights from the sql_squared podcast and major UK conferences',
      'Lead the end-to-end implementation and rollout of modern enterprise platforms including Microsoft Fabric, solving master data management challenges and improving system integration reliability',
      'Partnered with external vendors for the successful implementation of large-scale enterprise application suites, technical management processes, and custom public-facing applications',
      'Translate complex technical capabilities into clear business value and ROI to drive data-led decision-making across the organisation',
    ],
  },
  {
    role: 'Data Engineering Lead',
    company: 'Oliver James',
    location: 'Manchester, UK',
    period: 'Oct 2022 – Oct 2023',
    description: "Following promotion, led the architecture, management, and operational excellence of the new data platform. Introduced and scaled the business's DevOps function and co-developed the long-term technical strategy with senior leadership.",
    type: 'promotion',
    achievements: [
      'Implemented Azure DevOps and CI/CD pipelines (YAML), moving from manual releases to 100% automated deployment for all software, data, and AI resources',
      'Co-developed the long-term technical strategy with senior leadership, focusing on embedding data into core business processes to drive commercial growth',
      'Engineered a near real-time, event-driven reporting suite for global telephony data, enabling management to monitor call statistics and integrating AI-powered call transcription summaries',
    ],
  },
  {
    role: 'Senior Data Engineer',
    company: 'Oliver James',
    location: 'Manchester, UK',
    period: 'Oct 2021 – Sept 2022',
    description: 'Led the greenfield implementation of a new enterprise Data Platform, architecting a distributed and scalable design. Managed complex cross-functional integrations and established core data integration strategies.',
    type: 'promotion',
    achievements: [
      'Architected a distributed, scalable data platform with a flexible ingestion layer and dimensionalised data stores',
      'Managed the complex integration of legacy financial systems with a new ERP (SAP Business ByDesign), liaising with 3rd party suppliers to ensure seamless data flow and business continuity',
      'Designed and implemented the Salesforce data integration strategy using custom SOQL to delta-load sales activity data, forming the backbone of core business reporting',
    ],
  },
  {
    role: 'SQL Developer',
    company: 'Oliver James',
    location: 'Manchester, UK',
    period: 'Feb 2021 – Sept 2021',
    description: 'Developed a new cloud-first SQL Data Warehouse to support critical analytical requirements during a period of hyper-growth, reverse-engineering legacy systems to preserve key business logic.',
    type: 'new_company',
    achievements: [
      'Built a cloud-first SQL Data Warehouse supporting critical analytical needs during rapid business growth',
      'Reverse-engineered legacy systems to preserve and migrate key business logic to the new platform',
    ],
  },
  {
    role: 'SQL Developer & Software Tester',
    company: 'Evolution Recruitment',
    location: 'Warrington, UK',
    period: '2018 – 2021',
    description: 'Pioneered the enhancement of a SQL Data Warehouse for an in-house CRM and played a key role in the business\'s inaugural migration to a modern Azure data stack.',
    type: 'new_company',
    achievements: [
      'Pioneered SQL Data Warehouse enhancements for the in-house CRM platform',
      'Key contributor to the business\'s first migration to a modern Azure data stack',
      'Recognised for innovative solutions that significantly enhanced software usability and reporting capabilities',
    ],
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
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Career Journey
          </span>
          <h2 className="text-4xl font-bold font-display text-foreground">
            Experience & <em className="not-italic text-primary">Education.</em>
          </h2>
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
                            {exp.type === 'promotion' && <Award className="h-4 w-4 text-primary" aria-label="Promotion" />}
                            {exp.type === 'new_company' && <Building2 className="h-4 w-4 text-secondary" aria-label="New Company" />}
                          </h5>
                          <p className="text-primary font-medium">{exp.company}</p>
                          {exp.location && <p className="text-secondary text-sm">{exp.location}</p>}
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
