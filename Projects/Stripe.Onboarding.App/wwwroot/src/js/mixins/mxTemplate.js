export default function (data){
    return {
        init() {
            this.$watch('open', () => { })
        },
        // PROPERTIES
        mxModal_Open: false,
        // GETTERS
        get mxModal_Test() { return 'test' },
        // METHODS
        _mxModal_Toggle() {
            this.data.open = ! this.data.open
        }
    }
}