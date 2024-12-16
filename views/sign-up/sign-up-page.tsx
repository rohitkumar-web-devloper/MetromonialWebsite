'use client'
import ContentCard from '@/components/ContentCard'
import { GradientColor } from '@/components/GradientColor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import profileLogo from '../../assets/profile.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup' // Import Yup for validation
import { toast } from 'sonner'
const SignUpPage = () => {
    const [profile, setProfile] = useState()
    const [profilePrev, setProfilePrev] = useState('')
    const router = useRouter()
    const handleImageUpload = (event,) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            Array.from(files).forEach((file: File) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result;
                    if (typeof result === 'string') { // Type check to ensure result is a string
                        setProfile(file);
                        setProfilePrev(result); // Now TypeScript knows `result` is a string
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            mobile: Yup.string().required('Mobile number is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        }),
        onSubmit: (values) => {
            if (!profile) {
                return toast('Profile Image is required.')
            }
            console.log(values);
        },
    })

    return (
        <div className=' flex justify-center items-center w-full '>
            <GradientColor className="w-[95%] sm:w-2/3 md:w-4/5 lg:w-1/2 rounded-xl my-10">
                <ContentCard className="p-4 py-8 rounded-xl border-none outline-none bg-[#2f2f2f] bg-opacity-4">
                    <h1 className='text-center text-primary text-xl mt-2'>Sign Up to Lust Lounge</h1>
                    <form className='mt-6' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="email" className='text-white'>First Name</Label>
                                <Input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter First Name"
                                    className='w-full rounded-full'
                                />
                                {touched.firstName && errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="email" className='text-white'>Last Name</Label>
                                <Input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Last Name"
                                    className='w-full rounded-full'
                                />
                                {touched.lastName && errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="email" className='text-white'>Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Email"
                                    className='w-full rounded-full'
                                />
                                {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="email" className='text-white'>Mobile No.</Label>
                                <Input
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    value={values.mobile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Mobile No."
                                    className='w-full rounded-full'
                                />
                                {touched.mobile && errors.mobile && <div className="text-red-500 text-sm">{errors.mobile}</div>}
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="email" className='text-white'>Password.</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Password"
                                    className='w-full rounded-full'
                                />
                                {touched.password && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="email" className='text-white'>Confirm Password.</Label>
                                <Input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Confirm Password"
                                    className='w-full rounded-full'
                                />
                                {touched.confirmPassword && errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="email" className='text-white'>Profile.</Label>
                                <label htmlFor="front-upload" className="cursor-pointer relative">
                                    <div className='w-[200px] rounded-3xl border-2 border-white border-opacity-10 text-white bg-[#d4d4d41a] flex flex-col justify-center items-center p-6'>
                                        {profilePrev ?
                                            <div className=" w-full max-w-[200px] aspect-[3/3] bg-gray-200 rounded-3xl overflow-hidden border border-white cursor-pointer">
                                                <img src={profilePrev} alt="Uploaded Profile" className=" inset-0 w-full h-full object-cover" />
                                            </div>
                                            : <>
                                                <Image src={profileLogo} width={155} alt='profile' />
                                                <h2 className='text-center'>Upload Profile</h2>
                                            </>}
                                    </div>
                                    <input
                                        id="front-upload"
                                        type="file"
                                        // accept="image/*"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={(e) => handleImageUpload(e)}
                                        className="absolute opacity-0 h-[200px] w-[200px]"
                                        style={{
                                            top: "-16px",
                                            left: "-16px"
                                        }}
                                    />
                                </label>
                            </div>

                        </div>
                        <div className='flex justify-center items-center flex-col gap-4 mt-6'>
                            <Button className='text-lg rounded-full mb-2 mt-3 max-w-[80%] w-full '>Submit</Button>

                            <div className="line mt-4"></div>
                            <div className='flex justify-center'>
                                <h2 className='text-white inline-block'>Do you have an account? <span className='cursor-pointer text-primary' onClick={() => router.push('/sign-in')}>Sign in</span></h2>
                            </div>
                        </div>

                    </form>
                </ContentCard>
            </GradientColor>
        </div>
    )
}

export { SignUpPage }
