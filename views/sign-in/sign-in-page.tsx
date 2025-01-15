'use client'
import ContentCard from '@/components/ContentCard'
import { GradientColor } from '@/components/GradientColor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LOGIN_CUSTOMER_POST } from '@/GraphQl'
import { userInfoStore } from '@/stores'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import * as Yup from 'yup' // Import Yup for validation
const SignInPage = () => {
    const route = useRouter()
    const { addUserInfo } = userInfoStore()
    const [loginCustomer, { loading }] = useMutation(LOGIN_CUSTOMER_POST)
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
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (value) => {
            const {data, errors } = await loginCustomer({
                variables: value
            });
            if (errors) {
                return toast.error(errors.at(-1)?.message, {
                    action: {
                        label: "Undo",
                    }
                })
            }
            toast.success("Login Successfully.", {
                action: {
                    label: "Undo",
                }
            })
            addUserInfo(data?.loginCustomer)
            localStorage.setItem('accessToken',data?.loginCustomer?.token)            
            route.push('/')
        },
    })
    return (
        <div className=' flex justify-center items-center w-full h-lvh'>
            <GradientColor className="w-[95%] sm:w-2/3 md:w-8/12 lg:w-1/3 rounded-xl">
                <ContentCard className="p-4 py-8 rounded-xl border-none outline-none bg-[#2f2f2f] bg-opacity-4">
                    <h1 className='text-center text-primary text-xl mt-2'>Login to Lust Lounge</h1>
                    <form className='mt-6' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-4'>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="email" className='text-white'>Email / Phone</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={values.email || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Email"
                                    className='w-full rounded-full'
                                />
                                {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                            </div>
                            <div className="grid w-full items-center gap-2">
                                <Label htmlFor="email" className='text-white'>Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={values.password || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter Password"
                                    className='w-full rounded-full'
                                />
                                {touched.password && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                            </div>
                            <Button disabled={loading} className='text-lg rounded-full mb-2 mt-3 w-full mx-auto'>
                                {
                                    loading && <Loader2 className="animate-spin" />
                                }
                                Submit
                            </Button>
                            <div className='flex justify-center'>
                                <h6 className='text-white text-md inline-block cursor-pointer hover:text-primary'>Forgot Your Password?</h6>
                            </div>
                            <div className="line mt-4"></div>
                            <div className='flex justify-center'>
                                <h2 className='text-white inline-block'>Don't have an account? <span className='cursor-pointer text-primary' onClick={() => route.push('/sign-up')}>Sign up</span></h2>
                            </div>
                        </div>

                    </form>
                </ContentCard>
            </GradientColor>
        </div>
    )
}

export { SignInPage }
