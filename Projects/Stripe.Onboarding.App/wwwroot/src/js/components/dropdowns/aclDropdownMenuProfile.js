import { mxContent, mxIcon, mxDropdown } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        ...mxIcon(params),
        ...mxDropdown(params),
        // PROPERTIES 
        // INIT
        init() {
            this.mxContent_title = params.title;
            this.mxContent_subtitle = params.subtitle;
            this.mxDropdown_groups = params.groups;
            this.mxDropdown_imageSrc = params.image;
            
            this.open = params.open;
            this.render();
        },
        // GETTERS
        // METHODS
        close() {
            this.open = false;
        },
        open() {
            this.mxDropdown_open = true;
        },
        onClick(btn) {
            // Fallback to dispatch
            this.$dispatch('onselect', btn);
        },
        hasImage() {
            try {
                new URL(this.mxDropdown_imageSrc)
            }
            catch (e) {
                return false;
            }
            returntrue;
        },
        avatarLetters() {
            if (this.mxContent_title == null || this.mxContent_title.length == 0)
                return '??'
            const letters = this.mxContent_title.split(' ');
            return letters.map(x => x[0]).join('')
        },
        render() {
            const html = `
            <div class="relative">
        
            <button @click="mxDropdown_open=true" :class="mxDropdown_buttonClass">
                <img 
                    x-show="hasImage()"
                    :src="mxDropdown_imageSrc" 
                    :class="mxDropdown_imageClass">
                <!-- No image-->
                <div x-show="!hasImage()" class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg class="absolute w-9 h-9 text-gray-400 -left-1 pr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>

                <div class="lg:block md:block sm:hidden xs:hidden text-left" :class="mxDropdown_buttonTextContainerClass">
                    <div x-text="mxContent_title"></div>
                    <div :class="mxDropdown_buttonSubtitleClass" x-text="mxContent_subtitle"></div>
                </div>
                <svg 
                    :class="mxIcon_buttonRightSvg" 
                    x-data="aclIconsSvg({ mxIcon_name: 'expand' })"></svg>   
            </button>
        
            <div x-show="mxDropdown_open" 
                @click.away="mxDropdown_open=false"
                x-transition:enter="ease-out duration-200"
                x-transition:enter-start="-translate-y-2"
                x-transition:enter-end="translate-y-0"
                class="absolute top-0 z-50 w-56 mt-12 -translate-x-1/2 left-1/2"
                x-cloak>
                <div class="p-1 mt-1 bg-white border rounded-md shadow-md border-neutral-200/70 text-neutral-700">
                    <template x-for="group in mxDropdown_groups">
                        <div>
                            <div class="px-2 py-1.5 text-sm font-semibold" x-text="group.title"></div>
                            <div class="h-px my-1 -mx-1 bg-neutral-200"></div>
                            <template x-for="item in group.items">
                                <div x-data="aclButton(item)" @onclick="onClick(item)"></div>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}