import gql from 'graphql-tag';

export const SignIn = gql`
  mutation login ($email: String!, $password: String!) {
    login (authenticateUserDTO: {
      email: $email
      password: $password
    })
  }
`;


export const SignUp = gql`
  mutation createUser ($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser (createUserDTO: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
    }) {
      id
    }
  }
`;


export const requestResetPasswordMutation = gql`
    mutation RequestResetPasswordMutation($email: String!) {
        requestPasswordReset(email: $email)
    }
`;

export const resetPasswordMutation = gql`
    mutation ResetPasswordMutation($resetToken: String!, $password: String!, $confirmPassword: String!) {
        resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
            email
        }
    }
`;

export const completeOnboardingMutation = gql`
    mutation CompleteOnboardingMutation {
        completeOnboarding
    }
`;