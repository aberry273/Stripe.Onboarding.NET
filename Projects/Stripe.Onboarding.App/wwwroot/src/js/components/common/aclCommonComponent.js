import { mxContent } from '/src/js/mixins/index.js';
import * as components from '/src/js/components/index.js'


export default function (params) {
    return {
        ...mxContent(params),
        // PROPERTIES
        component: 'aclCommonSpinner',
        componentData: {},
        // INIT
        init() {
            this._mxContent_setValues(params || {});
            this.setValues(params || {});
            this.render();
        },
        // GETTERS
        // METHODS
        getComponent(component, data) {
            const aclComponent = components[component];
            return aclComponent != null ? aclComponent(data) : '';
        },
        setValues(params) {
            params = params || {};
            this.component = params.component || 'aclCommonSpinner';
            this.componentData = params.componentData;
        },
        render() {
            const html = `
                <div x-data="getComponent(component, componentData)"></div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}