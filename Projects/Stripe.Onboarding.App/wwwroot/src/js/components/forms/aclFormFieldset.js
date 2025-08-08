import { mxContent, mxForm } from '/src/js/mixins/index.js';
import { aclFieldInput } from '/src/js/components/fields/index.js'
import * as fields from '/src/js/components/fields/index.js'

export default function (params) {
    return {
        ...mxContent(params),
        ...mxForm(params),
        // PROPERTIES 
        rows: [],
        hiddenFieldCtr: 0,
        // INIT
        init() {
            this.setValues(params);
            this.render();
        },
        // GETTERS
        // METHODS
        allFieldsHidden() {
            if (this.mxForm_fields == null) return true;
            return this.hiddenFieldCtr < this.mxForm_fields.length;
        },
        setValues(params) {
            this.mxForm_fields = params.fields || [];
            // force update all fields that have no column value to have a value of 0

            for (var i = 0; i < this.mxForm_fields.length; i++) {
                // assign row value
                if (!this.mxForm_fields[i].row) {
                    this.mxForm_fields[i].row = i
                }
                // Set all hidden fields to be a single col
                if (this.mxForm_fields[i].hidden) {
                    this.mxForm_fields[i].row = -1
                    this.hiddenFieldCtr++;
                }
            }
            const rowValues = this.mxForm_fields.map(x => x.row)
            this.rows = [...new Set(rowValues)];
        },
        onFieldChange(field) {
            this.$dispatch('onfieldchange', field)
        },
        getFieldComponent(field) {
            const fieldType = field.component || field.type;
            const fieldComponent = fields[fieldType];
            return fieldComponent != null ? fieldComponent(field) : aclFieldInput(field)
        },
        getField(row) {
            if (this.rows.length == 0 || this.rows.length == 1) return this.mxForm_fields;
            const fields = this.mxForm_fields.filter(x => x.row == row && !x.hidden)
            return fields;
        },
        getFieldKey(field, i) {
            const key = field.id || field.name;
            return `${key}:${i}${field.updated}`;
        },
        getGridClass(row) {
            const length = this.getField(row).length;
            const col = length <= 1 ? 1 : 2;
            return `grid-cols-${col} gap-2`;
        },
        render() {
            const html = `
                <div x-show="allFieldsHidden">
                    <template x-for="row in rows">
                        <div class="grid mt-1" :class="getGridClass(row)">
                            <template x-for="(field, i) in getField(row)" :key="getFieldKey(field, i)">
                                <div :class="!field.hidden ? 'mt-2' : '' ">
                                    <label x-cloak :for="field.id || field.name" class="relative" x-show="!field.hidden">
                                        <span x-show="field.label && field.component != 'aclFieldSwitch'" class="font-medium text-gray-900" x-text="field.label"></span>
                                        <div x-data="getFieldComponent(field)" @oninputchange="(ev) => { onFieldChange(ev.detail) }"></div>
                                        <div x-show="field.helperText != null && field.helperText.length > 0">
                                            <small x-text="field.helperText"></small>
                                        </div>
                                    </label>
                                </div>
                            <template>
                        </div>
                    </template>
                </div>
                
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        },
    }
}