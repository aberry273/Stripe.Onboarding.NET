import input from './fields/input.js'

export default function (data) {
	return {
    // PROPERTIES
    loading: false,
    fields: [],
    method: data.method || 'POST',
    // INIT
    init() {
      this.setHtml(data)
    },
    // METHODS
    renderField(field) {
      if(field.type == 'textarea') return textarea(field)
      
      return input(field)
    },
    setHtml(data) {
      // make ajax request
      this.fields = data.fields || []
      this.$root.innerHTML = `
      <form method="${this.method}">
        <fieldset x-data="formFields({fields})"></fieldset>
        <footer align="center">
          <input type="submit" value="Submit"/>
        </footer>
      </form>
      `
    },
  }
}