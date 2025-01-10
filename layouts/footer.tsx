import React from 'react'
import FaceBookIcon from '../assets/social/facebook.svg'
import InstagramIcon from '../assets/social/instagram.svg'
import LinkDinIcon from '../assets/social/linkedin.svg'
import Image from 'next/image'
import Logo from '../assets/logo3.png'
import { useRouter } from 'next/navigation'
const Footer = () => {
    const router = useRouter()
    return (
        <div className='nav-bg py-4 px-6  z-50'>
            <div className='flex justify-between md:max-w-[90%] mx-auto items-center'>
                <div>
                    <Image src={Logo} width={160} height={70} alt='logo' className='cursor-pointer' onClick={() => router.push('/')} />
                </div>
                <div className='flex gap-2'>
                    <Image src={FaceBookIcon} alt='facebook' className=" cursor-pointer" width={40} height={40} />
                    <Image src={InstagramIcon} alt='instagram' width={40} height={40} className=" cursor-pointer" />

                </div>

            </div>
        </div>
    )
}

export { Footer }
