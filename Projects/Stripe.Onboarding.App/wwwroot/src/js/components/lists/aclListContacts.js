import { mxContent, mxList, mxFetch } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxContent(params),
        ...mxList(params),
        ...mxFetch(params),
        // PROPERTIES
        url: '',
        cols: 1,
        // INIT
        async init() {
            this._mxContent_setValues(params);
            this._mxFetch_setValues(params);
            this._mxList_setValues(params);
            this.setValues(params);
            if (!!params.url) {
                await this.query();
            }
            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.cols = 1;
        },
        getInitials(contact) {
            if (contact == null || contact.fullName == null) return 'N/A'
            const names = contact.fullName.split(' ');
            return names.map(x => x[0]).join('');
        },
        colClass() {
            return `grid-cols-${this.cols}`;
        },
        async query() {
            // else
            this.mxFetch_loading = true;
            try {
                const payload = {
                    page: 0,
                    pageSize: 10,
                    pages: 0,
                    query: {
                        Name: this.queryText || ''
                    }
                }
                const result = await this.$fetch.GET(this.mxFetch_url, payload);

                if (result.success) {
                    result.items = result.data;
                    this._mxList_setValues(result)
                }
            } catch (e) {
                console.log(e);
            }
            this.mxFetch_loading = false;
        },
        render() {
            const html = ` 
            <div class="mb-4 grid gap-4 sm:gap-8 lg:gap-16" :class="colClass">
                <!-- Loader -->
                <div x-show="mxFetch_loading" x-data="aclCommonProgress()"></div>
                <template x-for="contact in mxList_items || []">
                    <div class="mb-4 border-b border-gray-200">
                        <div class="flex space-x-4">
                            <!--
                            <img class="h-16 w-16 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png" alt="Helene avatar" />
                            -->
                            <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <span class="font-medium text-gray-600 dark:text-gray-300" x-text="getInitials(contact)">ss</span>
                            </div>
                            <h2 x-text="contact.fullName" class="flex pl-4 items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl"></h2>
                        </div>
                        <div class="mb-4 grid gap-4 grid-cols-2 sm:gap-8 lg:gap-16">
                            <div class="space-y-4">
                                <dl>
                                    <dt class="font-semibold text-gray-900 dark:text-white">Role</dt>
                                    <dd class="flex flex-row text-gray-500 dark:text-gray-400">
                                        <svg class="w-4 h-4 text-gray-500 my-auto" x-data="aclIconsSvg({icon: 'userCircle'})"></svg>
                                        <span class="pl-1" x-text="contact.role"></span>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt class="font-semibold text-gray-900 dark:text-white">Nationality</dt>
                                    <dd class="flex flex-row text-gray-500 dark:text-gray-400">
                                        <svg class="w-4 h-4 text-gray-500 my-auto" x-data="aclIconsSvg({icon: 'globe'})"></svg>
                                        <span class="pl-1" x-text="contact.nationality"></span>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt class="font-semibold text-gray-900 dark:text-white">External Id</dt>
                                    <dd class="flex flex-row text-gray-500 dark:text-gray-400">
                                        <svg class="w-4 h-4 text-gray-500 my-auto" x-data="aclIconsSvg({icon: 'identification'})"></svg>
                                        <span class="pl-1" x-text="contact.personalId"></span>
                                    </dd>
                                </dl>
                            </div>
                            <div class="space-y-4">
                                <dl>
                                    <dt class="font-semibold text-gray-900 dark:text-white">Date of Birth</dt>
                                    <dd class="flex flex-row text-gray-500 dark:text-gray-400">
                                        <svg class="w-4 h-4 text-gray-500 my-auto" x-data="aclIconsSvg({icon: 'calendar'})"></svg>
                                        <span class="pl-1" x-text="contact.dateOfBirth"></span>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt class="font-semibold text-gray-900 dark:text-white">Phone Number</dt>
                                    <dd class="flex flex-row text-gray-500 dark:text-gray-400">
                                        <svg class="w-4 h-4 text-gray-500 my-auto" x-data="aclIconsSvg({icon: 'phone'})"></svg>
                                        <a class="text-blue-600 pl-1" href="tel:contact.phone" x-text="contact.phone"></a>
                                    </dd>
                                </dl>
                                <dl class="">
                                    <dt class="font-semibold text-gray-900 dark:text-white">Email Address</dt>
                                    <dd class="flex flex-row text-gray-500 dark:text-gray-400">
                                        <svg class="w-4 h-4 text-gray-500 my-auto" x-data="aclIconsSvg({icon: 'email'})"></svg>
                                        <a class="text-blue-600 pl-1" href="mail:contact.email" x-text="contact.email"></a>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt class="font-semibold text-gray-900 dark:text-white">Home Address</dt>
                                    <dd class="flex flex-row text-gray-500 dark:text-gray-400">
                                        <svg class="w-4 h-4 text-gray-500 my-auto" x-data="aclIconsSvg({icon: 'mapPin'})"></svg>
                                        <span class="pl-1" x-text="contact.address"></span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </template>
                <div x-show="mxList_items == null || mxList_items.length == 0"
                    class="my-4 text text-gray-600 dark:text-white sm:text-2xl ">
                    No contacts found
                </div>
            </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}