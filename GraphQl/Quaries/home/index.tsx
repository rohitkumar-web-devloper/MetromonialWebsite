import gql from 'graphql-tag'

export const homeCategory = gql`
  query homeCategory {
    homeCategory {
      ads {
        city
        city_count
      }
      description
      id
      image
      name
    }
  }
`
export const getPlans = gql`
  query modalPlans {
    modalPlans {
      credits
    description
    id
    image
    name
    price
    timeSlots {
      planId
      slots {
        endTime
        startTime
      }
      timeSlotId
    }
    type
    }
  }
`
