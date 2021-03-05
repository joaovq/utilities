import sinon from 'sinon'

import { dateUtilities } from '@/main'

afterEach(function() {
  sinon.restore()
})

describe('Date', function() {
  it('Should return Date when i pass a type Date', function() {
    const date = new Date(2014, 1, 24)
    const dateReturn = new Date('2014-02-24T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date).returns(dateReturn)

    expect(dateUtilities.toDate(date)).toEqual(dateReturn)
  })

  it('Should return current date when i pass a wrong format date', function() {
    const date = '24/02/2014'
    const dateReturn = new Date()

    sinon.stub(dateUtilities, 'getDate').withArgs(date).returns(dateReturn)

    expect(dateUtilities.toDate(date)).toEqual(dateReturn)
  })

  it('Should return Date when i pass a type string', function() {
    const dateReturn = new Date('2012-12-12T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs('2012-12-12').returns(dateReturn)

    expect(dateUtilities.toDate('2012-12-12')).toEqual(dateReturn)
  })

  it('Should validade date when i pass a type Date', function() {
    const date = new Date(2014, 1, 24).toISOString().split('T')[0]

    expect(dateUtilities.isValidDate(date)).toEqual(true)
  })

  it('Should validade date when i pass a type String', function() {
    expect(dateUtilities.isValidDate('2012-12-12')).toEqual(true)
  })

  it('Should validade date in same year when i pass a type Date', function() {
    const date1 = new Date(2014, 2, 24)
    const date2 = new Date(2014, 1, 24)

    const dateReturn = new Date('2014-02-24T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2, 'year')).toEqual(true)
  })

  it('Should validade date in same year when i pass a type String', function() {
    const date1 = '2012-12-12'
    const date2 = '2012-12-12'

    const dateReturn = new Date('2012-12-12T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2, 'year')).toEqual(true)
  })

  it('Should validade date in same month when i pass a type Date', function() {
    const date1 = new Date(2014, 1, 24)
    const date2 = new Date(2014, 1, 10)

    const dateReturn = new Date('2014-02-10T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2, 'month')).toEqual(true)
  })

  it('Should validade date in same month when i pass a type String', function() {
    const date1 = '2012-12-20'
    const date2 = '2012-12-12'

    const dateReturn = new Date('2012-12-12T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2, 'month')).toEqual(true)
  })

  it('Should return true when I pass two dates in same day', function() {
    const date1 = new Date(2000, 1, 10)
    const date2 = new Date(2000, 1, 10)

    const dateReturn = new Date('2000-02-10T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2, 'day')).toEqual(true)
  })

  it('Should return true when I pass two string dates in same day', function() {
    const date1 = '2000-01-10'
    const date2 = '2000-01-10'

    const dateReturn = new Date('2000-02-10T00:00:00.000Z')

    sinon.stub(dateUtilities, 'getDate').withArgs(date2).returns(dateReturn)

    expect(dateUtilities.isDatesInSamePeriod(date1, date2, 'day')).toEqual(true)
  })

  it('Should validate current day when i pass a type Date', function() {
    const date = new Date()

    expect(dateUtilities.isDateInCurrentDay(date)).toEqual(true)
  })

  it('Should validate current day when i pass a type String', function() {
    const date = new Date().toISOString()

    expect(dateUtilities.isDateInCurrentDay(date)).toEqual(true)
  })

  it('Should reject validation day when i pass a type Date', function() {
    const date = new Date(2012, 11, 12)

    expect(dateUtilities.isDateInCurrentDay(date)).toEqual(false)
  })

  it('Should reject validation day when i pass a type String', function() {
    const date = new Date(2012, 11, 12).toISOString()

    expect(dateUtilities.isDateInCurrentDay(date)).toEqual(false)
  })

  it('Should add day into date when i pass a type Date', function() {
    const date = new Date(2012, 11, 12)
    const dateReturn = new Date('2012-12-17T00:00:00.000Z')

    expect(dateUtilities.addPeriodsIntoDate(date, 5, 'day')).toEqual(dateReturn)
  })

  it('Should add month into date when i pass a type Date', function() {
    const date = new Date(2012, 1, 12)
    const dateReturn = new Date('2012-07-12T00:00:00.000Z')

    expect(dateUtilities.addPeriodsIntoDate(date, 5, 'month')).toEqual(dateReturn)
  })

  it('Should add year into date when i pass a type Date', function() {
    const date = new Date(2012, 1, 12)
    const dateReturn = new Date('2017-02-12T00:00:00.000Z')

    expect(dateUtilities.addPeriodsIntoDate(date, 5, 'year')).toEqual(dateReturn)
  })

  it('Should add day into date when i pass a type String', function() {
    const date = '2012-12-12'
    const dateReturn = new Date('2012-12-17T00:00:00.000Z')

    expect(dateUtilities.addPeriodsIntoDate(date, 5, 'day')).toEqual(dateReturn)
  })

  it('Should add month into date when i pass a type String', function() {
    const date = '2012-02-12'
    const dateReturn = new Date('2012-07-12T00:00:00.000Z')

    expect(dateUtilities.addPeriodsIntoDate(date, 5, 'month')).toEqual(dateReturn)
  })

  it('Should add year into date when i pass a type String', function() {
    const date = '2012-02-12'
    const dateReturn = new Date('2017-02-12T00:00:00.000Z')

    expect(dateUtilities.addPeriodsIntoDate(date, 5, 'year')).toEqual(dateReturn)
  })

  it('Should add day into current day when i pass a type Date', function() {
    const dateReturn = new Date(2000, 1, 1)

    sinon.stub(dateUtilities, 'addPeriodsIntoDate').callsFake(function() {
      return dateReturn
    })

    expect(dateUtilities.addPeriodsIntoCurrentDate(5, 'day')).toEqual(dateReturn)
  })

  it('Should add month into current day when i pass a type Date', function() {
    const dateReturn = new Date(2000, 1, 1)

    sinon.stub(dateUtilities, 'addPeriodsIntoDate').callsFake(function() {
      return dateReturn
    })

    expect(dateUtilities.addPeriodsIntoCurrentDate(5, 'month')).toEqual(dateReturn)
  })

  it('Should add year into current day when i pass a type Date', function() {
    const dateReturn = new Date(2000, 1, 1)

    sinon.stub(dateUtilities, 'addPeriodsIntoDate').callsFake(function() {
      return dateReturn
    })

    expect(dateUtilities.addPeriodsIntoCurrentDate(5, 'year')).toEqual(dateReturn)
  })

  it('Should apply YYYY-MM-DD format into date when i pass a type Date', function() {
    const date = new Date(2000, 1, 1)
    const dateReturn = '2000-02-01'

    expect(dateUtilities.format(date)).toEqual(dateReturn)
  })

  it('Should apply DD/MM/YYYY format into date when i pass a type Date', function() {
    const date = new Date(2000, 1, 1)
    const dateReturn = '01/02/2000'

    expect(dateUtilities.format(date, 'DD/MM/YYYY')).toEqual(dateReturn)
  })

  it('Should apply YYYY-MM-DD format into date when i pass a type String', function() {
    const date = '2000-02-01'
    const dateReturn = '2000-02-01'

    expect(dateUtilities.format(date, 'YYYY-MM-DD')).toEqual(dateReturn)
  })

  it('Should apply DD/MM/YYYY format into date when i pass a type String', function() {
    const date = '2000-02-01'
    const dateReturn = '01/02/2000'

    expect(dateUtilities.format(date, 'DD/MM/YYYY')).toEqual(dateReturn)
  })

  it('Should return date in format YYYY-MM-DDThh:mm:ss', function() {
    const date = '2000-02-01'
    const dateReturn = new Date('2000-02-01T00:00:00.000Z')

    expect(dateUtilities.getDate(date)).toEqual(dateReturn)
  })

  it('Should return current date in format YYYY-MM-DDThh:mm:ss', function() {
    const expectedDate = new Date()

    const receivedDate = dateUtilities.getDate(undefined)

    expect(typeof receivedDate).toEqual('object')
    expect(receivedDate.toISOString().split('T')[0]).toEqual(expectedDate.toISOString().split('T')[0])
  })
})
