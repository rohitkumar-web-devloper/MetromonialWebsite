import { GradientColor } from '@/components/GradientColor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Container } from '@/layouts'
import Image from 'next/image'
import React from 'react'
import profile from '../../assets/profile.svg'
const PostAdsPage = () => {
    return (
        <div>
            <Container>
                <div className='my-10'>
                    <h1 className='text-primary text-2xl'>Fill all ads details</h1>
                    <div className='mt-4  grid  lg:grid-cols-4 bg-[#d4d4d41a] p-4 rounded-lg gap-4'>
                        <div className="grid w-full items-center gap-2 col-span-4 mb-2">
                            <h1 className='text-primary text-xl'>Insert Ad</h1>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4">
                            <Label htmlFor="email" className='text-white'>Select Category<span className='text-red-500'>*</span> </Label>
                            <Select  >
                                <SelectTrigger className="w-full bg-[#d4d4d41a] text-white">
                                    <SelectValue placeholder="Choose ID" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="driving">Driving License</SelectItem>
                                    <SelectItem value="passport">Passport</SelectItem>
                                    <SelectItem value="aadhar">Aadhar Card</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4 md:col-span-2">
                            <Label htmlFor="email" className='text-white'>Select City<span className='text-red-500'>*</span> </Label>
                            <Select  >
                                <SelectTrigger className="w-full bg-[#d4d4d41a] text-white">
                                    <SelectValue placeholder="Select City" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="driving">Driving License</SelectItem>
                                    <SelectItem value="passport">Passport</SelectItem>
                                    <SelectItem value="aadhar">Aadhar Card</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4 md:col-span-2">
                            <Label htmlFor="email" className='text-white'>District</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter District"
                                className='w-full'
                            />
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4 md:col-span-2">
                            <Label htmlFor="email" className='text-white'>Address</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                className='w-full'
                            />
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4 md:col-span-2">
                            <Label htmlFor="email" className='text-white'>Pincode</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                className='w-full'
                            />
                        </div>

                    </div>
                    <div className='mt-4  grid  lg:grid-cols-4 bg-[#d4d4d41a] p-4 rounded-lg gap-4'>
                        <div className="grid w-full items-center gap-2 col-span-4 mb-2">
                            <h1 className='text-primary text-xl'>Your Informations</h1>
                        </div>

                        <div className="grid w-full items-center gap-2 col-span-4 md:col-span-2">
                            <Label htmlFor="email" className='text-white'>Age</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter District"
                                className='w-full'
                            />
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4 md:col-span-2">
                            <Label htmlFor="email" className='text-white'>Title</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                className='w-full'
                            />
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4 md:col-span-2">
                            <Label htmlFor="email" className='text-white'>Text</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                className='w-full'
                            />
                        </div>

                    </div>
                    <div className='mt-4  grid  lg:grid-cols-4 bg-[#d4d4d41a] p-4 rounded-lg gap-4'>
                        <div className="grid w-full items-center gap-2 col-span-4 mb-2">
                            <h1 className='text-primary text-xl'>About You</h1>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4">
                            <Label htmlFor="email" className='text-white'>Ethnicity<span className='text-red-500'>*</span> </Label>
                            <div className='flex gap-2'>
                                <div className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                    <p className='text-white text-sm'>
                                        African
                                    </p>
                                </div>
                                <div className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                    <p className='text-white text-sm'>
                                        Indian
                                    </p>
                                </div>
                                <div className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                    <p className='text-white text-sm'>
                                        Asian
                                    </p>
                                </div>
                                <div className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                    <p className='text-white text-sm'>
                                        Arab
                                    </p>
                                </div>
                                <div className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                    <p className='text-white text-sm'>
                                        Latin
                                    </p>
                                </div>
                                <div className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                    <p className='text-white text-sm'>
                                        Caucasian
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4">
                            <Label htmlFor="email" className='text-white'>Select Nationality<span className='text-red-500'>*</span> </Label>
                            <Select  >
                                <SelectTrigger className="w-full bg-[#d4d4d41a] text-white">
                                    <SelectValue placeholder="Select Nationality" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="driving">Driving License</SelectItem>
                                    <SelectItem value="passport">Passport</SelectItem>
                                    <SelectItem value="aadhar">Aadhar Card</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4">
                            <Label htmlFor="email" className='text-white'>Ethnicity<span className='text-red-500'>*</span> </Label>
                            <div className='flex gap-2'>
                                <div className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                    <p className='text-white text-sm'>
                                        Natural Boobs
                                    </p>
                                </div>
                                <div className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                    <p className='text-white text-sm'>
                                        Busty
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4">
                            <Label htmlFor="email" className='text-white'>Body Type<span className='text-red-500'>*</span> </Label>
                            <div className='flex gap-2'>
                                <div className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                    <p className='text-white text-sm'>
                                        Slim
                                    </p>
                                </div>
                                <div className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                    <p className='text-white text-sm'>
                                        Curvy
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4  grid  lg:grid-cols-4 bg-[#d4d4d41a] p-4 rounded-lg gap-4'>
                        <div className="grid w-full items-center gap-2 col-span-4 mb-2">
                            <h1 className='text-primary text-xl'>Services</h1>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4">
                            <Label htmlFor="email" className='text-white'>Services<span className='text-red-500'>*</span> </Label>
                            <div className='flex gap-2 flex-wrap'>
                                {
                                    ['Oral', 'Anal', 'BDSM', 'Girlfriend experience', 'Porn actresses', 'Body ejaculation', 'Erotic massage', 'Tantric massage', 'Fetish', 'French kiss', 'Role play', 'Threesome', 'Sexting', 'Vediocall'].map((item) => {
                                        return (
                                            <div key={item} className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                                <p className='text-white text-sm'>
                                                    {item}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4">
                            <Label htmlFor="email" className='text-white'>Attention to<span className='text-red-500'>*</span> </Label>
                            <div className='flex gap-2 flex-wrap'>
                                {
                                    ['Men', 'Women', 'Couple', 'Disabled'].map((item) => {
                                        return (
                                            <div key={item} className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                                <p className='text-white text-sm'>
                                                    {item}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4">
                            <Label htmlFor="email" className='text-white'>Place of service<span className='text-red-500'>*</span> </Label>
                            <div className='flex gap-2 flex-wrap'>
                                {
                                    ['At home', 'Events and parties', 'Hotel', 'Clubs', 'Outcall'].map((item) => {
                                        return (
                                            <div key={item} className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                                <p className='text-white text-sm'>
                                                    {item}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <div className='mt-4  grid  lg:grid-cols-4 bg-[#d4d4d41a] p-4 rounded-lg gap-4'>
                        <div className="grid w-full items-center gap-2 col-span-4 mb-2">
                            <h1 className='text-primary text-xl'>Pricing</h1>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4">
                            <Label htmlFor="email" className='text-white'>Price per hour<span className='text-red-500'>*</span> </Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                className='w-full'
                            />
                        </div>

                        <div className="grid w-full items-center gap-2 col-span-4">
                            <Label htmlFor="email" className='text-white'>Payment Methods<span className='text-red-500'>*</span> </Label>
                            <div className='flex gap-2 flex-wrap'>
                                {
                                    ['Cash', 'Credit Card', 'Upi'].map((item) => {
                                        return (
                                            <div key={item} className='px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20'>
                                                <p className='text-white text-sm'>
                                                    {item}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col gap-2 rounded-lg p-4 text-white bg-[#d4d4d41a]  mt-4'>
                            <h1 className='text-primary'>Add Gallery (Optional)</h1>
                            <p className='text-primary'> Favourite images from your previous events</p>
                            <div className='w-full p-10  flex  gap-6 flex-wrap '>
                                {
                                    [].map((it, index) => {
                                        return (
                                            <div className='flex flex-col gap-10'>
                                                <div className='h-[200px] w-[200px] rounded-3xl border-2 border-white border-opacity-10 text-white bg-[#d4d4d41a] flex flex-col justify-center items-center p-4'>
                                                    <div className=" w-full max-w-[180px] aspect-[3/3] bg-gray-200 rounded-3xl overflow-hidden border border-white cursor-pointer">
                                                        <img src={it} alt="Uploaded Profile" className=" inset-0 w-full h-full object-cover" />
                                                    </div>

                                                </div>
                                                <div className='flex w-auto mx-auto'>
                                                    <GradientColor className="rounded-[50px] p-[1.6px]">
                                                        <Button className="rounded-full py-[18px] md:py-[22px] px-16 bg-[#2f2f2f] text-[14px] text-white hover:bg-[#1c1b1be3"
                                                            // onClick={() => {
                                                            //     handleChangeValue('GALLERY_FILTER_INDEX', index)
                                                            //     handleChangeValue('GALLERY_PREV_FILTER_INDEX', index)
                                                            // }}
                                                        >
                                                            Remove Photo
                                                        </Button>

                                                    </GradientColor>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='flex flex-col gap-10'>
                                    <div className='h-[200px] w-[200px] rounded-3xl border-2 border-white border-opacity-10 text-white bg-[#d4d4d41a] flex flex-col justify-center items-center p-4'>
                                        <Image src={profile} width={100} alt="profile" />
                                        <h2 className='text-center'>Ideal photo should be in 3:3 aspect ratio</h2>
                                    </div>
                                    <div className='flex w-auto mx-auto'>
                                        <GradientColor className="rounded-[50px] p-[1.6px]">
                                            <label htmlFor="image-upload-1" className="cursor-pointer relative">
                                                <Button className="rounded-full py-[18px] md:py-[22px] px-16 bg-[#2f2f2f] text-[14px] text-white hover:bg-[#1c1b1be3" >
                                                    Add Photo
                                                </Button>
                                                <input
                                                    id="image-upload-1"
                                                    type="file"
                                                    multiple
                                                    accept="image/png, image/jpeg, image/jpg"
                                                    // onChange={(e) => handleImageUpload(e, 'GALLERY', 'GALLERY_PREV')}
                                                    className="absolute  opacity-0 h-[40px]"
                                                    style={{
                                                        top: "-16px",
                                                        left: "-16px"
                                                    }}
                                                />
                                            </label>
                                        </GradientColor>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className='mt-4  grid  lg:grid-cols-4 bg-[#d4d4d41a] p-4 rounded-lg gap-4'>
                        <div className="grid w-full items-center gap-2 col-span-4 mb-2">
                            <h1 className='text-primary text-xl'>Your contacts</h1>
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4 md:col-span-2">
                            <Label htmlFor="email" className='text-white'>Email<span className='text-red-500'>*</span> </Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                className='w-full'
                            />
                        </div>
                        <div className="grid w-full items-center gap-2 col-span-4 md:col-span-2">
                            <Label htmlFor="email" className='text-white'>Telephone Contact<span className='text-red-500'>*</span> </Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                className='w-full'
                            />
                        </div>

                    

                    </div>
                    <Button className='w-full mt-4 text-lg'>
                        Confirm
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export { PostAdsPage }
