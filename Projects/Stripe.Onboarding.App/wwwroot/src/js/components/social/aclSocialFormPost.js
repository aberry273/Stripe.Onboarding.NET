import { mxContent, mxForm, mxEvent, } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxEvent(params),
        ...mxForm(params),
        // PROPERTIES
        open: false,
        header: '', 
        actions: [],
        form: {},
        formatActions: [],
        settingFields: [
            'Tags',
            'Category',
            'Tags2',
            'Category2',
            'Visibility',
        ],
        modalFields: [],
        // INIT
        init() {
            this.setValues(params);
            this.render();
        },
        // GETTERS
        get settingsForm() {
            return {
                class: this.mxForm_formPadlessClass,
                title: 'Manage replies',
                label: 'Save',
                fields: this.modalFields,
                submit: (data) => { this.submitSettings(data) }
            }
        },
        // METHODS
        submitSettings(data) {
            // 
        },
        updateFormFields(form) {
            // Update any formfields to be ready for the API
            for (var i = 0; i < form.fields.length; i++) {
                // Serialize Format
                if (form.fields[i].name == 'Formats') form.fields[i].value = JSON.stringify(form.fields[i].value)
            }
            return form;
        },
        setValues(params) {
            this.mxContent_title = params.title;
            this.actions = params.actions;
            this.form = params.form;
            this.modalFields = this.filterFields(this.settingFields);
        },
        clearFields() {
            for(var i = 0; i < this.form.fields.length; i++) {
                if (this.form.fields[i].clearOnSubmit) {
                    this.form.fields[i].value = null;
                    this.form.fields[i].updated = new Date().toISOString();
                }
            } 
        },
        async submit() {
            this.mxForm_loading = true;
            try {
                this.updateFormFields(this.form);
                const formData = this._mxForm_GetFileFormData(this.form);
                const response = await this.$fetch.POST(this.form.action, formData, this.mxForm_FileFormHeaders, false);
           
                if (response.status == 200) {
                    this.clearFields();
                } else {
                    console.log('error creating post');
                }
                this.$dispatch('submit', formData)
            } catch (e) {
                //console.log(e);
            }
            this.mxForm_loading = false;
        },
        indexOf(fieldName) {
            if (!this.form.fields) return -1;
            return this.form.fields
                .map(x => x.name)
                .indexOf(fieldName);;
        },
        updateFieldValue(field) {
            const index = this.indexOf(field.name);
            if (index == -1) return;
            this.form.fields[index].value = field.value;
        },
        toggleFieldVisibility(fieldName) {
            const index = this.indexOf(fieldName); 
            if (index == -1) return;
            this.form.fields[index].hidden = !this.form.fields[index].hidden;
        },
        toggleFieldModal(fieldName) {
            this._mxEvent_Emit(this.getFieldEvent(fieldName), quoteFormData);
            //this.form.fields[index].hidden = !this.form.fields[index].hidden;
        },
        getFieldEvent(fieldName) {
            return `on:modal:${fieldName}`;
        },
        getField(fieldName) {
            const index = this.indexOf(fieldName); 
            this.form.fields[index];
        },
        switchTextField() {
            /*
            const textField = this.getField('Text');
            console.log(this.form.fields)
            const formatField = this.getField('Formats');
            console.log(textField)
            const block = {
                data: {
                    text: textField.value
                },
                type: 'paragraph'
            };
            formatField.value = [block];
            */
            this.toggleFieldVisibility('Text')
            this.toggleFieldVisibility('Formats')
        },
        filterFields(fieldNames) {
            const fields = this.form.fields
                .filter(x => fieldNames.indexOf(x.name) > -1)
                .map(x => { return { ...x } });

            const updatedFields = fields.map(x => {
                x.hidden = false;
                return x;
            })
            return updatedFields;
        },
        render() {
            const html = `
                <div>
                    <!--Fields-->
                    <div x-show="mxForm_loading" x-data="aclCommonProgress({})"></div>
                    <div 
                        x-data="aclFormFieldset(form)" 
                        @onfieldchange.window="(ev) => { updateFieldValue(ev.detail) }">
                    </div>
                    
                    <div class="w-full">
                        <div class="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                            <div class="flex flex-wrap items-center">
                                 
                                <div @click="toggleFieldVisibility('Images')" x-data="aclButton({ icon: 'image' })"></div>
                                <div @click="toggleFieldVisibility('Videos')" x-data="aclButton({ icon: 'video' })"></div>
                                <div @click="toggleFieldVisibility('Mentions')" x-data="aclButton({ icon: 'userPlus' })"></div>
                                <!--
                                <div @click="switchTextField" x-data="aclButton({ icon: 'documentText' })"></div>
                                <div @click="toggleFieldVisibility('Top')" x-data="aclButton({ icon: 'presentationChart' })"></div>
                                -->
                                <div @click="toggleFieldModal('Settings')" x-data="aclButton({ icon: 'cog' })"></div>
                                
                                <button type="button" data-tooltip-target="tooltip-fullscreen" class="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"/>
                                    </svg>
                                    <span class="sr-only">Full screen</span>
                                </button>
                            </div>
                            
                            <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600"> 
                                <button
                                    :disabled="mxForm_loading"
                                    @click="await submit()"
                                    class="end-0 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg class="w-5 h-5" x-data="aclIconsSvg({ mxIcon_name: 'send' })"></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div x-data="aclModalFormAjax({ 
                    event: getFieldEvent('Settings'), 
                    form: settingsForm })">
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}