'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ArticleContent from '@/app/artikel/[slug]/ArticleContent'
import Paywall from './Paywall'

interface ArticlePremiumGateProps {
  slug: string
  initialContent: string
  premium: boolean // server told us content is gated
}

export default function ArticlePremiumGate({ slug, initialContent, premium }: ArticlePremiumGateProps) {
  const router = useRouter()
  const [content, setContent] = useState(initialContent)
  const [isPremium, setIsPremium] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checking, setChecking] = useState(premium)

  // On mount, check member token and subscription status
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('member_token') : null
    if (!token) {
      setIsLoggedIn(false)
      setChecking(false)
      return
    }
    setIsLoggedIn(true)

    fetch('/api/auth/user/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((json) => {
        const status = json.data?.subscriptionStatus
        if (status === 'premium') {
          setIsPremium(true)
          // Re-fetch full content with the member token
          fetch(`/api/articles/${slug}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => r.json())
            .then((json2) => {
              if (json2.data?.content) setContent(json2.data.content)
            })
            .catch(() => {})
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false))
  }, [slug])

  const handleShowLogin = useCallback(() => {
    localStorage.setItem('premium_return_to', `/artikel/${slug}`)
    router.push('/login')
  }, [router, slug])

  // Show loading state only while we determine premium status
  if (checking) {
    return (
      <div className="space-y-4">
        <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-4/6" />
      </div>
    )
  }

  return (
    <>
      {/* Render preview (or full content when premium) */}
      <ArticleContent content={content} />

      {/* Show paywall after the preview if gated and not premium */}
      {premium && !isPremium && (
        <div className="mt-10">
          <Paywall isLoggedIn={isLoggedIn} onShowLogin={handleShowLogin} />
        </div>
      )}
    </>
  )
}
