export default () => ({
    init() {},
    data: {},
    setVal(key, value) {
        this.data[key] = value;
    },
    getVal(key) {
        return this.data[key];
    },
    // getter
    get settings() { return this.data},
})