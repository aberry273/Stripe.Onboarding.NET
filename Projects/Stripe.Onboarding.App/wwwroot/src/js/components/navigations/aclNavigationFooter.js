import { mxContent, mxNavigation } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        ...mxNavigation(params),
        // PROPERTIES
        
        // INIT
        init() {
            this.mxContent_text = params.text;
            this.mxNavigation_primaryItems = params.primaryItems;
            this.mxNavigation_secondaryItems = params.secondaryItems;
            this.render();
        },
        // GETTERS
        // METHODS
        close() {
            this.open = false;
        },
        // RENDER
        render() {
            const html = `
            <section class="bg-white dark:bg-gray-800">
                <div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                    <nav class="flex flex-wrap justify-center -mx-5 -my-2">
                        <template x-for="item in mxNavigation_primaryItems">
                            <div class="px-5 py-2">
                                <a :href="item.href" x-text="item.label" :class="item.class || mxNavigation_headerLinkClass"></a>
                            </div>
                        </template>    
                    </nav>
                    <div class="flex justify-center mt-8 space-x-6">
                        <template x-for="item in mxNavigation_secondaryItems">
                            <a :href="item.href" class="text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Facebook</span>
                                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" :d="item.svg" clip-rule="evenodd" />
                                </svg>
                            </a>
                        </template>
                    </div>
                    <p class="mt-8 text-base leading-6 text-center text-gray-400" x-html="mxContent_text">
                        
                    </p>
                </div>
            </section>
        `
        this.$nextTick(() => { this.$root.innerHTML = html });
      },
    }
}