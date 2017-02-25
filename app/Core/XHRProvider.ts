import * as _ from 'lodash';
import {HttprProvider, HttpRequestSettings, urlEncode, urlJoin, Map, HttpHeaders, MediaTypes} from 'httpr';

export class XHRProvider extends HttprProvider {
  public request(settings: HttpRequestSettings) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest(),
        queryParams = urlEncode(settings.params),
        url = queryParams ? urlJoin(settings.url, queryParams) : settings.url;

      xhr.open(settings.method.toUpperCase(), url, true);

      _.forEach(settings.headers, (value, key) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onreadystatechange = () => {
        let response, headers: Map<string>, data;

        if (xhr.readyState === 4) {
          headers = _.fromPairs(xhr.getAllResponseHeaders()
          .split('\n')
          .map((header) => header.split(':').map((part) => part.trim()))
          .filter((header) => !!header[0])) as Map<string>;



          response = {
            status: xhr.status,
            statusText: xhr.statusText,
            responseText: xhr.responseText,
            headers: headers
          };


          if (xhr.status >= 200 && xhr.status <= 400) {
            if (headers[HttpHeaders.CONTENT_TYPE].indexOf(MediaTypes.APPLICATION_JSON) >= 0) {
              response.data = JSON.parse(response.responseText);
            } else {
              response.data = response.responseText;
            }

            resolve(response);
          } else {
            reject(response);
          }
        }
      };

      if (settings.body) {
        xhr.send(settings.body);
      } else {
        xhr.send();
      }
    });
  }
}
