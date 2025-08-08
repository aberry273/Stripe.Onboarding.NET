import { mxButton, mxContent, mxEvent, mxNavigation } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxButton(params),
        ...mxEvent(params),
        ...mxContent(params),
        ...mxNavigation(params),
        // PROPERTIES
        canMinimize: true,
        hideWhenClosed: false,
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
        setParams(params) {
        },
        buttonClass(item) {
            let btnClass = item.class || this.mxButton_class
            if (this.mxNavigation_selected &&
                (item.text.toLowerCase() === this.mxNavigation_selected.toLowerCase())) {
                btnClass += ' bg-gray-100'
            }
            return btnClass;
        },
        toggle() {
            this.mxNavigation_open = !this.mxNavigation_open;
        },
        // RENDER
        render() {
            const html = `
            <aside 
                class="z-10 inset-y-0 flex flex-col flex-shrink-0 max-h-screen overflow-hidden transition-all transform  border-r"
                :class="{'-translate-x-full lg:translate-x-0 lg:w-20': !mxNavigation_open && mxNavigation_hideWhenClosed}"
                x-cloak
                x-transition:enter="transition transform duration-300"
                x-transition:enter-start="-translate-x-full opacity-30  ease-in"
                x-transition:enter-end="translate-x-0 opacity-100 ease-out"
                x-transition:leave="transition transform duration-300"
                x-transition:leave-start="translate-x-0 opacity-100 ease-out"
                x-transition:leave-end="-translate-x-full opacity-0 ease-in"
            >
                <div class="h-full px-3 overflow-y-auto  dark:bg-gray-800">
                    <!--Title-->
                    <div class="" x-show="mxNavigation_canMinimize">
                        <div :class="mxNavigation_getContainerClass">
                            <button x-show="mxNavigation_open" @click="toggle" x-data="aclButton({ icon: 'chevronLeft'})"></button>
                            <button x-show="!mxNavigation_open" @click="toggle" x-data="aclButton({ icon: 'chevronRight'})"></button>
                        </div>
                    </div>

                    <!-- Items-->
                    <template x-for="group in mxNavigation_groups">
                        <ul class="space-y-2 items-center mb-2 justify-between mx-auto border-b border-gray-200 font-medium">
                            <li class="grid items-center text-center" x-show="mxNavigation_open">
                                <div class="select-none text-sm font-light" x-show="group.title" x-text="group.title"></div>
                            </li>
                            <template x-for="item in group.items">
                                <li class="grid items-center">
                                    <button x-show="!mxNavigation_open && mxNavigation_canMinimize" x-data="aclButton({icon: item.icon, href: item.href})"></button> 
                                    <button x-show="mxNavigation_open || !mxNavigation_canMinimize" x-data="aclButton({
                                        ...item,
                                        textClass: 'ml-0',
                                        class: _mxNavigation_selectedButtonClass(item),
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