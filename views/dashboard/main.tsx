'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CUSTOMERS_DETAILS_GET } from '@/GraphQl'
import { Container } from '@/layouts'
import { userInfoStore } from '@/stores'
import { useQuery } from '@apollo/client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { BadgeCheck, Blend, User } from 'lucide-react'
import ImageDisplay from '@/components/ImageDisplay'
export const DashboardMain = () => {
  const { user } = userInfoStore()
  const { data } = useQuery(CUSTOMERS_DETAILS_GET, { variables: { createdById: user?.id } })
  return (
    <div>
      <div className='h-52 w-full bg-primary/80 relative mb-[400px]'>
        <div className='h-60  w-full absolute top-1/2 left-0 '>
          <Container className=''>
            <div className='h-72 w-72 bg-black bg-opacity-90 p-2 rounded-lg'>
              <div className=' border border-primary h-full w-full  rounded-lg text-center '>
                <div className='mx-auto mt-6 rounded-full'>
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
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>
              <div className='border border-primary/10 rounded-md'>
                <div className='bg-primary/10 w-full rounded-md text-center py-6'>
                  <h2 className=' text-primary'>ADS</h2>
                </div>
                <div className='py-6 px-4'>
                  <div className='flex justify-between items-center'>
                    <h6 className='text-white'>Total Ads</h6>
                    <h6 className='text-white'>{data?.ads?.length || 0}</h6>
                  </div>
                </div>
              </div>
            </div>

          </Container>
        </div>
      </div>
      <Container>
        <div className='w-full'>
          {
            data && data.ads.map((selectedData, index) => {
              return (
                <div className='py-4 mb-6 border border-primary/10  rounded-lg px-4' key={selectedData.id}>
                  <h1 className=' text-primary text-2xl mb-2'>Ads {index + 1}</h1>
                  <div>
                    <Swiper
                      breakpoints={{
                        0: {
                          slidesPerView: 1,
                          spaceBetween: 20
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
                      {JSON.parse(selectedData?.profile).map((it, index) => {
                        return (
                          <SwiperSlide key={index} className=''>
                            <div className='relative'>
                              <ImageDisplay imageUrl={it} xs='200px' />
                              <div className='top-2 left-0 absolute bg-primary px-2 py-1 rounded-r-full'>
                                <p className='flex items-center gap-1 text-[12px]'>
                                  <BadgeCheck size={20} />
                                  Premium
                                </p>
                              </div>
                            </div>
                          </SwiperSlide>
                        )
                      })}
                    </Swiper>
                  </div>
                  <div>
                    <div className='py-4 p-2'>
                      <h1 className='text-white'>{selectedData?.title}</h1>
                      <h1 className='mt-1 text-[12px] text-white'>
                        {selectedData?.description}
                      </h1>
                      <h1 className=' mt-2 text-white'>
                        ₹ {selectedData?.pricePerHour} Per hour
                      </h1>


                      <div className='flex gap-2 mt-2'>
                        <div className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'>
                          <Blend size={15} /> {selectedData?.nationality}
                        </div>
                        <div className='flex items-center gap-1 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'>
                          <User size={15} /> {selectedData?.age}
                        </div>
                      </div>
                      <h1 className='mt-2 text-primary'>Phone Number</h1>
                      <div className='flex gap-2 mt-1'>
                        <div className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'>
                          <Blend size={15} /> {selectedData?.mobileNumber}
                        </div>
                      </div>
                      <h1 className='mt-2 text-primary'>Whatsapp Number</h1>
                      <div className='flex gap-2 mt-1'>
                        <div className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'>
                          <Blend size={15} /> {selectedData?.whatsAppNumber}
                        </div>
                      </div>
                      <h1 className='mt-2 text-primary'>Attention to</h1>
                      <div className='flex gap-2 mt-1 flex-wrap'>
                        {selectedData?.attentionTo.map(item => {
                          return (
                            <div
                              key={item?.name}
                              className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'
                            >
                              <Blend size={15} /> {item?.name}
                            </div>
                          )
                        })}
                      </div>
                      <h1 className='mt-2 text-primary'>Body Type</h1>
                      <div className='flex gap-2 mt-1'>
                        <div className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'>
                          <Blend size={15} /> {selectedData?.bodyType}
                        </div>
                      </div>
                      <h1 className='mt-2 text-primary'>Breast</h1>
                      <div className='flex gap-2 mt-1'>
                        <div className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'>
                          <Blend size={15} /> {selectedData?.breast}
                        </div>
                      </div>
                      <h1 className='mt-2 text-primary'>Hair</h1>
                      <div className='flex gap-2 mt-1'>
                        <div className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'>
                          <Blend size={15} /> {selectedData?.hair}
                        </div>
                      </div>
                      <h1 className='mt-2 text-primary'>Place of Services</h1>
                      <div className='flex gap-2 mt-1 flex-wrap'>
                        {selectedData?.placeOfServices.map(it => {
                          return (
                            <div
                              key={it?.name}
                              className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'
                            >
                              <Blend size={15} /> {it?.name}
                            </div>
                          )
                        })}
                      </div>
                      <h1 className='mt-2 text-primary'>Services</h1>
                      <div className='flex flex-wrap gap-2 mt-1'>
                        {selectedData?.services.map(it => {
                          return (
                            <div
                              key={it?.name}
                              className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'
                            >
                              <Blend size={15} /> {it?.name}
                            </div>
                          )
                        })}
                      </div>
                      <h1 className='mt-2 text-primary'>Payment Mode</h1>
                      <div className='flex gap-2 mt-1'>
                        {JSON.parse(selectedData?.paymentMethod[0]).map(it => {
                          return (
                            <div
                              key={it}
                              className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'
                            >
                              <Blend size={15} /> {it}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>
      </Container>
    </div>
  )
}
