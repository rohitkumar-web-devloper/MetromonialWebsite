import React, { useEffect, useReducer, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useQuery } from '@apollo/client'
import { CITIES_GET, homeCategory, STATES_GET } from '@/GraphQl'
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
    case 'name':
      return {
        ...state,
        name: action?.payload
      }
    case 'nationality':
      return {
        ...state,
        nationality: action?.payload
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
    case 'city':
      return {
        ...state,
        city: action?.payload
      }
    case 'search':
      return {
        ...state,
        search: action?.payload
      }

    case 'ethnicity':
      const checkdata2 = state.ethnicity.some(
        (it: string) => it == action?.payload
      )
        ? state.ethnicity.filter((it: string) => it != action?.payload)
        : [...state.ethnicity, action?.payload]
      return {
        ...state,
        ethnicity: checkdata2
      }
    case 'breast':
      const breast = state.breast.some((it: string) => it == action?.payload)
        ? state.breast.filter((it: string) => it != action?.payload)
        : [...state.breast, action?.payload]
      return {
        ...state,
        breast: breast
      }
    case 'bodyType':
      const bodyType = state.bodyType.some(
        (it: string) => it == action?.payload
      )
        ? state.bodyType.filter((it: string) => it != action?.payload)
        : [...state.bodyType, action?.payload]
      return {
        ...state,
        bodyType: bodyType
      }
    case 'services':
      const services = state.services.some(
        (it: string) => it == action?.payload
      )
        ? state.services.filter((it: string) => it != action?.payload)
        : [...state.services, action?.payload]
      return {
        ...state,
        services: services
      }
    case 'attentionTo':
      const attentionTo = state.attentionTo.some(
        (it: string) => it == action?.payload
      )
        ? state.attentionTo.filter((it: string) => it != action?.payload)
        : [...state.attentionTo, action?.payload]
      return {
        ...state,
        attentionTo: attentionTo
      }
    case 'placeOfService':
      const placeOfService = state.placeOfService.some(
        (it: string) => it == action?.payload
      )
        ? state.placeOfService.filter((it: string) => it != action?.payload)
        : [...state.placeOfService, action?.payload]
      return {
        ...state,
        placeOfService: placeOfService
      }
    default:
      return state
  }
}
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
const GlobalSearchModal = ({ open, close }) => {
  const [state, dispatch] = useReducer(reducer, {
    category: '',
    categoryId: '',
    nationality: '',
    state_name: '',
    state_code: '',
    city: '',
    ethnicity: [],
    breast: [],
    bodyType: [],
    services: [],
    attentionTo: [],
    placeOfService: [],
    search: ''
  })
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const { data } = useQuery(homeCategory)
  const { data: stateData } = useQuery(STATES_GET)
  const { data: cityData } = useQuery(CITIES_GET, {
    variables: { stateId: +state?.state_code },
    skip: state?.state_code ? false : true
  })
  const handleChangeValue = (type: string, payload: string) => {
    dispatch({ type, payload })
  }

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
  return (
    <div>
      <Dialog open={open} onOpenChange={close}>
        <DialogContent className='border-2 border-white border-opacity-20 sm:max-w-[700px]'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Search size={25} />
              Search
            </DialogTitle>
          </DialogHeader>
          <div className='py-4 clip-scroll max-h-[400px] overflow-y-scroll'>
            <div className='gap-2 gap-x-4 gap-y-4 grid grid-cols-6 md:grid-cols-12 mr-2'>
              <div className='col-span-6'>
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
              <div className='col-span-6'>
                <Input
                  type='text'
                  placeholder='Search By Name...'
                  onChange={e => {
                    handleChangeValue('search', e.target.value)
                  }}
                  value={state?.search}
                  className='w-full'
                />
              </div>
              <div className='col-span-6 md:col-span-4'>
                <Select
                  value={state?.nationality}
                  onValueChange={(value: string) => {
                    handleChangeValue('nationality', value)
                  }}
                >
                  <SelectTrigger className='bg-[#d4d4d41a] w-full text-white'>
                    <SelectValue placeholder='Choose Regions' />
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
              <div className='col-span-6 md:col-span-4'>
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
              <div className='col-span-6 md:col-span-4'>
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
            </div>
            <div className='mt-4'>
              <h1
                className='flex gap-2 text-primary'
                style={{ letterSpacing: '1px' }}
              >
                <SlidersHorizontal /> Filters
              </h1>
            </div>

            <div className='flex flex-col gap-4 mt-4'>
              <div className='flex flex-col gap-2'>
                <h2 className='text-primary' style={{ letterSpacing: '1px' }}>
                  Ethnicity{' '}
                  {state?.ethnicity.length > 0
                    ? `(${state?.ethnicity.length})`
                    : null}
                </h2>
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
                          state?.ethnicity.includes(item)
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
              <div className='flex flex-col gap-2'>
                <h2 className='text-primary' style={{ letterSpacing: '1px' }}>
                  Body type{' '}
                  {state?.bodyType.length > 0
                    ? `(${state?.bodyType.length})`
                    : null}
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {['Slim', 'Curvy'].map(item => {
                    return (
                      <div
                        key={item}
                        className={cn(
                          'px-4 rounded-lg cursor-pointer py-2 border border-white border-opacity-20',
                          state?.bodyType.includes(item)
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
              <div className='flex flex-col gap-2'>
                <h2 className='text-primary' style={{ letterSpacing: '1px' }}>
                  Services{' '}
                  {state?.services.length > 0
                    ? `(${state?.services.length})`
                    : null}
                </h2>
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
              <div className='flex flex-col gap-2'>
                <h2 className='text-primary' style={{ letterSpacing: '1px' }}>
                  Attention to{' '}
                  {state?.attentionTo.length > 0
                    ? `(${state?.attentionTo.length})`
                    : null}
                </h2>
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
              <div className='flex flex-col gap-2'>
                <h2 className='text-primary' style={{ letterSpacing: '1px' }}>
                  Place of service{' '}
                  {state?.placeOfService.length > 0
                    ? `(${state?.placeOfService.length})`
                    : null}
                </h2>
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
                        onClick={() =>
                          handleChangeValue('placeOfService', item)
                        }
                      >
                        <p className='text-sm text-white'>{item}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type='button' onClick={close}>
              Clear
            </Button>
            <Button type='button' className='font-semibold'>
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { GlobalSearchModal }
