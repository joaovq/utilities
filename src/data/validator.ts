import { InterfaceValidator, InterfaceValidatorParams } from '@/domain'

export class InterfaceValidatorImpl implements InterfaceValidator {
  validate(params: InterfaceValidatorParams): void {
    try {
      params.validate(params.object)
    } catch (error) {
      const message: string = error.message.split('\n\n')[0]
      if (this.isMissingPropertyError(message)) {
        throw this.getMissingPropertyErrorTranslated(message)
      } else if (this.isTypeError(message)) {
        throw this.getTypeErrorTranslated(params, message)
      } else {
        throw new Error(`Não conseguimos validar os dados de entrada por causa do seguinte erro: ${message}`)
      }
    }
  }

  isMissingPropertyError(message: string): boolean {
    return message.includes('should have required property')
  }

  getMissingPropertyErrorTranslated(messages: string): Error {
    const split = messages.split(',')

    let translatedMessage: string = ''

    for (const message of split) {
      translatedMessage += `${message.trim().replace('should have required property', 'deveria ter o campo')}`
      translatedMessage += ' mas ele não foi informado\n'
    }

    return new Error(translatedMessage)
  }

  isTypeError(message: string): boolean {
    return message.includes('should be')
  }

  getTypeErrorTranslated(params: InterfaceValidatorParams, message: string): Error {
    const messages = message.split(',')

    let translatedMessage: string = ''

    for (const message of messages) {
      const messageWithouInterfaceName: string = message.split(`${params.interfaceName}.`)[1]
      const field = messageWithouInterfaceName.split('should be')[0].trim()
      const expectedType = messageWithouInterfaceName.split('should be')[1].trim()
      translatedMessage += `O campo ${field} deveria ser ${this.getTranslatedType(expectedType)}\n`
    }

    return new Error(translatedMessage)
  }

  getTranslatedType(type: string): string {
    switch (type) {
      case 'number':
        return 'número'
      case 'object':
        return 'objeto'
      case 'array':
        return 'lista'
      default:
        return 'texto'
    }
  }
}