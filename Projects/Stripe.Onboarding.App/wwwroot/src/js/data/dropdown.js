export default function (data){
    return {
        init() {
            // This code will be executed before Alpine
            // initializes the rest of the component.
            this.$watch('open', () => {
            })
        },
        open: false,
        
        get isOpen() { return this.open },
        
        toggle() {
            this.open = ! this.open
        }
    }
}