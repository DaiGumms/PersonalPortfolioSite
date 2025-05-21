import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Rss } from 'lucide-react';
import Image from 'next/image';

const items = [
  {
    type: 'Blog',
    title: 'Mastering SQL for Data Analysis',
    description: 'An in-depth guide to leveraging advanced SQL techniques for insightful data analysis. Explore window functions, CTEs, and more.',
    link: 'https://sqlsquared.co.uk/blog/mastering-sql', // Example link
    image: 'https://placehold.co/600x300.png',
    imageHint: 'code database',
    icon: Rss,
  },
  {
    type: 'Event',
    title: 'Webinar: The Future of Database Technologies',
    description: 'Join us for a discussion on emerging trends in database management, including NoSQL, NewSQL, and cloud-native databases.',
    link: 'https://sqlsquared.co.uk/events/future-of-databases', // Example link
    image: 'https://placehold.co/600x300.png',
    imageHint: 'conference presentation',
    icon: CalendarDays,
  },
  {
    type: 'Blog',
    title: 'Optimizing Database Performance: A Checklist',
    description: 'Practical tips and tricks for identifying and resolving performance bottlenecks in your SQL databases.',
    link: 'https://sqlsquared.co.uk/blog/optimizing-performance', // Example link
    image: 'https://placehold.co/600x300.png',
    imageHint: 'server performance',
    icon: Rss,
  },
];

export default function BlogAndEventsSection() {
  return (
    <section id="blog" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Blog & Events
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12">
          Insights, articles, and event updates from <Link href="https://sqlsquared.co.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">sqlsquared.co.uk</Link>.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card key={item.title} className="flex flex-col bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 group overflow-hidden">
              <div className="relative w-full h-48">
                 <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={item.imageHint}
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-primary">{item.type}</span>
                </div>
                <CardTitle className="text-xl text-accent">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground text-sm line-clamp-3">{item.description}</CardDescription>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="link" asChild className="text-accent p-0 hover:text-accent/80">
                  <Link href={item.link} target="_blank" rel="noopener noreferrer">
                    Read More / View Event <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="https://sqlsquared.co.uk" target="_blank" rel="noopener noreferrer">
              Visit sqlsquared.co.uk <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Helper component for ExternalLink, can be moved to a utils or icons file if needed
const ExternalLink = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
