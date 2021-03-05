import {
  HttpRequest as IHttpRequest,
  AWSAdapter as IAWSUtilities,
} from '@/domain'
import {
  DateUtilitiesImpl,
  ObjectUtilitiesImpl,
  StringUtilitiesImpl,
  FileUtilitiesImpl,
  HttpRequestImpl,
  AWSAdapterImpl,
  Credentials as AWSCredentials,
  InterfaceValidatorImpl
} from '@/data'

export const dateUtilities = new DateUtilitiesImpl()
export const objectUtilities = new ObjectUtilitiesImpl(dateUtilities)
export const stringUtilities = new StringUtilitiesImpl()
export const fileUtilities = new FileUtilitiesImpl()
export const interfaceValidator = new InterfaceValidatorImpl()

export const HttpRequest = (url: string): IHttpRequest => new HttpRequestImpl(url)
export const AWSAdapter = (credentials: AWSCredentials): IAWSUtilities => new AWSAdapterImpl({
  credentials,
  fileUtilities
})