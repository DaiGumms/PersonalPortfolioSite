'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Briefcase, ChevronRight } from 'lucide-react';

type Role = {
  role: string;
  period: string;
  promoted?: boolean;
  description: string;
  achievements: string[];
};

type Employer = {
  company: string;
  location: string;
  period: string;
  logo: { src: string; alt: string; padded?: boolean };
  // Brand colours: `tile` sits behind the logo mark, `accent` drives the card bar and role rail
  brand: { tile: string; accent?: string };
  roles: Role[];
};

const experiences: Employer[] = [
  {
    company: 'Brabners',
    location: 'Manchester, UK',
    period: 'Aug 2026 – Present',
    logo: { src: '/logos/brabners.svg', alt: 'Brabners logo' },
    brand: { tile: '#181b25', accent: '#d98a5b' },
    roles: [
      {
        role: 'Data & AI Engineer',
        period: 'Aug 2026 – Present',
        description: "Brought in to modernise the firm's core data platform, delivering centralised analytics, master data management, system integration, and Azure cloud adoption, while laying the groundwork for the firm's AI strategy.",
        achievements: [
          'Delivered a new analytical SQL data warehouse built on medallion architecture, forming the foundation for business-wide Power BI reporting suites',
          'Established the platform for integrating and managing data from multiple business systems, setting the foundation for Azure cloud adoption',
          "Built and launched 'Central Intelligence Tools', an internal application used by 400–500 people that handles new matter opening end to end and is being extended to link third-party systems together",
          'Introduced the foundations of mature DevOps practice in GitHub, with automated testing, CI/CD deployment pipelines, infrastructure as code, and branch protection and pull request policies',
          'Introduced the development function to advanced Claude tooling and agentic development processes, significantly reducing development lead time and producing robust, secure codebases',
        ],
      },
    ],
  },
  {
    company: 'sql_squared',
    location: 'Manchester, UK',
    period: '2024 – Present',
    logo: { src: '/logos/sql-squared.webp', alt: 'sql_squared logo', padded: true },
    brand: { tile: '#ffffff' },
    roles: [
      {
        role: 'Founder & Host',
        period: '2024 – Present',
        description: 'Founded and host sql_squared, a growing community platform for data professionals, producing high-quality technical content across articles, videos, and podcasts.',
        achievements: [
          'Develop and produce technical content covering complex data and AI topics for both expert and newcomer audiences',
          'Actively building a community for data professionals by fostering discussions around emerging industry trends and best practices',
        ],
      },
    ],
  },
  {
    company: 'Oliver James',
    location: 'Manchester, UK',
    period: 'Feb 2021 – Jul 2026',
    logo: { src: '/logos/oliver-james.svg', alt: 'Oliver James logo' },
    brand: { tile: '#224054', accent: '#65b0b7' },
    roles: [
      {
        role: 'Data Platform Manager',
        period: 'Nov 2023 – Jul 2026',
        promoted: true,
        description: 'Defined and executed the strategic roadmap for the data and development functions, leading a high-performing team of data engineers and developers while partnering with senior executives to champion a data-first culture.',
        achievements: [
          'Matured AGILE processes by solidifying sprint ceremonies, introducing a development change board, and improving release planning and business transparency',
          'Drove continuous platform innovation by translating emerging industry trends into actionable technical strategies, leveraging insights from the sql_squared podcast and major UK conferences',
          'Led the end-to-end implementation and rollout of modern enterprise platforms including Microsoft Fabric, solving master data management challenges and improving system integration reliability',
          'Partnered with external vendors for the successful implementation of large-scale enterprise application suites, technical management processes, and custom public-facing applications',
          'Translated complex technical capabilities into clear business value and ROI to drive data-led decision-making across the organisation',
        ],
      },
      {
        role: 'Data Engineering Lead',
        period: 'Oct 2022 – Oct 2023',
        promoted: true,
        description: "Following promotion, led the architecture, management, and operational excellence of the new data platform. Introduced and scaled the business's DevOps function and co-developed the long-term technical strategy with senior leadership.",
        achievements: [
          'Implemented Azure DevOps and CI/CD pipelines (YAML), moving from manual releases to 100% automated deployment for all software, data, and AI resources',
          'Co-developed the long-term technical strategy with senior leadership, focusing on embedding data into core business processes to drive commercial growth',
          'Engineered a near real-time, event-driven reporting suite for global telephony data, enabling management to monitor call statistics and integrating AI-powered call transcription summaries',
        ],
      },
      {
        role: 'Senior Data Engineer',
        period: 'Oct 2021 – Sept 2022',
        promoted: true,
        description: 'Led the greenfield implementation of a new enterprise Data Platform, architecting a distributed and scalable design. Managed complex cross-functional integrations and established core data integration strategies.',
        achievements: [
          'Architected a distributed, scalable data platform with a flexible ingestion layer and dimensionalised data stores',
          'Managed the complex integration of legacy financial systems with a new ERP (SAP Business ByDesign), liaising with 3rd party suppliers to ensure seamless data flow and business continuity',
          'Designed and implemented the Salesforce data integration strategy using custom SOQL to delta-load sales activity data, forming the backbone of core business reporting',
        ],
      },
      {
        role: 'SQL Developer',
        period: 'Feb 2021 – Sept 2021',
        description: 'Developed a new cloud-first SQL Data Warehouse to support critical analytical requirements during a period of hyper-growth, reverse-engineering legacy systems to preserve key business logic.',
        achievements: [
          'Built a cloud-first SQL Data Warehouse supporting critical analytical needs during rapid business growth',
          'Reverse-engineered legacy systems to preserve and migrate key business logic to the new platform',
        ],
      },
    ],
  },
  {
    company: 'Evolution Recruitment',
    location: 'Warrington, UK',
    period: '2018 – 2021',
    logo: { src: '/logos/evolution-recruitment.png', alt: 'Evolution Recruitment logo' },
    brand: { tile: '#000029', accent: '#00e6ff' },
    roles: [
      {
        role: 'SQL Developer & Software Tester',
        period: '2018 – 2021',
        description: 'Pioneered the enhancement of a SQL Data Warehouse for an in-house CRM and played a key role in the business\'s inaugural migration to a modern Azure data stack.',
        achievements: [
          'Pioneered SQL Data Warehouse enhancements for the in-house CRM platform',
          'Key contributor to the business\'s first migration to a modern Azure data stack',
          'Recognised for innovative solutions that significantly enhanced software usability and reporting capabilities',
        ],
      },
    ],
  },
];

