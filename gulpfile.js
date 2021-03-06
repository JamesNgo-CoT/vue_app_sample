const gulp = require('gulp');
const core = require('./node_modules/core/gulp_helper');
const pkg = require('./package.json');

core.embeddedApp.createTasks(gulp, {
  pkg,
  embedArea: 'full',
  environmentOverride: null,
  deploymentPath: '',
  preprocessorContext: {
    local: {
      AUTHAPI_V2_URL: 'https://was-intra-sit.toronto.ca/c3api_auth/v2/AuthService.svc/AuthSet'
    },
    dev: {},
    qa: {},
    prod: {}
  }
});
