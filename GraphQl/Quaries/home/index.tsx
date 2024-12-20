import gql from "graphql-tag";

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
`;