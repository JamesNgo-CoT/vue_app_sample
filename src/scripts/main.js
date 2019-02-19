// The main javascript file for vue_app_sample.
// IMPORTANT:
// Any resources from this project should be referenced using SRC_PATH preprocessor var
// Ex: let myImage = '/*@echo SRC_PATH*//img/sample.jpg';

/* global Vue */
/* global consoleError router */
/* global authStore */
/* global authButtonComponent textFieldComponent cotFormComponent */
/* global loadingPageComponent loginPageComponent */

$(function () {
  const app = ((cot_app) => {
    if (cot_app != null) {
      return new cot_app('vue_app_sample', {
        hasContentTop: false,
        hasContentBottom: false,
        hasContentRight: false,
        hasContentLeft: false,
        searchcontext: 'INTRA'
      });
    }
  })(window.cot_app);

  if (app != null) {
    app.setBreadcrumb([
      { 'name': 'vue_app_sample', 'link': '#home' }
    ], true).render();
  }

  // ---------------------------------------------------------------------------

  authStore.url = '/* @echo AUTHAPI_V2_URL */';

  authStore.webStorage = localStorage;
  authStore.webStorageKey = 'vue_app_sample_authstorage';

  // ---------------------------------------------------------------------------

  const lockIcon = document.querySelector('.securesite img');
  const authButtonElement = lockIcon.parentNode.insertBefore(document.createElement('div'), lockIcon);

  new Vue({
    el: authButtonElement,
    template: /* html */ `
      <authButtonComponent
        v-bind:isLoggedIn="isLoggedIn"
        authUrl="#login"
        v-bind:user="state.userID"
        v-on:logout="logout"
        class="authButtonComponent"
      ></authButtonComponent>
    `,
    data: {
      state: authStore.state
    },
    computed: {
      isLoggedIn() {
        return authStore.isLoggedIn();
      }
    },
    methods: {
      logout() {
        authStore.logout().finalize(() => {
          router.route();
        });
      }
    },
    components: {
      authButtonComponent
    }
  });

  // ---------------------------------------------------------------------------

  const pageVue = new Vue({
    el: document.getElementById('vue_app_sample_container'),
    template: /* html */ `
      <component id="vue_app_sample_container" v-bind:is="currentPage"></component>
    `,
    data: {
      currentPage: loadingPageComponent
    }
  });

  // ---------------------------------------------------------------------------

  const routes = [];

  // ---------------------------------------------------------------------------

  routes.push({
    regExp: /^#login(\?.*)?$/,
    navigateTo({ match }) {
      console.log('NAVIGATE TO LOGIN');

      document.body.classList.add('login');

      if (app != null) {
        app.setBreadcrumb([
          { 'name': 'vue_app_sample', 'link': '#home' },
          { 'name': 'Login', 'link': '#login' }
        ], true);
      }

      // TODO Login
      pageVue.currentPage = {
        template: /* html */ `
          <loginPageComponent class="loginPage" v-on:success="onSuccess"></loginPageComponent>
        `,
        methods: {
          onSuccess(formValue, authFormComponent, loginPageComponent) {
            authFormComponent.reEnableButton();
            authFormComponent.showError('this is an error');
            console.log(formValue, authFormComponent, loginPageComponent);
          }
        },
        components: {
          loginPageComponent
        }
      }
    },
    navigateFrom({ match }) {
      document.body.classList.remove('login');
    }
  });

  // ---------------------------------------------------------------------------

  routes.push({
    regExp: /^#home(\?.*)?$/,
    navigateTo({ match }) {
      if (app != null) {
        app.setBreadcrumb([
          { 'name': 'vue_app_sample', 'link': '#home' }
        ], true);
      }

      pageVue.currentPage = {
        template: /* html */ `
          <div>
            <p v-for="thisValue in thisValues">
              <textFieldComponent v-model="thisValue.val"></textFieldComponent>
            </p>
            
            <p>{{ thisValues }}</p>
          </div>
        `,
        data() {
          return { thisValues: [{ val: 'test' }, { val: 'test2' }, { val: 'test3' }] }
        },
        components: {
          textFieldComponent
        }
      };
    },
    navigateFrom({ match }) { }
  });

  // ---------------------------------------------------------------------------

  routes.push({
    regExp: /^#datatable(\?.*)?$/,
    navigateTo: function ({ match }) {
      // TODO Home
    }
  });

  // ---------------------------------------------------------------------------

  routes.push({
    regExp: /^#report(\/(.+))?(\?.*)?$/,
    navigateTo: function ({ match }) {
      // TODO Report
    }
  });

  // ---------------------------------------------------------------------------

  routes.push({
    regExp: /^#form(\/(.+))?(\?.*)?$/,
    navigateTo: function ({ match }) {
      if (app != null) {
        app.setBreadcrumb([
          { 'name': 'vue_app_sample', 'link': '#home' },
          { 'name': 'Form' }
        ], true);
      }

      pageVue.currentPage = {
        template: /* html */ `
          <div>
            <cotFormComponent v-bind:config="config" v-model="value"></cotFormComponent>
            <p>Value:</p>
            <pre>{{ JSON.stringify(value, '', 5) }}</pre>
          </div>
        `,
        data() {
          return {
            config: {
              title: 'FORM',
              useBinding: true,

              sections: [{
                title: 'Form Section',

                rows: [{
                  fields: [{
                    title: 'FIELD',
                    type: 'text',
                    bindTo: 'text'
                  }, {
                    title: 'FIELD',
                    type: 'text',
                    bindTo: 'text2'
                  }]
                }]
              }, {
                title: 'Form Section',

                rows: [{
                  fields: [{
                    title: 'FIELD',
                    type: 'text',
                    bindTo: 'text3'
                  }, {
                    title: 'FIELD',
                    type: 'text',
                    bindTo: 'text4'
                  }]
                }, {
                  fields: [{
                    title: 'FIELD',
                    type: 'textarea',
                    bindTo: 'text5'
                  }]
                }]
              }]
            },
            value: {
              text: 'abc'
            }
          }
        },
        components: {
          cotFormComponent
        }
      };
    }
  });

  // ---------------------------------------------------------------------------

  router.homeHash = '#home';

  router.routes.unshift(...routes);

  authStore.init().then((request) => {
    router.start();
  }, (request) => {
    consoleError('An error occured.', request);
  });
});
