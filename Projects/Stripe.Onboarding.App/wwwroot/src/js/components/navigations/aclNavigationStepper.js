import { mxNavigation, mxIcon } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxNavigation(params),
        ...mxIcon(params),
        // PROPERTIES
        open: false,
        position: 1,
        // INIT
        init() {
            this._mxNavigation_SetParams(params || {});
            this.setValues(params || {});
            this.setPosition();
            this.render();
        },
        // GETTERS
        // METHODS
        select(i) {
            this.position = i+1;
        },
        // Set position based on text input
        setPosition() {
            if (!this.mxNavigation_selected) return;
            const index = this.mxNavigation_items.map(x => x.text).indexOf(this.mxNavigation_selected)
            this.position = index > -1 ? index+1 : 0;
        },
        setValues(params) {
        },
        render() {
            const html = `
                <ol class="flex py-2 mt-2 justify-between w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                    <template x-for="(item, i) in mxNavigation_items">
                        <li class="flex flex-col items-center pa-4 px-8 sm:px-4" >
                            <button @click="select(i)" disabled class="bg-transparent hover:bg-blue-500 hover:text-white flex flex-col items-center">
                                <div class="flex text-center items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                    <!--Tick icon-->
                                    <!--
                                    <svg x-show="position >= i" class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    -->
                                    <template x-if="item.icon">
                                        <div :class="mxIcon_class">
                                            <svg class="w-5 h-5" x-data="aclIconsSvg({item.icon})"></svg>
                                        </div>
                                    </template>
                                </div>

                                <div x-text="i+1"
                                    class="flex items-center justify-center w-6 h-6 rounded dark:border-blue-500"
                                    :class="i+1 == position ? 'bg-gray-200' : 'bg-gray-100 text-gray-300'"></div>
                                <div x-text="item.text"
                                class="flex text-center font-sm items-center"
                                :class="i+1 == position ? '' : 'text-gray-300'"
                                ></div>
                                
                            </button>
                        </li>
                    </template>
                </ol>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}