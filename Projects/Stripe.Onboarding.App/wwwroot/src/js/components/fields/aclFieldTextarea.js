import { mxField } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxField(params),
        // PROPERTIES
        type: '',
        value: null,
        placeholder: '',
        cssClass: '',
        // INIT
        init() {
            this._mxField_setValues(params);
            this.render(); 
        },
        // GETTERS
        // METHODS
        setValues(params) {

        },
        render() {
            const html =  `
                <textarea
                    :type="mxField_type"
                    :placeholder="mxField_placeholder"
                    class="peer" 
                    :class="mxField_cssClass || mxField_inputClass"
                    :id="mxField_id"
                    :name="mxField_name"
                    :min="mxField_min"
                    :max="mxField_max"
                    :required="mxField_required"
                    :rows="mxField_rows || 1"
                    :disabled="mxField_disabled"
                    :value="mxField_value"
                    x-model="mxField_value"
                    :read-only="mxField_readOnly"
                    :checked="mxField_value"
                    :required="mxField_required"
                    :autocomplete="mxField_autocomplete"
                    :aria-invalid="mxField_ariaInvalid"
                    :class="mxField_class"
                    :pattern="mxField_pattern"
                    :aria-describedBy="mxField_areaDescribedBy || mxField_id"
                    data-primary="blue-600"
                    data-rounded="rounded-lg"
                    @change="_mxField_onChange"
                />
                <span x-text="mxField_invalidText || 'Invalid input'" class="absolute -my-1 right-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                </span>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}