import { gql } from '@apollo/client'
export const STATES_GET = gql`
  query modalStates {
    modalStates {
      id
      name
      updatedAt
      createdAt
    }
  }
`
export const CITIES_GET = gql`
  query modalCities($stateId: Int) {
    modalCities(stateId: $stateId) {
      id
      name
      stateId
      handler
      updatedAt
      createdAt
    }
  }
`
