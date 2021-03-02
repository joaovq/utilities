import * as stringSimilarity from 'string-similarity'
import sinon from 'sinon'

import { StringUtilitiesImpl } from '@/data'

afterEach(function() {
  sinon.restore()
})

describe('Utilities - String Manager', function() {
  const stringManager = new StringUtilitiesImpl()

  it('Should certify object', function() {
    expect(stringManager.removeSpecialCharactersFromString('str/ing()')).toEqual('string')
  })

  it('Should create a random string from abed0', function() {
    sinon.stub(Math, 'random').withArgs().returns(0)
    expect(stringManager.getRandomString(5, 'abed0')).toEqual('aaaaa')
  })

  it('Should create a random string from ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', function() {
    sinon.stub(Math, 'random').withArgs().returns(0)

    const randomString = stringManager.getRandomString()

    expect(typeof randomString).toBe('string')
    expect(randomString.length).toBe(12)
  })


  it('Should confirm string similarity', function() {
    sinon.stub(stringSimilarity, 'compareTwoStrings').withArgs('ronaldo', 'Ronaldo').returns(0.83)

    expect(stringManager.stringsAreSimilar('ronaldo', 'Ronaldo')).toEqual(true)
  })

  it('Should deny string similarity', function() {
    sinon.stub(stringSimilarity, 'compareTwoStrings').withArgs('porta', 'hipopotamo').returns(0.4)

    expect(stringManager.stringsAreSimilar('porta', 'hipopotamo', 0.8)).toEqual(false)
  })
})
