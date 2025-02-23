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
import { Autoplay, Navigation } from 'swiper/modules'
import { useQuery } from '@apollo/client'
import { get_normal_ads, get_premium_ads } from '@/GraphQl'
import { ArrowLeft, BadgeCheck, Blend, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ImageDisplay from '@/components/ImageDisplay'
import { useRouter, useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import No_Data from '../../assets/no_feedback-67e33c89.svg'
import { GlobalSearchModal } from '@/components/GlobalSearch'
import { AdsDetailsModal } from '@/components/AdDetailsModal'
import { useModalControl, usePagination } from '@/hooks'
import { useInView } from 'react-intersection-observer'
const PostPage = ({ category, location }: any) => {
  const searchParams = useSearchParams()
  const searchParamsData = JSON.parse(searchParams.get('data') || "{}")

  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedData, setSelectedData] = useState()
  const {
    open: isAddOpen,
    handleCloseModal,
    handleOpenModal
  } = useModalControl()
  const filters = {
    category_handler: category,
    city_handler: location || undefined,
    breast: searchParamsData?.breast ? searchParamsData?.breast : undefined,
    hair: searchParamsData?.hair ? searchParamsData?.hair : undefined,
    nationality: searchParamsData?.nationality || undefined,
    placeOfService: searchParamsData?.placeOfService
      ? searchParamsData?.placeOfService?.split(',')
      : undefined,
    services: searchParamsData?.services
      ? searchParamsData?.services.split(',')
      : undefined,
    attentionTo: searchParamsData?.attentionTo
      ? searchParamsData?.attentionTo?.split(',')
      : undefined,
    ethnicity: searchParamsData?.ethnicity
      ?
      searchParamsData?.ethnicity
      : undefined,
    search: searchParamsData?.search ? searchParamsData?.search : undefined,
  }
  
  const { data, loading } = useQuery(get_premium_ads, {
    variables: { page: 1, pageSize: 12, filter: filters }
  })
  const [limit, setLimit] = useState(false)
  const [adsData, setAdsData] = useState([])
  const { page, setPage } = usePagination()
  const { ref, inView, } = useInView({
    threshold: 0,
  });
  const { data: normal_ads } = useQuery(get_normal_ads, {
    variables: { page: page, pageSize: 30, filter: filters }
  })
  useEffect(() => {
    if (normal_ads) {
      setLimit(normal_ads?.normalAds?.ads.length)
      setAdsData((prevAds) => [...prevAds, ...normal_ads?.normalAds?.ads]);
    }
  }, [normal_ads])
  useEffect(() => {
    if (inView && limit) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView])
  const formatText = (text) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
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
        <div className='flex justify-between items-center mt-4'>
          <h1 className='flex items-center gap-2 text-2xl text-primary'>
            <ArrowLeft
              className='cursor-pointer'
              onClick={() => router.back()}
            />
            Toppremium {formatText(category)}
          </h1>
          <Button
            variant='link'
            onClick={() => {


              const filteredData = Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v !== null && v !== '' && v != undefined)
              );
              delete filteredData.category_handler
              delete filteredData.city_handler
              let url = `/explore/${category}`;
              if (location) {
                url += `/${location}/premium`;
              }else{
                
                url += `/premium`;
              }
          
              if (Object.keys(filteredData).length) {
                url += `?data=${encodeURIComponent(JSON.stringify(filteredData))}`;
              }
              router.push(url);
            }
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
      {!loading && (data?.premiumAds?.ads.length == 0 && adsData.length == 0) && (
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
      {adsData.length > 0 && (
        <div className='flex justify-between items-center mt-2'>
          <h1 className='flex items-center gap-2 mt-4 text-2xl text-primary'>
            <ArrowLeft
              className='cursor-pointer'
              onClick={() => router.back()}
            />
            {searchParamsData?.name} Users
          </h1>
        </div>
      )}
      {adsData.length > 0 && (
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6'>
          {adsData &&
            adsData?.map(item => {
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
          location={location}
          category={category}
          searchParams={searchParamsData}
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
