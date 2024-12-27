import { gql } from '@apollo/client'

export const get_premium_ads = gql`
  query premiumAds($page: Int, $pageSize: Int, $filter: AdsFilter) {
    premiumAds(page: $page, pageSize: $pageSize, filter: $filter) {
      ads {
        address
        age
        attentionTo {
          name
        }
        bodyType
        breast
        category
        categoryId
        city
        createdAt
        createdById
        createdByName
        description
        email
        endTime
        ethnicity
        hair
        id
        mobileNumber
        nationality
        paymentMethod
        placeOfServices {
          name
        }
        planId
        price
        pricePerHour
        profile
        services {
          name
        }
        startTime
        state
        title
        updatedAt
        whatsAppNumber
        zip
      }
      page
      pageSize
      totalCount
      totalPages
    }
  }
`
