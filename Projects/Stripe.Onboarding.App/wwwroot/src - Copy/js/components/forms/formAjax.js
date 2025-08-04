import input from './fields/input.js'
import textarea from './fields/textarea.js'
import select from './fields/select.js'

export default function (data) {
	return {
    // PROPERTIES
    loading: false,
    fields: [],
    label: 'Submit',
    event: null,
    postbackType: 'POST',
    localEvent: '__formAjax:completed',
    // INIT
    init() {
      this.label = data.label;
      this.event = data.event;
      this.loading = false;
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
    // METHODS
    renderField(field) {
      if(field.type == 'textarea') return textarea(field)
      
      return input(field)
    },
    async submit(fields) {
      this.loading = true;
      try {
        const payload = {}
        fields.map(x => {
          payload[x.name] = x.value
          return payload
        })
        let response = null;
        switch (this.postbackType) {
          case 'POST':
            response = await this.$fetch.POST(data.postbackUrl, payload);
            break;
          case 'PUT':
            response = await this.$fetch.PUT(data.postbackUrl, payload);
            break;
          case 'GET':
            response = await this.$fetch.GET(data.postbackUrl, payload);
            break;
          case 'DELETE':
            response = await this.$fetch.DELETE(data.postbackUrl);
            break;
          default:
            response = null;
        }

        if(this.event) {
          this.$dispatch(this.event, response)
        }
        this.$dispatch(this.localEvent, response)
        
      } catch(e) {

      }
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
        <div>
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