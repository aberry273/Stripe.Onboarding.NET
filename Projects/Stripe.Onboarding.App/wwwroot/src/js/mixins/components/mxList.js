export default function (params) {
    return {
        // PROPERTIES
        mxList_items: [],
        init() {
        },
        // GETTERS  
        get mxList_itemClass() { return '' },
        // METHODS
        _mxList_setValues(params) {
            params = params || {};
            this.mxList_items = params.items;
        }
    }
}