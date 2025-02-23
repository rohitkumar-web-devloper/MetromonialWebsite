import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  BadgeCheck,
  Blend,
  Phone,
  PhoneCall,
  User
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import ImageDisplay from './ImageDisplay'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'
const AdsDetailsModal = ({ open, close, selectedData }: any) => {

  return (
    <div>
      <Dialog open={open} onOpenChange={close}>
        <DialogContent className='border-2 border-white border-opacity-20 sm:max-w-[700px]'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              Details
            </DialogTitle>
          </DialogHeader>
          <div className='py-4 clip-scroll max-h-[400px] overflow-y-scroll'>
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
                {JSON.parse(selectedData?.profile).map((it: any, index: number) => {
                  return (
                    <SwiperSlide key={index} className=''>
                      <div className='relative'>
                        <ImageDisplay imageUrl={it} xs='200px' />
                        {selectedData?.planType == "premium" && <div className='top-2 left-0 absolute bg-primary px-2 py-1 rounded-r-full'>
                          <p className='flex items-center gap-1 text-[12px]'>
                            <BadgeCheck size={20} />
                            Premium
                          </p>
                        </div>}
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
            <div>
              <div className='py-4 p-2'>
                <h1 className='text-white'>{selectedData?.title}</h1>
                <h1 className='mt-1 text-[12px] text-ellipsis text-white whitespace-nowrap overflow-hidden'>
                  {selectedData?.description}
                </h1>

                <div className='flex gap-2 mt-2'>
                  <div className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'>
                    <Blend size={15} /> {selectedData?.nationality}
                  </div>
                  <div className='flex items-center gap-1 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'>
                    <User size={15} /> {selectedData?.age}
                  </div>
                </div>
                <h1 className='mt-2 text-primary'>Attention to</h1>
                <div className='flex gap-2 mt-1 flex-wrap'>
                  {selectedData?.attentionTo.map((item: any,index:number) => {
                    return (
                      <div
                        key={index}
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
                  {selectedData?.placeOfServices.map((it:any,index:number) => {
                    return (
                      <div
                        key={index}
                        className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'
                      >
                        <Blend size={15} /> {it?.name}
                      </div>
                    )
                  })}
                </div>
                <h1 className='mt-2 text-primary'>Services</h1>
                <div className='flex flex-wrap gap-2 mt-1'>
                  {selectedData?.services.map((it:any,index:number) => {
                    return (
                      <div
                        key={index}
                        className='flex items-center gap-2 bg-[#d4d4d41a] mt-2 px-2 py-1 rounded-xl text-[12px] text-white'
                      >
                        <Blend size={15} /> {it?.name}
                      </div>
                    )
                  })}
                </div>
                <h1 className='mt-2 text-primary'>Payment Mode</h1>
                <div className='flex gap-2 mt-1'>
                  {JSON.parse(selectedData?.paymentMethod[0]).map((it:any) => {
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
          <DialogFooter>
            <div className='flex justify-between items-center w-full'>
              <div className='flex items-center gap-2'>
                <div className='bg-[#d4d4d41a] rounded-xl'>
                  <h1 className='px-3 py-2 text-white'>
                    ₹ {selectedData?.pricePerHour} Per hour
                  </h1>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className='flex items-center gap-1 bg-[#d4d4d41a] p-2 rounded-xl text-white cursor-pointer'
                        onClick={() =>
                          window.open(`tel:${selectedData?.mobileNumber}`)
                        }
                      >
                        <Phone size={20} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className='bg-transparent'>
                      <p className=''>{selectedData?.mobileNumber}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className='flex items-center gap-1 bg-[#d4d4d41a] p-2 rounded-xl text-white cursor-pointer'
                        onClick={() =>
                          window.open(
                            `https://wa.me/${selectedData?.whatsAppNumber
                            }?text=${encodeURIComponent('Hello')}`
                          )
                        }
                      >
                        <PhoneCall size={20} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className='bg-transparent'>
                      <p className=''>{selectedData?.whatsAppNumber}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Button type='button' className='font-semibold' onClick={close}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { AdsDetailsModal }
