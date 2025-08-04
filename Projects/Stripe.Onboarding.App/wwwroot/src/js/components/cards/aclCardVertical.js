import { mxCard } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxCard(params),
        // PROPERTIES
        // INIT
        init() {
            this._mxCard_SetValues(params);
            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxCard_img = params.img;
            this.mxCard_label = params.label;
            this.mxCard_title = params.title;
            this.mxCard_subtitle = params.subtitle;
            this.mxCard_text = params.text;
            this.mxCard_subtext = params.subtext;
        },
        close() {
            this.open = false;
        },
        render() {
            const html = `
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a :href="mxCard_href">
                    <img class="object-cover w-full shadow-sm max-h-56" :src="mxCard_img">
                </a> 
                <div class="relative flex flex-col p-2 items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                    <div class="rounded-md bg-gray-200 py-0.5 px-2.5 border border-transparent text-sm transition-all shadow-sm relative rounded-md px-3 mr-1 mt-1 pt-1">
                        <span x-text="mxCard_label"></span>
                    </div>
                    <h2 class="text-base font-bold sm:text-lg md:text-xl"><a :href="mxCard_href" x-text="mxCard_title"></a></h2>
                    <p class="mt-2 text-sm text-gray-500" x-text="mxCard_text"></p>
                    <div class="grid justify-items-end" x-show="!!mxCard_href">
                        <a :href="mxCard_href" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Browse
                        </a>
                    </div>
                </div>
            </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}