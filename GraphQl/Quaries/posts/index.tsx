import { gql } from "@apollo/client";

export const get_ads = gql`
  query AdsOnCat($catId: ID) {
    AdsOnCat(catId: $catId) {
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
      district
      ethnicity
      hair
      id
      message
      mobileNumber
      nationality
      paymentMethod
      placeOfService
      pricePerHour
      profile
      services
      success
      title
      updatedAt
      whatsAppNumber
      zip
    }
  }
`