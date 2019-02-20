/* global CotForm Backbone */

/* exported cotFormComponent */
const cotFormComponent = {
  template: /* html */ `
    <div></div>
  `,

  props: {
    config: {
      type: Object,
      default: {}
    },
    value: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      formValue: this.value
    };
  },

  mounted() {
    const config = Object.assign({}, this.config);

    config.success = ((success) => ((event) => {
      if (success != null) {
        return success.call(this, event);
      }

      event.preventDefault();
      return false;
    }))(this.config.success);

    const choicesPromises = [];
    for (let sectionsIndex = 0, sectionsLength = config.sections.length; sectionsIndex < sectionsLength; sectionsIndex++) {
      const section = config.sections[sectionsIndex];

      for (let rowsIndex = 0, rowsLength = section.rows.length; rowsIndex < rowsLength; rowsIndex++) {
        const row = section.rows[rowsIndex];

        for (let fieldsIndex = 0, fieldsLength = row.fields.length; fieldsIndex < fieldsLength; fieldsIndex++) {
          const field = row.fields[fieldsIndex];

          if (field.choices && typeof field.choices === 'string') {
            choicesPromises.push(new Promise((resolve) => {
              const url = field.choices;
              field.choices = [];
              $.getJSON(url).then((data, textStatus, jqXHR) => {
                if (Array.isArray(data)) {
                  field.choices = data;
                }
                resolve();
              }, () => {
                resolve();
              });
            }));
          }
        }
      }
    }

    Promise.all(choicesPromises).then(() => {
      const cotForm = new CotForm(config);
      cotForm.render({ target: this.$el });
      cotForm.setView(this);

      if (this.value != null) {
        const model = window.model = new Backbone.Model(this.value);
        model.on('change', () => {
          this.formValue = model.toJSON();
          this.$emit('input', this.formValue);
        });
        cotForm.setModel(model);
      }
    });
  }
}
