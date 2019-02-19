/* exported consoleError */
function consoleError(message) {
  /* eslint-disable no-console */
  if (window.console && window.console.error) {
    console.error();
  }
  /* eslint-enable no-console */
}
