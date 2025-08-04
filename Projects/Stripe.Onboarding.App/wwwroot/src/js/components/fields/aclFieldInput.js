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
        onChange(ev) {
            this._mxField_onChange(this.mxField_value)
        },
        inputClass() {
            let cssClass = this.mxField_class || this.mxField_inputClass;
            if (!!this.mxField_icon) return `${cssClass} ps-10 p-2.5`;
            return cssClass;
        },
        render() {
            const html =  `
                <div class="relative">
                    <div x-show="mxField_icon" class="absolute ml-2 pl-1 inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" x-data="aclIconsSvg({icon: mxField_icon })"></svg>
                    </div>
                    <input 
                        :type="mxField_type"
                        :placeholder="mxField_placeholder"
                        class="peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                        :class="inputClass"
                        :id="mxField_id"
                        :name="mxField_name"
                        :min="mxField_min"
                        :required="mxField_required"
                        :max="mxField_max"
                        :step=".000001"
                        :disabled="mxField_disabled"
                        :value="mxField_value"
                        x-model="mxField_value"
                        :read-only="mxField_readOnly"
                        :checked="mxField_value"
                        :autocomplete="mxField_autocomplete"
                        :aria-invalid="mxField_ariaInvalid"
                        :pattern="mxField_pattern ? mxField_pattern : null"
                        :aria-describedBy="mxField_areaDescribedBy || mxField_id"
                        data-primary="blue-600"
                        data-rounded="rounded-lg"
                        @change="onChange"
                    />
                    <span x-text="mxField_invalidText || 'Invalid field'" class="absolute -my-1 right-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    </span>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}