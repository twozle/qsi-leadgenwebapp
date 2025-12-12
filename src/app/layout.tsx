import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'The Produce Reliability Scorecard™ | QSI',
  description: 'Instantly discover why your produce supply is inconsistent and get the exact steps to fix it.',
  keywords: ['produce', 'supply chain', 'reliability', 'scorecard', 'wholesale produce'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
