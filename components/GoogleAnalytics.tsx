'use client';

import Script from 'next/script';

// debounce utility for tracking events
const debounce = (func: (...args: unknown[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: unknown[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// track viewed components to prevent duplicate view events
const viewedComponents = new Set<string>();

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      {/* Google Analytics 4 - Modern approach using gtag.js */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Utility function to track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Google Analytics measurement ID not found');
    return;
  }

  try {
    // Send via gtag (GA4) - modern approach
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  } catch (error) {
    console.warn('Failed to track event:', error);
  }
};

// SaaS-specific tracking functions
export const trackProjectionView = (projectionType: string) => {
  trackEvent('view_projection', 'saas_metrics', projectionType);
};

// create debounced version for slider interactions to prevent spam
const debouncedSliderTracking = debounce((sliderName: unknown, value: unknown) => {
  if (typeof sliderName === 'string' && typeof value === 'number') {
    trackEvent('slider_interaction', 'user_input', sliderName, value);
  }
}, 500);

export const trackSliderInteraction = (sliderName: string, value: number) => {
  debouncedSliderTracking(sliderName, value);
};

export const trackChartView = (chartType: string) => {
  const viewKey = `chart_${chartType}`;
  if (!viewedComponents.has(viewKey)) {
    viewedComponents.add(viewKey);
    trackEvent('view_chart', 'visualization', chartType);
  }
};

export const trackTableView = () => {
  const viewKey = 'table_projection_table';
  if (!viewedComponents.has(viewKey)) {
    viewedComponents.add(viewKey);
    trackEvent('view_table', 'visualization', 'projection_table');
  }
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}
