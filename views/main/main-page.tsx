'use client'
import { Container } from '@/layouts'
import React from 'react'
import BannerImage from '../../assets/banner.jpg'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { useQuery } from '@apollo/client'
import { homeCategory } from '@/GraphQl'
const MainPage = () => {
    const { data } = useQuery(homeCategory)
    return (
        <div>
            <div>
                <div style={{
                    width: "100%",
                    paddingBottom: "auto",
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden"
                }}>
                    <img
                        src={BannerImage.src}
                        alt="Event"
                        style={{
                            width: "100%",
                            height: "100vh",
                            objectFit: "cover",
                            position: "static",
                        }}
                    />
                    <div className='absolute w-full top-1/3 px-6 sm:px-20 md:px-28 lg:px-52 ' >
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Search by city, category..."
                            className='w-full rounded-full lg:h-[3rem] bg-white text-center text-black text-lg'
                        />
                        <h1 className='text-3xl text-start text-white mt-2 mb-4'>Find Your Love</h1>
                    </div>
                </div>
            </div>
            <Container className='my-10'>
                <div className=''>
                    <h1 className='text-primary text-3xl text-center'>Post Your Adult Advertisement or Search Hot Advertisers</h1>
                    <p className='text-white text-lg text-center mt-2'>Locate the Best Escorts in Your City</p>

                    <p className='text-sm text-white text-center mt-4 max-w-screen-lg mx-auto'>
                        Lust Lounge is home to the top-rated female escorts in India. You come to a number of fresh classified ads for the sexy babes who are also eager to engage with you sexually. Get ready to bang up hot escorts, transsexual, swinger meeting, gay escorts, and adult meeting in your city.This is an open platform where pleasure seekers and escorts come to find their interests. If you are not able to find your dream girls, create your profile and ask for the services you are looking for. This is a highly visited adult classified ad portal that helps you find out the babes you dream of. Post your classified ads for FREE if you don’t find a perfect profile.
                    </p>
                </div>
                <div className='my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {
                        data && data?.homeCategory?.map((item: { image: string, name: string, description: string }, index: number) => {
                            return (
                                <Card className=" bg-[#d4d4d41a] border-white border-opacity-15 h-full cursor-pointer rounded-xl" key={index}>
                                    <CardHeader className='p-0 overflow-hidden'>
                                        <div style={{
                                            width: "100%",
                                            paddingBottom: "auto",
                                            position: "relative",
                                            overflow: "hidden",
                                            height: "300px"
                                        }}>
                                            <img
                                                src={item?.image}
                                                alt="Event"
                                                style={{
                                                    width: "100%",
                                                    objectFit: "cover",
                                                    position: "static",
                                                }}
                                            />
                                            <div className='flex bg-primary py-2  justify-center absolute bottom-0 w-full '>
                                                <h1 className='text-black text-center font-bold ' style={{letterSpacing:".5px"}}>{item?.name}</h1>
                                            </div>
                                        </div>
                                        {/* <CardTitle>Create project</CardTitle>
                                        <CardDescription>Deploy your new project in one-click.</CardDescription> */}
                                    </CardHeader>
                                    <CardContent className='p-4'>
                                        <div>
                                            <p className='text-white text-sm'>
                                                {/* Hot and independent escorts ads. Sexy girls ready with their escort services to make you feel satisfied sexually.Women seeking men for a great session with their erotic services. */}
                                                {item?.description}
                                            </p>
                                        </div>
                                    </CardContent>

                                </Card>
                            )
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export { MainPage }
