import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation createAd($input: AdInput, $profile: [Upload]) {
    createAd(input: $input, profile: $profile) {
      id
    }
  }
`