const education = [
  {
    name: 'Computer Science (BSc) 2:1 Hons',
    institution: 'University of Liverpool',
    year: '2018',
    description: 'Specialised in Software Engineering and Data Structures'
  },
  {
    name: 'Management & Leadership (Level 5)',
    institution: 'Chartered Management Institute',
    year: '2026',
    description: 'Advanced leadership and strategic management'
  },
  {
    name: 'Azure Fundamentals (AZ-900)',
    institution: 'Microsoft',
    year: '2019',
    description: 'Cloud computing and Azure services fundamentals'
  }
];

function RoleDetails({ role }: { role: Role }) {
  return (
    <>
      <p className="text-secondary mb-6 leading-relaxed">
        {role.description}
      </p>
      <div className="bg-surface rounded-xl p-4 md:p-5">
        <h6 className="text-sm font-semibold text-foreground mb-3 flex items-center uppercase tracking-wider">
          Key Achievements
        </h6>
        <ul className="space-y-3">
          {role.achievements.map((achievement, idx) => (
            <li key={idx} className="flex items-start text-sm text-secondary">
              <ChevronRight className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function PromotedBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
      <Award className="h-3 w-3" aria-hidden="true" /> Promoted
    </span>
  );
}

export default function TechLeadershipSection() {
  return (
    <div className="py-20 bg-surface-lowest">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-12 space-y-4">
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
            <div className="relative border-l border-surface-high/50 ml-6 space-y-12">
              {experiences.map((job) => {
                const accent = job.brand.accent ?? 'hsl(var(--primary))';
                const [firstRole] = job.roles;
                const isMultiRole = job.roles.length > 1;
                return (
                  <div key={job.company} className="relative pl-8 md:pl-14">
                    <div
                      className="absolute -left-6 top-0 h-12 w-12 rounded-xl overflow-hidden border border-foreground/10 ring-4 ring-surface-lowest shadow-ambient"
                      style={{ backgroundColor: job.brand.tile }}
                    >
                      <Image
                        src={job.logo.src}
                        alt={job.logo.alt}
                        width={48}
                        height={48}
                        className={job.logo.padded ? 'h-full w-full object-contain p-1' : 'h-full w-full object-cover'}
                      />
                    </div>
                    <Card className="border-0 shadow-ambient bg-surface-low rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-ambient-lg hover:-translate-y-1 group">
                      <div className="h-1" style={{ backgroundColor: accent }} />
                      <CardContent className="p-5 md:p-8">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                          <div>
                            {isMultiRole ? (
                              <>
                                <h5 className="text-xl font-bold text-foreground font-display">{job.company}</h5>
                                <p className="text-primary font-medium">{job.roles.length} roles · {job.roles.filter((r) => r.promoted).length} promotions</p>
                              </>
                            ) : (
                              <>
                                <h5 className="text-xl font-bold text-foreground font-display">{firstRole.role}</h5>
                                <p className="text-primary font-medium">{job.company}</p>
                              </>
                            )}
                            <p className="text-secondary text-sm">{job.location}</p>
                          </div>
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface text-secondary text-sm font-medium shrink-0">
                            {job.period}
                          </div>
                        </div>

                        {isMultiRole ? (
                          <div className="relative md:border-l-2 md:ml-1.5 md:pl-8 space-y-10 mt-8" style={{ borderColor: `color-mix(in srgb, ${accent} 35%, transparent)` }}>
                            {job.roles.map((role) => (
                              <div key={role.role} className="relative">
                                <span
                                  className="hidden md:block absolute -left-[calc(2rem+7px)] top-1.5 h-3 w-3 rounded-full ring-4 ring-surface-low"
                                  style={{ backgroundColor: accent }}
                                  aria-hidden="true"
                                />
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                                  <h6 className="text-lg font-bold text-foreground font-display">{role.role}</h6>
                                  {role.promoted && <PromotedBadge />}
                                  <span className="text-secondary text-sm">{role.period}</span>
                                </div>
                                <RoleDetails role={role} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <RoleDetails role={firstRole} />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
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
