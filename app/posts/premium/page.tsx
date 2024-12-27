import { PremiumPostPage } from '@/views'
import React from 'react'

export default async function page ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const data = await searchParams
  return <PremiumPostPage catgory={JSON.parse(data?.catgory)}  />
}
