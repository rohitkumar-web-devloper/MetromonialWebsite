'use client'
import ContentCard from '@/components/ContentCard'
import { GradientColor } from '@/components/GradientColor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import React from 'react'

const SignInPage = () => {
    const route = useRouter()
    return (
        <div className=' flex justify-center items-center w-full h-lvh'>
            <GradientColor className="w-[95%] sm:w-2/3 md:w-8/12 lg:w-1/3 rounded-xl">
                <ContentCard className="p-4 py-8 rounded-xl border-none outline-none bg-[#2f2f2f] bg-opacity-4">
                    <h1 className='text-center text-primary text-xl mt-2'>Login to Lust Lounge</h1>
                    <form className='mt-6'>
                        <div className='flex flex-col gap-4'>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="email" className='text-white'>Email / Phone</Label>
                                <Input type="email" id="email" placeholder="Enter Email or Phone Number" className='w-full rounded-full' />
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="email" className='text-white'>Password</Label>
                                <Input type="email" id="email" placeholder="Enter Password" className='w-full rounded-full' />
                            </div>
                            <Button type='button' className='text-lg rounded-full mb-2 mt-3'>Submit</Button>
                            <div className='flex justify-center'>
                                <h6 className='text-white text-md inline-block cursor-pointer hover:text-primary'>Forgot Your Password?</h6>
                            </div>
                            <div className="line mt-4"></div>
                            <div className='flex justify-center'>
                                <h2 className='text-white inline-block'>Don't have an account? <span className='cursor-pointer text-primary' onClick={() => route.push('/sign-up')}>Sign up</span></h2>
                            </div>
                        </div>

                    </form>
                </ContentCard>
            </GradientColor>
        </div>
    )
}

export { SignInPage }
