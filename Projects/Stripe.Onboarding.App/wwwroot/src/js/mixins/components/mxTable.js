export default function (params) {
    return {
        // PROPERTIES
        mxTable_class: 'table-fixed',
        mxTable_event: 'on:table',
        mxTable_multiSelect: false,
        mxTable_headers: [],
        mxTable_items: [],
        mxTable_page: 0,
        mxTable_pageSize: 10,
        mxTable_total: 0,
        mxTable_totalPages: 0,
        //mxTable_hasNextPage: false,
        //mxTable_hasPreviousPage: false,
        mxTable_headerTypeText: 'Text',
        mxTable_headerTypeLink: 'Link',
        mxTable_headerTypeButtons: 'Buttons',
        mxTable_headerTypeNumber: 'Number',
        mxTable_headerTypeTag: 'Tag',
        mxTable_headerTypeDate: 'Date',
        init() {
            this._mxTable_setValues(params);
        },
        // GETTERS  
        get mxTable_itemClass() { return '' }, 
        get mxTable_pageRange() {
            if (this.mxTable_totalPages <= 5) return this.mxTable_totalPages;

            if (this.mxTable_totalPages < 5) return this.mxTable_totalPages;
            const range = mxTable_page + 2;
            if (range < 5) return this.mxTable_totalPages;
            return mxTable_page + 2;
        },
        // METHODS
        _mxTable_setValues(params) {
            if (!params) return;
            this.mxTable_event = params.event || this.mxTable_event;
            this.mxTable_headers = params.headers || [];
            this.mxTable_items = params.items || [];
            this.mxTable_class = params.class || '';
            this.mxTable_query = params.query;
            this.mxTable_multiSelect = params.class || false;
            this.mxTable_page = params.page || 0;
            this.mxTable_pageSize = params.pageSize || 10;
            this.mxTable_pages = params.pages || 0;
        },
        _mxTable_setPaginationValues(params) {
            if (!params) return;
            this.mxTable_items = params.items || [];
            this.mxTable_page = params.page || 0;
            this.mxTable_pageSize = params.pageSize || 10;
            this.mxTable_total = params.total;
            this.mxTable_pages = params.pages || 0;
            this.mxTable_hasNextPage = params.hasNextPage || false;
            this.mxTable_hasPreviousPage = params.hasPreviousPage || false;
            this.mxTable_totalPages = params.totalPages || 1;
        }
    }
}