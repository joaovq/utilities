import {
  DateUtilities,
  ObjectUtilities,
  StringUtilities,
  FileUtilities,
  HttpRequest,
} from '@/domain'
import {
  DateUtilitiesImpl,
  ObjectUtilitiesImpl,
  StringUtilitiesImpl,
  FileUtilitiesImpl,
  HttpRequestImpl,
} from '@/data'

export class UtilitiesFactory {
  static getDate(): DateUtilities {
    return new DateUtilitiesImpl()
  }

  static getFile(): FileUtilities {
    return new FileUtilitiesImpl()
  }

  static getObject(): ObjectUtilities {
    return new ObjectUtilitiesImpl(UtilitiesFactory.getDate())
  }

  static getString(): StringUtilities {
    return new StringUtilitiesImpl()
  }

  static getRequest(url: string): HttpRequest {
    return new HttpRequestImpl(url)
  }
}

export const objectUtilities = UtilitiesFactory.getObject()
export const dateUtilities = UtilitiesFactory.getDate()
export const stringUtilities = UtilitiesFactory.getString()
export const fileUtilities = UtilitiesFactory.getFile()
