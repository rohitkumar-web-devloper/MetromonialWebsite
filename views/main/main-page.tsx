'use client'
import { Container } from '@/layouts'
import React, { useState } from 'react'
import BannerImage from '../../assets/banner.jpg'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useQuery } from '@apollo/client'
import { homeCategory } from '@/GraphQl'
import { useRouter } from 'next/navigation'
import { GlobalSearchModal } from '@/components/GlobalSearch'
const MainPage = () => {
  const router = useRouter()
  const { data } = useQuery(homeCategory)
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div>
        <div
          style={{
            width: '100%',
            paddingBottom: 'auto',
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <img
            src={BannerImage.src}
            alt='Event'
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
              position: 'static'
            }}
          />
          <div className='top-1/3 absolute px-6 sm:px-20 md:px-28 lg:px-52 w-full'>
            <Input
              type='email'
              id='email'
              name='email'
              value=''
              onChange={() => console.log()}
              onClick={() => setOpen(true)}
              placeholder='Search by city, category...'
              className='bg-white rounded-full w-full lg:h-[3rem] text-black text-center text-lg'
            />
            <h1 className='mt-2 mb-4 text-3xl text-start text-white'>
              Find Your Love
            </h1>
          </div>
        </div>
      </div>
      <Container className='my-10'>
        <div className=''>
          <h1 className='text-3xl text-center text-primary'>
            Post Your Adult Advertisement or Search Hot Advertisers
          </h1>
          <p className='mt-2 text-center text-lg text-white'>
            Locate the Best Escorts in Your City
          </p>

          <p className='mx-auto mt-4 max-w-screen-lg text-center text-sm text-white'>
            Lust Lounge is home to the top-rated female escorts in India. You
            come to a number of fresh classified ads for the sexy babes who are
            also eager to engage with you sexually. Get ready to bang up hot
            escorts, transsexual, swinger meeting, gay escorts, and adult
            meeting in your city.This is an open platform where pleasure seekers
            and escorts come to find their interests. If you are not able to
            find your dream girls, create your profile and ask for the services
            you are looking for. This is a highly visited adult classified ad
            portal that helps you find out the babes you dream of. Post your
            classified ads for FREE if you don’t find a perfect profile.
          </p>
        </div>
        <div className='gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-10'>
          {data &&
            data?.homeCategory?.map(
              (
                item: { image: string; name: string; description: string },
                index: number
              ) => {
                return (
                  <Card
                    className='border-white bg-[#d4d4d41a] border-opacity-15 rounded-xl h-full cursor-pointer'
                    key={index}
                    onClick={() =>
                      router.push(
                        `/posts?data=${
                          JSON.stringify({
                            id: item?.id,
                            name: item?.name
                          })
                        }`
                      )
                    }
                  >
                    <CardHeader className='p-0 overflow-hidden'>
                      <div
                        style={{
                          width: '100%',
                          paddingBottom: 'auto',
                          position: 'relative',
                          overflow: 'hidden',
                          height: '300px'
                        }}
                      >
                        <img
                          src={item?.image}
                          alt='Event'
                          style={{
                            width: '100%',
                            objectFit: 'cover',
                            position: 'static'
                          }}
                        />
                        <div className='bottom-0 absolute flex justify-center bg-primary py-2 w-full'>
                          <h1
                            className='font-bold text-black text-center'
                            style={{ letterSpacing: '.5px' }}
                          >
                            {item?.name}
                          </h1>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='p-4'>
                      <div>
                        <p className='text-sm text-white'>
                          {item?.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              }
            )}
        </div>
      </Container>
      {open && <GlobalSearchModal open={open} close={() => setOpen(false)} />}
    </div>
  )
}

export { MainPage }
