import { mxTable, mxFetch, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxTable(params),
        ...mxEvent(params),
        ...mxFetch(params),
        // PROPERTIES
        expanded: false,
        queryText: null,
        component: 'aclCommonSpinner',
        // INIT
        async init() {
            this._mxTable_setValues(params);
            this.setValues(params);
            this.render();
            await this.query();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxFetch_url = params ? params.url : '';
            this.component = params.component;
            console.log(params);
        },

        async updatePage(page) {
            this.mxTable_page = page - 1;
            await this.query();
        },
        async nextPage() {
            if (this.mxTable_page == this.mxTable_pages-1) return;
            this.mxTable_page++;
            await this.query();
        },
        async previousPage() {
            if (this.mxTable_page == 0) return;
            this.mxTable_page--;
            await this.query();
        },
        async query() {
            // else
            this.mxFetch_loading = true;
            try {
                const payload = {
                    page: this.mxTable_page || 0,
                    pageSize: this.mxTable_pageSize || 10,
                    pages: this.mxTable_pages || 0,
                    query: {
                        Name: this.queryText || ''
                    }
                }
                const result = await this.$fetch.POST(this.mxFetch_url, payload);

                if (result != null && result.status == 200) {
                    result.items = result.data;
                    this._mxTable_setPaginationValues(result)
                }
                else {

                }
            } catch (e) {
                console.log(e);
            }
            this.mxFetch_loading = false;
        },
        render() {
            const html = `
                <div class="overflow-auto">
                    <!-- Loader -->
                    <div x-show="mxFetch_loading" x-data="aclCommonProgress()"></div>

                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                        <template x-for="item in mxTable_items">
                            <div x-data="aclCommonComponent({
                                componentData: item,
                                component
                            })"
                            x-cloak></div>
                        </template>
                    </div>
                        
                    <nav class="flex px-2 py-2 items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                        <div class="justify-center align-center inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <span class="">
                                Showing
                                <span class="font-semibold text-gray-900 dark:text-white" x-text="(mxTable_page + 1) + ' - '+ ((mxTable_page + 1) * mxTable_pageSize)"></span>
                                of
                                <span class="font-semibold text-gray-900 dark:text-white" x-text="mxTable_total"></span>
                            </span>
                        </div>
                        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <li x-show="mxTable_page > 0">
                                <a @click="await previousPage()" class="flex cursor-pointer  items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                            </li>
                            <template x-for="page in mxTable_totalPages">
                                <li>
                                    <a @click="await updatePage(page)"
                                    :aria-current="mxTable_page+1 == page ? 'page' : null"
                                    :class="mxTable_page+1 == page
                                        ? 'flex items-center justify-center cursor-pointer px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                        : 'flex items-center justify-center cursor-pointer px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
                                    x-text="page"></a>
                                </li>
                            </template> 
                            <li x-show="mxTable_page < mxTable_totalPages-1">
                                <a @click="await nextPage()" class="flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}