import { interfaceValidator } from '@/main'
import faker from 'faker'

import Example from './validator/interface-example'
import validate from './validator/interface-example.validator'

describe('Validator', function() {
  const example: Example = {
    stringField: faker.lorem.words(2),
    numberField: faker.random.number(),
    dateField: faker.date.future(),
    arrayField: [{
      numberField: faker.random.number(),
      stringField: faker.lorem.words(2)
    }],
    objectField: {
      stringField: faker.lorem.words(2),
      anotherObjectField: {
        stringField: faker.lorem.words(2),
      },
      arrayField2: [{
        stringField: faker.lorem.words(2),
        numberField: faker.random.number()
      }],
      arrayField1: [faker.random.number()]
    }
  }

  describe('Missing properties', function() {
    it('Should thrown an error if no field was passed', function() {
      // Act and Assert
      expect(() => interfaceValidator.validate({
        validate,
        object: {},
        interfaceName: 'Example'
      }))
        .toThrowError('Example deveria ter o campo \'arrayField\' mas ele não foi informado\n' +
          'Example deveria ter o campo \'dateField\' mas ele não foi informado\n' +
          'Example deveria ter o campo \'numberField\' mas ele não foi informado\n' +
          'Example deveria ter o campo \'objectField\' mas ele não foi informado\n' +
          'Example deveria ter o campo \'stringField\' mas ele não foi informado\n')
    })

    it('Should thrown an error if only stringField was passed', function() {
      // Act and Assert
      expect(() => interfaceValidator.validate({
        validate,
        object: {
          stringField: example.stringField,
        },
        interfaceName: 'Example'
      }))
        .toThrowError('Example deveria ter o campo \'arrayField\' mas ele não foi informado\n' +
          'Example deveria ter o campo \'dateField\' mas ele não foi informado\n' +
          'Example deveria ter o campo \'numberField\' mas ele não foi informado\n' +
          'Example deveria ter o campo \'objectField\' mas ele não foi informado\n')
    })

    it('Should thrown an error if only stringField and number field was passed', function() {
      // Act and Assert
      expect(() => interfaceValidator.validate({
        validate,
        object: {
          stringField: example.stringField,
          numberField: example.numberField
        },
        interfaceName: 'Example'
      }))
        .toThrowError('Example deveria ter o campo \'arrayField\' mas ele não foi informado\n' +
          'Example deveria ter o campo \'dateField\' mas ele não foi informado\n' +
          'Example deveria ter o campo \'objectField\' mas ele não foi informado\n')
    })

    it('Should thrown an error if only stringField, numberField and dateField was passed', function() {
      // Act and Assert
      expect(() => interfaceValidator.validate({
        validate,
        object: {
          stringField: example.stringField,
          numberField: example.numberField,
          dateField: example.dateField.toISOString()
        },
        interfaceName: 'Example'
      }))
        .toThrowError('Example deveria ter o campo \'arrayField\' mas ele não foi informado\n' +
          'Example deveria ter o campo \'objectField\' mas ele não foi informado\n')
    })

    it('Should thrown an error if only stringField, numberField, dateField and arrayField was passed', function() {
      // Act and Assert
      expect(() => interfaceValidator.validate({
        validate,
        object: {
          stringField: example.stringField,
          numberField: example.numberField,
          dateField: example.dateField.toISOString(),
          arraField: example.arrayField
        },
        interfaceName: 'Example'
      }))
        .toThrowError('Example deveria ter o campo \'objectField\' mas ele não foi informado\n')
    })

    it('Should thrown an error if objectField is empty', function() {
      // Act and Assert
      expect(() => interfaceValidator.validate({
        validate,
        object: {
          stringField: example.stringField,
          numberField: example.numberField,
          dateField: example.dateField.toISOString(),
          arraField: example.arrayField,
          objectField: {}
        },
        interfaceName: 'Example'
      }))
        .toThrowError('Example.objectField deveria ter o campo \'anotherObjectField\' mas ele não foi informado\n' +
          'Example.objectField deveria ter o campo \'arrayField1\' mas ele não foi informado\n' +
          'Example.objectField deveria ter o campo \'arrayField2\' mas ele não foi informado\n' +
          'Example.objectField deveria ter o campo \'stringField\' mas ele não foi informado\n')
    })

    it('Should thrown an error if objectField is empty', function() {
      // Act and Assert
      expect(() => interfaceValidator.validate({
        validate,
        object: {
          stringField: example.stringField,
          numberField: example.numberField,
          dateField: example.dateField.toISOString(),
          arraField: example.arrayField,
          objectField: {
            ...example.objectField,
            anotherObjectField: {}
          }
        },
        interfaceName: 'Example'
      }))
        .toThrowError('Example.objectField.anotherObjectField deveria ter o campo \'stringField\' mas ele não foi informado\n')
    })
  })

  describe('Incorret types', function() {
    it('Should thrown an error if number field passed as string', function() {
      // Act and Assert
      expect(() => interfaceValidator.validate({
        validate,
        object: {
          ...example,
          dateField: example.dateField.toISOString(),
          stringField: 1,
          numberField: '1'
        },
        interfaceName: 'Example'
      }))
        .toThrowError('O campo numberField deveria ser número\n' +
          'O campo stringField deveria ser texto\n')
    })

    it('Should thrown an error objectField field is passed as number', function() {
      // Act and Assert
      expect(() => interfaceValidator.validate({
        validate,
        object: {
          ...example,
          dateField: example.dateField.toISOString(),
          objectField: 1
        },
        interfaceName: 'Example'
      }))
        .toThrowError('O campo objectField deveria ser objeto\n')
    })

    it('Should thrown an error if arrayField is passed as number', function() {
      // Act and Assert
      expect(() => interfaceValidator.validate({
        validate,
        object: {
          ...example,
          dateField: example.dateField.toISOString(),
          arrayField: 1
        },
        interfaceName: 'Example'
      }))
        .toThrowError('O campo arrayField deveria ser lista\n')
    })
  })

  describe('Other', function() {
    it('Should thrown unhadled error', function() {
      // Arrange
      const mockValidate = jest.fn().mockImplementation(() => {
        throw new Error('Error')
      })
      // Act
      expect(() => interfaceValidator.validate({
        validate: mockValidate,
        object: example,
        interfaceName: 'Example'
      }))
        .toThrowError('Não conseguimos validar os dados de entrada por causa do seguinte erro: Error')


    })
  })
})