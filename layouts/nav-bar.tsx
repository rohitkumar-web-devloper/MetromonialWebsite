'use client'
import React from 'react'
import { Container } from './Container'
import { Button } from '@/components/ui/button'
import { Plus, User, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { userInfoStore } from '@/stores'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
const NavBarComp = () => {
    const router = useRouter()
    const { user } = userInfoStore()
    return (
        <header className='sticky top-0 left-0 w-full z-50 nav-bg  py-4'>
            <Container className=''>
                <div className='flex justify-between items-center'>
                    <h1>Logo</h1>
                    <div className='flex gap-3'>
                        <Button className='rounded-full' variant="outline" size="icon" >
                            <Search />
                        </Button>
                        {!user && <Button className='rounded-full' variant="secondary" size="icon" onClick={() => router.push('sign-in')} >
                            <User />
                        </Button>}
                        {user && <div className='flex gap-4 items-center'>
                            <Avatar className='cursor-pointer'>
                                <AvatarImage src={user?.profile} alt="@shadcn" />
                                <AvatarFallback>{user?.firstName}</AvatarFallback>
                            </Avatar>
                            <h1 className='text-white text-md'>Hi, {user?.firstName}</h1>
                        </div>}
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
