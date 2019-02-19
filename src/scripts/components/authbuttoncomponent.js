/* exported authButtonComponent */
const authButtonComponent = {
  template: /* html */ `
    <div>
      <button v-if="isLoggedIn" type="button" class="btn btn-default" v-on:click="logout">
        Logout<span v-if="authState.userID != null">: {{ user }}</span>
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
    logout() {
      this.$emit('logout');
    }
  }
}
