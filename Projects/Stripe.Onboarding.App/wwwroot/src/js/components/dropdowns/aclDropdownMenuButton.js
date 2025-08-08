import { mxContent, mxIcon, mxButton, mxDropdown } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        ...mxIcon(params),
        ...mxButton(params),
        ...mxDropdown(params),
        // PROPERTIES

        // INIT
        init() {
            this.mxContent_title = params.title;
            this.mxContent_subtitle = params.subtitle;
            this.mxDropdown_groups = params.groups;
            this.mxButton_items = params.items;
            this.mxButton_disabled = params.disabled;
            this.open = params.open;

            if (params.selected != null) {
                this.mxDropdown_selected = params.selected;
            } else {
                this.mxDropdown_selected = {
                    label: 'Select'
                }
            }
            this.render();
        },
        // GETTERS
        // METHODS
        close() {
            this.mxDropdown_open = false;
        },
        open() {
            this.mxDropdown_open = true;
        },
        onButtonClick(btn) {
            // Fallback to dispatch
            this.$dispatch('onselect', btn);
            this.mxDropdown_selected = btn;
        },
        hasItems() {
            return (!!this.mxButton_items && this.mxButton_items.length > 0)
                || (!!this.mxDropdown_groups && this.mxDropdown_groups.length > 0);
        },
        render() {
            const html = `
            <div class="relative">

            <div
                x-data="aclButton({
                    label: mxDropdown_selected.label,
                    icon: 'chevronDown'
                })"
                @onclick="mxDropdown_open = true"></div>
                            
            <div x-show="mxDropdown_open" 
                @click.away="mxDropdown_open=false"
                x-transition:enter="ease-out duration-200"
                x-transition:enter-start="-translate-y-2"
                x-transition:enter-end="translate-y-0"
                class="absolute bg-white rounded-lg shadow-sm w-60 z-50 dark:bg-gray-700"
                x-cloak>
                <!-- Buttons -->
                <div class="p-1 mt-1 bg-white border rounded-md shadow-md border-neutral-200/70 text-neutral-700">
                 
                    <template x-for="item in mxButton_items">
                        <div x-data="aclButton(item)" @onclick="onButtonClick(item)"></div>
                    </template>  
                    <!-- Grouped Buttons -->
                    <template x-for="group in mxDropdown_groups">
                        <div>
                            <div class="px-2 py-1.5 text-sm font-semibold" x-text="group.title"></div>
                            <div class="h-px my-1 -mx-1 bg-neutral-200"></div>
                            <template x-for="item in group.items">
                                <div x-data="aclButton(item)" @onclick="onButtonClick(item)"></div>
                            </template>
                        </div>
                    </template>
                    <!--
                    <a href="#" class="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline">
                        <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"/>
                        </svg>
                        Add new user
                    </a>
                    -->
                </div>
            </div>
        </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}