import {
  HttpRequest as IHttpRequest,
  AWSUtilities as IAWSUtilities,
  Credentials as AWSCredentials
} from '@/domain'
import {
  DateUtilitiesImpl,
  ObjectUtilitiesImpl,
  StringUtilitiesImpl,
  FileUtilitiesImpl,
  HttpRequestImpl,
  AWSUtilitiesImpl
} from '@/data'

export const dateUtilities = new DateUtilitiesImpl()
export const objectUtilities = new ObjectUtilitiesImpl(dateUtilities)
export const stringUtilities = new StringUtilitiesImpl()
export const fileUtilities = new FileUtilitiesImpl()

export const HttpRequest = (url: string): IHttpRequest => new HttpRequestImpl(url)
export const AWSUtilities = (credentials: AWSCredentials): IAWSUtilities => new AWSUtilitiesImpl(credentials, fileUtilities)