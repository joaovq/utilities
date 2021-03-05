export interface UploadParams {
  path: string
  fileName: string
  tempFile?: boolean
}
export interface AWSAdapter {
  upload: (params: UploadParams) => Promise<any>
  delete: (fileName: string) => Promise<any>
}