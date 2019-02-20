/* exported authButtonComponent */
const authButtonComponent = {
  template: /* html */ `
    <div>
      <button v-if="isLoggedIn" type="button" class="btn btn-default btn-logout" v-on:click="onLogout">
        Logout<span v-if="user != null">: {{ user }}</span>
      </button>
      <a v-else v-bind:href="authUrl" class="btn btn-default">Login</a>
    </div>
  `,

  props: {
    isLoggedIn: Boolean,
    authUrl: String,
    user: String
  },

  methods: {
    onLogout() {
      this.$el.getElementsByClassName('btn-logout')[0].setAttribute('disabled', '');
      this.$emit('logout');
    }
  }
}
