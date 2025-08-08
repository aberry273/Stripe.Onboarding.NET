import { mxIcon, mxContent, mxLink, mxModal, mxMedia, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxLink(params),
        ...mxContent(params),
        ...mxIcon(params),
        ...mxModal(params),
        ...mxMedia(params),
        ...mxEvent(params),
        // PROPERTIES
        index: 0,
        media: null,
        src: '',
        // INIT
        init() {
            this.setValues(params);
            this.setEvents();
            this.render();
            this.$watch('mxModal_open', (value) => {
                this._mxModal_ToggleBackgroundOverflow(value);
            })
        },
        // GETTERS 
        // METHODS
        setValues(params) {
            this.mxEvent_event = params.event || this.mxEvent_event;
            this.mxModal_clickOutside = params.clickOutside || this.mxModal_clickOutside;
            this.mxModal_eventNext = params.eventNext || this.mxModal_eventNext;
            this.mxModal_eventPrev = params.eventPrev || this.mxModal_eventPrev;
        },
        setModalValues(params) {
            this.mxContent_title = params.title || this.mxContent_title;
            this.mxContent_text = params.text || this.mxContent_text;
            this.mxModal_showNext = params.showNext;
            this.mxModal_showPrev = params.showPrev;
        },
        setEvents() {
            if (!this.mxEvent_event) return;
            const self = this;
            this._mxEvent_On(this.mxEvent_event, (val) => {
                self.media = val;
                self.setModalValues(val);
                self.mxModal_open = true;
            })
        },
        onPrev() {
            this.index--;
            this._mxEvent_Emit(this.mxModal_eventPrev)
        },
        onNext() {
            this.index++;
            this._mxEvent_Emit(this.mxModal_eventNext)
        },
        close() {
            this.mxModal_open = false;
            this.media = {};
        },
        render() {
            const html = `
                <template x-teleport="body" >
                    <div 
                        x-show="mxModal_open"
                        x-transition:enter="transition ease-out duration-100"
                        x-transition:enter-start="opacity-0"
                        x-transition:enter-end="opacity-100"
                        x-transition:leave="transition ease-in duration-100"
                        x-transition:leave-start="opacity-100"
                        x-transition:leave-end="opacity-0"
                        class="flex fixed top-0 left-0  inset-0 z-[99] w-screen h-screen bg-white overscroll-none">
                        <span 
                            @onClick="close"
                            x-data="aclButton({ 
                                icon: 'close', 
                                class: 'absolute top-0 right-4 z-30 flex items-center justify-center px-3 py-2 mt-3 mr-3 space-x-1 text-xs font-medium uppercase border rounded-md border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                            })">
                        </span>

                        <div class="relative flex flex-wrap items-center w-full h-full px-8">
                            <div class="relative w-full h-full mx-auto lg:mb-0">
                                <div class="relative justify-center text-center select-none">
                                    <div class="flex flex-col mb-6 space-y-2">
                                        <h1 class="text-2xl font-semibold tracking-tight" x-text="mxContent_title"></h1>
                                        <p class="text-sm text-neutral-500" x-text="mxContent_text"></p>
                                    </div> 
                                </div>
                                <template x-if="media">
                                    <div class="relative w-auto pb-8 w-full h-full justify-center text-center">
                                        <div class="flex select-none h-max-full items-top justify-center"  >
                                            <div x-show="toggle" x-data="aclMedia(media)"></div>
                                        </div> 
                                    </div>
                                </template>
                            </div>
                            
                            <!-- Prev -->
                            <div
                                x-show="mxModal_showPrev"
                                @click="onPrev"
                                x-data="aclButton({ 
                                    icon: 'chevronLeft', 
                                    class: 'absolute left-4 z-30 flex items-center justify-center px-3 py-2 mt-3 mr-3 space-x-1 text-xs font-medium uppercase border bg-white rounded-md border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                                })">
                            </div>
                            <!-- Next -->
                            <div 
                                x-show="mxModal_showNext"
                                @click="onNext" 
                                x-data="aclButton({
                                    icon: 'chevronRight', 
                                    class: 'absolute right-4 z-30 flex items-center justify-center px-3 py-2 mt-3 mr-3 space-x-1 text-xs font-medium uppercase border bg-white rounded-md border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                                })">
                            </div>
                        </div>
                    </div>
                </template>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}
  