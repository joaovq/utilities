import sinon from 'sinon'
import { AxiosRequestConfig, AxiosError } from 'axios'

import { HttpRequestImpl } from '@/data'
import { PostPutParams, GetParams, DeleteParams } from '@/domain'

afterEach(function() {
  sinon.restore()
})

describe('HTTP Request', function() {
  const httpRequest = new HttpRequestImpl('baseURL', 5000)
  const postPutParms: PostPutParams = {
    url: 'baseURL',
    body: { nome: 'nome' },
    headers: 'headers'
  }
  const error: AxiosError = {
    name: 'Erro Teste',
    config: {},
    isAxiosError: true,
    message: 'Erro Message',
    toJSON: function() { return {} }
  }

  it('Should post object', async function() {
    const stubParams: AxiosRequestConfig = {
      data: postPutParms.body,
      method: 'post',
      headers: postPutParms.headers,
      url: postPutParms.url
    }
    const stubResponse = { status: 200, statusText: 'OK', data: stubParams.data }

    sinon.stub(httpRequest, 'send').withArgs(stubParams).returns(stubResponse.data)

    expect(await httpRequest.post(postPutParms)).toEqual(stubResponse.data)
  })

  it('Should put object', async function() {
    const stubParams: AxiosRequestConfig = {
      data: postPutParms.body,
      method: 'put',
      headers: postPutParms.headers,
      url: postPutParms.url
    }
    const stubResponse = { status: 200, statusText: 'OK', data: stubParams.data }

    sinon.stub(httpRequest, 'send').withArgs(stubParams).returns(stubResponse.data)

    expect(await httpRequest.put(postPutParms)).toEqual(stubResponse.data)
  })

  it('Should get object', async function() {
    const getParams: GetParams = {
      url: 'baseURL',
      query: { id: 1 },
      headers: 'headers'
    }
    const stubGetParams: AxiosRequestConfig = {
      params: getParams.query,
      method: 'get',
      headers: getParams.headers,
      url: getParams.url
    }
    const stubResponse = { status: 200, statusText: 'OK', data: { user: 'dev' } }

    sinon.stub(httpRequest, 'send').withArgs(stubGetParams).resolves({ user: 'dev' })

    expect(await httpRequest.get(getParams)).toEqual(stubResponse.data)
  })

  it('Should delete object', async function() {
    const deleteParams: DeleteParams = {
      url: 'baseURL',
      headers: 'headers'
    }
    const stubGetParams: AxiosRequestConfig = {
      method: 'delete',
      headers: deleteParams.headers,
      url: deleteParams.url
    }
    const stubResponse = { status: 200, statusText: 'OK', data: 'Deletado com sucesso' }

    sinon.stub(httpRequest, 'send').withArgs(stubGetParams).resolves(stubResponse.data)

    expect(await httpRequest.delete(deleteParams)).toEqual(stubResponse.data)
  })

  it('Should get error message', function() {
    expect(httpRequest.getErrorMessage(error)).toEqual(error.message)
  })

  it('Should get error response data', function() {
    const errorResp: AxiosError = {
      ...error,
      response: {
        status: 404,
        statusText: 'FAIL',
        data: 'Reponse Data',
        headers: 'header',
        config: {}
      }
    }

    expect(httpRequest.getErrorMessage(errorResp)).toEqual(errorResp.response.data)
  })
})
