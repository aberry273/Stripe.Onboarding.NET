import { mxField } from '/src/js/mixins/index.js';

const renderers = {
    code: ({ children }) => `<code class="bg-gray-100 dark:bg-gray-800 rounded-md p-2 text-sm ${sharedClasses}">${children}</code>`,
    code_block: ({ children }) => `<pre class="bg-gray-100 dark:bg-gray-800 overflow-y-scroll rounded-md p-2 text-sm ${sharedClasses}">${children}</pre>`,
}
export default function (params) {
    return {
        ...mxField(params),
        // PROPERTIES
        editor: null,
        text: null,
        defaultId: 'content-editor',
        invalidJson: false,
        // INIT
        init() {
            // If no ID is set, use a default ID
            if (!params.id) params.id = this.defaultId;
            this._mxField_setValues(params);
            this.setValues(params);
            this.render();
        },
        // GETTERS
        get getEditorElement() {
            return document.getElementById(this.mxField_id)
        },
        // METHODS
        setValues(params) {
            this.text = this.mxField_value;
            this.onChange();
        },
        onChange($ev) {
            try {
                const text = $ev.target.innerText;
                const obj = JSON.parse(text);
                const isObject = typeof obj === "object";
                if (!isObject) {
                    this.invalidJson = true;
                    return
                }
                this.mxField_value = text;
                this._mxField_onChange(text);
            }
            catch (ex) {
                this.invalidJson = true;
            }
            return;
        },
        onPaste(ev) {
            ev.preventDefault();
            // Strip HTML
            const text = (ev.originalEvent || ev).clipboardData.getData('text/plain');
            window.document.execCommand('insertText', false, text);
        },
        render() {
            const html = `
                <div class="json-editor w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <input   
                        class="peer"  
                        :id="mxField_id"
                        :name="mxField_name"
                        :disabled="false"
                        :hidden="true"
                        :pattern="mxField_inputJsonRegex"
                        :value="mxField_value"
                        x-model="mxField_value"  
                        :required="mxField_required" 
                        :aria-invalid="mxField_ariaInvalid"
                        :class="mxField_class" 
                        :aria-describedBy="mxField_areaDescribedBy || mxField_id" 
                    />

                    <pre 
                        :id="mxField_id"
                        :name="mxField_name"
                        :disabled="mxField_disabled"
                        contenteditable="true"
                        x-text="text"
                        :class="mxField_class" 
                        class="peer block w-full bg-gray-50  p-4 ml-0 text-lg placeholder-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                        :placeholder="mxField_placeholder"
                        @change="onChange"
                        @paste="onPaste"
                        @keyup="($event) => onChange($event)"
                    </pre> 
                </div>
                <span x-text="mxField_invalidText || 'Invalid JSON'" class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                </span>

                <style>
                    .json-editor pre {
                    }
                </style>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        },
    }
}