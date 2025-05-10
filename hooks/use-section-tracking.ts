import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface SectionData {
  id: string
  title: string
  description: string
  timeSpent: number
  lastViewed: Date
  engagementScore: number
  interactions: number
  scrollDepth: number
}

interface SectionAnalytics {
  totalTimeSpent: number
  averageEngagement: number
  mostEngagedSection: string
  lastInteraction: Date
}

export function useSectionTracking(sectionId: string, sectionTitle: string, sectionDescription: string) {
  const [timeSpent, setTimeSpent] = useState(0)
  const [hasShownRecommendation, setHasShownRecommendation] = useState(false)
  const [engagementScore, setEngagementScore] = useState(0)
  const [interactions, setInteractions] = useState(0)
  const [scrollDepth, setScrollDepth] = useState(0)
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
    rootMargin: '-10% 0px -10% 0px' // Adjust the root margin to better detect sections
  })

  // Debug logging
  useEffect(() => {
    if (inView) {
      console.log(`Section "${sectionTitle}" is now in view`)
    }
  }, [inView, sectionTitle])

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      if (inView) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          const elementTop = rect.top
          const elementHeight = rect.height
          
          // Calculate how much of the element is visible
          const visibleHeight = Math.min(viewportHeight, elementTop + elementHeight) - Math.max(0, elementTop)
          const depth = (visibleHeight / elementHeight) * 100
          const newScrollDepth = Math.min(100, Math.max(0, depth))
          
          setScrollDepth(newScrollDepth)
          
          // Debug logging
          if (newScrollDepth > 50) {
            console.log(`Section "${sectionTitle}" is ${Math.round(newScrollDepth)}% visible`)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [inView, sectionId, sectionTitle])

  // Track time spent and engagement
  useEffect(() => {
    let timer: NodeJS.Timeout
    let startTime: number
    let lastInteraction: number

    if (inView) {
      startTime = Date.now()
      lastInteraction = startTime
      
      // Debug logging
      console.log(`Starting to track time for section "${sectionTitle}"`)
      
      timer = setInterval(() => {
        const currentTime = Date.now()
        const elapsed = Math.floor((currentTime - startTime) / 1000)
        setTimeSpent(elapsed)

        // Calculate engagement score based on multiple factors
        const timeScore = Math.min(elapsed / 15, 1) * 40
        const scrollScore = (scrollDepth / 100) * 30
        const interactionScore = Math.min(interactions / 3, 1) * 30
        
        const totalScore = timeScore + scrollScore + interactionScore
        setEngagementScore(Math.round(totalScore))

        // Debug logging
        if (elapsed % 5 === 0) { // Log every 5 seconds
          console.log(`Section "${sectionTitle}" - Time: ${elapsed}s, Score: ${Math.round(totalScore)}`)
        }

        // Show recommendation after 3 seconds and lower engagement threshold
        if (elapsed >= 3 && !hasShownRecommendation && totalScore >= 30) {
          setHasShownRecommendation(true)
          
          // Debug logging
          console.log(`Triggering recommendation for section "${sectionTitle}"`)
          
          // Dispatch custom event with enhanced analytics
          window.dispatchEvent(new CustomEvent('section-recommendation', {
            detail: {
              sectionId,
              sectionTitle,
              sectionDescription,
              timeSpent: elapsed,
              engagementScore: totalScore,
              scrollDepth,
              interactions,
              lastInteraction: new Date(lastInteraction)
            }
          }))
        }
      }, 500)
    }

    return () => {
      if (timer) {
        clearInterval(timer)
        // Debug logging
        console.log(`Stopped tracking time for section "${sectionTitle}"`)
      }
    }
  }, [inView, sectionId, sectionTitle, sectionDescription, hasShownRecommendation, scrollDepth, interactions])

  // Track user interactions
  useEffect(() => {
    const handleInteraction = () => {
      if (inView) {
        setInteractions(prev => {
          const newCount = prev + 1
          // Debug logging
          console.log(`Section "${sectionTitle}" - Interaction count: ${newCount}`)
          return newCount
        })
      }
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.addEventListener('click', handleInteraction)
      element.addEventListener('mouseover', handleInteraction)
      element.addEventListener('mousemove', handleInteraction)
      
      // Debug logging
      console.log(`Added interaction listeners to section "${sectionTitle}"`)
    }

    return () => {
      if (element) {
        element.removeEventListener('click', handleInteraction)
        element.removeEventListener('mouseover', handleInteraction)
        element.removeEventListener('mousemove', handleInteraction)
      }
    }
  }, [inView, sectionId, sectionTitle])

  return { 
    ref, 
    timeSpent, 
    hasShownRecommendation,
    engagementScore,
    interactions,
    scrollDepth
  }
} 