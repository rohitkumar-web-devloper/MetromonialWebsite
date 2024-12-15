import ContentCard from '@/components/ContentCard'
import { GradientColor } from '@/components/GradientColor'
import React from 'react'

const SignInPage = () => {
    return (
        <div className=' flex justify-center items-center w-full h-lvh'>
            {/* <div className='w-[40%] mx-auto border p-2 rounded-xl border-gray-500'>
                <h1 className='text-xl font-bold text-center text-primary'>Login</h1>
            </div> */}
            <GradientColor className="w-[95%] sm:w-2/3 md:w-8/12 lg:w-1/3 rounded-xl">
                <ContentCard className="p-4 rounded-xl border-none outline-none bg-[#2f2f2f] bg-opacity-4">
                    <h1 className='text-center text-primary text-xl'>Login to Lust Lounge</h1>
                </ContentCard>
            </GradientColor>
        </div>
    )
}

export { SignInPage }
