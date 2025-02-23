import React from 'react'
import { PostPage } from '@/views'
export default async function page(params) {
    const data = await params?.params    
    return (
        <PostPage category={data?.category} location={data?.location} />
    )
}
