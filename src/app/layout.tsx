import type { Metadata } from 'next';
import { Public_Sans, Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { ThemeProvider } from '@/components/theme-provider';
import FloatingThemeToggle from '@/components/layout/floating-theme-toggle';

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Echelon's display face, used only for its wordmark
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'David Morgan-Gumm | Data & AI Engineer',
  description: 'Personal portfolio of David Morgan-Gumm, Data & AI Engineer in Manchester: projects, career journey and community work.',
  icons: {
    icon: [
      {
        url: '/favicon-color.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${publicSans.variable} ${inter.variable} ${cinzel.variable} font-sans antialiased text-foreground bg-surface-lowest`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <FloatingThemeToggle />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
