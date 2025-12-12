import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleAdSense from '@/components/GoogleAdSense';
import Navigation from '@/components/Navigation';

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
      <head>
        <GoogleAdSense />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {measurementId && <GoogleAnalytics measurementId={measurementId} />}
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
            <footer className="w-full mt-12 pt-6 border-t border-gray-700/50">
              <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-500">
                <p>&copy; 2025 SaaS Projector. All rights reserved.</p>
                <Navigation />
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
