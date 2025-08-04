import { mxContent } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxContent(params),
        // PROPERTIES
        open: false,
        // INIT
        init() {
            this.setValues(params);
            this.open = params.open;
            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxContent_btn = params.btn;
            this.mxContent_img = params.img;
            this.mxContent_title = params.title;
            this.mxContent_subtitle = params.subtitle;
            this.mxContent_text = params.text;
            this.mxContent_subtext = params.subtext;
        },
        close() {
            this.open = false;
        },
        render() {
            const html = ` 
            <div class="relative flex flex-col w-full h-full lg:my-0">
                <div class="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                    <div class="relative">
                        <p class="mb-4 font-medium text-gray-700 uppercase" x-text="mxContent_subtitle"></p>
                        <h2 class="text-5xl mb-4 font-bold text-gray-900 xl:text-6xl" x-text="mxContent_title">Features to help you work smarter</h2>
                    </div>
                    <p class="text-2xl text-gray-700 mb-4" x-text="mxContent_text"></p>
                    <a x-show="!!mxContent_btn" :href="mxContent_btn.href" x-text="mxContent_btn.text" class="px-8 py-5  text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease" data-primary="blue-600" data-rounded="rounded-lg"></a>
                </div>
            </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}