import { mxContent, mxNavigation, mxDropdown} from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        ...mxNavigation(params),
        ...mxDropdown(params),
        // PROPERTIES
        
        popoverOpen: false,
        popoverArrow: true,
        popoverPosition: 'bottom',
        popoverHeight: 0,
        popoverOffset: 8,
        // INIT
        init() {
            this.mxContent_title = params.title;
            this.mxNavigation_primaryItems = params.primaryItems;
            this.mxNavigation_secondaryItems = params.secondaryItems;
            this.render();
        },
        // GETTERS
        get popoverButton() {
            this.$refs.popoverButton
        },
        // METHODS
        close() {
            this.open = false;
        },
        // RENDER
        render() {
            const html = `
            <section :class="mxNavigation_getSectionClass" {!! $attributes ?? '' !!}>
                <div :class="mxNavigation_getContainerClass">
                    <div :class="mxNavigation_getContainerLeftClass">
                        <span href="#_" :class="mxNavigation_getLinkClass">
                            <span :class="mxNavigation_getTitleClass" x-text="mxContent_title"></span>
                        </span>
                        <nav :class="mxNavigation_getItemsClass">
                            <template x-for="item in mxNavigation_primaryItems">
                                <a :href="item.href" x-text="item.label" :class="item.class || mxNavigation_headerLinkClass"></a>
                            </template>
                        </nav>
                    </div>
            
                    <div :class="mxNavigation_getContainerRightClass">
                        <div class="relative">
         
                            <div 
                                ref="popoverButton"
                                @click="mxDropdown_open=!mxDropdown_open"
                                x-data="aclButton({
                                    icon: 'filter',
                                    class: 'flex items-center justify-center w-10 h-10 bg-white border rounded-full shadow-sm cursor-pointer hover:bg-neutral-100 focus-visible:ring-gray-400 focus-visible:ring-2 focus-visible:outline-none active:bg-white border-neutral-200/70'
                                })">
                            </div>

                            <div x-show="mxDropdown_open" 
                                @click.away="mxDropdown_open=false"
                                x-transition:enter="ease-out duration-200"
                                x-transition:enter-start="-translate-y-2"
                                x-transition:enter-end="translate-y-0"
                                class="absolute top-0 z-50 w-56 mt-12 -translate-x-1/2 left-1/2"
                                x-cloak>
                                <!--Content-->
                                <div x-ref="popoverInner"  class="w-full p-4 bg-white border rounded-md shadow-sm border-neutral-200/70">
                                <div class="grid gap-4">
                                        <div class="space-y-2">
                                            <h4 class="font-medium leading-none">Dimensions</h4>
                                            <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                                        </div>
                                        <div class="grid gap-2">
                                            <div class="grid items-center grid-cols-3 gap-4"><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="width">Width</label><input class="flex w-full h-8 col-span-2 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="width" value="100%"></div>
                                            <div class="grid items-center grid-cols-3 gap-4"><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="maxWidth">Max. width</label><input class="flex w-full h-8 col-span-2 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="maxWidth" value="300px"></div>
                                            <div class="grid items-center grid-cols-3 gap-4"><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="height">Height</label><input class="flex w-full h-8 col-span-2 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="height" value="25px"></div>
                                            <div class="grid items-center grid-cols-3 gap-4"><label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="maxHeight">Max. height</label><input class="flex w-full h-8 col-span-2 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="maxHeight" value="none"></div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        `
        this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}