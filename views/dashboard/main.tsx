'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Container } from '@/layouts'
import { userInfoStore } from '@/stores'
import React from 'react'
export const DashboardMain = () => {
  const { user } = userInfoStore()
  return (
    <div>
      <div className='h-52 w-full bg-primary/80 relative mb-[400px]'>
        <div className='h-60  w-full absolute top-1/2 left-0 '>
          <Container className=''>
            <div className='h-72 w-64 bg-black bg-opacity-90 p-2 rounded-lg'>
              <div className=' border border-primary h-full w-full  rounded-lg text-center '>
                <div className='w mx-auto mt-6 rounded-full'>
                  <Avatar className='cursor-pointer w-28 h-28 mx-auto'>
                    <AvatarImage src={user?.profile} alt='@shadcn' />
                    <AvatarFallback>{user?.firstName}</AvatarFallback>
                  </Avatar>
                </div>
                <h2 className='text-primary mt-2'>Welcome</h2>
                <h2 className='text-white mt-2'>{`${user?.firstName} ${user.lastName}`}</h2>
                <h6 className='text-white mt-1 text-sm'>{user.email}</h6>
              </div>
            </div>
            <div className='grid grid-cols-4 gap-4 mt-10'>
              <div className='border border-primary/10 rounded-md'>
                <div className='bg-primary/10 w-full rounded-md text-center py-6'>
                  <h2 className=' text-primary'>ADS</h2>
                </div>
                <div className='py-6 px-4'>
                  <div className='flex justify-between items-center'>
                    <h6 className='text-white'>Total Ads</h6>
                    <h6 className='text-white'>6</h6>

                  </div>

                </div>

              </div>
              <div></div>
              <div></div>
              <div></div>

            </div>


          </Container>
        </div>
      </div>
    </div>
  )
}
