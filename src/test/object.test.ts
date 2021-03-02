import sinon from 'sinon'
import lodash from 'lodash'
import * as stringSimilarity from 'string-similarity'

import { ObjectUtilitiesImpl, DateUtilitiesImpl } from '@/data'

afterEach(function() {
  sinon.restore()
})

describe('Object', function() {
  const dateUtilities = new DateUtilitiesImpl()
  const objectUtilities = new ObjectUtilitiesImpl(dateUtilities)

  it('Should certify object', function() {
    expect(objectUtilities.isObject({ nome: 'teste' })).toEqual(true)
  })

  it('Should reject object', function() {
    const date = new Date(1993, 5, 9).toISOString().split('T')[0]

    expect(objectUtilities.isObject(date)).toEqual(false)
  })

  it('Should reject object array', function() {
    const array = [{ nome: 'teste' }]

    expect(objectUtilities.isObject(array)).toEqual(false)
  })

  it('Should reject undefined param', function() {
    expect(objectUtilities.isObject(undefined)).toEqual(false)
  })

  it('Should certify number', function() {
    expect(objectUtilities.isNumber(10)).toEqual(true)
  })

  it('Should reject number', function() {
    expect(objectUtilities.isNumber({ field: 10 })).toEqual(false)
    expect(objectUtilities.isNumber('string')).toEqual(false)
  })

  it('Should certify string', function() {
    expect(objectUtilities.isString('string')).toEqual(true)
  })

  it('Should reject string', function() {
    expect(objectUtilities.isString(10)).toEqual(false)
    expect(objectUtilities.isString({ field: 'string' })).toEqual(false)
  })

  it('Should certify date', function() {
    const date = new Date(1993, 5, 9).toISOString().split('T')[0]

    expect(objectUtilities.isDate(date)).toEqual(true)
  })

  it('Should reject date', function() {
    sinon.stub(objectUtilities, 'isNumber').withArgs(10).returns(true)
    sinon.stub(objectUtilities, 'isString').withArgs('string').returns(true)

    expect(objectUtilities.isDate(10)).toEqual(false)
    expect(objectUtilities.isDate('string')).toEqual(false)
  })

  it('Should create a random string', function() {
    sinon.stub(Math, 'random').withArgs().returns(0)

    expect(objectUtilities.getRandomString(5, 'abed0')).toEqual('aaaaa')
  })

  it('Should clone object', function() {
    sinon.stub(lodash, 'cloneDeep').withArgs({ nome: 'Vitas' }).returns({ nome: 'Vitas' })

    expect(objectUtilities.cloneObject({ nome: 'Vitas' })).toEqual({ nome: 'Vitas' })
  })

  it('Should confirm string similarity', function() {
    sinon.stub(stringSimilarity, 'compareTwoStrings').withArgs('ronaldo', 'Ronaldo').returns(0.83)

    expect(objectUtilities.stringsAreSimilar('ronaldo', 'Ronaldo', 0.8)).toEqual(true)
  })

  it('Should deny string similarity', function() {
    sinon.stub(stringSimilarity, 'compareTwoStrings').withArgs('porta', 'hipopotamo').returns(0.4)

    expect(objectUtilities.stringsAreSimilar('porta', 'hipopotamo', 0.8)).toEqual(false)
  })

  it('Should return 2.25 when passed 2.24989647 and precision 2', function() {
    // Act and Assert
    expect(objectUtilities.setNumberPrecision(2.24989647, 2)).toEqual(2.25)
  })

  it('Should return 2.2499 when passed 2.24989647', function() {
    // Act and Assert
    expect(objectUtilities.setNumberPrecision(2.24989647)).toEqual(2.2499)
  })

  it('Should return undefined when passed undefined', function() {
    // Act and Assert
    expect(objectUtilities.setNumberPrecision(undefined)).toEqual(undefined)
  })

  it('Should return a random value from enum', function() {
    // Arrange
    enum SomeEnum {
      VALUE1 = 1,
      VALUE2 = 2
    }

    // Act
    const receivedValue: number = +objectUtilities.getRandomValueFromNumberedEnum(SomeEnum)

    // Assert
    try {
      expect(receivedValue).toBe(SomeEnum.VALUE1)
    } catch (error) {
      expect(receivedValue).toBe(SomeEnum.VALUE2)
    }
  })
})
