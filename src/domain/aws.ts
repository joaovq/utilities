export interface Credentials {
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
  tempBucketName?: string
}

export interface UploadParams {
  path: string
  fileName: string
  tempFile?: boolean
}

export interface AWSUtilities {
  upload: (params: UploadParams) => Promise<any>
  delete: (fileName: string) => Promise<any>
}