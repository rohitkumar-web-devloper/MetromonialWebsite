'use client'
import React from 'react'
import { Container } from './Container'
import { Button } from '@/components/ui/button'
import { Plus, User, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
const NavBarComp = () => {
    const router = useRouter()
    return (
        <header className='sticky top-0 left-0 w-full z-50 nav-bg  py-4'>
            <Container className=''>
                <div className='flex justify-between items-center'>
                    <h1>Logo</h1>
                    <div className='flex gap-3'>
                        <Button className='rounded-full' variant="outline" size="icon" >
                            <Search />
                        </Button>
                        <Button className='rounded-full' variant="secondary" size="icon" onClick={() => router.push('sign-in')} >
                            <User />
                        </Button>
                        <Button className='rounded-full text-black font-medium' >
                            <Plus />
                            Add Post
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export { NavBarComp }
