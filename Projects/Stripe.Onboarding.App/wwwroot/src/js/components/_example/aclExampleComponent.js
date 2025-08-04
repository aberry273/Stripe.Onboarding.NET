import { mxExample } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxExample(params),
        // PROPERTIES
        customProperty: false,
        // INIT
        init() {
            this.setValues(params || {});
            this.render();
        },
        // GETTERS
        // METHODS
        close() {
            this.mxExample_open = false;
        },
        setValues(params) {
            this._mxExample_setValues(params || {});
        },
        render() {
            const html = `
            <div class="dropdown" :open="mxExample_open">
                aclExampleComponent
            </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}