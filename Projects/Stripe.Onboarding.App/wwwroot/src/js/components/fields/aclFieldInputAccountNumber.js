import { mxField } from '/src/js/mixins/index.js';
const cleaveZen = window.cleaveZen
const {
    formatCreditCard,
    getCreditCardType,
    registerCursorTracker,
    DefaultCreditCardDelimiter,
    unformatCreditCard,
} = cleaveZen
// Obsolete, move card/DD logic into payment provider form itself
export default function (params) {
    return {
        ...mxField(params),
        // PROPERTIES
        type: '',
        value: null,
        formattedNumber: null,
        cardType: null,
        placeholder: '',
        cssClass: '',
        microformNumberField: null,
        // INIT
        init() {
            this._mxField_setValues(params);
            this.render();

            /*
            this.microformNumberField.on('load', function () {
                console.log('Num Field is ready for user input');
            });
            */
        },
        // GETTERS
        // METHODS
        // Obsolete as this field is now in paymeny provider form
        loadField() {
            //this.microformNumberField = this.$store.svcCybersource.createAccountNumberField();
            console.log(this.mxField_id);
            console.log('dwq;')
            this.$store.svcCybersource.loadAccountNumberField(this.mxField_id); 
        },
        onChange(ev) {
            const typeValue = getCreditCardType(this.mxField_value)

            if (typeValue == 'general' || typeValue == 'uatp') {
                var field = document.querySelector(`#${this.fieldId()}`);
                field.setCustomValidity("Invalid field.");
                return;
            }

            this._mxField_onChange(this.mxField_value) 
        },
        format() {
            this.formattedNumber = formatCreditCard(this.mxField_value);
            this.cardType = getCreditCardType(this.mxField_value);
        },
        inputClass() {
            let cssClass = this.mxField_class || this.mxField_inputClass;
            if (!!this.mxField_icon) return `${cssClass} ps-10 p-2.5`;
            return cssClass;
        },
        fieldId() {
            return this.mxField_id || 'creditCardNumberId'
        },
        render() {
            const html = `
                <div class="relative" >
                    <div x-show="mxField_icon" class="absolute ml-2 pl-1 inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg class="absolute w-5 h-5 text-gray-500 dark:text-gray-400" x-data="aclIconsSvg({icon: mxField_icon })"></svg>
                    </div>
                     
                    <div
                        :id="mxField_id"
                         class="text-xl peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                        :class="inputClass"
                        style="height:60px">
                     </div>
                       <!--
                    <input 
                        type="tel"
                        :placeholder="mxField_placeholder"
                        class="peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                        :class="inputClass"
                        :id="fieldId"
                        :name="mxField_name"
                        :min="mxField_min"
                        :required="mxField_required"
                        :max="mxField_max"
                        minlength="16"
                        maxlength="19"
                        :disabled="mxField_disabled"
                        :value="formattedNumber"
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
                        @keydown="format"
                    />-->

                    <!-- Move below to CC field-->
                   
                    <div x-text="cardType" class="creditcard-type absolute my-1 left-0  text-sm  peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"></div>
                  
                    <span x-text="mxField_invalidText || 'Invalid field'" class="absolute -my-1 right-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    </span>
                    <span x-data="{ init() { this.loadField() } }"></span>

                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        },
    }
}