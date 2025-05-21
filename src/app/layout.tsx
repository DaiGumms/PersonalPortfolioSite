import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { ThemeProvider } from '@/components/theme-provider';

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
});

export const metadata: Metadata = {
  title: 'David Morgan-Gumm | Data Platform Manager',
  description: 'Personal portfolio of David Morgan-Gumm, Data Platform Manager at Oliver James, showcasing expertise and projects in data platforms.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${publicSans.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
