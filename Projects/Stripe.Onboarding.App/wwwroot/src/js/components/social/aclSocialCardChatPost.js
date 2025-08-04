import { mxContent, mxNavigation, mxLink, mxIcon, mxDate, } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxNavigation(params),
        ...mxContent(params),
        ...mxLink(params),
        ...mxIcon(params),
        ...mxDate(params),
        // PROPERTIES
        item: null,
        id: '',
        showMenu: false,
        label: '',
        channel: null,
        link: null,
        metrics: {},
        settings: {},
        taxonomy: {},
        content: {},
        profile: {},
        ui: {},
        menu: [],
        actions: [],
        // INIT
        init() {
            this.setValues(params);
            this.render();
        },
        // GETTERS
        get dropdownParams() {
            return {
                disabled: !this.menu || this.menu.length == 0,
                items: this.menu
            }
        },
        get modeThread() {
            if (!this.ui || !this.ui.mode) return false;
            return this.ui.mode == 'thread'
        },
        get showline() {
            if (!this.ui) return false;
            return this.ui.showline
        },
        // METHODS
        setValues(params) {
            this.item = params;
            this.id = params.id;
            this.link = params.link;
            this.channel = params.channel;
            this.profile = params.profile || this.profile;
            this.content = params.content || {};
            this.settings = params.settings || {};
            this.taxonomy = params.taxonomy || {};
            this.metrics = params.metrics || {};
            this.label = params.label;
            this.menu = params.menu;
            this.ui = params.ui || {
                showReplies: true,
                mode: params.mode,
                showline: params.showline,
            };
            this.actions = params.actions;
        },
        close() {
            this.open = false;
        },
        onClickReplies() {
            this.$dispatch('on:click:replies', this.id)
        },
        executeAction(btn, item) {
            //this.$events.Emit(btn.event, item);
        },
        render() {
            const html = `
                <div class="flex max-w h-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                                        
                    <!--Profile image-->    
                    <div  class="cursor-pointer flex sm:w-10 w-9 flex items-center justify-center">
                        <div class="flex flex-col h-full items-center">
                            <div x-show="!ui.condense" x-data="aclMediaImage( {
                                src: profile.img,
                                class: 'rounded-md w-9 h-9'
                            })"></div>
                            <!-- Comment line -->
                            <div x-show="showline" class="w-1 top-0 bottom-0 h-full flex-grow bg-gray-200"></div>
                       
                        </div>
                        <!-- Updated -->
                        <!--
                        <time x-show="ui.condense && showMenu" x-text="_mxDate_FormatShortString(content.date)" :datetime="content.date" class="pl-2 text-xs text-gray-300 dark:text-gray-300"></time>
                        -->
                    </div>
                    
                    <!--Comment--> 
                    <div class="ml-0 pt-0 pl-2 w-full">
                        <!-- Header -->
                        <div class="font-medium flex rtl:text-right justify-between" x-show="!ui.condense">
                            <div class="cursor-pointer" >
                                <!-- User Link-->
                                <span x-data="aclCardProfileHover(profile)"></span>
                                <!-- Rating -->
                                <span x-text="metrics.rating" class="text-sm px-1 pt-1 font-medium text-gray-300 dark:text-gray-300">
                                </span>
                                <!-- Updated -->
                                <time x-text="content.date" datetime="content.date" class="mt-1 pl-2 text-sm text-gray-300 dark:text-gray-300"></time>

                            </div>
                            <div class="mr-2 flex">
                                <template x-for="btn in actions.filter(x => x.overlay)">
                                    <div x-data="aclButton(btn)"></div>
                                </template>
                                <!-- More Button -->
                                <span x-data="aclDropdownMenuButton(dropdownParams)"></span>
                            </div>
                        </div> 
                        <!-- Content -->
                        <div class="w-full pb-2 justify-items-end">
                            <!-- Text -->
                            <template x-if="content.text">
                                <divx-text="content.text" class="w-full align-center cursor-pointer mb-3 font-normal text-gray-700 dark:text-gray-400"></div>
                            </template>
                            <!-- Formats --> 
                            <template x-if="content.formats != null && content.formats.length > 0">
                                <div  class="full-w cursor-pointer" x-data="aclPluginEditorJsParser({ value: content.formats })"></div>
                            </template>
                            <!-- Media --> 
                            <template x-if="content.media != null && content.media.length > 0">
                                <div class="full-w" x-data="aclGridMedia({ items: content.media, event: 'modal:'+id })"></div>
                            </template>
                        </div>

                        <!-- Link card -->
                        <template x-if="link != null">
                            <div class="flex flex-col w-full bg-white items-center border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img class="object-cover w-full h-96 md:h-auto md:w-48" :src="link.image" alt="">
                                <div class="grid justify-between p-2 leading-normal">
                                    <h5 class="mb-0 font-bold tracking-tight text-gray-900 dark:text-white" x-text="link.title"></h5>
                                    <p class="mb-0 font-normal text-gray-700 dark:text-gray-400" x-text="link.description"></p>
                                    <a target="_blank" :href="link.url" class="underline font-semibold truncate ..." x-text="link.url"></a>
                                </div>
                            </div>
                        </template>

                        <!-- Hidden Content -->
                        <div class="flex justify-between mb-0" x-show="showMenu">
                             <!-- Taxonomy -->
                            <div class="px-3">
                                <div class="px-3 font-medium text-sm text-gray-900">Category</div>
                                <span x-show="taxonomy.category" style="background-color: #f1f5f9; color: #475569;" x-text="taxonomy.category" class="relative rounded-md bg-gray-50 px-3 pt-1 font-medium text-gray-600 hover:bg-gray-100"></span>
                            </div>
                            <div x-show="taxonomy.tags" class="gap-2">
                                <div class="px-3 font-medium text-sm text-gray-900">Tags</div>
                                <div class="flex-row">
                                <template x-for="tag in taxonomy.tags">
                                    <span x-text="tag" style="background-color: #f1f5f9; color: #475569;"
                                    class="rounded-md  py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm relative rounded-md px-3 mr-1 mt-1 pt-1"></span>
                                </template>
                                </div>
                            </div>
                            <div x-show="taxonomy.labels">
                                <template x-for="label in taxonomy.labels">
                                    <span x-text="label" class="relative rounded-md px-3 pt-1 font-small text-gray-600 hover:bg-gray-100"></span>
                                </template>
                            </div>
                            <!-- Actions -->
                            <!--
                            <div class="flex mr-2">
                                <template x-for="btn in actions.filter(x => !x.overlay)">
                                    <div x-data="aclButton(btn)"></div>
                                </template>
                                <span class="" x-show="ui.condense && showMenu" x-data="aclDropdownMenuButton(dropdownParams)"></span>
                            </div>
                            -->
                        </div>

                        <!-- Link card -->
                        <!--
                        <template x-if="hasReplies(item)">
                            <div class="flex max-w bg-grey rounded-lg hover:bg-gray-50">
                                <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt="">
                                    <div class="flex flex-col justify-between p-4 leading-normal">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                    </div>
                                </a>
                            </div>
                        </template>
                        -->
                    </div>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}