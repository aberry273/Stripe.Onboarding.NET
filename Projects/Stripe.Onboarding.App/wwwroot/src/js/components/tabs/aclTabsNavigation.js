import { mxTab} from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxTab(params),
        // PROPERTIES
        // INIT
        init() {
            this._mxTab_init(params);
            this.render();
            this.$watch('mxTab_tabButtons', (newVal, oldVal) => {
                if (!this.mxTab_items) return;
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
            <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400">
                <template x-for="tab in mxTab_items">
                    <a :href="tab.href"
                        :aria-current="mxTab_selected == tab.text ? 'page' : ''"
                        :class="mxTab_selected == tab.text
                            ? 'inline-flex items-center bg-white justify-center p-4 text-blue-600 border-b-2 border-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
                            : 'inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'">
                            <svg x-show="!!tab.icon" class="w-4 h-4 me-2 text-blue-600 dark:text-blue-500" x-data="aclIconsSvg({mxIcon_name: tab.icon})"></svg>
                            <span x-text="tab.text">
                    </a>
                </template>
            </ul>
            <span x-init="mxTab_tabButtons = $refs.tabButtons"></span>
            `;
            this.$nextTick(() => {
                this.$root.innerHTML = html;
            })
        },
    }
}