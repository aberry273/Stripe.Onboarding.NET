import { mxTab } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxTab(params),
        // PROPERTIES
        // INIT
        init() {
            this._mxTab_init(params);
            this.render();
            this.$watch('mxTab_tabButtons', (newVal, oldVal) => {
                const selected = this.mxTab_selected
                    ? this.mxTab_items.filter(x => x.text == this.mxTab_selected)[0]
                    : this.mxTab_items[0];
                this._mxTab_select(selected)
            })
        },
        // GETTERS
        // METHODS
        render() {
            const html = `
                <div class="relative w-full" x-init="mxTab_tabButtons = $refs.tabButtons">
                    <div x-ref="tabButtons" class="relative items-center justify-center w-full h-10 p-1 text-gray-500 bg-gray-100 rounded-lg select-none">
                        <div x-ref="tabMarker"
                            class="absolute left-0 w-1/2 h-full duration-300 ease-out">
                            <div class="w-full h-full bg-white rounded-md shadow-sm"></div>
                        </div>    
                        <template x-for="tab in mxTab_items">
                                <button :id="$id(tab)" 
                                    x-text="tab"
                                    @click="_mxTab_select(tab);" 
                                    type="button" 
                                    class="relative inline-flex grid items-center items-center justify-center h-8 px-3 text-sm font-medium transition-all rounded-md cursor-pointer whitespace-nowrap">
                                </button>
                        </template>
                    </div>
                    <div class="relative w-full mt-2 content">
                        <template x-for="(tab, i) in mxTab_items">
                            <div 
                                :id="$id(i + '-content')" 
                                x-show="_mxTab_isActive(tab)" 
                                class="relative" 
                                x-cloak
                                x-text="tab"></div> 
                        </template>
                    </div>
                </div>
            `;
            this.$nextTick(() => {
                this.$root.innerHTML = html;
            })
        },
    }
}