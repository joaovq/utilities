import sinon from 'sinon'
import { ReadStream } from 'fs'
import AWS from 'aws-sdk'

import { AWSAdapter } from '@/main'
import { UploadParams } from '@/domain'
import { FileUtilitiesImpl, Credentials } from '@/data'

describe('AWS', function() {
  const credentials: Credentials = {
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    bucketName: 'bucketName',
    tempBucketName: 'tempBucketName'
  }

  const awsAdapter = AWSAdapter(credentials)

  it('Should successfully upload file', async function() {
    const data = {
      Location: 'location'
    }

    const uploadParams: UploadParams = {
      path: 'path',
      fileName: 'fileName'
    }

    let readStream: ReadStream
    sinon.stub(FileUtilitiesImpl.prototype, 'getReadStream')
      .withArgs(uploadParams.path)
      .returns(readStream)

    const removeFileSpy = jest.spyOn(FileUtilitiesImpl.prototype, 'remove')

    const params = {
      ACL: 'public-read',
      Bucket: credentials.bucketName,
      Key: uploadParams.fileName,
      Body: readStream
    }

    sinon.stub(AWS.S3.prototype, 'upload')
      .withArgs(params)
      .yields(null, data)

    expect(await awsAdapter.upload(uploadParams)).toEqual(data.Location)
    expect(removeFileSpy).toHaveBeenCalledWith(uploadParams.path)
  })

  it('Should thrown an error when trying to upload file', async function() {
    const data = {
      Location: 'location'
    }

    const uploadParams: UploadParams = {
      path: 'path',
      fileName: 'fileName'
    }

    let readStream: ReadStream
    sinon.stub(FileUtilitiesImpl.prototype, 'getReadStream')
      .withArgs(uploadParams.path)
      .returns(readStream)

    const params = {
      ACL: 'public-read',
      Bucket: credentials.bucketName,
      Key: uploadParams.fileName,
      Body: readStream
    }

    const error = new Error('Error')

    sinon.stub(AWS.S3.prototype, 'upload')
      .withArgs(params)
      .yields(error, undefined)

    expect(async () => await awsAdapter.upload(uploadParams))
      .rejects
      .toThrowError(`Erro ao fazer uploado do arquivo: ${error.message}`)
  })

  it('Should return bucket name', function() {
    // Arrange
    const uploadParams: UploadParams = {
      path: 'path',
      fileName: 'fileName',
      tempFile: true
    }

    // Act
    // @ts-expect-error
    const receivedBucketName: string = awsAdapter.getBucketName(uploadParams)
    
    // Assert
    const expectedBucketName = credentials.tempBucketName
    expect(receivedBucketName).toEqual(expectedBucketName)
  })
})

afterEach(function() {
  sinon.restore()
})
