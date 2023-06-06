import cloudinary from 'cloudinary'
import { ApolloServerFileUploads } from '~/types/fileType'

type CloudinaryUploadConfig = {
  cloudname: string
  apiKey: string
  apiSecret: string
}

export class CloudinaryUploader implements ApolloServerFileUploads.IUploader {
  public config: CloudinaryUploadConfig

  constructor(config: CloudinaryUploadConfig) {
    this.config = config

    cloudinary.v2.config({
      cloud_name: config.cloudname,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
    })
  }

  private createUploadStream(fileName: string, cb: Function): any {
    return cloudinary.v2.uploader.upload_stream(
      { public_id: fileName },
      (error: any, file: any) => cb(error, file),
    )
  }

  async singleFileUploadResolver(
    parent: any,
    { file }: { file: ApolloServerFileUploads.File },
  ): Promise<ApolloServerFileUploads.UploadedFileResponse> {
    const { stream, filename, mimetype, encoding } = await file

    return new Promise((resolve, reject) => {
      const uploadStream = this.createUploadStream(
        filename,
        (error: any, result: any) => {
          if (error) return reject(error)
          return resolve({
            url: result.url,
            filename,
            mimetype,
            encoding,
          } as ApolloServerFileUploads.UploadedFileResponse)
        },
      )

      stream.pipe(uploadStream)
    })
  }

  async multipleUploadsResolver(
    parent: any,
    { files }: { files: ApolloServerFileUploads.File[] },
  ): Promise<ApolloServerFileUploads.UploadedFileResponse[]> {
    return Promise.all(
      files.map(f => this.singleFileUploadResolver(null, { file: f })),
    )
  }
}
