import {expect} from 'chai';
import {fakeServer} from 'sinon';
import {HttpResponse} from 'httpr';
import {XHRProvider} from '../../../../app/Core/XHRProvider';

describe('XHR Provider', () => {
  let server, provider: XHRProvider;

  beforeEach(() => {
    server = fakeServer.create();

    server.autoRespond = true;

    server.respondWith('get', '/', [
      200, {}, 'Ok'
    ]);

    provider = new XHRProvider();
  });

  afterEach(() => {
    server.restore();
  });

  it('should send a basic XHR', () => {
    return provider.request({
      method: 'get',
      url: '/',
      params: {},
      headers: {}
    })
    .then((response: HttpResponse) => {
      expect(response).to.deep.equal({
        status: 200,
        statusText: 'OK',
        responseText: 'Ok',
        data: 'Ok',
        headers: {}
      });
    });
  });

  it('should parse a JSON response', () => {
    const data = {
      foo: 'bar'
    };

    server.respondWith('get', '/', [
      200, {
        'content-type': 'application/json'
      }, JSON.stringify(data)
    ]);

    return provider.request({
      method: 'get',
      url: '/',
      params: {},
      headers: {}
    })
    .then((response: HttpResponse) => {
      expect(response.data).to.deep.equal(data);
    });
  });
});
