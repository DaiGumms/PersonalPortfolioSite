import Image from 'next/image';

// `displayHeight` is the rendered height in px, tuned per logo so the wordmarks look optically even
const employers = [
  { name: 'Brabners', src: '/logos/brabners-wordmark.svg', width: 1227, height: 199, displayHeight: 20 },
  { name: 'Oliver James', src: '/logos/oliver-james-wordmark.svg', width: 161, height: 22, displayHeight: 22 },
  { name: 'Evolution Recruitment', src: '/logos/evolution-recruitment-wordmark.png', width: 159, height: 64, displayHeight: 40 },
  { name: 'sql_squared', src: '/logos/sql-squared-wordmark.png', width: 383, height: 188, displayHeight: 30 },
];

export default function LogoStripSection() {
  return (
    <section aria-labelledby="logo-strip-heading" className="py-8 md:py-10 bg-surface-lowest">
      <div className="container mx-auto px-4 md:px-6">
        <h2 id="logo-strip-heading" className="text-center text-xs font-bold uppercase tracking-wider text-secondary mb-8">
          Where I&apos;ve worked
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
          {employers.map((employer) => (
            <li key={employer.name}>
              <Image
                src={employer.src}
                alt={employer.name}
                width={employer.width}
                height={employer.height}
                style={{ height: employer.displayHeight, width: 'auto' }}
                className="brightness-0 opacity-50 transition-opacity duration-300 hover:opacity-90 dark:invert dark:opacity-60"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
