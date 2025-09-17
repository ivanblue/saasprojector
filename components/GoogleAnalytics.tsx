'use client'

import Script from 'next/script'
import { sendPixelEvent } from './GoogleAnalyticsPixel'

interface GoogleAnalyticsProps {
  measurementId: string
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}

// Utility function to track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  
  // Send via gtag (GA4)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
  
  // Send via pixel tracking (Universal Analytics backup)
  if (measurementId) {
    sendPixelEvent(measurementId, action, category, label, value)
  }
}

// SaaS-specific tracking functions
export const trackProjectionView = (projectionType: string) => {
  trackEvent('view_projection', 'saas_metrics', projectionType)
}

export const trackSliderInteraction = (sliderName: string, value: number) => {
  trackEvent('slider_interaction', 'user_input', sliderName, value)
}

export const trackChartView = (chartType: string) => {
  trackEvent('view_chart', 'visualization', chartType)
}

export const trackTableView = () => {
  trackEvent('view_table', 'visualization', 'projection_table')
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (command: string, targetId: string, config?: any) => void
  }
}
