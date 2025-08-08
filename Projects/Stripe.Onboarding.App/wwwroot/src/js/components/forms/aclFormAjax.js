import { mxContent, mxForm, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxContent(params),
        ...mxForm(params),
        ...mxEvent(params),
        // PROPERTIES
        header: '',

        // INIT
        init() {
            this._mxForm_SetValues(params);
            this._mxContent_setValues(params);
            this.render();
        },
        // GETTERS
        // METHODS
        updateField(ev) {
            const field = ev.detail;
            this._mxForm_SetFieldValue(this.mxForm_fields, field);
            this.$dispatch(this.mxForm_fieldChangeEvent, field);
        },
        getPayload() {
            return !this.mxForm_isFile
                ? this._mxForm_GetFormData({ fields: this.mxForm_fields })
                : this._mxForm_GetFileFormData({ fields: this.mxForm_fields });
        },
        async submit() {
            // else
            try {
                const payload = this.getPayload();
                // if overwriting the submit function
                if (this.mxForm_submit) {
                    this.mxForm_submit(payload);
                    return;
                }
                this.mxForm_loading = true;
                const result =
                    !this.mxForm_isFile
                        ? await this._mxForm_SubmitAjaxRequest(this.mxForm_method, this.mxForm_action, payload)
                        : await this._mxForm_SubmitAjaxRequest(this.mxForm_method, this.mxForm_action, payload, this.mxForm_FileFormHeaders, false)

                if (result.status == 200) {
                    this.mxForm_responseClass = this.mxForm_successResponseClass;
                    this.mxForm_response = result.message || 'Update successful';
                }
                else {
                    let message = result.message;
                    if (result.errors) {
                        let joinedMessage = "";
                        var keys = Object.keys(result.errors);
                        for (let i = 0; i < keys.length; i++) {
                            joinedMessage += `${result.errors[keys[i]].propertyMessage}\n`;
                        }
                        this.mxForm_response = joinedMessage;
                    }
                    else {
                        this.mxForm_response = result.message || 'Update failed';
                    }
                }

                if (this.mxForm_event) {
                    this.$dispatch(this.mxForm_event, result)
                }
                this.$dispatch(this.localEvent, result)

            } catch (e) {
                console.log(e);
            }
            this.mxForm_loading = false;
        },
        overrideSubmit(e) {
            e.preventDefault();
            return;
        },
        render() {
            const html = `
                <div x-show="mxForm_loading" x-data="aclCommonProgress({})"></div>

                <div :class="mxForm_class">
                    <template x-if="mxContent_title">
                        <h3 :class="mxForm_titleClass" x-text="mxContent_title"></h3>
                    </template>
                    <template x-if="mxContent_text">
                        <p :class="mxForm_textClass" x-text="mxContent_text"></p>
                    </template>
                    <form novalidate class="group relative w-full space-y-8" x-on:submit.prevent x-on:submit="overrideSubmit">
                        <!--Fields-->
                        <div x-data="aclFormFieldset({ fields: mxForm_fields })" @onfieldchange="updateField"></div>
                        <!--Response message-->
                        <template x-if="mxForm_response">
                            <p :class="mxForm_responseClass" x-html="mxForm_response"></p>
                        </template>
                        <!--Submit-->
                        <div class="relative">
                            <button
                                type="link"
                                @click="await submit()"
                                x-text="mxForm_label" 
                                :class="mxForm_submitClass"
                                class="group-invalid:pointer-events-none group-invalid:opacity-30"
                            />
                        </div>
                    </form>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        },
    }
}