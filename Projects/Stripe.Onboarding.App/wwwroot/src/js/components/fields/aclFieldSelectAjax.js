import { mxField, mxFetch, mxTable } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxField(params),
        ...mxFetch(params),
        ...mxTable(params),
        // PROPERTIES
        type: '',
        value: null,
        placeholder: '',
        cssClass: '',
        selectOpen: false,
        selectedItem: null,
        selectableItemActive: null,
        selectId: 'aclFieldSelect',
        selectKeydownValue: '',
        selectKeydownTimeout: 1000,
        selectKeydownClearTimeout: null,
        selectDropdownPosition: 'bottom',
        areItemsObject: true,
        queryText: '',

        // INIT
        init() {
            this._mxField_setValues(params);
            this.setValues(params);
            this.render();

            this.$watch('selectOpen', () => {
                if (!this.selectedItem) {
                    //this.selectableItemActive = this.mxField_items[0];
                } else {
                    this.selectableItemActive = this.selectedItem;
                }
                setTimeout(() => {
                    this.selectScrollToActiveItem();
                }, 10);
                this.selectPositionUpdate();
                window.addEventListener('resize', (event) => { this.selectPositionUpdate(); });
            });
        },
        // GETTERS
        // METHODS 
        setValues(params) {
            this.areItemsObject = params.areItemsObject;

            this.mxField_items = params.items;
            let item = null;
            if (this.areItemsObject === false && !typeof params.items[0] === 'object') {
                params.items = params.items.map(x => {
                    return this._mxField_ConvertItemStringToObject(x)
                });
                item = this.mxField_value;
            }
            else {
                item = this.mxField_items.filter(x => x.value == this.mxField_value)[0]
            }
            if(!!item) this.selectItem(item);

           // this.selectedItem = item;
            //this.mxField_value = item.value;

            this.mxFetch_url = params.settings;
            if (!this.mxField_placeholder) this.mxField_placeholder = 'Select item';
            this.selectId = this.$id('select');
        },
        selectableItemIsActive(item) {
            return this.selectableItemActive && this.selectableItemActive.value == item.value;
        },
        selectScrollToActiveItem() {
            if (this.selectableItemActive) {
                this.activeElement = document.getElementById(this.selectableItemActive.value + '-' + this.selectId)
                let newScrollPos = (this.activeElement.offsetTop + this.activeElement.offsetHeight) - this.$refs.selectableItemsList.offsetHeight;
                if (newScrollPos > 0) {
                    this.$refs.selectableItemsList.scrollTop = newScrollPos;
                } else {
                    this.$refs.selectableItemsList.scrollTop = 0;
                }
            }
        },
        getKey(item, i) {
            return `${item.value}:${i}:${this.selectId}`
        },
        selectPositionUpdate() {
            let selectDropdownBottomPos = this.$refs.selectButton.getBoundingClientRect().top + this.$refs.selectButton.offsetHeight + parseInt(window.getComputedStyle(this.$refs.selectableItemsList).maxHeight);
            if (window.innerHeight < selectDropdownBottomPos) {
                this.selectDropdownPosition = 'top';
            } else {
                this.selectDropdownPosition = 'bottom';
            }
        },
        selectItem(item) {
            this.selectedItem = item;
            this.selectableItemActive = item;
            this.selectOpen = false;
            if (this.$refs.selectButton) this.$refs.selectButton.focus();
            this.mxField_value = item.value;
            this._mxField_onChange(this.mxField_value)
            
        },
        itemSelected(item) {
            if (!this.selectedItem || !item) return;

            if (this.areItemsObject) {
                return this.selectedItem.value == item.value
            }
            else {
                return this.selectedItem == item;
            }
        },

        async openMenu() {
            if (this.mxField_items.length == 0) await this.submit();

            await this.selectOpen();
        },

        async submit() {
            // else
            this.mxFetch_loading = true;
            try {
                this.selectOpen = true;
                const payload = {
                    page: this.mxTable_page || 0,
                    pageSize: this.mxTable_pageSize || 10,
                    pages: this.mxTable_pages || 0,
                    query: {
                        Name: this.queryText || ''
                    }
                }
                const result = await this.$fetch.POST(this.mxFetch_url, payload);

                if (result != null && result.status == 200) {
                    this.mxField_items = result.data;
                    this._mxTable_setPaginationValues(result)
                }
                else {

                }
            } catch (e) {
                console.log(e);
            }
            this.mxFetch_loading = false;
        },
        defaultClass() {
            let cssClass = 'relative text-xl px-4 py-4 min-h-[38px] flex items-center justify-between w-full py-2 pl-3 pr-10 text-left placeholder-gray-400 bg-gray-200 border rounded-md shadow-sm cursor-default border-neutral-200/70 focus:outline-none text-sm focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400';

            if (!!this.mxField_icon) cssClass = `ps-10 p-2.5 ${cssClass}`;
            return cssClass;
        },
        inputButtonClass() {
            if (this.mxField_disabled) {
                if (!!this.mxField_icon) return `${this.mxField_class} ps-10 p-2.5`;
                return this.mxField_class;
            }
            return this.defaultClass();
        },
        inputClass() {
            let cssClass = this.mxField_class || this.mxField_inputClass;
            if (!!this.mxField_icon) return `${cssClass} ps-10 p-2.5`;
            return cssClass;
        },

        cancelItem() {
            this.selectedItem = null;
            this.selectOpen = false;
            this.mxField_items = [];
        },
        render() {
            const html = `
            <div class="relative">
                <input
                    :type="mxField_type"
                    class="peer"  
                    :id="mxField_id"
                    :name="mxField_name" 
                    :disabled="false"
                    :hidden="true"
                    :required="mxField_required"
                    :value="mxField_value"
                    x-model="mxField_value"  
                    :required="mxField_required" 
                    :aria-invalid="mxField_ariaInvalid"
                    :aria-describedBy="mxField_areaDescribedBy || mxField_id" 
                />
                    <div class="relative">
                        <div x-show="mxField_icon" class="absolute ml-2 pl-1 inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" x-data="aclIconsSvg({icon: 'email' })"></svg>
                        </div>

                         <input
                            :placeholder="mxField_placeholder"
                            :class="inputClass"
                            :required="mxField_required" 
                            :disabled="mxField_disabled"
                            x-show="!selectedItem"
                            :value="mxField_value"
                            x-model="mxField_value"
                            :aria-invalid="mxField_ariaInvalid"
                            :pattern="mxField_pattern || null"
                            :aria-describedBy="mxField_areaDescribedBy || mxField_id"
                            data-primary="blue-600"
                            data-rounded="rounded-lg"
                            x-on:input.change.debounce.350ms="await submit"
                        />
                        <span x-show="!mxField_disabled && !selectedItem" class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" x-data="aclIconsSvg({icon: 'magnifyingGlass' })"></svg>
                        </span>
                    </div>

                <button type="button" x-ref="selectButton"
                    :disabled="mxField_disabled"
                    x-show="selectedItem"
                    @click="openMenu"
                    :class="inputButtonClass">
                    <div x-show="mxField_icon" class="absolute ml-2 pl-1 inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" x-data="aclIconsSvg({icon: mxField_icon })"></svg>
                    </div>

                    <div x-show="!mxField_disabled" class="right-8 truncate">
                        <span x-text="selectedItem ? selectedItem.key : mxField_placeholder" ></span>
                            <div x-show="!!selectedItem" @click="cancelItem"
                            x-data="aclButton({icon: 'close' })"
                            class="absolute inset-y-0 right-0 flex items-center pr-2" ></svg>
                        </span>
                    </div>
                </button>
                
                <ul x-show="selectOpen"
                    x-ref="selectableItemsList"
                    @click.away="selectOpen = false"
                    x-transition:enter="transition ease-out duration-50"
                    x-transition:enter-start="opacity-0 -translate-y-1"
                    x-transition:enter-end="opacity-100"
                    :class="{ 'bottom-0 mb-10' : selectDropdownPosition == 'top', 'top-0 mt-6' : selectDropdownPosition == 'bottom' }"
                    class="absolute w-full z-10 py-1 mt-1 overflow-auto text-sm bg-white rounded-md shadow-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    x-cloak>
                    
                    <template x-for="(item, i) in mxField_items" :key="getKey(item, i)">
                        <li 
                            @click="selectItem(item)"
                            :id="item.value + '-' + selectId"
                            :data-disabled="!!item.disabled"
                            :class="{ 'bg-neutral-100 text-gray-900' : selectableItemIsActive(item), '' : !selectableItemIsActive(item) }"
                            @mousemove="selectableItemActive=item"
                            class="text-xl px-4 py-4 relative flex items-center h-full py-2 pl-8 text-gray-700 cursor-default select-none data-[disabled]:opacity-50 data-[disabled]:pointer-events-none">
                            <svg x-show="itemSelected(item)" class="absolute left-0 w-4 h-4 ml-2 stroke-current text-neutral-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span class="block font-medium truncate" x-text="item.key"></span>
                        </li>
                    </template>

                </ul>
                <span x-text="mxField_invalidText || 'Invalid input'" class="absolute -my-1 right-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        },
    }
}