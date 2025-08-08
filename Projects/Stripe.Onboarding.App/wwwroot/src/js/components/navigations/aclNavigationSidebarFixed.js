import { mxButton, mxContent, mxEvent, mxNavigation } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxButton(params),
        ...mxEvent(params),
        ...mxContent(params),
        ...mxNavigation(params),
        // PROPERTIES  
        // INIT
        init() {
            this._mxNavigation_SetParams(params);
            this._mxEvent_On(this.mxNavigation_event, () => {
                this.mxNavigation_open = !this.mxNavigation_open;
            })
            this.render();
        },
        // GETTERS
        // METHODS
        selectedButtonClass(item) {
            let btnClass = item.class || this.mxButton_class + ' grid text-xs'
            if (this.mxNavigation_selected &&
                (item.text.toLowerCase() === this.mxNavigation_selected.toLowerCase())) {
                btnClass += ' bg-gray-100'
            }
            return btnClass;
        },
        // RENDER
        render() {
            const html = `
            <aside 
                class="z-10 inset-y-0 flex flex-col flex-shrink-0 max-h-screen overflow-hidden transition-all transform border-r">
                <div class="h-full px-3 overflow-y-auto dark:bg-gray-800">
                    <template x-if="mxNavigation_items">
                        <ul class="space-y-2 items-center justify-between mx-auto font-medium border-b border-gray-200">
                            <template x-for="item in mxNavigation_items">
                                <li class="grid items-center">
                                    <button x-data="aclButton({
                                        ...item,
                                        class: selectedButtonClass(item),
                                        iconClass: 'flex flex-row mx-auto',
                                        textClass: ' ',
                                    })"></button>
                                </li>
                            </template>
                        </ul>
                    </template>
                    <!-- Primary Items --> 
                    <template x-if="mxNavigation_primaryItems">
                        <ul class="space-y-2 items-center justify-between mx-auto font-medium border-b border-gray-200">
                            <template x-for="item in mxNavigation_primaryItems.items">
                                <li class="grid items-center">
                                    <button x-data="aclButton({
                                        ...item,
                                        class: selectedButtonClass(item),
                                        iconClass: 'flex flex-row mx-auto',
                                        textClass: ' ',
                                    })"></button>
                                </li>
                            </template>
                        </ul>
                    </template>
                    <!--Secondary items-->
                    <template x-if="mxNavigation_secondaryItems">
                        <ul class="space-y-2 items-center justify-between mx-auto font-medium">
                            <template x-for="item in mxNavigation_secondaryItems.items">
                                <li class="grid items-center">
                                    <button x-data="aclButton({
                                        ...item,
                                        class: selectedButtonClass(item),
                                        iconClass: 'flex flex-row mx-auto',
                                        textClass: ' ',
                                    })"></button>
                                </li>
                            </template>
                        </ul>
                    </template>
                </div>
            </aside>
        `
            this.$nextTick(() => { this.$root.innerHTML = html });
        },
    }
}