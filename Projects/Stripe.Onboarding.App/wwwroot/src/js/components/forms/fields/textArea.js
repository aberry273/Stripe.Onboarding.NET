export default  function (data) {
    return ` 
            <span x-text="field.label"></span>
            <textarea
                :type="field.type"
                :name="field.name"
                :disabled="field.disabled == true"
                :aria-label="field.ariaLabel || field.label"
                :value="field.value"
                x-model="field.value"
                :read-only="field.readonly"
                :role="field.role"
                :checked="field.checked"
                :placeholder="field.placeholder"
                :autocomplete="field.autocomplete"
                :aria-invalid="field.ariaInvalid == true"
                :aria-describedby="field.id || field.name+i"
                ></textarea>
            <small
                x-show="field.helper != null && field.helper.length > 0"
                :id="field.id || field.name+i"  x-text="field.helper"></small>
      
    `
}