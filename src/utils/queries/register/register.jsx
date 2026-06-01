export const REGISTER = ({
  firstName,
  lastName,
  email,
  password,
  newsletter,
  redirectUrl,
}) => {
  return {
    query: `
   mutation RegisterMutation($firstName: String!, $lastName: String!, $email: String!, $password: String!, $redirectUrl: String = "",$newsletter: Boolean) {
  accountRegister(
    input: {email: $email, password: $password, channel: "india-channel", firstName: $firstName, lastName: $lastName, redirectUrl: $redirectUrl, newsletter: $newsletter}
  ) {
    errors {
      field
      code
      message
    }
    user {
      email
      isActive
      isConfirmed
      newsletter
      lastName
      firstName
      id
    }
  }
}
    `,
    variables: { firstName, lastName, email, password, redirectUrl, newsletter },
  };
};

export const VERIFY_EMAIL = ({ email, token }) => {
  return {
    query: `
mutation ConfirmAccount($token: String!, $email:String!) {
  confirmAccount(token: $token,email:$email) {
    user {
      id
      email
      firstName
      lastName
    }
    errors {
      field
      message
    }
  }
}
`,
    variables: { email, token },
  };
};
export const GET_ORDER_LIST_BY_EMAIL = ({ email }) => {
  return {
    query: `
    query orders($email: String!) {
      orders(filter: { customer: $email }, first: 10) {
        totalCount
        edges {
          node {
            id
            created
            status
            total {
              gross {
                amount
              }
            }
            lines {
              id
              productName
              quantity
              totalPrice {
                gross {
                  amount
                }
              }
            }
          }
        }
      }
    }
    `,
    variables: { email },
  };
};

export const FORGET_PASSWORD = ({ email, redirectUrl }) => {
  return {
    query: `
   mutation RequestPasswordReset($email:String!,$redirectUrl:String!) {
  requestPasswordReset(
    email: $email
    redirectUrl: $redirectUrl
    channel: "india-channel"
  ) {
    errors {
      code
      field
      message
    }
  }
}
    `,
    variables: { email, redirectUrl },
  };
};

export const RESET_PASSWORD = ({ token, email, password }) => {
  return {
    query: `
 mutation setPassword($token:String!, $email:String!,$password:String!) {
  setPassword(token: $token, email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      email
    }
  }
}
    `,
    variables: { token, email, password },
  };
};


export const USER_DETAILS = () => {
  return {
    query: `

    query {
      me {
        id
        email
        firstName
        lastName
        newsletter
      }
    }
    `,
    variables: { },
  };
};


export const UPDATE_USER_DETAILS = ({ firstName, lastName,email, newsletter }) => {
  return {
    query: `

   mutation UpdateMyAccount(
        $firstName: String!
        $lastName: String!
        $newsletter: Boolean!
      ) {
        accountUpdate(
          input: {
            firstName: $firstName
            lastName: $lastName
            newsletter: $newsletter
          }
        ) {
          user {
            email
            firstName
            lastName
            newsletter
          }
          errors {
            field
            message
            code
          }
        }
      }
    `,
    variables: { firstName, lastName,email, newsletter },
  };
};




