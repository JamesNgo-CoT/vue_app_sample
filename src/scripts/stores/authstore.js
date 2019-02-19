/* NOTE Swagger API Spec
  http://bugatti.corp.toronto.ca/c3api_spec/?url=http://maserati.corp.toronto.ca:9090/c3api_auth/v2/AuthService.svc/$openapi#!/OData32V432Endpoint/getAuthSessionById
*/

/* global httpRequest */

/* exported authStore */
const authStore = {
  state: {
    userID: null,
    keyInfo: null,
    lastName: null,
    firstName: null,
    jobTitle: null,
    email: null,
    employeeNumber: null,
    authenticated: null,
    app: null,
    sid: null,
    passwordExpiryDate: null,
    passwordIsExpired: null,
    secretQuestionID: null,
    graceLoginsRemaining: null,
    addressOne: null,
    telephoneNumber: null,
    streetNumber: null,
    streetName: null,
    streetType: null,
    unitNumber: null,
    city: null,
    province: null,
    country: null,
    postalCode: null,
    addressTwo: null,
    distinguishedName: null,
    cotUser: {
      groupMemberships: null,
      lastName: null,
      firstName: null,
      unit: null,
      department: null,
      division: null,
      authenticated: null
    }
  },

  // ---------------------------------------------------------------------------

  webStorage: null,
  webStorageKey: null,

  // ---------------------------------------------------------------------------

  setState(newState) {
    function setObject(target, source) {
      if (typeof source !== 'object') {
        source = {};
      }

      for (const key in target) {
        if (!target.hasOwnProperty(key) ) {
          continue;
        }

        if (!source.hasOwnProperty(key)) {
          target[key] = null;
          continue;
        }

        if (typeof target[key] === 'object' && target[key] != null) {
          setObject(target[key], source[key]);
          continue;
        }

        target[key] = source[key];
      }
    }

    setObject(this.state, newState);

    if (this.webStorage == null || this.webStorageKey == null) {
      return;
    }

    if (!this.isLoggedIn()) {
      this.webStorage.removeItem(this.webStorageKey);
      return;
    }

    this.webStorage.setItem(this.webStorageKey, this.state.sid);
  },

  // ---------------------------------------------------------------------------

  url: null,
  request: null,

  post({ app, user, pwd }) {
    if (this.url == null) {
      this.setState();
      return Promise.reject();
    }

    this.request = this.request || httpRequest.createRequestObject();
    return httpRequest.send({
      url: this.url,
      method: 'POST',
      headers: {},
      request: this.request,
      data: JSON.stringify({ app, user, pwd })
    }).then((request) => {
      this.setState(JSON.parse(this.request.responseText));
      return request;
    }, (request) => {
      this.setState();
      throw request;
    });
  },

  delete() {
    if (this.url == null || !this.isLoggedIn() || this.state.userID == null) {
      this.setState();
      return Promise.reject();
    }

    this.request = this.request || httpRequest.createRequestObject();
    return httpRequest.send({
      url: `${this.url}('${this.state.sid}')`,
      method: 'DELETE',
      headers: {
        'Authorization': this.state.userID
      },
      request: this.request
    }).then((request) => {
      this.setState();
      return request;
    }, (request) => {
      this.setState();
      throw request;
    });
  },

  get() {
    if (this.url == null || !this.isLoggedIn()) {
      this.setState();
      return Promise.reject();
    }

    this.request = this.request || httpRequest.createRequestObject();
    return httpRequest.send({
      url: `${this.url}('${this.state.sid}')`,
      method: 'GET',
      request: this.request
    }).then((request) => {
      this.setState(JSON.parse(this.request.responseText));
      return request;
    }, (request) => {
      this.setState();
      throw request;
    });
  },

  // ---------------------------------------------------------------------------

  init() {
    if (this.webStorage == null || this.webStorageKey == null) {
      return Promise.resolve();
    }

    const sid = this.webStorage.getItem(this.webStorageKey);
    if (sid == null) {
      return Promise.resolve();
    }

    this.setState({ sid });

    return this.get();
  },

  // ---------------------------------------------------------------------------

  login(app, user, pwd) {
    if (this.isLoggedIn()) {
      return this.get();
    }
    return this.post({ app, user, pwd });
  },

  logout() {
    return this.delete();
  },

  isLoggedIn() {
    return this.state.sid != null;
  }
}
