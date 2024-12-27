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
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { useQuery } from '@apollo/client'
import { get_premium_ads } from '@/GraphQl'

import { BadgeCheck, Blend, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ImageDisplay from '@/components/ImageDisplay'
import { useRouter } from 'next/navigation'
const PostPage = ({ catgory, searchParams }: PostPageType) => {
  console.log(searchParams, 'searchParams')
  const route = useRouter()

  const filters = {
    categoryId: +catgory?.id
  }
  const { data } = useQuery(get_premium_ads, {
    variables: { page: 1, pageSize: 12, filter: filters },
    skip: !!!catgory?.id
  })
  return (
    <Container className='my-10'>
      <div>
        <Input
          type='email'
          id='email'
          name='email'
          placeholder='Search by city, category...'
          className='rounded-full w-full lg:h-[3rem] text-black text-center text-lg'
        />
      </div>
      {data?.premiumAds?.ads.length > 0 && (
        <div className='flex justify-between items-center mt-2'>
          <h1 className='mt-4 text-2xl text-primary'>
            Toppremium {catgory?.name}
          </h1>
          <Button
            variant='link'
            onClick={() =>
              route.push(
                `/posts/premium?${new URLSearchParams(searchParams).toString()}`
              )
            }
          >
            View all
          </Button>
        </div>
      )}
      {data?.premiumAds?.ads.length > 0 && (
        <div className='mt-4 swiper-container'>
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 15
              }
            }}
            navigation={true}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false
            }}
            className='mySwiper'
          >
            {data &&
              data?.premiumAds?.ads?.map(item => {
                return (
                  <SwiperSlide key={item?.id} className=''>
                    <div className='border-2 border-white bg-[#d4d4d41a] border-opacity-15 rounded-xl cursor-pointer'>
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
                  </SwiperSlide>
                )
              })}
          </Swiper>
        </div>
      )}
    </Container>
  )
}

export { PostPage }
