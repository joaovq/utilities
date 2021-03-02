import {
  HttpRequest as IHttpRequest,
} from '@/domain'
import {
  DateUtilitiesImpl,
  ObjectUtilitiesImpl,
  StringUtilitiesImpl,
  FileUtilitiesImpl,
  HttpRequestImpl,
} from '@/data'

export const dateUtilities = new DateUtilitiesImpl()
export const objectUtilities = new ObjectUtilitiesImpl(dateUtilities)
export const stringUtilities = new StringUtilitiesImpl()
export const fileUtilities = new FileUtilitiesImpl()

export const HttpRequest = (url: string): IHttpRequest => new HttpRequestImpl(url)
