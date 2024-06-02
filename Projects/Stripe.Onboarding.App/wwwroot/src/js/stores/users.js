export default () => ({
    // PROPERTIES
    userId: 'anonymous',
    user: {},
    // INIT
    init() {
    },
    get getUser() { return this.user },
    // METHODS
    setUser(user) {
        this.user = user;
    },
})