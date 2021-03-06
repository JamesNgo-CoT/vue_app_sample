/* global cotFormComponent */

/* exported authFormComponent */
const authFormComponent = {
  extends: cotFormComponent,

  props: {
    config: {
      default: {
        useBinding: true,

        success(event) {
          event.preventDefault();
          this.$emit('success', this.formValue, this);
          return false
        },

        sections: [{
          title: 'Login',

          rows: [{
            fields: [{
              class: 'field-error hide',
              html: /* html */ ``,
              type: 'html'
            }]
          }, {
            fields: [{
              className: 'authFormViewMessage col-xs-12',
              html: /* html */ `<p>Please use your novell login to continue</p>`,
              type: 'html',
              required: true
            }]
          }, {
            fields: [{
              title: 'User Name',
              type: 'text',
              bindTo: 'user',
              required: true,

              postRender({ field, row, section, definition, cotForm }) {
                document.getElementById(field.id).classList.add('input-lg');
              }
            }]
          }, {
            fields: [{
              title: 'Password',
              type: 'password',
              bindTo: 'pwd',
              required: true,

              postRender({ field, row, section, definition, cotForm }) {
                document.getElementById(field.id).classList.add('input-lg');
              }
            }]
          }, {
            fields: [{
              type: 'html',
              html: /* html */ `<button type="submit" class="btn btn-primary btn-block btn-lg btn-login">Login</button>`
            }]
          }, {
            fields: [{
              html: /* html */ `<p>Need help logging in? Call 416-338-2255</p>`,
              type: 'html',
            }]
          }]
        }]
      }
    }
  },

  methods: {
    reEnableButton() {
      const loginButton = this.$el.getElementsByClassName('btn-login')[0];
      loginButton.classList.remove('disabled');
      loginButton.removeAttribute('disabled');
    },

    showError(html) {
      console.log('SHOW ERROR');

      this.hideError();
      const errorField = this.$el.getElementsByClassName('field-error')[0];
      errorField.innerHTML = /* html */ `<div class="alert alert-danger" role="alert">${html}</div>`;
      errorField.classList.remove('hide');
    },

    hideError(html) {
      this.$el.getElementsByClassName('field-error')[0].classList.add('hide');
    }
  }
}