import { mxGrid, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxGrid(params),
        ...mxEvent(params),
        // PROPERTIES
        activeImage: null,
        index: 0,
        disablePrev: true,
        disableNext: false,
        eventNext: 'eventNext',
        eventPrev: 'eventPrev',
        // INIT
        init() {
            this.setValues(params || {});

            this._mxEvent_On(this.eventNext, (val) => {
                this.imageGalleryNext();
            })

            this._mxEvent_On(this.eventPrev, (val) => {
                this.imageGalleryPrev();
            })
            this.render();
        },
        // GETTERS
        get modalParams() {
            let media = this.activeItem;
            if (media == null) return null;
            media.title = media.name;
            media.event = this.mxEvent_event;
            media.eventNext = this.eventNext;
            media.eventPrev = this.eventPrev;
            media.showPrev = this.index > 0;
            media.showNext = (this.index < this.mxGrid_items.length - 1);
            return media;
        },
        get activeSrc() {
            if (this.activeImage == null) return '';
            return this.activeImage.src;
        },
        get activeItem() {
            return this.mxGrid_items[this.index];
        },
        // METHODS
        setValues(params) {
            this.mxGrid_items = params.items;
            this.mxEvent_event = params.event;
            this.eventNext = `${params.event}:${this.eventNext}`;
            this.eventPrev = `${params.event}:${this.eventPrev}`;
        },
        imageGalleryOpen(index) {
            this.index = index;
            this._mxEvent_Emit(this.mxEvent_event, this.modalParams);
        },
        imageGalleryClose() {
            setTimeout(() => this.activeImage = {}, 300);
        },
        imageGalleryNext() {
            if (this.index == this.mxGrid_items.length - 1) return;
            this.index++;
            this.activeImage = this.mxGrid_items[this.index];
            this._mxEvent_Emit(this.mxEvent_event, this.modalParams);
        },
        imageGalleryPrev() {
            if (this.index == 0) return;
            this.index--;
            this.activeImage = this.mxGrid_items[this.index];
            this._mxEvent_Emit(this.mxEvent_event, this.modalParams);
        },
        render() {
            const html = `
                <div class="w-full h-full select-none">
                    <div class="max-w-6xl mx-auto duration-1000 delay-300 opacity-0 select-none ease animate-fade-in-view" style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);">
                        <ul x-ref="gallery" id="gallery" class="grid grid-cols-2 gap-2 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            <template x-for="(item, index) in mxGrid_items">
                                <li> 
                                    <div x-data="aclCardVertical(item)"></div>
                                </li>
                            </template>
                        </ul>
                    </div>
                    
                    <div x-data="aclModalMedia(modalParams)"></div>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}