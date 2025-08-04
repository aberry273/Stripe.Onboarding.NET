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
        // INIT
        init() {
            this.setValues(params);
            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxContent_title = params.title;
            this.actions = params.actions;
            this.form = params.form;
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
        getField(fieldName) {
            const index = this.indexOf(fieldName); 
            this.form.fields[index];
        },
        render() {
            const html = `
                <div>
                    <div x-data="aclFormAjax(form)"></div>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}