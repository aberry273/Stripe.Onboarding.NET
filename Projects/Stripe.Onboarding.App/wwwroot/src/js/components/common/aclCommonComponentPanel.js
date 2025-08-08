import { mxContent, mxNavigation } from '/src/js/mixins/index.js';
import * as components from '/src/js/components/index.js'


export default function (params) {
    return {
        ...mxContent(params),
        ...mxNavigation(params),
        // PROPERTIES
        component: 'aclCommonSpinner',
        componentData: {},
        navigationData: {},
        titleClass: 'mx-auto my-auto text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl',
        containerClass: 'flex flex-row items-center justify-between flex flex-row py-2 mb-4 border-b border-gray-200 md:mb-6 ',
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
            this.navigationData = params.navigationData;
            this.navigationData.titleClass = this.titleClass;
            this.navigationData.containerClass = this.containerClass;
        },
        render() {
            const html = `
                <div class="mb-4 grid gap-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 sm:gap-8 lg:gap-16">
                    <div class="flex flex-col overflow-x-scroll flex-1 mt-4 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 lg:px-8 md:px-4 sm:px-2 xs:px-2 py-2">
                        <div 
                            x-show="!!navigationData" 
                            x-data="aclNavigationBarAction(navigationData)"></div>
                        <div x-data="getComponent(component, componentData)"></div>
                    </div>
                </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}