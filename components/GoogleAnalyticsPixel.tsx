'use client'

import { useEffect } from 'react'

interface GoogleAnalyticsPixelProps {
  measurementId: string
}

export default function GoogleAnalyticsPixel({ measurementId }: GoogleAnalyticsPixelProps) {
  useEffect(() => {
    // Create and append the pixel tracking image
    const createPixel = () => {
      const img = document.createElement('img')
      img.src = `https://www.google-analytics.com/collect?v=1&tid=${measurementId}&cid=${generateClientId()}&t=pageview&dp=${encodeURIComponent(window.location.pathname)}&dt=${encodeURIComponent(document.title)}`
      img.style.display = 'none'
      img.style.width = '1px'
      img.style.height = '1px'
      img.alt = ''
      document.body.appendChild(img)
    }

    // Generate a client ID for tracking
    const generateClientId = () => {
      let clientId = localStorage.getItem('ga_client_id')
      if (!clientId) {
        clientId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        localStorage.setItem('ga_client_id', clientId)
      }
      return clientId
    }

    // Create pixel on mount
    createPixel()

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        createPixel()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [measurementId])

  return null // This component doesn't render anything visible
}

// Utility function to send custom pixel events
export const sendPixelEvent = (measurementId: string, eventAction: string, eventCategory: string, eventLabel?: string, eventValue?: number) => {
  if (typeof window === 'undefined') return

  const generateClientId = () => {
    let clientId = localStorage.getItem('ga_client_id')
    if (!clientId) {
      clientId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      localStorage.setItem('ga_client_id', clientId)
    }
    return clientId
  }

  const img = document.createElement('img')
  let pixelUrl = `https://www.google-analytics.com/collect?v=1&tid=${measurementId}&cid=${generateClientId()}&t=event&ec=${encodeURIComponent(eventCategory)}&ea=${encodeURIComponent(eventAction)}`
  
  if (eventLabel) {
    pixelUrl += `&el=${encodeURIComponent(eventLabel)}`
  }
  
  if (eventValue !== undefined) {
    pixelUrl += `&ev=${eventValue}`
  }

  img.src = pixelUrl
  img.style.display = 'none'
  img.style.width = '1px'
  img.style.height = '1px'
  img.alt = ''
  document.body.appendChild(img)

  // Remove the pixel after a short delay to keep DOM clean
  setTimeout(() => {
    if (img.parentNode) {
      img.parentNode.removeChild(img)
    }
  }, 1000)
}
