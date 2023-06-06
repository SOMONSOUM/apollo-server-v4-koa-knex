import { MultipleFileUploadMutation } from '../../modules/upload/mutation/multipleFileUploadMution'
import { singleUploadMutation } from '../../modules/upload/mutation/singleFileUploadMutation'

export const uploadResolver = {
  Mutation: {
    singleUpload: singleUploadMutation,
    multipleUpload: MultipleFileUploadMutation,
  },
}
