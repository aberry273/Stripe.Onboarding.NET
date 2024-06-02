import input from './fields/input.js'
import textarea from './fields/textarea.js'
import select from './fields/select.js'

export default function (data) {
	return {
    // PROPERTIES
    loading: false,
    fields: [],
    label: 'Submit',
    loading: false,
    event: null,
    file: null,
    postbackType: 'POST',
    localEvent: '__formAjax:completed',
    // INIT
    init() {
      this.label = data.label;
      this.event = data.event;
      this.postbackType = data.postbackType
      this.setHtml(data)
      this.localEvent += new Date().toISOString()
      // Response
      this.$events.on(this.localEvent, (data) => {
        if (data.status == 200) {
            // Okay, do nothing from FE
        }
        if (data.status >= 400 && data.status <= 500) {
            this.$events.emit('snackbar-information', { code: data.status, text: "Not found" });
        }
        if (data.status >= 500 && data.status <= 600) {
            this.$events.emit('snackbar-error', { code: data.status, text: "Error processing request" });
        }
        this.resetValues(this.fields);
    })
    },
    onFieldChange(field, value) {
      field.value = value;
    },
    getFilePreview(file) {
      return typeof file == 'string' ? file : URL.createObjectURL(file)
    },
    // METHODS
    renderField(field) {
      if(field.type == 'textarea') return textarea(field)
      if(field.type == 'select') return select(field)
      
      return input(field)
    },
    async submit(fields) {
      const payload = this._mxForm_GetFileFormData( { fields: fields }  ) 
     
      this.loading = true;
      const config = this.mxForm_HeadersMultiPart; 
      const isJson = false
      let response = await this._mxForm_SubmitAjaxRequest(data.postbackUrl, payload, config, isJson);

      if(this.event) {
        this.$dispatch(this.event, response)
      }
      this.$dispatch(this.localEvent, response)

      this.loading = false;
    },
    resetValues(fields) {
        for (var i = 0; i < fields.length; i++) {
        if (fields[i].clearOnSubmit === true){
          fields[i].value = null;
          fields[i].values = null;
          fields[i].items = null;
        }
      }
    },
    setHtml(data) {
      // make ajax request
      const label = data.label || 'Submit'
      this.fields = data.fields || []
      const html =  `
        <div x-data="mxForm">
          <progress x-show="loading"></progress>
          <fieldset x-data="formFields({fields})"></fieldset>
          <footer align="right">
            <button class="small" @click="await submit(fields)" :disabled="loading">${label}</button>
          </footer>
        </div>
      `
      this.$nextTick(() => {
          this.$root.innerHTML = html;
      })
    },
  }
}