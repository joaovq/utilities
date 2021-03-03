import sinon from 'sinon'
import { ReadStream } from 'fs'


import AWS from 'aws-sdk'
import { AWSUtilitiesImpl } from '@/data'
import { fileUtilities } from '@/main'
import { Credentials, UploadParams } from '@/domain'

describe('Api AWS', function() {

  const credentials: Credentials = {
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    bucketName: 'bucketName',
    tempBucketName: 'tempBucketName'
  }

  const awsUtitlities = new AWSUtilitiesImpl(credentials, fileUtilities)



  it('Should upload on aws main bucket', async function() {
    // Arrange
    const uploadParams: UploadParams = {
      path: 'path',
      fileName: 'fileName'
    }

    let readStream: ReadStream
    sinon.stub(fileUtilities, 'getReadStream')
      .withArgs('path')
      .returns(readStream)

    sinon.stub(AWS.S3.prototype, 'upload')
      .withArgs({
        ACL: 'public-read',
        Bucket: credentials.bucketName,
        Key: 'path',
        Body: readStream
      })

    // Act
    const pathReceived = await awsUtitlities.upload(uploadParams)

    expect(pathReceived).toEqual(`https://${credentials.bucketName}.s3.amazonaws.com/fileName`)
  })

  it('Should upload on aws temp bucket', async function() {
    // Arrange
    const uploadParams: UploadParams = {
      path: 'path',
      fileName: 'fileName',
      tempFile: true
    }

    let readStream: ReadStream
    sinon.stub(fileUtilities, 'getReadStream')
      .withArgs('path')
      .returns(readStream)

    sinon.stub(AWS.S3.prototype, 'upload')
      .withArgs({
        ACL: 'public-read',
        Bucket: credentials.tempBucketName,
        Key: 'path',
        Body: readStream
      })

    // Act
    const pathReceived = await awsUtitlities.upload(uploadParams)

    expect(pathReceived).toEqual(`https://${credentials.tempBucketName}.s3.amazonaws.com/fileName`)
  })

  // it('Deveria remover um arquivo', async function() {

  //   const params = {
  //     Bucket: credentials.bucketName,
  //     Key: 'fileName'
  //   }

  //   const deleteStub = sinon.stub(AWS.S3.prototype, 'deleteObject')

  //   expect(deleteStub).toHaveBeenCalledWith(params)
  //   expect(await awsUtitlities.delete('fileName')).toEqual('constantes.itemRemovidoComSucesso')
  // })

})

afterEach(function() {
  sinon.restore()
})
