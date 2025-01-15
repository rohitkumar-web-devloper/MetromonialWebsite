
import { gql } from '@apollo/client';
export const CUSTOMERS_DETAILS_GET = gql`
  query ads($createdById: Int) {
    ads(createdById: $createdById) {
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
  }
`;

