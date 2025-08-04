export default function (data) {
    return {
        // PROPERTIES
        mxForm_data: {},
        mxForm_fields: [],
        mxForm_postbackUrl: '/api',
        mxForm_label: 'Submit',
        mxForm_class: '',
        mxForm_event: '',
        mxForm_action: '',
        mxForm_method: '',
        mxForm_fieldChangeEvent: 'onFormFieldChange',
        mxForm_loading: false,
        mxForm_response: null,
        mxForm_responseClass: '',
        mxForm_isFile: false,
        mxForm_submit: null,
        init() {
        },
        // GETTERS
        get mxForm_titleClass() { return 'mb-3 text-xl font-medium text-gray-900 dark:text-white' },
        get mxForm_textClass() { return 'mb-5 text-sm font-medium text-gray-500 dark:text-gray-300' },
        get mxForm_submitClass() { return 'inline-block w-full px-5 py-4 text-lg font-medium text-center bg-primary-600 text-white dark:text-white transition duration-200  rounded-lg hover:bg-blue-700 ease' },
        get mxForm_submitInvalidClass() { return 'group-invalid:pointer-events-none group-invalid:opacity-30' },
        get mxForm_formClass() { return 'flex flex-col items-start justify-start w-full h-full max-w-md mx-auto  p-10 lg:p-16 xl:p-24' },
        get mxForm_formPadlessClass() { return 'flex flex-col items-start justify-start w-full h-full max-w-md mx-auto  p-4' },
        get mxForm_errorResponseClass() { return 'text-red-500' },
        get mxForm_successResponseClass() { return 'text-lg font-bold text-green-500' },
        get mxForm_FileFormHeaders() {
            return {
                'Accept': '*/*',
            }
        },
        // METHODS
        _mxForm_SetValues(params) {
            this.mxContent_title = params.title;
            this.mxContent_subtitle = params.subtitle;
            this.mxContent_text = params.text;
            this.mxContent_textClass = params.textClass;
            this.mxContent_subtitleClass = params.subtitleClass;
            this.mxContent_titleClass = params.titleClass;
            this.mxForm_class = params.class || this.mxForm_formPadlessClass;
            this.mxForm_response = params.response;
            this.mxForm_responseClass = params.responseClass || this.mxForm_errorResponseClass;
            this.mxForm_fields = params.fields;
            this.mxForm_method = params.method;
            this.mxForm_loading = params.loading || false;
            this.mxForm_action = params.action;
            this.mxForm_isFile = params.isFile;
            this.mxForm_event = params.event;
            this.mxForm_submit = params.submit;
            this.mxForm_label = params.label || this.mxForm_label;
        },
        _mxForm_SetFieldValue(fields, field) {
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].name == field.name) {
                    fields[i].value = field.value;
                }
            }
        },
        async _mxForm_SubmitAjaxRequest(action, postbackUrl, payload, config, isJson) {
            switch (action) {
                case 'POST':
                    return await this.$fetch.POST(postbackUrl, payload, config, isJson);
                    break;
                case 'PUT':
                    return await this.$fetch.PUT(postbackUrl, payload, config, isJson);
                    break;
                case 'GET':
                    return await this.$fetch.GET(postbackUrl, payload, config, isJson);
                    break;
                case 'DELETE':
                    return await this.$fetch.DELETE(postbackUrl);
                    break;
                default:
                    throw new Error(`_mxForm_SubmitAjaxRequest expected {action} with type: POST, PUT, GET, DELETE`);
            }
        },
        toCamelCase(str) {
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
        },
        _mxForm_GetFormData(form, ignoreNull = true, flattenPayload = false) {
            if (!form) return {};
            const self = this;
            const payload = {};
            form.fields.map((x) => {
                const name = this.toCamelCase(x.name);
                if (ignoreNull && !x.value) return;
                payload[name] = x.value;
            });
            if (!form.sections) {
                return payload;
            }
            // form section fields
            // If flattenPayload is set, then set all data to the root object
            // Else created objects per section within the payload
            if (flattenPayload) {
                form.sections.map((x) => {
                    x.fields.map((y) => {
                        const fieldName = y.name.replace(/\s/g, '');
                        if (ignoreNull && !y.value) return;
                        payload[fieldName] = y.value;
                    });
                });
            } else {
                form.sections.map((x) => {
                    const sectionName = x.title.replace(/\s/g, '');
                    payload[sectionName] = {};
  
                    x.fields.map((y) => {
                        const fieldName = y.name.replace(/\s/g, '');
                        if (ignoreNull && !y.value) return;
                        payload[sectionName][fieldName] = y.value;
                    });
                });
            }
            return payload;
        },
        // Does not allow for sectioned formData
        _mxForm_GetFileFormData(form) {
            if (!form) return new FormData();
            const self = this;
            const formData = new FormData();
            if (form.fields) {
                for (var i = 0; i < form.fields.length; i++) {
                    var x = form.fields[i];
                    if (x.value == null) continue;
                    const name = x.name.replace(/\s/g, '');
                    if (x.multiple) {
                        for (var j = 0; j < x.value.length; j++) {
                            const value = x.value[j];
                            if (this._mxForm_isFieldValueObject(value)) {
                                //Serialize object if JSON
                                formData.append(name, JSON.stringify(value));
                            }
                            else {
                                formData.append(name, value);
                            }
                        }
                        continue;
                    }
                    else {
                        const value = x.value;
                        if (this._mxForm_isFieldValueObject(value)) {
                            //Serialize object if JSON
                            formData.append(name, JSON.stringify(value));
                        }
                        else {
                            formData.append(name, value);
                        }
                    }
                }
            } 
            return formData;
        },
        _mxForm_isFieldValueObject(value) {
            const type = this._mxForm_CheckDataType(value);
            return (type == 'object');
        },
        _mxForm_CheckDataType(data) {
            var objectConstructor = ({}).constructor;
            if (data.constructor === objectConstructor) {
                return "object";
            }
            return "string";
        },
    }
  }