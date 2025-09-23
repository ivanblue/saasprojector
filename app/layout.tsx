import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SaaS Revenue Projector - Model Your Subscription Growth',
  description:
    'Interactive SaaS revenue projection tool. Model your subscription business growth with real-time calculations, visual charts, and comprehensive metrics including MRR, ARR, customer growth, and churn analysis.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {measurementId && <GoogleAnalytics measurementId={measurementId} />}
        {children}
      </body>
    </html>
  );
}
