export default function (data) {
	return {
		init() {
			this.$watch('open', () => { })
		},
		// PROPERTIES
		mxForm_Open: false,
		// GETTERS
		get mxForm_HeadersEmpty() { return {} },
		get mxForm_HeadersMultiPart() {
			return {
				'Accept': '*/*',
			}
		},

		_mxForm_SetFormDataField(formData, field) {
			const name = field.name.replace(/\s/g, '');
			if (field.multiple) {
				for (var j = 0; j < x.value.length; j++) {
					formData.append(name, x.value[j]);
				}
			}
			else {
				formData.append(name, x.value);
			}
		},
		_mxForm_CheckDataType(data) {
			var objectConstructor = ({}).constructor;
			if (data.constructor === objectConstructor) {
				return "object";
			}
			return "string";
		},
		// METHODS
		/// form = json object representing a form
		/// flattenPayload whether form sections and condensed into a single property or to keep their structure
		_mxForm_GetFileFormData(form, flattenPayload = false) {
			if (!form) return new FormData();
			const formData = new FormData();
			if (form.fields) { 
				for (var i = 0; i < form.fields.length; i++) {
					var x = form.fields[i]
					if (x.value == null) continue;
					const name = x.name.replace(/\s/g, '');
					if (x.multiple) {
						for (var j = 0; j < x.value.length; j++) {
							const value = x.value[j];
							const type = this._mxForm_CheckDataType(value);
							if (type == 'object') {
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
						const type = this._mxForm_CheckDataType(value);
						if (type == 'object') {
							//Serialize object if JSON
							formData.append(name, JSON.stringify(value));
						}
						else {
							formData.append(name, value);
						}
					}
					
				}
			}
			if (!form.sections) {
				return formData;
			}
			// form section fields
			// If flattenPayload is set, then set all data to the root object
			// Else created objects per section within the payload
			if (flattenPayload) {
				form.sections.map((x) => {
					x.fields.map((y) => {
						const fieldName = y.name.replace(/\s/g, '');
						formData.append(fieldName, y.value);
					});
				});
			} else {
				form.sections.map((x) => {
					const sectionName = x.title.replace(/\s/g, '');
					formData[sectionName] = {};

					x.fields.map((y) => {
						const fieldName = y.name.replace(/\s/g, '');
						formData.append(`${sectionName}.${fieldName}`, y.value);
					});
				});
			}

			return formData;
		},
		_mxForm_OnFieldChange(field, value) {
			field.value = value;
		},

		_mxForm_IsImage(file) {
			if (file == null || file.type == null) return false;
			return file.type.startsWith('image/');
		},
		_mxForm_IsVideo(file) {
			if (file == null || file.type == null) return false;
			return file.type.startsWith('video/');
		},
		_mxForm_GetFileType(file) {
			return file.type
			return (typeof file == 'string') ? file : URL.createObjectURL(file)
		},
		_mxForm_GetFilePreview(file) {
			return (typeof file == 'string') ? file : URL.createObjectURL(file)
		},
		_mxForm_GetFormData(form, flattenPayload = false) {

			if (!form) return {};
			const payload = {};
			form.fields.map((x) => {
				const name = x.name.replace(/\s/g, '');
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
						payload[fieldName] = y.value;
					});
				});
			} else {
				form.sections.map((x) => {
					const sectionName = x.title.replace(/\s/g, '');
					payload[sectionName] = {};

					x.fields.map((y) => {
						const fieldName = y.name.replace(/\s/g, '');
						payload[sectionName][fieldName] = y.value;
					});
				});
			}
			return payload;
		},

		async _mxForm_SubmitAjaxRequest(url, payload, config, isJson) {
			switch (this.postbackType) {
				case 'POST':
					return await this.$fetch.POST(url, payload, config, isJson);
				case 'PUT':
					return await this.$fetch.PUT(url, payload, config, isJson);
				case 'GET':
					return await this.$fetch.GET(url, payload, config);
				case 'DELETE':
					return await this.$fetch.DELETE(url);
				default:
					return null;
			}
		},

		_mxForm_SetField(fields, updatedField) {
			for (var i = 0; i < fields.length; i++) {
				const field = fields[i];
				if (field.name == updatedField.name) {
					fields[i] = updatedField;
				}
			}
		},
		_mxForm_GetField(fields, fieldName) {
			for (var i = 0; i < fields.length; i++) {
				const field = fields[i];
				if (field.name == fieldName) {
					return field;
				}
			}
		},
		_mxForm_SetFieldVisibility(fields, fieldName, val) {
			for (var i = 0; i < fields.length; i++) {
				const field = fields[i];
				if (field.name == fieldName) {
					field.hidden = val;
				}
			}
		},
		_mxForm_GetFieldValue(fields, fieldName) {
			for (var i = 0; i < fields.length; i++) {
				const field = fields[i];
				if (field.name == fieldName) {
					return field.value;
				}
			}
		},
		_mxForm_SetFieldValue(fields, fieldName, val) {
			for (var i = 0; i < fields.length; i++) {
				const field = fields[i];
				if (field.name == fieldName) {
					field.value = val;
				}
			}
		},
		_mxForm_SetFieldItems(fields, fieldName, items) {
			for (var i = 0; i < fields.length; i++) {
				const field = fields[i];
				if (field.name == fieldName) {
					if (field.items == null) field.items = [];
					field.items = items;
				}
			}
		}

	}
}