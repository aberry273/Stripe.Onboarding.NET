import { mxIcon, mxContent, mxLink, mxModal, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxLink(params),
        ...mxContent(params),
        ...mxIcon(params),
        ...mxModal(params),
        ...mxEvent(params),
        // PROPERTIES
        component: 'span',
        left: true,
        right: false,
        data: {},
        // INIT
        init() {
            this.setValues(params);
            this.setEvents();
            this.render();
        },
        // GETTERS
        get leftSideClass() {
            return 'left-0 flex max-w-full lg:pl-40 md:pl-10'
        },
        get rightSideClass() {
            return 'right-0 flex max-w-full lg:pr-40 md:pr-10'
        },
        // METHODS
        setValues(params) {
            this.mxEvent_event = params.event;
            this.left = params.left;
            this.right = params.right;
            if (this.left == null && this.right == null) {
                this.left = true;
            }
            this.mxContent_title = params.title;
            this.mxModal_clickOutside = params.clickOutside;
        },
        setEvents() {
            if (!this.mxEvent_event) return;
            const self = this;
            this._mxEvent_On(this.mxEvent_event, (val) => {
                self.mxModal_open = true;
            })
        },
        render() {
            const html = `
            <div class="relative z-50 w-auto h-auto">
                <template x-teleport="body">
                    <div x-show="mxModal_open" @keydown.window.escape="mxModal_open=false" class="relative z-[99]">
                        <div x-show="mxModal_open" x-transition.opacity.duration.600ms @click="mxModal_open = false" class="fixed inset-0 bg-black bg-opacity-10"></div>
                        <div class="fixed inset-0 overflow-hidden">
                            <div class="absolute inset-0 overflow-hidden">
                                <div class="fixed inset-y-0 left-0 flex max-w-full lg:pl-40 md:pl-10">
                                    <div 
                                        x-show="mxModal_open" 
                                        @click.away="mxModal_open = false"
                                        x-transition:enter="transform transition ease-in-out duration-500 sm:duration-700" 
                                        x-transition:enter-start="translate-x-full" 
                                        x-transition:enter-end="translate-x-0" 
                                        x-transition:leave="transform transition ease-in-out duration-500 sm:duration-700" 
                                        x-transition:leave-start="translate-x-0" 
                                        x-transition:leave-end="translate-x-full" 
                                        class="w-screen max-w-md">
                                        <div class="flex w-500 flex-col h-full py-5 overflow-y-scroll bg-white border-l shadow-lg border-neutral-100/70">
                                            <div class="px-4 sm:px-5">
                                                <div class="flex items-start justify-between pb-1">
                                                    <h2 class="text-base font-semibold leading-6 text-gray-900" id="slide-over-title">Slide Over Title</h2>
                                                    <div class="flex items-center h-auto ml-3">
                                                        <button @click="mxModal_open=false" class="absolute top-0 right-0 z-30 flex items-center justify-center px-3 py-2 mt-4 mr-5 space-x-1 text-xs font-medium uppercase border rounded-md border-neutral-200 text-neutral-600 hover:bg-neutral-100">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                            <span>Close</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="relative flex-1 px-4 mt-5 sm:px-5">
                                                <div class="absolute inset-0 px-4 sm:px-5">
                                                    <div class="relative h-full overflow-hidden border border-dashed rounded-md border-neutral-300">
                                                        qdwdqw
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}