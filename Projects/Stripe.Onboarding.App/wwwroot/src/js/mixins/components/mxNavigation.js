export default function (data) {
    return {
        // PROPERTIES
        mxNavigation_headerLinkClass: 'mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-grey-200',
        mxNavigation_headerButtonClass: 'inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white dark:bg-grey-800 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none',
        mxNavigation_footerLinkClass: 'text-base leading-6 text-gray-500 hover:text-gray-900',

        // Side navigation
        mxNavigation_event: 'on:navigation:sidebar',
        mxNavigation_canMinimize: true,
        mxNavigation_open: false,
        mxNavigation_hideWhenClosed: false,

        mxNavigation_selected: null,
        mxNavigation_items: [],
        mxNavigation_groups: [],
        mxNavigation_primaryItems: [],
        mxNavigation_secondaryItems: [],
        mxNavigation_containerClass: 'flex flex-row items-center justify-between md:flex-row full-w',
        mxNavigation_titleClass: 'x-auto my-auto text-lg lg:text-xl xl:text-xl md:text-md sm:text-sm font-black leading-none text-gray-900 dark:text-white select-none',
        init() {
        },
        // GETTERS - Move these to properties instead of getters
        get mxNavigation_getSectionClass() { return 'z-50 w-full lg:px-8 md:px-4 sm:px-2 xs:px-2 py-2 text-gray-700 ' },
        get mxNavigation_getContainerClass() { return 'flex flex-row items-center justify-between md:flex-row full-w' },
        get mxNavigation_getContainerLeftClass() { return 'relative flex md:flex-row' },
        get mxNavigation_getContainerRightClass() { return 'inline-flex items-center ml-5 space-x-6 lg:justify-end' },

        get mxNavigation_getLinkClass() { return 'flex items-center font-medium text-gray-900 dark:text-white lg:w-auto lg:items-center lg:justify-center md:mb-0' },
        get mxNavigation_getTitleClass() { return 'mx-auto my-auto text-lg lg:text-xl xl:text-xl md:text-md sm:text-sm font-black leading-none text-gray-900 dark:text-white select-none' },
        get mxNavigation_getItemsClass() { return 'flex flex-wrap items-center mx-auto my-auto text-base md:mb-0 md:pl-8 md:ml-8 sm:ml-2 xs:ml-2 md:border-l md:border-gray-200' },

        // METHODS
        _mxNavigation_SetParams(params) {
            params = params || {};
            this.mxContent_title = params.title;
            this.mxNavigation_groups = params.groups;
            this.mxNavigation_items = params.items;
            this.mxNavigation_primaryItems = params.primaryItems;
            this.mxNavigation_secondaryItems = params.secondaryItems;
            this.mxNavigation_event = params.event;
            this.mxNavigation_selected = params.selected;
            this.mxNavigation_hideWhenClosed = params.hideWhenClosed;
            this.mxNavigation_canMinimize = params.canMinimize;
            this.mxNavigation_event = params.event;
            this.mxNavigation_open = params.open;

            this.mxNavigation_containerClass = params.containerClass || this.mxNavigation_getContainerClass;
            this.mxNavigation_titleClass = params.titleClass || this.mxNavigation_getTitleClass;
        },
        _mxNavigation_selectedButtonClass(item) {
            let btnClass = item.class || this.mxButton_class
            if (this.mxNavigation_selected &&
                (item.text.toLowerCase() === this.mxNavigation_selected.toLowerCase())) {
                btnClass += ' bg-gray-100'
            }
            return btnClass;
        }
    }
}