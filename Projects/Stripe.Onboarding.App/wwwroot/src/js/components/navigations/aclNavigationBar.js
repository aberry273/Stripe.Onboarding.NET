import { mxContent, mxNavigation } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxContent(params),
        ...mxNavigation(params),
        // PROPERTIES

        // INIT
        init() {
            this.mxContent_img = params.logo;
            this.mxContent_title = params.title;
            this.mxNavigation_primaryItems = params.primaryItems;
            this.mxNavigation_secondaryItems = params.secondaryItems;
            this.render();
        },
        // GETTERS
        // METHODS
        close() {
            this.open = false;
        },
        // RENDER
        render() {
            const html = `
            <section  :class="mxNavigation_getSectionClass" class="z-40 bg-white py-4">
                <div class="flex flex-row" :class="mxNavigation_getContainerClass">
                    <div :class="mxNavigation_getContainerLeftClass">
                        <a href="#_" :class="mxNavigation_getLinkClass">
                            <img x-show="mxContent_img" :src="mxContent_img" :alt="mxContent_title" class="h-8 pr-2" />

                            <span :class="mxNavigation_getTitleClass" x-text="mxContent_title"></span>
                        </a>
                        <nav :class="mxNavigation_getItemsClass">
                            <template x-for="item in mxNavigation_primaryItems">
                                <a :href="item.href" x-text="item.text" :class="item.class || mxNavigation_headerLinkClass"></a>
                            </template>
                        </nav>
                    </div>
                    <!--Desktop-->
                    <div class="lg:block md:hidden sm:hidden xs:hidden" :class="mxNavigation_getContainerRightClass">
                        <template x-for="item in mxNavigation_secondaryItems">
                            <a :href="item.href" x-text="item.text" :class="item.class || mxNavigation_headerButtonClass"></a>
                        </template>
                    </div>
                    <!--Mobile-->
                    <div class="mt-1 ml-2 lg:hidden md:flex sm:flex xs:flex" x-data="aclDropdownMenuButton({ items: mxNavigation_secondaryItems })"></div>
                </div>
            </section>
        `
            this.$nextTick(() => { this.$root.innerHTML = html });
        },
    }
}