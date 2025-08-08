import { mxContent } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        // PROPERTIES
        open: false,
        // INIT
        init() {
            this.setValues(params || {});
            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxContent_text = params.text;
        },
        render() {
            const html = `
               <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span class="sr-only">Loading...</span>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}