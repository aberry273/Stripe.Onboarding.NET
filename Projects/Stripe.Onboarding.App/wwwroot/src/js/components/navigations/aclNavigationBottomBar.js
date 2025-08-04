import { mxButton, mxContent, mxEvent, mxNavigation } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxButton(params),
        ...mxEvent(params),
        ...mxContent(params),
        ...mxNavigation(params),
        // PROPERTIES
        selected: null,
        // INIT
        init() {
            this.setParams(params);
            this._mxNavigation_SetParams(params);
            this._mxEvent_On(this.mxNavigation_event, () => {
                this.mxNavigation_open = !this.mxNavigation_open;
            }) 
            this.render();
        },
        // GETTERS
        get gridClass() {
            const max = this.mxNavigation_items != null ? this.mxNavigation_items.length : 0;
            return `grid-cols-${max}`
        },
        // METHODS
        setParams(params) {
            if (!params) return;
            this.selected = params.selected ? params.selected.toLowerCase() : '';
        },
        isSelected(tab) {
            return this.selected == tab.text.toLowerCase()
        },
        // RENDER
        render() {
            const html = `
                <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                    <div class="grid h-full max-w-lg ${this.gridClass} mx-auto font-medium">
                       <template x-for="tab in mxNavigation_items">
                             <a :id="$id(tab.text)"
                                role="button"
                                :class="isSelected(tab) ? 'bg-gray-100' : ''"
                                class="inline-flex py-1 flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                                :href="tab.href">
                                <svg class="w-5 h-5" x-data="aclIconsSvg({mxIcon_name: tab.icon})"></svg>
                                <span class="text-sm" x-text="tab.text">
                            </a>
                        </template>
                    </div>
                </div>
        `
            this.$nextTick(() => { this.$root.innerHTML = html });
        },
    }
}