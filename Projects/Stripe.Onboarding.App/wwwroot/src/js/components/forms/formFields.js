import input from './fields/input.js'
import textarea from './fields/textarea.js'
import file from './fields/file.js'
import select from './fields/select.js'
import list from './fields/list.js'
import quotes from './fields/quotes.js'
import chips from './fields/chips.js'
import mxResponsive from '/src/js/mixins/mxResponsive.js';

export default function (data) {
    return {
    ...mxResponsive(data),
    // PROPERTIES
    loading: false,
    fields: [],
    label: 'Submit',
    // INIT
    init() {
      this.label = data.label;
      this.setHtml(data)
    },
    // METHODS
    renderField(field) {
      if(field.type == 'input') return input(field)
      if(field.type == 'textarea') return textarea(field)
      if(field.type == 'file') return file(field)
      if(field.type == 'select') return select(field)
      if(field.type == 'list') return list(field)
      if(field.type == 'chips') return chips(field)
      if(field.type == 'quotes') return quotes(field)
      return input(field)
    },
    setHtml(data) {
      // make ajax request
      const label = data.label || 'Submit'
      this.fields = data.fields || []
      this.$root.innerHTML = ` 
        <template x-for="(field, i) in fields" :key="field.name+i"> 
          <label x-html="renderField(field, i)" :for="field.name" x-show="!field.hidden"></label>
        </template> 
      `
    },
  }
}