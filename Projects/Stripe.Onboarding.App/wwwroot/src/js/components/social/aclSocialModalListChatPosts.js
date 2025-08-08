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
        right: true,
        bottom: false,
        apiUrl: '',
        formLoaded: false,
        formParams: {},
        formData: {},
        actions: [],
        item: null,
        userId: null,
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
            this.userId = params.userId;
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
                this.closeModal();
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

        },
        render() {
            const html = `
                <div x-show="mxModal_open" class="h-screen shadow-lg bottom-0 flex flex-col justify-end">
                    <!--Frame-->
                    <div class="flex w-full min-w-full overflow-hidden justify-start items-center flex-col h-full bottom-0 py-5 bg-white border-l shadow-lg border-neutral-100/70">
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

                                    <!--Feed-->
                                    <template x-if="!!item">
                                        <div class="xl:pa-8 lg:pa-6 md:pa-4 sm:pa-2 overflow-y-scroll"
                                            x-data="aclSocialListChatPosts( {
                                                url: apiUrl,
                                                params: {
                                                    filters: [
                                                        {
                                                            name: 'related.parentId',
                                                            value: item.id,
                                                        }
                                                    ],
                                                    itemsPerPage: 1,
                                                    page: 0,
                                                    query: null,
                                                    userId: userId
                                                },
                                                userId: userId,
                                                mode: 'inline',
                                                key: 'children',
                                                websockets: true,
                                                showline: true,
                                                showReplies: true,
                                                searchOnInit: true,
                                                menuItems: commentMenu,
                                                actionItems: commentActions,
                                            })">
                                        </div>
                                    </template>

                                    <template x-if="formLoaded">
                                        <div style="margin-bottom: 8px;" x-data="aclSocialFormPost(formParams)" @submit="onSubmit"></div>
                                    </template>
                                </div>
                            </div>
                    </div>
                    <!--End Frame-->
                 
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}