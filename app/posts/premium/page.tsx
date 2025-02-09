import { PremiumPostPage } from '@/views'
import React, { Suspense } from 'react'

export default function page() {
  return <Suspense fallback="...loading"><PremiumPostPage /></Suspense>
}
