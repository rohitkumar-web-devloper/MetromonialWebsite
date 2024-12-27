'use client'
import { Input } from '@/components/ui/input'
import { Container } from '@/layouts'
import React, { useEffect, useRef } from 'react'
interface CatgoryType {
  id: number
  name: string
}
interface PostPageType {
  catgory: CatgoryType
}
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import required modules
import { Autoplay } from 'swiper/modules'
import { useQuery } from '@apollo/client'
import { get_premium_ads } from '@/GraphQl'
import { BadgeCheck, Blend, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ImageDisplay from '@/components/ImageDisplay'
import { Skeleton } from '@/components/ui/skeleton'
const PremiumPostPage = ({ catgory }: PostPageType) => {
  const filters = {
    categoryId: +catgory?.id
  }
  const { data, loading } = useQuery(get_premium_ads, {
    variables: { page: 1, pageSize: 12, filter: filters },
    skip: !!!catgory?.id
  })
  return (
    <Container className='my-10'>
      {data?.premiumAds?.ads.length > 0 && (
        <div className='flex justify-between items-center mt-2'>
          <h1 className='mt-4 text-2xl text-primary'>
            Toppremium {catgory?.name}
          </h1>
        </div>
      )}
      {/* <div>
        <div className='flex flex-col space-y-3'>
          <Skeleton className='rounded-xl w-[250px] h-[125px]' />
          <div className='space-y-2'>
            <Skeleton className='w-[250px] h-4' />
            <Skeleton className='w-[200px] h-4' />
          </div>
        </div>
      </div> */}

      {data?.premiumAds?.ads.length > 0 && (
        <div className='gap-4 grid grid-cols-4 mt-4'>
          {data &&
            data?.premiumAds?.ads?.map(item => {
              return (
                <div
                  className='border-2 border-white bg-[#d4d4d41a] border-opacity-15 rounded-xl cursor-pointer'
                  key={item?.id}
                >
                  <Swiper
                    slidesPerView={1}
                    pagination={{
                      clickable: true
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false
                    }}
                    modules={[Autoplay]}
                  >
                    {JSON.parse(item?.profile).map(it => {
                      return (
                        <SwiperSlide key={it} className='relative'>
                          <ImageDisplay imageUrl={it} xs='200px' />
                          <div className='top-2 left-0 absolute bg-primary px-2 py-1 rounded-r-full'>
                            <p className='flex items-center gap-1 text-[12px]'>
                              <BadgeCheck size={20} />
                              Premium
                            </p>
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>

                  <div className='py-4 p-2'>
                    <h1 className='text-white'>{item?.title}</h1>
                    <h1 className='mt-1 text-[12px] text-ellipsis text-white whitespace-nowrap overflow-hidden'>
                      {item?.description}
                    </h1>

                    <div className='flex gap-2 mt-2'>
                      <div className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'>
                        <Blend size={15} /> {item?.nationality}
                      </div>
                      <div className='flex items-center gap-1 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'>
                        <User size={15} /> {item?.age}
                      </div>
                    </div>
                    <div className='bg-[#d4d4d41a] mt-2 rounded-xl'>
                      <h1 className='px-3 py-2 text-white'>
                        ₹ {item?.pricePerHour} Per hour
                      </h1>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </Container>
  )
}

export { PremiumPostPage }
