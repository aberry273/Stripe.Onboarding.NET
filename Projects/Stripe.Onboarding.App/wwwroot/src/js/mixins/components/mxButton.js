export default function (data) {
    return {
        // PROPERTIES
        mxButton_label: '',
        mxButton_text: '',
        mxButton_textClass: '',
        mxButton_id: '',
        mxButton_event: null,
        mxButton_href: null,
        mxButton_value: null,
        mxButton_tooltip: '',
        mxButton_type: 'button',
        mxButton_color: '',
        mxButton_name: '',
        mxButton_showTooltip: false,
        mxButton_override: false,
        mxButton_disabled: false,
        mxButton_items: [],
        init() {},
        // GETTERS
        get mxButton_classColor() { return 'text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600' },
        get mxButton_class() { return `cursor-pointer flex cursor-default select-none items-center rounded px-2 py-1.5 ${this.mxButton_classColor} text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500` },
        get mxButton_classIconRounded() { return 'cursor-pointer  flex items-center justify-center w-10 h-10 bg-white border rounded-full shadow-sm cursor-pointer hover:bg-neutral-100 focus-visible:ring-gray-400 focus-visible:ring-2 focus-visible:outline-none active:bg-white border-neutral-200/70' },
        get mxButton_iconClass() { return "inline-block  focus:ring-4 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 focus:outline-none 0 rounded-lg text-sm p-1.5" },
        get mxButton_iconClassMuted() { return "inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" },
        get mxButton_labelClass() { return 'ml-2 text-xs tracking-widest opacity-60' },
        get mxButton_submitClass() { return 'inline-block w-full px-5 py-4 text-lg font-medium text-center bg-blue-600 text-white dark:text-white transition duration-200  rounded-lg hover:bg-blue-700 ease' },

        // METHODS
    }
}