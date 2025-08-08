import { mxSocial, mxFetch, mxIcon, mxContent, mxLink, mxModal, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxFetch(params),
        ...mxSocial(params),
        ...mxLink(params),
        ...mxContent(params),
        ...mxIcon(params),
        ...mxModal(params),
        ...mxModal(params),
        ...mxEvent(params),
        // PROPERTIES
        component: 'span',
        left: false,
        right: false,
        bottom: true,
        apiUrl: '',
        formLoaded: false,
        formParams: {},
        formData: {},
        actions: [],
        item: null,
        formatActions: [],
        // INIT
        async init() {
            this.setValues(params);
            await this.setEvents();
            this.render();
        },
        // GETTERS
        get leftSideClass() {
            return 'left-0 flex max-w-full lg:pl-40 md:pl-10'
        },
        get rightSideClass() {
            return 'right-0 flex max-w-full lg:pr-40 md:pr-10'
        },
        // METHODS
        setValues(params) {
            this.mxEvent_event = params.event;
            this.left = params.left;
            this.right = params.right;
            this.bottom = params.bottom;
            this.mxContent_title = params.title;
            this.mxModal_clickOutside = params.clickOutside; 

            this.apiUrl = params.apiUrl,
            this.isAuthenticated = params.isAuthenticated;
            this.item = params.item;
            // Set actual form on load of post item
            this.formData = params.form;
            this.actions = params.actions || [];
            this.formatActions = params.formatActions || [];

        },
        closeModal() {
            this.mxModal_open = false
            this.formParams = null;
            this.item = null;
            this.formLoaded = false;
        }, 
        async setEvents() {
            if (!this.mxEvent_event) return;
            const self = this;
            this._mxEvent_On(this.mxEvent_event, async (item) => {
                self.mxModal_open = true;
                const id = item.id;
                //const fetchUrl = `${this.apiUrl}/${id}`
                //const results = await this._mxSocial_Fetch(fetchUrl, id);
                //var post = !!results ? results[0] : null;
                //console.log(post);
                self.item = item;
                self.updateParentIdValue(item.id, this.formData.form);
                self.formParams = this.formData;
                self.formLoaded = true;
            })
        },
        updateParentIdValue(id, form) {
            const index = form.fields.map(x => x.name).indexOf('ParentId');
            if (index == -1) return;
            form.fields[index].value = id;
        },
        onSubmit() {
            this.mxModal_open = false;
        },
        render() {
            const html = `
            <div class="relative z-50 w-auto h-auto overflow-hidden">

                <template x-teleport="body">
                    <!--Panel-->
                    <div x-show="mxModal_open" @keydown.window.escape="closeModal" class="overflow-hidden relative z-[99]">
                        <div x-show="mxModal_open" x-transition.opacity.duration.600ms @click="closeModal" class="fixed overflow-hidden inset-0 bg-black bg-opacity-20"></div>
                        <div class="fixed bottom-0 inset-0 overflow-hidden">
                            <div
                                x-show="mxModal_open" 
                                x-transition:enter="transform transition ease-in-out duration-100 sm:duration-100"
                                x-transition:enter-start="translate-y-full"
                                x-transition:enter-end="translate-y-50"
                                x-transition:leave="transform transition ease-in-out duration-100 sm:duration-100"
                                x-transition:leave-start="translate-y-50"
                                x-transition:leave-end="translate-y-full"
                                class="h-screen bottom-0 flex flex-col justify-end">
                                <!--Frame-->
                                <div class="flex w-100 w-screen min-w-full overflow-hidden justify-start items-center flex-col h-96 py-5  bg-white border-l shadow-lg border-neutral-100/70">
                                    <div class="container">
                                        <div class="px-4 sm:px-5">
                                            <div class="flex items-start justify-between pb-1">
                                                <h2 class="text-base font-semibold leading-6 text-gray-900" id="slide-over-title">Reply to</h2>
                                                <div class="flex items-center h-auto">
                                                    <button @click="closeModal" class="top-0 right-0 z-30 flex px-3 py-2 space-x-1 text-xs font-medium uppercase border rounded-md border-neutral-200 text-neutral-600 hover:bg-neutral-100">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                        <span>Close</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="relative flex-1 mt-4">
                                            <div class="relative h-full overflow-none flex-col px-4">
                                                    
                                                <template x-if="!!item">
                                                    <div x-data="aclSocialCardChatPost(_mxSocial_GetCommentWithMenuActions(item))"></div>
                                                </template>
                                                          
                                                <template x-if="formLoaded">
                                                    <div style="margin-bottom: 8px;" x-data="aclSocialFormPost(formParams)" @submit="onSubmit"></div>
                                                </template>      
                                            </div>
                                    </div>
                                </div>
                                <!--End Frame-->
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}