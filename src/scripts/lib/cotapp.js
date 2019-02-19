((cot_app) => {
  if (cot_app == null) {
    return;
  }

  cot_app.prototype.render = ((render) => function () {
    this.titleElement = document.querySelector('#app-header h1').appendChild(document.createElement('span'));
    this.titleElement.setAttribute('tabindex', '0');

    return render.call(this);
  })(cot_app.prototype.render);

  cot_app.prototype.setTitle = function (title) {
    if (this.titleElement == null) {
      return;
    }

    this.titleElement.innerHTML = title;

    if (this.name != null && this.name !== title) {
      title = `${title} - ${this.name}`;
    }
    document.title = title;

    if (this.focusSkipped !== true) {
      this.focusSkipped = true;
      return;
    }

    if (this.titleElement != null) {
      this.titleElement.focus();
    }
  };
})(window.cot_app);
