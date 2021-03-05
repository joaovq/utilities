export interface InterfaceValidatorParams {
  validate: Function 
  object: any
  interfaceName: string
}

export interface InterfaceValidator {
  validate: (params: InterfaceValidatorParams) => void
}
