'use client'
import { Container } from '@/layouts'
import React, { useEffect, useRef, useState } from 'react'
interface CatgoryType {
  id: number
  name: string
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
import { ArrowLeft, BadgeCheck, Blend, User } from 'lucide-react'
import ImageDisplay from '@/components/ImageDisplay'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter, useSearchParams } from 'next/navigation'
import { GlobalSearchModal } from '@/components/GlobalSearch'
import { AdsDetailsModal } from '@/components/AdDetailsModal'
import { useModalControl, usePagination } from '@/hooks'
import { useInView } from "react-intersection-observer";
const PremiumPostPage = (mainData) => {
  
  const searchParamsData = useSearchParams()
  const searchParams = JSON.parse(searchParamsData.get('data') || "{}")
  const [open, setOpen] = useState(false)
  const [selectedData, setSelectedData] = useState()
  const { page, setPage } = usePagination()
  const router = useRouter()
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const filters = {
    categoryId: +searchParams?.id,
    attentionTo: searchParams?.attentionTo
      ? searchParams?.attentionTo?.split(',')
      : undefined,
    city: searchParams?.city || undefined,
    ethnicity: searchParams?.ethnicity
      ?
      searchParams?.ethnicity
      : undefined,
    nationality: searchParams?.country || undefined,
    placeOfService: searchParams?.placeOfService
      ? searchParams?.placeOfService?.split(',')
      : undefined,
    services: searchParams?.services
      ? searchParams?.services.split(',')
      : undefined,
    state: searchParams?.state ? searchParams?.state : undefined,
    breast: searchParams?.breast ? searchParams?.breast : undefined,
    hair: searchParams?.hair ? searchParams?.hair : undefined,
    search: searchParams?.search ? searchParams?.search : undefined,
  }
  const [limit, setLimit] = useState(false)
  const [adsData, setAdsData] = useState([])
  const { data, loading } = useQuery(get_premium_ads, {
    variables: { page: page, pageSize: 15, filter: filters }
  })

  useEffect(() => {
    if (data) {
      setLimit(data?.premiumAds?.ads.length)
      setAdsData((prevAds) => [...prevAds, ...data?.premiumAds?.ads]);
    }
  }, [data])
  const {
    open: isAddOpen,
    handleCloseModal,
    handleOpenModal
  } = useModalControl()
  useEffect(() => {
    if (inView && limit) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView])

  return (
    <Container className='my-10'>
      {adsData.length > 0 && (
        <div className='flex justify-between items-center mt-2'>
          <h1 className='flex items-center gap-2 mt-4 text-2xl text-primary'>
            <ArrowLeft
              className='cursor-pointer'
              onClick={() => router.back()}
            />
            Toppremium {searchParams?.name}
          </h1>
        </div>
      )}{' '}
      {(loading && page == 1) && (
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
      {adsData.length > 0 && (
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4'>
          {
            adsData?.map(item => {
              return (
                <div
                  className='border-2 border-white bg-[#d4d4d41a] border-opacity-15 rounded-xl cursor-pointer'
                  key={item?.id}
                  onClick={() => {
                    handleOpenModal()
                    setSelectedData(item)
                  }}
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
      {(adsData.length && limit) && <div ref={ref}>
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6'>
          {[...Array(4)].map((_, index) => {
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

      </div>}
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

export { PremiumPostPage }
