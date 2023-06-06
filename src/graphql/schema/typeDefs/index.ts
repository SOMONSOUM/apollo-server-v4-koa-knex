import gql from 'graphql-tag'
import { uploadTypeDefs } from './uploadTypeDefs'

const rootTypeDefs = gql`
  scalar Upload
  scalar JSON

  type Query {
    hellWorld: String
  }

  type Mutation {
    testingMuation: Boolean
    registerAdmin(input: RegisterInput): Ok
    loginAdmin(input: LoginInput): Me
  }

  type Subscription {
    testingSub: String
  }

  type Ok {
    ok: Boolean
  }

  input LoginInput {
    email: String
    password: String
  }

  input RegisterInput {
    email: String
    username: String
    password: String
  }

  type User {
    id: Int
    email: String
    username: String
    password: String
  }

  type Me {
    id: Int
    email: String
    username: String
    token: String
  }

  type UploadFileResponse {
    url: String
    filename: String
    mimetype: String
    encoding: String
  }
`

export const typeDefs = [rootTypeDefs, uploadTypeDefs]
