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
            <div class="w-full">
                <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 overflow-hidden">
                  <div class="bg-blue-600 progress left-right h-1.5 rounded-full"></div>
                </div>
            </div>
            <style>
                .progress { animation: progress 1s infinite linear; }
                .left-right { transform-origin: 0% 50%; }
                @keyframes progress {
                    0% { transform:  translateX(0) scaleX(0); }
                    40% { transform:  translateX(0) scaleX(0.4); }
                    100% { transform:  translateX(100%) scaleX(0.5); }
                }
            </style>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}