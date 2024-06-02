export default () => ({
    init() {},
    current: 'first',
 
    items: ['first', 'second', 'third'],

    setTab(tab) {
        this.current = tab;
    },
    isSelected(tab) {
        return this.current === tab;
    }
})