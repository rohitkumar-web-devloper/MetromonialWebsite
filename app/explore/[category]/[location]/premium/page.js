import React from 'react'
import { PremiumPostPage } from '@/views'
export default async function page(params) {
    const data = await params?.params    
    return (
        <PremiumPostPage category={data?.category} location={data?.location} />
    )
}
