export default function (params) {
    return {
        // PROPERTIES
        mxExample_open: false,
        init() {

        },
        // GETTERS  
        get mxModal_getOpenClass() { return 'absolute right-0 w-5 h-5 mr-3' },
        // METHODS
        _mxExample_setValues(params) {
            this.mxExample_open = params.open;
        },
        _mxExample_toggle() {
            this.mxExample_open = !this.mxExample_open;
        },
    }
}