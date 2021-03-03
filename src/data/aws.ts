import AWS from 'aws-sdk'

import { basename } from 'path'
import {
  FileUtilities,
  UploadParams,
  Credentials,
  AWSUtilities
} from '@/domain'


export class AWSUtilitiesImpl implements AWSUtilities {
  private readonly fileUtilities: FileUtilities
  private readonly bucketName: string
  private readonly tempBucketName: string
  private readonly s3: AWS.S3

  constructor(credentials: Credentials, fileUtilities: FileUtilities) {
    this.s3 = new AWS.S3({
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey
      }
    })
    this.fileUtilities = fileUtilities
    this.bucketName = credentials.bucketName
    this.tempBucketName = credentials.tempBucketName
  }

  async upload(params: UploadParams): Promise<string> {
    const path = params.path
    const fileName = params.fileName

    const bucket = params.tempFile ? this.tempBucketName : this.bucketName

    const awsParams = {
      ACL: 'public-read',
      Bucket: bucket,
      Key: fileName || basename(path),
      Body: this.fileUtilities.getReadStream(path)
    }

    this.s3.upload(awsParams, (error, data) => {
      if (error) {
        throw error
      } else {
        this.fileUtilities.remove(path)
        return data.Location
      }
    })

    return `https://${bucket}.s3.amazonaws.com/${awsParams.Key}`
  }

  async delete(fileName: string): Promise<string> {
    return new Promise((resolve) => {
      const params = {
        Bucket: this.bucketName,
        Key: fileName
      }

      this.s3.deleteObject(params, function(error) {
        if (error) {
          throw error
        } else {
          return resolve('File removed successfully.')
        }
      })
    })
  }
}
