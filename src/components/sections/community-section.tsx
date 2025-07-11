import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, Linkedin, Twitter, MessageSquare, Users } from 'lucide-react';

const communities = [
  {
    name: 'LinkedIn',
    description: 'Connect with me for professional networking and industry insights.',
    link: 'https://www.linkedin.com/in/david-morgan-gumm-450751133/',
    icon: Linkedin,
    cta: 'Connect',
  },
  {
    name: 'X / Twitter',
    description: 'Follow my thoughts and updates on X (formerly Twitter).',
    link: 'https://x.com/David_MGumm',
    icon: Twitter,
    cta: 'Follow Me',
  },
  {
    name: 'GitHub',
    description: 'Follow my open-source contributions and collaborative projects.',
    link: 'https://github.com/DaiGumms',
    icon: Github,
    cta: 'View Profile',
  },  {
    name: 'sql_squared Blogs',
    description: 'Read my articles and tutorials on software development and tech leadership.',
    link: 'https://www.sqlsquared.co.uk/blog',
    icon: MessageSquare,
    cta: 'Read Articles',
  },
  {
    name: 'Local Tech Meetups',
    description: 'Engage with local tech communities and share knowledge.',
    link: 'https://www.sqlsquared.co.uk/events',
    icon: Users,
    cta: 'Join Events',
  },
];

export default function CommunitySection() {
  return (
    <section id="community" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Community Involvement
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          I believe in the power of community and actively participate in various tech platforms and groups to learn, share, and collaborate.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8"> {/* Changed to lg:grid-cols-5 to accommodate the new item potentially */}
          {communities.map((community) => (
            <Card key={community.name} className="flex flex-col bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
              <CardHeader className="items-center pb-4">
                <div className="p-4 bg-primary/20 rounded-full mb-4 group-hover:bg-primary/30 transition-colors">
                  <community.icon className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-xl text-primary">{community.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4 text-sm">{community.description}</p>
              </CardContent>
              <div className="p-6 border-t">
                <Button variant="outline" asChild className="w-full border-accent text-accent hover:bg-accent/10 transition-colors">
                  <Link href={community.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent/80 hover:border-accent/80">
                    {community.cta}
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
