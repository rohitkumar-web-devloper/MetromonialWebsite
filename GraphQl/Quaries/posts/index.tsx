import { gql } from "@apollo/client";

export const get_premium_ads = gql`
  query premiumAds {
    premiumAds {
      address
    age
    attentionTo
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
    message
    mobileNumber
    nationality
    paymentMethod
    placeOfService
    planId
    price
    pricePerHour
    profile
    services
    startTime
    state
    title
    updatedAt
    whatsAppNumber
    zip
    }
  }
`