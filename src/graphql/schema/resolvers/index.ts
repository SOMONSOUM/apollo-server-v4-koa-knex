import { GraphQLUpload } from 'graphql-upload-minimal'
import { pubsub } from '~/lib/pubsub'
import { uploadResolver } from './uploadResolver'
import { RegisterAdminMutation } from '~/graphql/modules/authentication/mutation/register.mutation'
import { LoginAdminMutation } from '~/graphql/modules/authentication/mutation/login.mutation'

const rootResolver = {
  Upload: GraphQLUpload,
  Query: {
    hellWorld: () => {
      return 'Hello World'
    },
  },
  Mutation: {
    testingMuation: () => {
      return true
    },

    // Authentication Admin
    registerAdmin: RegisterAdminMutation,
    loginAdmin: LoginAdminMutation,
  },
  Subscription: {
    testingSub: {
      subscribe: () => pubsub.asyncIterator(['CREATE_USER_TOPIC']),
    },
  },
}

export const resolvers = [rootResolver, uploadResolver]
