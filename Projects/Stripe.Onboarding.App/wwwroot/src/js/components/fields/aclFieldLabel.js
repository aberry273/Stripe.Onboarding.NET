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
            this._mxField_onChange(null)
        },
        inputClass() {
            let cssClass = this.mxField_class || this.mxField_inputClass;

            if (!!this.mxField_icon) return `${cssClass} ps-10 p-2.5`;
            return cssClass;
        },
        render() {
            const html = `
                <div class="relative">
                    <div x-show="mxField_icon" class="absolute ml-2 pl-1 inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg class="absolute w-5 h-5 text-gray-500 dark:text-gray-400" x-data="aclIconsSvg({icon: mxField_icon })"></svg>
                    </div>
                   
                    <span x-text="mxField_invalidText || 'Invalid field'" class="absolute -my-1 right-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    </span>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        },
    }
}