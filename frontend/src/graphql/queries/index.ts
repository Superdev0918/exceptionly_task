import gql from 'graphql-tag';

export const currentUserQuery = gql`
  query getUser {
    getUser(id:1) {
      email
    }
  }
`;

export const SNACKBAR_STATE_QUERY = gql`
  query getUsers {
    getUsers {
      id
      email
    }
  }
`;