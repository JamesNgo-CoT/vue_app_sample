((cot_form) => {
  if (cot_form == null) {
    return;
  }

  cot_form.prototype.addformfield = ((addformfield) => function (fieldDefinition, fieldContainer) {
    addformfield.call(this, fieldDefinition, fieldContainer);

    if (fieldDefinition['readOnly'] === true) {
      switch (fieldDefinition['type']) {
        case 'email':
        case 'number':
        case 'password':
        case 'text':
          fieldContainer.querySelector(`[type="${fieldDefinition['type']}"]`).setAttribute('readonly', '');
          break;

        case 'phone':
          fieldContainer.querySelector('[type="tel"]').setAttribute('readonly', '');
          break;

        case 'textarea':
          fieldContainer.querySelector('textarea').setAttribute('readonly', '');
          break;
      }
    }
  })(cot_form.prototype.addformfield);

  cot_form.prototype.validatorOptions = ((validatorOptions) => function (fieldDefinition) {
    const returnValue = validatorOptions.call(this, fieldDefinition);

    if (fieldDefinition['excluded'] != null) {
      returnValue['excluded'] = fieldDefinition['excluded'];
    }

    return returnValue;
  })(cot_form.prototype.validatorOptions);
})(window.cot_form);

// -----------------------------------------------------------------------------

((CotForm) => {
  if (CotForm == null) {
    return;
  }

  CotForm.prototype.render = ((render) => function (options) {
    const definition = this._definition;

    return Promise.resolve().then(() => {
      const preRenderPromises = [];

      for (let sectionsIndex = 0, sectionsLength = definition.sections.length; sectionsIndex < sectionsLength; sectionsIndex++) {
        const section = definition.sections[sectionsIndex];

        if (section['preRender'] != null) {
          if (typeof section['preRender'] === 'string') {
            if (section['preRender'].indexOf('function(') === 0) {
              section['preRender'] = Function(`return ${section['preRender']}`)();
            } else {
              section['preRender'] = window[section['preRender']];
            }
          }

          preRenderPromises.push(section['preRender'].call(this, { section, definition, cotForm: this }));
        }

        for (let rowsIndex = 0, rowsLength = section.rows.length; rowsIndex < rowsLength; rowsIndex++) {
          const row = section.rows[rowsIndex];

          if (row['preRender'] != null) {
            if (typeof row['preRender'] === 'string') {
              if (row['preRender'].indexOf('function(') === 0) {
                row['preRender'] = Function(`return ${row['preRender']}`)();
              } else {
                row['preRender'] = window[row['preRender']];
              }
            }

            preRenderPromises.push(row['preRender'].call(this, { row, section, definition, cotForm: this }));
          }

          for (let fieldsIndex = 0, fieldsLength = row.fields.length; fieldsIndex < fieldsLength; fieldsIndex++) {
            const field = row.fields[fieldsIndex];

            if (field['choices'] != null && (field['value'] != null || field['bindTo'] != null)) {
              const value = field['value'] || this._model.get(field.bindTo);
              if (value) {
                const choices = field['choices'].map((value) => value.value || value.text);
                if (choices.indexOf(value) === -1) {
                  field['choices'].unshift({ text: value });
                }
              }
            }

            if (field['preRender'] != null) {
              if (typeof field['preRender'] === 'string') {
                if (field['preRender'].indexOf('function(') === 0) {
                  field['preRender'] = Function(`return ${field['preRender']}`)();
                } else {
                  field['preRender'] = window[field['preRender']];
                }
              }

              preRenderPromises.push(field['preRender'].call(this, { field, row, section, definition, cotForm: this }));
            }
          }
        }
      }

      return Promise.all(preRenderPromises);
    }).then(() => {
      render.call(this, options);
    }).then(() => {
      const postRenderPromises = [];

      for (let sectionsIndex = 0, sectionsLength = definition.sections.length; sectionsIndex < sectionsLength; sectionsIndex++) {
        const section = definition.sections[sectionsIndex];

        if (section['postRender'] != null) {
          if (typeof section['postRender'] === 'string') {
            if (section['postRender'].indexOf('function(') === 0) {
              section['postRender'] = Function(`return ${section['postRender']}`)();
            } else {
              section['postRender'] = window[section['postRender']];
            }
          }

          postRenderPromises.push(section['postRender'].call(this, { section, definition, cotForm: this }));
        }

        for (let rowsIndex = 0, rowsLength = section.rows.length; rowsIndex < rowsLength; rowsIndex++) {
          const row = section.rows[rowsIndex];

          if (row['postRender'] != null) {
            if (typeof row['postRender'] === 'string') {
              if (row['postRender'].indexOf('function(') === 0) {
                row['postRender'] = Function(`return ${row['postRender']}`)();
              } else {
                row['postRender'] = window[row['postRender']];
              }
            }

            postRenderPromises.push(row['postRender'].call(this, { row, section, definition, cotForm: this }));
          }

          for (let fieldsIndex = 0, fieldsLength = row.fields.length; fieldsIndex < fieldsLength; fieldsIndex++) {
            const field = row.fields[fieldsIndex];

            if (field['postRender'] != null) {
              if (typeof field['postRender'] === 'string') {
                if (field['postRender'].indexOf('function(') === 0) {
                  field['postRender'] = Function(`return ${field['postRender']}`)();
                } else {
                  field['postRender'] = window[field['postRender']];
                }
              }

              postRenderPromises.push(field['postRender'].call(this, { field, row, section, definition, cotForm: this }));
            }
          }
        }
      }

      return Promise.all(postRenderPromises);
    });
  })(CotForm.prototype.render);

  CotForm.prototype.getModel = function () {
    return this._model;
  }

  CotForm.prototype.getView = function () {
    return this._view;
  }

  CotForm.prototype.setView = function (view) {
    this._view = view;
  }
})(window.CotForm);
