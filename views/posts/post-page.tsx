'use client'
import { Input } from '@/components/ui/input'
import { Container } from '@/layouts'
import React, { useEffect, useRef, useState } from 'react'
interface CatgoryType {
  id: number
  name: string
}
interface PostPageType {
  data: CatgoryType
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
import { ArrowLeft, BadgeCheck, Blend, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ImageDisplay from '@/components/ImageDisplay'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import No_Data from '../../assets/no_feedback-67e33c89.svg'
import { GlobalSearchModal } from '@/components/GlobalSearch'
import { AdsDetailsModal } from '@/components/AdDetailsModal'
import { useModalControl } from '@/hooks'
const PostPage = ({ searchParams }: PostPageType) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedData, setSelectedData] = useState()
  const {
    open: isAddOpen,
    handleCloseModal,
    handleOpenModal
  } = useModalControl()
  const filters = {
    categoryId: +searchParams?.id,
    attentionTo: searchParams?.attentionTo
      ? searchParams?.attentionTo?.split(',')
      : undefined,
    // breast: null,
    city: searchParams?.city || undefined,
    ethnicity: searchParams?.ethnicity
      ? // ? searchParams?.ethnicity.split(',')
        searchParams?.ethnicity
      : undefined,
    // hair: null,
    nationality: searchParams?.country || undefined,
    placeOfService: searchParams?.placeOfService
      ? searchParams?.placeOfService?.split(',')
      : undefined,
    services: searchParams?.services
      ? searchParams?.services.split(',')
      : undefined,
    state: searchParams?.state ? searchParams?.state : undefined
  }
  const { data, loading } = useQuery(get_premium_ads, {
    variables: { page: 1, pageSize: 12, filter: filters }
    // skip: !!!searchParams?.id
  })
  return (
    <Container className='my-10'>
      <div>
        <Input
          type='email'
          id='email'
          value=''
          onChange={() => console.log()}
          onClick={() => setOpen(true)}
          name='email'
          placeholder='Search by city, category...'
          className='rounded-full w-full lg:h-[3rem] text-black text-center text-lg'
        />
      </div>
      {data?.premiumAds?.ads.length > 0 && (
        <div className='flex justify-between items-center mt-2'>
          <h1 className='flex items-center gap-2 mt-4 text-2xl text-primary'>
            <ArrowLeft
              className='cursor-pointer'
              onClick={() => router.back()}
            />
            Toppremium {searchParams?.name}
          </h1>
          <Button
            variant='link'
            onClick={() =>
              router.push(`/posts/premium?data=${JSON.stringify(searchParams)}`)
            }
          >
            View all
          </Button>
        </div>
      )}
      {loading && (
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6'>
          {[...Array(8)].map((_, index) => {
            return (
              <div className='flex flex-col space-y-3' key={index}>
                <Skeleton className='rounded-xl h-[200px]' />
                <div className='space-y-2'>
                  <Skeleton className='w-[250px] h-4' />
                  <Skeleton className='w-[250px] h-4' />
                  <div className='flex gap-2'>
                    <Skeleton className='w-[100px] h-4' />
                    <Skeleton className='w-[80px] h-4' />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {!loading && data?.premiumAds?.ads.length == 0 && (
        <div className='flex flex-col justify-center items-center mt-10'>
          <Image src={No_Data} alt='no data' width={400} height={400} />
          <h1 className='mt-4 text-2xl text-primary'>No data found...</h1>
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
              delay: 5000,
              disableOnInteraction: false
            }}
            className='mySwiper'
          >
            {data &&
              data?.premiumAds?.ads?.map(item => {
                return (
                  <SwiperSlide
                    key={item?.id}
                    className=''
                    onClick={() => {
                      handleOpenModal()
                      setSelectedData(item)
                    }}
                  >
                    <div className='border-2 border-white bg-[#d4d4d41a] border-opacity-15 rounded-xl cursor-pointer'>
                      {[JSON.parse(item?.profile)[0]].map(it => {
                        return (
                          <div key={it} className='relative'>
                            <ImageDisplay imageUrl={it} xs='200px' />
                            <div className='top-2 left-0 absolute bg-primary px-2 py-1 rounded-r-full'>
                              <p className='flex items-center gap-1 text-[12px]'>
                                <BadgeCheck size={20} />
                                Premium
                              </p>
                            </div>
                          </div>
                        )
                      })}

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
      {data?.premiumAds?.ads.length > 0 && (
        <div className='flex justify-between items-center mt-2'>
          <h1 className='flex items-center gap-2 mt-4 text-2xl text-primary'>
            <ArrowLeft
              className='cursor-pointer'
              onClick={() => router.back()}
            />
            {searchParams?.name} Users
          </h1>
        </div>
      )}
      {data?.premiumAds?.ads.length > 0 && (
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6'>
          {data &&
            data?.premiumAds?.ads?.map(item => {
              return (
                <div
                  key={item?.id}
                  className=''
                  onClick={() => {
                    handleOpenModal()
                    setSelectedData(item)
                  }}
                >
                  <div className='border-2 border-white bg-[#d4d4d41a] border-opacity-15 rounded-xl cursor-pointer'>
                    <Swiper
                      breakpoints={{
                        0: {
                          slidesPerView: 1,
                          spaceBetween: 20
                        },
                      }}
              
                      className='mySwiper'
                    >
                      {JSON.parse(item?.profile).map(it => {
                        return (
                          <SwiperSlide key={it} className='relative'>
                            <ImageDisplay imageUrl={it} xs='200px' />
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
                </div>
              )
            })}
        </div>
      )}
      {open && (
        <GlobalSearchModal
          open={open}
          close={() => setOpen(false)}
          searchParams={searchParams}
        />
      )}
      {isAddOpen && (
        <AdsDetailsModal
          open={isAddOpen}
          close={handleCloseModal}
          selectedData={selectedData}
        />
      )}
    </Container>
  )
}

export { PostPage }
