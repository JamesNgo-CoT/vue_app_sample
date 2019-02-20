/* exported router */
const router = {
  homeHash: '#home',

  currentHash: null,
  lastHash: null,

  lastMatch: null,
  lastMatchedRoute: null,

  routes: [{
    regExp: /^.*$/,
    navigateTo({ match }) {
      this.currentHash = null;

      if (this.lastHash != null) {
        this.navigate({ hash: this.lastHash, triggerRoute: false });
        return;
      }

      this.navigate({ hash: this.homeHash, triggerRoute: true })
    },
    navigateFrom() {}
  }],

  beforeRoute: null,

  afterRoute: null,

  route() {
    this.lastHash = this.currentHash;
    this.currentHash = window.location.hash;

    Promise.resolve().finally(() => {
      if (typeof this.beforeRoute === 'function') {
        return this.beforeRoute();
      }
    }).finally(() => {
      if (this.lastMatchedRoute != null && typeof this.lastMatchedRoute.navigateFrom === 'function') {
        return this.lastMatchedRoute.navigateFrom.call(this, { match: this.lastMatch });
      }
    }).finally(() => {
      for (let index = 0, length = this.routes.length; index < length; index++) {
        const route = this.routes[index];
        if (route.regExp instanceof RegExp) {
          const match = this.currentHash.match(route.regExp);
          if (match != null) {
            this.lastMatch = match;
            this.lastMatchedRoute = route;

            if (typeof this.lastMatchedRoute.navigateTo === 'function') {
              return this.lastMatchedRoute.navigateTo.call(this, { match });
            }

            return;
          }
        }
      }

      this.lastMatch = null;
      this.lastMatchedRoute = null;
    }).finally(() => {
      if (typeof this.afterRoute === 'function') {
        return this.afterRoute();
      }
    });
  },

  // ---------------------------------------------------------------------------

  triggerNextRoute: true,

  navigate({ hash, triggerRoute = true }) {
    if (hash != null) {
      this.triggerNextRoute = triggerRoute;
      window.location.hash = hash;
    }
  },

  // ---------------------------------------------------------------------------

  hashChangeListener() {
    if (this.triggerNextRoute === true) {
      this.route();
    } else {
      this.triggerNextRoute = true;
    }
  },

  start() {
    window.addEventListener('hashchange', this.hashChangeListener.bind(this));
    this.route();
  },

  stop() {
    window.removeEventListener('hashchange', this.hashChangeListener.bind(this));
  },

  restart() {
    this.stop();
    this.start();
  }
}
