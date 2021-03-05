interface ArrayInterface {
  stringField: string
  numberField: number
}

export default interface Example {
  stringField: string
  numberField: number
  dateField?: Date
  objectField: {
    stringField: string
    anotherObjectField: {
      stringField?: string
    }
    arrayField1?: number[]
    arrayField2: ArrayInterface[]
  }
  arrayField: ArrayInterface[]
}
