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
import React, { useEffect, useReducer, useState } from 'react'
import profile from '../../assets/profile.svg'
import { useMutation, useQuery } from '@apollo/client'
import {
  ADD_POST,
  CITIES_GET,
  getPlans,
  homeCategory,
  STATES_GET
} from '@/GraphQl'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { ArrowLeft, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { userInfoStore } from '@/stores'
import ImageDisplay from '@/components/ImageDisplay'
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
    case 'email':
      return {
        ...state,
        email: action?.payload
      }
    case 'state_code':
      return {
        ...state,
        state_code: action?.payload
      }
    case 'state_name':
      return {
        ...state,
        state_name: action?.payload
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
    case 'city':
      return {
        ...state,
        city: action?.payload
      }
    case 'services':
      const check = state.services.some((it: string) => it == action?.payload)
        ? state.services.filter((it: string) => it != action?.payload)
        : [...state.services, action?.payload]
      return {
        ...state,
        services: check
      }
    case 'attentionTo':
      const checkdata = state.attentionTo.some(
        (it: string) => it == action?.payload
      )
        ? state.attentionTo.filter((it: string) => it != action?.payload)
        : [...state.attentionTo, action?.payload]
      return {
        ...state,
        attentionTo: checkdata
      }
    case 'placeOfService':
      const checkdata1 = state.placeOfService.some(
        (it: string) => it == action?.payload
      )
        ? state.placeOfService.filter((it: string) => it != action?.payload)
        : [...state.placeOfService, action?.payload]
      return {
        ...state,
        placeOfService: checkdata1
      }
    case 'paymentMethod':
      const checkdata2 = state.paymentMethod.some(
        (it: string) => it == action?.payload
      )
        ? state.paymentMethod.filter((it: string) => it != action?.payload)
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
        profile: state?.profile.filter(
          (_: any, index: number) => index != action?.payload
        )
      }
    case 'GALLERY_PREV_FILTER_INDEX':
      return {
        ...state,
        profile_prev: state?.profile_prev.filter(
          (_: any, index: number) => index != action?.payload
        )
      }
    default:
      return state
  }
}
const PostAdsPage = () => {
  const router = useRouter()
  const [createAd, { loading }] = useMutation(ADD_POST)
  const { user } = userInfoStore()
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
    whatsAppNumber: '',
    state_name: '',
    state_code: '',
    city: '',
    email: ''
  })

  const { data: stateData } = useQuery(STATES_GET)
  const { data: plansData } = useQuery(getPlans)
  const { data: cityData } = useQuery(CITIES_GET, {
    variables: { stateId: +state?.state_code },
    skip: state?.state_code ? false : true
  })
  const handleChangeValue = (type: string, payload: string) => {
    dispatch({ type, payload })
  }
  useEffect(() => {
    if (user) {
      handleChangeValue('email', user?.email)
      handleChangeValue('mobileNumber', user?.mobile)
    }
  }, [user])
  const { data } = useQuery(homeCategory)
  const handleImageUpload = (
    event: EventListener,
    type: string,
    type_prev: string
  ) => {
    if (state.profile.length > 5) {
      return toast.error(`Max 15 images is required.`)
    }
    const files = event.target.files
    if (type == 'profile') {
      if (files.length + state.profile.length > 15) {
        return toast.error(`Select Max 5 images.`)
      }
    }
    if (files.length > 5) {
      return toast.error(`Select Max 5 images.`)
    }

    if (files && files.length > 0) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
      const maxFileSize = 500 * 1024;
      Array.from(files).forEach(file => {
        if (!allowedTypes.includes(file.type)) {
          toast.error(
            `Only PNG, JPG, and JPEG files are allowed for ${file?.name}.`
          )
          return
        }
        if (file.size > maxFileSize) {
          return toast.error(
            `${file.name} exceeds the maximum size of 500KB.`
          );
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
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  useEffect(() => {
    if (stateData) {
      setStates(stateData?.modalStates)
    }
  }, [stateData])
  useEffect(() => {
    if (cityData) {
      setCities(cityData?.modalCities)
    }
  }, [cityData])
  const [planSelect, setPlanSelect] = useState({})
  const [selectSlot, setSelectSlot] = useState({})
  const handleSubmit = async () => {
    const {
      address,
      age,
      attentionTo,
      bodyType,
      breast,
      category,
      categoryId,
      city,
      description,
      email,
      ethnicity,
      hair,
      mobileNumber,
      nationality,
      paymentMethod,
      placeOfService,
      pricePerHour,
      services,
      state_name,
      title,
      whatsAppNumber,
      zip,
      profile
    } = state
    if (!category) {
      return toast.error('Category is required.')
    }
    if (!state_name.length) {
      return toast.error('State is required.')
    }
    if (!city) {
      return toast.error('City is required.')
    }
    if (!age.trim()) {
      return toast.error('Age is required.')
    }
    if (!attentionTo.length) {
      return toast.error('Attention to is required.')
    }
    if (!bodyType) {
      return toast.error('Body type is required.')
    }
    if (!breast) {
      return toast.error('Breast is required.')
    }

    if (!description.trim()) {
      return toast.error('Description is required.')
    }
    if (!email.trim()) {
      return toast.error('Email is required.')
    }
    if (!ethnicity) {
      return toast.error('Ethnicity is required.')
    }
    if (!hair) {
      return toast.error('Hair is required.')
    }
    if (!mobileNumber.trim()) {
      return toast.error('Telephone Contact is required.')
    }
    if (mobileNumber.trim().length != 10) {
      return toast.error('Invalid Telephone Contact.')
    }
    if (!whatsAppNumber) {
      return toast.error('Whatsapp Contact is required.')
    }
    if (whatsAppNumber.trim().length != 10) {
      return toast.error('Invalid Whatsapp Contact.')
    }
    if (!nationality) {
      return toast.error('Nationality is required.')
    }
    if (!paymentMethod.length) {
      return toast.error('Payment Method is required.')
    }
    if (!placeOfService.length) {
      return toast.error('Place of Service is required.')
    }
    if (!pricePerHour.trim()) {
      return toast.error('Price per hour is required.')
    }
    if (!services.length) {
      return toast.error('Services is required.')
    }
    if (!title) {
      return toast.error('Title is required.')
    }
    if (!Object.values(planSelect).length) {
      return toast.error('Plan is required.')
    }
    if (!Object.values(selectSlot).length) {
      return toast.error('Slot is required.')
    }
    if (!profile.length) {
      return toast.error('Images is required.')
    }

    const newData = {
      input: {
        address: address,
        age: age,
        attentionTo: attentionTo,
        bodyType: bodyType,
        breast: breast,
        category: category,
        categoryId: +categoryId,
        city: city,
        description: description,
        email: email,
        endTime: dayjs(new Date(+selectSlot?.slots[0]?.endTime)).format(),
        ethnicity: ethnicity,
        hair: hair,
        mobileNumber: mobileNumber,
        nationality: nationality,
        paymentMethod: paymentMethod,
        placeOfService: placeOfService,
        planId: +planSelect?.id,
        planType: planSelect?.type,
        price: planSelect?.price,
        pricePerHour: pricePerHour,
        services: services,
        startTime: dayjs(new Date(+selectSlot?.slots[0]?.startTime)).format(),
        state: state_name,
        title: title,
        whatsAppNumber: whatsAppNumber,
        zip: zip
      },
      profile: profile
    }

    const { data, errors } = await createAd({
      variables: newData
    })
    if (errors) {
      return toast.error(errors.at(-1)?.message, {
        action: {
          label: 'Undo'
        }
      })
    }
    toast.success('Ad Create Successfully.', {
      action: {
        label: 'Undo'
      }
    })
    router.push('/')
  }

  return (
    <div>
      <Container className='lg:w-[80%]'>
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
                Select State<span className='text-red-500'>*</span>{' '}
              </Label>
              <Select
                value={state?.state_name}
                onValueChange={(value: string) => {
                  const items = states.find(
                    (it: { name: string; id: string }) => it?.name == value
                  ) as unknown as { id: string }
                  handleChangeValue('state_name', value)
                  handleChangeValue('state_code', items?.id)
                }}
              >
                <SelectTrigger className='bg-[#d4d4d41a] w-full text-white'>
                  <SelectValue placeholder='Select State' />
                </SelectTrigger>
                <SelectContent>
                  {states?.map((it: { name: string; id: string }) => {
                    return (
                      <SelectItem value={it?.name} key={it?.id}>
                        {it?.name}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className='items-center gap-2 grid col-span-4 md:col-span-2 w-full'>
              <Label htmlFor='email' className='text-white'>
                Select City<span className='text-red-500'>*</span>{' '}
              </Label>
              <Select
                value={state?.city}
                onValueChange={(value: string) => {
                  handleChangeValue('city', value)
                }}
              >
                <SelectTrigger className='bg-[#d4d4d41a] w-full text-white'>
                  <SelectValue placeholder='Select City' />
                </SelectTrigger>
                <SelectContent>
                  {cities?.map((it: { name: string; id: string }) => {
                    return (
                      <SelectItem value={it?.name} key={it?.id}>
                        {it?.name}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
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
                Age<span className='text-red-500'>*</span>
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
                Title<span className='text-red-500'>*</span>
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
                Description<span className='text-red-500'>*</span>
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
              <div className='flex flex-wrap gap-2'>
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
                  <SelectItem value='Indian'>Indian</SelectItem>
                  <SelectItem value='Russian'>Russian</SelectItem>
                  <SelectItem value='Affrican'>Affrican</SelectItem>
                  <SelectItem value='American'>American</SelectItem>
                  <SelectItem value='Japanese'>Japanese</SelectItem>
                  <SelectItem value='Chinees'>Chinees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='items-center gap-2 grid col-span-4 w-full'>
              <Label htmlFor='email' className='text-white'>
                Breast<span className='text-red-500'>*</span>{' '}
              </Label>
              <div className='flex flex-wrap gap-2'>
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

              <div className='flex flex-wrap gap-2'>
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

              <div className='flex flex-wrap gap-2'>
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
              {state?.profile_prev?.map((it: string, index: string) => {
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
              <Input
                placeholder='Enter Emial'
                className='w-full'
                value={state?.email}
                onChange={e => {
                  handleChangeValue('email', e.target.value)
                }}
              />
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
          <div className='bg-[#d4d4d41a] mt-4 p-4 rounded-lg'>
            <div className='flex flex-col gap-4 w-full text-center'>
              <h1 className='text-3xl text-primary'>
                Publish for free in just a few steps.
              </h1>
              <p className='text-sm text-white'>
                Please select the offer type and time slot to promote your ad.{' '}
              </p>
            </div>
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10'>
              {plansData &&
                plansData?.modalPlans.map(item => {
                  return (
                    <GradientColor
                      className='p-[1px] rounded-lg'
                      key={item?.id}
                    >
                      <div
                        className={cn(
                          'bg-[#2f2f2f] pb-6 rounded-lg cursor-pointer',
                          planSelect?.id == item?.id
                            ? 'border-[1px] border-primary'
                            : null
                        )}
                        onClick={() => { setPlanSelect(item); setSelectSlot({}) }}
                      >
                        {/* <div
                          style={{
                            width: '100%',
                            paddingBottom: 'auto',
                            position: 'relative',
                            overflow: 'hidden',
                            height: '200px'
                          }}
                        // className='sm:px-6'
                        > */}
                        {/* <img
                            src={item?.image}
                            alt='Event'
                            style={{
                              width: '100%',
                              objectFit: 'cover',
                              position: 'static'
                            }}
                          /> */}
                        <ImageDisplay imageUrl={item?.image} sm="260px" xs="265px" />
                        {/* </div> */}
                        <div className='flex flex-col justify-center items-center gap-3 p-3'>
                          <h2 className='text-white'>{item?.name}</h2>
                          <h1 className='text-2xl text-primary'>
                            Rs.{item?.price}
                          </h1>
                          <GradientColor className='p-[1px] rounded-full w-full'>
                            <Button
                              className={cn(
                                'bg-[#2f2f2f] rounded-full w-full font-semibold text-white hover:text-black',
                                planSelect?.id == item?.id
                                  ? 'bg-primary text-black'
                                  : null
                              )}
                            >
                              <span>{item?.credits} Credits</span>
                              <Check />
                            </Button>
                          </GradientColor>
                          <p className='text-center text-sm text-white'>
                            {item?.description}
                          </p>
                        </div>
                      </div>
                    </GradientColor>
                  )
                })}
            </div>
            {Object.values(planSelect).length &&
              planSelect?.timeSlots?.length ? (
              <div className='mt-6'>
                <p className='text-md text-red-500'>*Please select One slot.</p>
                <div className='flex flex-wrap gap-2 mt-4'>
                  {planSelect?.timeSlots
                    // ?.sort((a, b) => {
                    //   const startTimeA = +a?.slots[0]?.startTime // Convert to a number for accurate comparison
                    //   const startTimeB = +b?.slots[0]?.startTime
                    //   console.log(startTimeA , startTimeB );

                    //   return startTimeA - startTimeB // Sorting in ascending order (earliest first)
                    // })
                    ?.map(it => {
                      return (
                        <GradientColor
                          className='p-[1px] rounded-full'
                          key={it?.timeSlotId}
                        >
                          <Button
                            className={cn(
                              'bg-[#2f2f2f] rounded-full text-white hover:text-black',
                              it?.timeSlotId == selectSlot.timeSlotId
                                ? 'bg-primary text-black'
                                : null
                            )}
                            onClick={() => setSelectSlot(it)}
                          >
                            {`${dayjs(
                              new Date(+it?.slots[0]?.startTime)
                            ).format('hh:mm A')} - ${dayjs(
                              new Date(+it?.slots[0]?.endTime)
                            ).format('hh:mm A')}`}
                            <Check />
                          </Button>
                        </GradientColor>
                      )
                    })}
                </div>
              </div>
            ) : null}
          </div>
          <Button
            className='mt-8 rounded-full w-full font-semibold text-lg'
            onClick={handleSubmit}
            disabled={loading}
          >
            {
              loading ? "...loading" : "Confirm"
            }

          </Button>
        </div>
      </Container>
    </div>
  )
}

export { PostAdsPage }
