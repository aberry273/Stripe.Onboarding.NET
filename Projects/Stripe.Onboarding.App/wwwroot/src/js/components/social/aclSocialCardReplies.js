import { mxContent, mxNavigation, mxLink, mxIcon, mxDate, } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxNavigation(params),
        ...mxContent(params),
        ...mxLink(params),
        ...mxIcon(params),
        ...mxDate(params),
        // PROPERTIES
        active: null,
        date: null,
        items: null,
        id: '',
        // INIT
        init() {
            this.setValues(params);
            this.render();
            this.$watch('active', (newVal) => {
                console.log
            })
        },
        // GETTERS
        get dropdownParams() {
        },
        // METHODS
        setValues(params) {
            this.active = params.active;
            this.date = params.date;
            this.items = params.profiles;
            this.mxContent_text = params.text;
        },
        close() {
            this.open = false;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        },
        render() {
            const html = `
                <div class="flex max-w cursor-pointer bg-grey rounded-lg hover:bg-gray-50">
                    <div class="flex sm:w-10 w-9 flex items-center justify-center">
                        <!-- Comment line -->
                        <div x-show="!active" class="w-1 bottom-0 h-full pb-1 bg-gray-200"></div>
                    </div>

                    <div class="flex w-full max-w h-9 items-center rounded-lg md:flex-row hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                       
                        <!--Link-->
                        <div class="w-full p-1 leading-normal">
                            <div x-data="aclButton({ text: mxContent_text })" @onclick="onButtonClick(item)"></div>
                        </div>
                        <!--Profile Images-->
                        <div class="flex-shrink-0 flex mr-2">
                            <template x-for="item in items">
                                <div x-data="aclMediaImage( {
                                    src: item.img,
                                    class: 'rounded-md w-8 h-8'
                                })"></div>
                            </template>
                        </div>
                    </div>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}