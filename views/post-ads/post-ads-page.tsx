'use client'
import { GradientColor } from '@/components/GradientColor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Container } from '@/layouts'
import Image from 'next/image'
import React, { useReducer } from 'react'
import profile from '../../assets/profile.svg'
import { useQuery } from '@apollo/client'
import { getPlans, homeCategory } from '@/GraphQl'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
const reducer = (state, action) => {
  switch (action.type) {
    case 'category':
      return {
        ...state,
        category: action?.payload
      }
    case 'categoryId':
      return {
        ...state,
        categoryId: action?.payload
      }
    case 'address':
      return {
        ...state,
        address: action?.payload
      }
    case 'district':
      return {
        ...state,
        district: action?.payload
      }
    case 'zip':
      return {
        ...state,
        zip: action?.payload
      }
    case 'age':
      return {
        ...state,
        age: action?.payload
      }
    case 'title':
      return {
        ...state,
        title: action?.payload
      }
    case 'description':
      return {
        ...state,
        description: action?.payload
      }
    case 'ethnicity':
      return {
        ...state,
        ethnicity: action?.payload
      }
    case 'nationality':
      return {
        ...state,
        nationality: action?.payload
      }
    case 'breast':
      return {
        ...state,
        breast: action?.payload
      }
    case 'bodyType':
      return {
        ...state,
        bodyType: action?.payload
      }
    case 'pricePerHour':
      return {
        ...state,
        pricePerHour: action?.payload
      }
    case 'hair':
      return {
        ...state,
        hair: action?.payload
      }
    case 'whatsAppNumber':
      return {
        ...state,
        whatsAppNumber: action?.payload
      }
    case 'mobileNumber':
      return {
        ...state,
        mobileNumber: action?.payload
      }
    case 'services':
      const check = state.services.some(it => it == action?.payload)
        ? state.services.filter(it => it != action?.payload)
        : [...state.services, action?.payload]
      return {
        ...state,
        services: check
      }
    case 'attentionTo':
      const checkdata = state.attentionTo.some(it => it == action?.payload)
        ? state.attentionTo.filter(it => it != action?.payload)
        : [...state.attentionTo, action?.payload]
      return {
        ...state,
        attentionTo: checkdata
      }
    case 'placeOfService':
      const checkdata1 = state.placeOfService.some(it => it == action?.payload)
        ? state.placeOfService.filter(it => it != action?.payload)
        : [...state.placeOfService, action?.payload]
      return {
        ...state,
        placeOfService: checkdata1
      }
    case 'paymentMethod':
      const checkdata2 = state.paymentMethod.some(it => it == action?.payload)
        ? state.paymentMethod.filter(it => it != action?.payload)
        : [...state.paymentMethod, action?.payload]
      return {
        ...state,
        paymentMethod: checkdata2
      }
    case 'profile':
      return {
        ...state,
        profile: [...state?.profile, action?.payload]
      }
    case 'profile_prev':
      return {
        ...state,
        profile_prev: [...state?.profile_prev, action?.payload]
      }
    case 'GALLERY_FILTER_INDEX':
      return {
        ...state,
        profile: state?.profile.filter((_, index) => index != action?.payload)
      }
    case 'GALLERY_PREV_FILTER_INDEX':
      return {
        ...state,
        profile_prev: state?.profile_prev.filter(
          (_, index) => index != action?.payload
        )
      }
    default:
      return state
  }
}
const PostAdsPage = () => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, {
    category: '',
    categoryId: '',
    address: '',
    district: '',
    zip: '',
    age: '',
    title: '',
    description: '',
    ethnicity: '',
    nationality: '',
    breast: '',
    bodyType: '',
    hair: '',
    services: [],
    attentionTo: [],
    placeOfService: [],
    paymentMethod: [],
    pricePerHour: '',
    profile_prev: [],
    profile: [],
    mobileNumber: '',
    whatsAppNumber: ''
  })
  const handleChangeValue = (type: string, payload: string) => {
    dispatch({ type, payload })
  }
  const { data } = useQuery(homeCategory)
  const { data: plans } = useQuery(getPlans)
  console.log(plans, 'plans')

  console.log(state, '====>>>>state')
  const handleImageUpload = (event, type, type_prev) => {
    if (state.profile.length > 15) {
      return toast.error(`Max 15 images is required.`)
    }
    const files = event.target.files
    if (type == 'profile') {
      if (files.length + state.profile.length > 15) {
        return toast.error(`Select Max 15 images.`)
      }
    }
    if (files.length > 15) {
      return toast.error(`Select Max 15 images.`)
    }

    if (files && files.length > 0) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
      Array.from(files).forEach(file => {
        if (!allowedTypes.includes(file.type)) {
          toast.error(
            `Only PNG, JPG, and JPEG files are allowed for ${file?.name}.`
          )
          return
        }
        const reader = new FileReader()
        reader.onload = e => {
          handleChangeValue(type, file)
          handleChangeValue(type_prev, e.target.result)
        }
        reader.readAsDataURL(file)
      })
    }
  }
  return (
    <div>
      <Container>
        <div className='my-10'>
          <div className='flex items-center gap-2'>
            <ArrowLeft
              className='w-6 h-6 text-primary cursor-pointer'
              onClick={() => router.back()}
            />
            <h1 className='text-2xl text-primary'>Fill all ads details</h1>
          </div>

          <div className='gap-4 grid lg:grid-cols-4 bg-[#d4d4d41a] mt-4 p-4 rounded-lg'>
            <div className='items-center gap-2 grid col-span-4 mb-2 w-full'>
              <h1 className='text-primary text-xl'>Insert Ad</h1>
            </div>
            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Select Category<span className='text-red-500'>*</span>{' '}
              </Label>
              <Select
                value={state?.categoryId}
                onValueChange={(value: string) => {
                  const item = data?.homeCategory.find(
                    (it: { id: string }) => it.id == value
                  )
                  handleChangeValue('category', item?.name)
                  handleChangeValue('categoryId', item?.id)
                }}
              >
                <SelectTrigger className='bg-[#d4d4d41a] w-full text-white'>
                  <SelectValue placeholder='Choose Category' />
                </SelectTrigger>
                <SelectContent>
                  {data &&
                    data?.homeCategory.map(
                      (item: { id: string; name: string }) => {
                        return (
                          <SelectItem value={item?.id} key={item?.id}>
                            {item?.name}
                          </SelectItem>
                        )
                      }
                    )}
                </SelectContent>
              </Select>
            </div>
            <div className='items-center gap-2 grid col-span-4 md:col-span-2 w-full'>
              <Label htmlFor='email' className='text-white'>
                Select City<span className='text-red-500'>*</span>{' '}
              </Label>
              <Select>
                <SelectTrigger className='bg-[#d4d4d41a] w-full text-white'>
                  <SelectValue placeholder='Select City' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='driving'>Driving License</SelectItem>
                  <SelectItem value='passport'>Passport</SelectItem>
                  <SelectItem value='aadhar'>Aadhar Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='items-center gap-2 grid col-span-4 md:col-span-2 w-full'>
              <Label htmlFor='email' className='text-white'>
                District
              </Label>
              <Input
                type='text'
                placeholder='Enter District'
                onChange={e => {
                  handleChangeValue('district', e.target.value)
                }}
                value={state?.district}
                className='w-full'
              />
            </div>
            <div className='items-center gap-2 grid col-span-4 md:col-span-2 w-full'>
              <Label htmlFor='email' className='text-white'>
                Address
              </Label>
              <Input
                type='text'
                placeholder='Enter address'
                onChange={e => {
                  handleChangeValue('address', e.target.value)
                }}
                value={state?.address}
                className='w-full'
              />
            </div>
            <div className='items-center gap-2 grid col-span-4 md:col-span-2 w-full'>
              <Label htmlFor='email' className='text-white'>
                Pincode
              </Label>
              <Input
                type='text'
                placeholder='Enter pincode'
                className='w-full'
                onChange={e => {
                  handleChangeValue('zip', e.target.value)
                }}
                value={state?.zip}
              />
            </div>
          </div>
          <div className='gap-4 grid lg:grid-cols-4 bg-[#d4d4d41a] mt-4 p-4 rounded-lg'>
            <div className='items-center gap-2 grid col-span-4 mb-2 w-full'>
              <h1 className='text-primary text-xl'>Your Informations</h1>
            </div>

            <div className='items-center gap-2 grid col-span-4 md:col-span-2 w-full'>
              <Label htmlFor='email' className='text-white'>
                Age
              </Label>
              <Input
                type='text'
                onChange={e => {
                  handleChangeValue('age', e.target.value)
                }}
                value={state?.age}
                placeholder='Enter Age'
                className='w-full'
              />
            </div>
            <div className='items-center gap-2 grid col-span-4 md:col-span-2 w-full'>
              <Label htmlFor='email' className='text-white'>
                Title
              </Label>
              <Input
                type='text'
                onChange={e => {
                  handleChangeValue('title', e.target.value)
                }}
                value={state?.title}
                placeholder='Enter Password'
                className='w-full'
              />
            </div>
            <div className='items-center gap-2 grid col-span-4 md:col-span-2 w-full'>
              <Label htmlFor='email' className='text-white'>
                Text
              </Label>
              <Input
                type='text'
                onChange={e => {
                  handleChangeValue('description', e.target.value)
                }}
                value={state?.description}
                placeholder='Enter description'
                className='w-full'
              />
            </div>
          </div>
          <div className='gap-4 grid lg:grid-cols-4 bg-[#d4d4d41a] mt-4 p-4 rounded-lg'>
            <div className='items-center gap-2 grid col-span-4 mb-2 w-full'>
              <h1 className='text-primary text-xl'>About You</h1>
            </div>
            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Ethnicity<span className='text-red-500'>*</span>{' '}
              </Label>
              <div className='flex gap-2'>
                {[
                  'African',
                  'Indian',
                  'Asian',
                  'Arab',
                  'Latin',
                  'Caucasian'
                ].map(item => {
                  return (
                    <div
                      key={item}
                      className={cn(
                        'px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20',
                        item == state?.ethnicity
                          ? 'border-primary bg-primary bg-opacity-20'
                          : ''
                      )}
                      onClick={() => handleChangeValue('ethnicity', item)}
                    >
                      <p className='text-sm text-white'>{item}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Select Nationality<span className='text-red-500'>*</span>{' '}
              </Label>
              <Select
                value={state?.nationality}
                onValueChange={(value: string) => {
                  handleChangeValue('nationality', value)
                }}
              >
                <SelectTrigger className='bg-[#d4d4d41a] w-full text-white'>
                  <SelectValue placeholder='Select Nationality' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='driving'>Driving License</SelectItem>
                  <SelectItem value='passport'>Passport</SelectItem>
                  <SelectItem value='aadhar'>Aadhar Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Breast<span className='text-red-500'>*</span>{' '}
              </Label>
              <div className='flex gap-2'>
                {['Natural Boobs', 'Busty'].map(item => {
                  return (
                    <div
                      key={item}
                      className={cn(
                        'px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20',
                        item == state?.breast
                          ? 'border-primary bg-primary bg-opacity-20'
                          : ''
                      )}
                      onClick={() => handleChangeValue('breast', item)}
                    >
                      <p className='text-sm text-white'>{item}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Hair<span className='text-red-500'>*</span>{' '}
              </Label>

              <div className='flex gap-2'>
                {['Blond Hair', 'Brown Hair', 'Black Hair', 'Red Hair'].map(
                  item => {
                    return (
                      <div
                        key={item}
                        className={cn(
                          'px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20',
                          item == state?.hair
                            ? 'border-primary bg-primary bg-opacity-20'
                            : ''
                        )}
                        onClick={() => handleChangeValue('hair', item)}
                      >
                        <p className='text-sm text-white'>{item}</p>
                      </div>
                    )
                  }
                )}
              </div>
            </div>
            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Body Type<span className='text-red-500'>*</span>{' '}
              </Label>

              <div className='flex gap-2'>
                {['Slim', 'Curvy'].map(item => {
                  return (
                    <div
                      key={item}
                      className={cn(
                        'px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20',
                        item == state?.bodyType
                          ? 'border-primary bg-primary bg-opacity-20'
                          : ''
                      )}
                      onClick={() => handleChangeValue('bodyType', item)}
                    >
                      <p className='text-sm text-white'>{item}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='gap-4 grid lg:grid-cols-4 bg-[#d4d4d41a] mt-4 p-4 rounded-lg'>
            <div className='items-center gap-2 grid col-span-4 mb-2 w-full'>
              <h1 className='text-primary text-xl'>Services</h1>
            </div>
            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Services<span className='text-red-500'>*</span>{' '}
              </Label>
              <div className='flex flex-wrap gap-2'>
                {[
                  'Oral',
                  'Anal',
                  'BDSM',
                  'Girlfriend experience',
                  'Porn actresses',
                  'Body ejaculation',
                  'Erotic massage',
                  'Tantric massage',
                  'Fetish',
                  'French kiss',
                  'Role play',
                  'Threesome',
                  'Sexting',
                  'Vediocall'
                ].map(item => {
                  return (
                    <div
                      key={item}
                      className={cn(
                        'px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20',
                        state?.services.includes(item)
                          ? 'border-primary bg-primary bg-opacity-20'
                          : ''
                      )}
                      onClick={() => handleChangeValue('services', item)}
                    >
                      <p className='text-sm text-white'>{item}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Attention to<span className='text-red-500'>*</span>{' '}
              </Label>
              <div className='flex flex-wrap gap-2'>
                {['Men', 'Women', 'Couple', 'Disabled'].map(item => {
                  return (
                    <div
                      key={item}
                      className={cn(
                        'px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20',
                        state?.attentionTo.includes(item)
                          ? 'border-primary bg-primary bg-opacity-20'
                          : ''
                      )}
                      onClick={() => handleChangeValue('attentionTo', item)}
                    >
                      <p className='text-sm text-white'>{item}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Place of service<span className='text-red-500'>*</span>{' '}
              </Label>
              <div className='flex flex-wrap gap-2'>
                {[
                  'At home',
                  'Events and parties',
                  'Hotel',
                  'Clubs',
                  'Outcall'
                ].map(item => {
                  return (
                    <div
                      key={item}
                      className={cn(
                        'px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20',
                        state?.placeOfService.includes(item)
                          ? 'border-primary bg-primary bg-opacity-20'
                          : ''
                      )}
                      onClick={() => handleChangeValue('placeOfService', item)}
                    >
                      <p className='text-sm text-white'>{item}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='gap-4 grid lg:grid-cols-4 bg-[#d4d4d41a] mt-4 p-4 rounded-lg'>
            <div className='items-center gap-2 grid col-span-4 mb-2 w-full'>
              <h1 className='text-primary text-xl'>Pricing</h1>
            </div>
            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Price per hour<span className='text-red-500'>*</span>{' '}
              </Label>
              <Input
                value={state?.pricePerHour}
                onChange={e => {
                  handleChangeValue('pricePerHour', e.target.value)
                }}
                placeholder='Enter Password'
                className='w-full'
              />
            </div>

            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Payment Methods<span className='text-red-500'>*</span>{' '}
              </Label>
              <div className='flex flex-wrap gap-2'>
                {['Cash', 'Credit Card', 'Upi'].map(item => {
                  return (
                    <div
                      key={item}
                      className={cn(
                        'px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20',
                        state?.paymentMethod.includes(item)
                          ? 'border-primary bg-primary bg-opacity-20'
                          : ''
                      )}
                      onClick={() => handleChangeValue('paymentMethod', item)}
                    >
                      <p className='text-sm text-white'>{item}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2 bg-[#d4d4d41a] mt-4 p-4 rounded-lg text-white'>
            <h1 className='text-primary'>Add Gallery (Optional)</h1>
            <p className='text-primary'>
              {' '}
              Favourite images from your previous events
            </p>
            <div className='flex flex-wrap gap-4 p-10 w-full'>
              {state?.profile_prev?.map((it, index) => {
                return (
                  <div className='flex flex-col gap-10' key={index}>
                    <div className='flex flex-col justify-center items-center border-2 border-white bg-[#d4d4d41a] p-4 border-opacity-10 rounded-3xl w-[200px] h-[200px] text-white'>
                      <div className='border-white bg-gray-200 border rounded-3xl w-full max-w-[180px] cursor-pointer overflow-hidden aspect-[3/3]'>
                        <img
                          src={it}
                          alt='Uploaded Profile'
                          className='inset-0 w-full h-full object-cover'
                        />
                      </div>
                    </div>
                    <div className='flex mx-auto w-auto'>
                      <GradientColor className='p-[1.6px] rounded-[50px]'>
                        <Button
                          className='bg-[#2f2f2f] hover:bg-[#1c1b1be3 px-16 py-[18px] md:py-[22px] rounded-full text-[14px] text-white'
                          onClick={() => {
                            handleChangeValue('GALLERY_FILTER_INDEX', index)
                            handleChangeValue(
                              'GALLERY_PREV_FILTER_INDEX',
                              index
                            )
                          }}
                        >
                          Remove Photo
                        </Button>
                      </GradientColor>
                    </div>
                  </div>
                )
              })}
              <div className='flex flex-col gap-10'>
                <div className='flex flex-col justify-center items-center border-2 border-white bg-[#d4d4d41a] p-4 border-opacity-10 rounded-3xl w-[200px] h-[200px] text-white'>
                  <Image src={profile} width={100} alt='profile' />
                  <h2 className='text-center'>
                    Ideal photo should be in 3:3 aspect ratio
                  </h2>
                </div>
                <div className='flex mx-auto w-auto'>
                  <GradientColor className='p-[1.6px] rounded-[50px]'>
                    <label
                      htmlFor='image-upload-1'
                      className='relative cursor-pointer'
                    >
                      <Button className='bg-[#2f2f2f] hover:bg-[#1c1b1be3 px-16 py-[18px] md:py-[22px] rounded-full text-[14px] text-white'>
                        Add Photo
                      </Button>
                      <input
                        id='image-upload-1'
                        type='file'
                        multiple
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={e =>
                          handleImageUpload(e, 'profile', 'profile_prev')
                        }
                        className='absolute opacity-0 h-[40px]'
                        style={{
                          top: '-16px',
                          left: '-16px'
                        }}
                      />
                    </label>
                  </GradientColor>
                </div>
              </div>
            </div>
          </div>
          <div className='gap-4 grid lg:grid-cols-4 bg-[#d4d4d41a] mt-4 p-4 rounded-lg'>
            <div className='items-center gap-2 grid col-span-4 mb-2 w-full'>
              <h1 className='text-primary text-xl'>Your contacts</h1>
            </div>
            <div className='items-center gap-2 grid col-span-4 md:col-span-2 w-full'>
              <Label htmlFor='email' className='text-white'>
                Email<span className='text-red-500'>*</span>{' '}
              </Label>
              <Input placeholder='Enter Emial' className='w-full' />
            </div>
            <div className='items-center gap-2 grid col-span-4 md:col-span-2 w-full'>
              <Label htmlFor='email' className='text-white'>
                Telephone Contact<span className='text-red-500'>*</span>{' '}
              </Label>
              <Input
                onChange={e => {
                  handleChangeValue('mobileNumber', e.target.value)
                }}
                value={state?.mobileNumber}
                placeholder='Enter TelePhone'
                className='w-full'
              />
            </div>
            <div className='items-center gap-2 grid col-span-4 md:col-span-2 w-full'>
              <Label htmlFor='email' className='text-white'>
                Whatsapp Contact<span className='text-red-500'>*</span>{' '}
              </Label>
              <Input
                onChange={e => {
                  handleChangeValue('whatsAppNumber', e.target.value)
                }}
                value={state?.whatsAppNumber}
                placeholder='Enter Whatsapp Number'
                className='w-full'
              />
            </div>
          </div>
          <Button className='mt-4 w-full text-lg'>Confirm</Button>
        </div>
      </Container>
    </div>
  )
}

export { PostAdsPage }
