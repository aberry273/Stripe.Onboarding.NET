import { mxGrid, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxGrid(params),
        ...mxEvent(params),
        // PROPERTIES
        index: 0,
        disablePrev: true,
        disableNext: false,
        eventNext: 'eventNext',
        eventPrev: 'eventPrev',
        // INIT
        init() {
            this.setValues(params || {});
            const self = this;
            this._mxEvent_On(this.eventNext, (val) => {
                this.imageGalleryNext(self);
            })

            this._mxEvent_On(this.eventPrev, (val) => {
                this.imageGalleryPrev(self);
            })
            this.render();
        },
        // GETTERS
        // METHODS
        createModalParams() {
            let media = this.mxGrid_items[this.index];
            if(media == null) return null;
            return {
                ...media,
                title: media.name,
                showPrev: this.index > 0,
                showNext:  (this.index < this.mxGrid_items.length - 1)
            };
        },
        setValues(params) {
            this.mxGrid_items = params.items;
            this.mxEvent_event = params.event;
            this.eventNext = `${params.event}:${this.eventNext}`;
            this.eventPrev = `${params.event}:${this.eventPrev}`;
        },
        imageGalleryOpen(index) {
            this.index = index;
            this._mxEvent_Emit(this.mxEvent_event, this.createModalParams());
        },
        imageGalleryClose() {
            this.index = 0;
            //setTimeout(() => this.activeImage = {}, 300);
        },
        imageGalleryNext(self) {
            if (self.index == self.mxGrid_items.length - 1) return;
            self.index++;
            self._mxEvent_Emit(self.mxEvent_event, self.createModalParams());
        },
        imageGalleryPrev(self) {
            if(self.index == 0) return;
            self.index--;
            self._mxEvent_Emit(self.mxEvent_event, self.createModalParams());
        },
        render() {
            const html = `
                <div class="w-full h-full select-none">
                    <div class="max-w-6xl mx-auto duration-1000 delay-300 opacity-0 select-none ease animate-fade-in-view" style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);">
                        <ul x-ref="gallery" id="gallery" class="grid grid-cols-2 gap-2 lg:grid-cols-5">
                            <template x-for="(media, index) in mxGrid_items" :id="media.id">
                                <li>
                                    <div x-data="aclMedia({
                                        ...media,
                                        controls: false,
                                        canPlay: false,
                                        class: 'object-cover select-none w-full h-auto bg-gray-200 rounded cursor-pointer aspect-[5/6] lg:aspect-[2/3] xl:aspect-[3/4]'
                                    })"
                                    @click="(ev) => { imageGalleryOpen(index) }">
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                    
                    <div x-data="aclModalMedia({
                        event: mxEvent_event,
                        eventNext: eventNext,
                        eventPrev: eventPrev
                    })"></div>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}