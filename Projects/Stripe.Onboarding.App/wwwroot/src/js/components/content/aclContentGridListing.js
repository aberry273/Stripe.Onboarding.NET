import { mxContent } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxContent(params),
        // PROPERTIES
        cols: 1,
        // INIT
        init() {
            this._mxContent_setValues(params);
            this.setValues(params);
            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.cols = this.mxContent_items.length;
        },
        colClass() {
            return `grid-cols-${this.cols}`;
        },
        render() {
            const html = ` 
            <div class="mb-4 grid gap-4 sm:gap-8 lg:gap-16" :class="colClass">
                <template x-for="cols in mxContent_items || []">
                    <div class="space-y-4">
                        <template x-for="kv in cols">
                            <dl class="">
                                <dt class="font-semibold text-gray-900 dark:text-white" x-text="kv.key"></dt>
                                <dd class="text-gray-500 dark:text-gray-400" x-text="kv.value"></dd>
                            </dl>
                        </template>
                    </div>
                </template>
            </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}