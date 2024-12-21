import React from 'react'
import FaceBookIcon from '../assets/social/facebook.svg'
import InstagramIcon from '../assets/social/instagram.svg'
import LinkDinIcon from '../assets/social/linkedin.svg'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
const Footer = () => {
    return (
        <div className='nav-bg py-4 px-6 '>
            <div className='flex justify-between md:max-w-[80%] mx-auto items-center'>
                <div>
                    <h1 className='text-white'>Logo</h1>
                </div>
                <div className='flex gap-2'>
                    <Image src={FaceBookIcon} alt='facebook' className=" cursor-pointer" width={50} height={50} />
                    <Image src={InstagramIcon} alt='instagram' width={50} height={50} className=" cursor-pointer" />
                    <Image src={LinkDinIcon} alt='linkdin' width={50} height={50} className=" cursor-pointer" />

                </div>

            </div>
            <div className='flex justify-center md:max-w-[80%] mx-auto items-center mb-4'>
                <div className="flex h-5 items-center space-x-4 text-sm">
                    <h2 className='text-white hover:text-primary cursor-pointer'>Terms and Conditions</h2>
                    <Separator orientation="vertical" />
                    <h2 className='text-white hover:text-primary cursor-pointer'> Privacy Policy</h2>
                    <Separator orientation="vertical" />
                    <h2 className='text-white hover:text-primary cursor-pointer'> Contacts Us</h2>
                    <Separator orientation="vertical" />
                    <h2 className='text-white hover:text-primary cursor-pointer'> Manage your ad</h2>
                    <Separator orientation="vertical" />
                    <h2 className='text-white hover:text-primary cursor-pointer'>  Promote your ads</h2>
                </div>

            </div>

        </div>
    )
}

export { Footer }
