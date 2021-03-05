import AWS from 'aws-sdk'

import { basename } from 'path'
import {
  FileUtilities,
  UploadParams,
  AWSAdapter
} from '@/domain'

export interface Credentials {
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
  tempBucketName?: string
}

interface Params {
  credentials: Credentials
  fileUtilities: FileUtilities
}

export class AWSAdapterImpl implements AWSAdapter {
  private readonly fileUtilities: FileUtilities
  private readonly bucketName: string
  private readonly tempBucketName: string
  private readonly s3: AWS.S3

  constructor(params: Params) {
    this.s3 = new AWS.S3({
      credentials: {
        accessKeyId: params.credentials.accessKeyId,
        secretAccessKey: params.credentials.secretAccessKey
      }
    })
    this.fileUtilities = params.fileUtilities
    this.bucketName = params.credentials.bucketName
    this.tempBucketName = params.credentials.tempBucketName
  }

  async upload(params: UploadParams): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = params.path

      const bucketName = this.getBucketName(params)

      const awsParams = {
        ACL: 'public-read',
        Bucket: bucketName,
        Key: this.getFileName(params),
        Body: this.fileUtilities.getReadStream(path)
      }

      return this.s3.upload(awsParams, (error: Error, data: any) => {
        if (error) {
          return reject(new Error(`Erro ao fazer uploado do arquivo: ${error.message}`))
        } else {
          this.fileUtilities.remove(path)
          return resolve(data.Location)
        }
      })
    })
  }

  getBucketName(params: UploadParams): string {
    return params.tempFile ? this.tempBucketName : this.bucketName
  }

  getFileName(params: UploadParams): string {
    return params.fileName || basename(params.path)
  }

  /* istanbul ignore next */
  async delete(fileName: string): Promise<string> {
    return new Promise((resolve) => {
      const params = {
        Bucket: this.bucketName,
        Key: fileName
      }

      return this.s3.deleteObject(params, function(error) {
        if (error) {
          throw error
        } else {
          return resolve('File removed successfully')
        }
      })
    })
  }
}
