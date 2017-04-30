import * as _ from 'lodash';
import {
  HttprProvider,
  HttpRequestSettings,
  HttpResponse,
  urlEncode,
  urlJoin,
  StringMap,
  HttpHeaders,
  MediaTypes
} from 'httpr';

/**
 * Httpr provider implemented with XMLHttpRequest for usage in browser environments.
 */
export class XHRProvider extends HttprProvider {
  /**
   * @inheritDoc
   */
  public request(settings: HttpRequestSettings): Promise<HttpResponse> {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest(),
        queryParams = urlEncode(settings.params),
        url = queryParams ? urlJoin(settings.url, `?${queryParams}`) : settings.url;

      if (_.startsWith(url, '/')) {
        url = `${location.origin}${url}`;
      }

      xhr.open(settings.method.toUpperCase(), url, true);

      _.forEach(settings.headers, (value, key) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onreadystatechange = () => {
        let response: HttpResponse,
          headers: StringMap,
          contentType: string;

        if (xhr.readyState === 4) {
          headers = _.fromPairs(xhr.getAllResponseHeaders()
          .split('\n')
          .map((header) => header.split(':').map((part) => part.trim()))
          .filter((header) => !!header[0])) as StringMap;

          response = {
            status: xhr.status,
            statusText: xhr.statusText,
            responseText: xhr.responseText,
            headers: headers
          };

          if (xhr.status >= 200 && xhr.status <= 400) {
            contentType = headers[HttpHeaders.CONTENT_TYPE];

            if (contentType && contentType.indexOf(MediaTypes.APPLICATION_JSON) >= 0) {
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
