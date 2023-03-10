const GET_USERS = `query{
    users(input: {page: 1, limit: 100}){
      nodes{
        name
        email
      }
    }
  }`;

const CREATE_USER_MUTATION = `  createUser(
    input: {
      name: "Mehedi Hasan"
      email: "rafiz8787.mehe8788di@gmail.com"
      role: MODERATOR
      password: "54555151"
      avatar: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
    }
  ) {
    name
    email
    role
    password
  }
}
`;

const REMOVE_USER = `mutation {
  removeUser(
    input: { key: "_id", operator: eq, value: "6400b54dea18f7839f129f8b" }
  )
}
`;
