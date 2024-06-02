export default () => ({
    type: 'button',
 
    '@click'() {
        this.doSomething()
    },

    ':disabled'() {
        return this.shouldDisable
    },
})