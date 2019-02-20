/* exported httpRequest */
const httpRequest = {
  createRequestObject() {
    return new XMLHttpRequest();
  },

  // ---------------------------------------------------------------------------

  globalHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

  send({ url, method = 'GET', headers = {}, request = this.createRequestObject(), data }) {
    if (url == null) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      request.abort();

      request.open(method, url);

      request.onreadystatechange = () => {
        switch (request.readyState) {
          case 1:
          case 2:
          case 3:
            break;
          case 4:
            if (request.status !== 200) {
              reject(request);
              break;
            }

            resolve(request);
            break;
        }
      };

      for (const key in this.globalHeaders) {
        if (this.globalHeaders.hasOwnProperty(key) && !headers.hasOwnProperty(key)) {
          request.setRequestHeader(key, this.globalHeaders[key]);
        }
      }

      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          request.setRequestHeader(key, headers[key]);
        }
      }

      request.send(data);
    });
  }
}
