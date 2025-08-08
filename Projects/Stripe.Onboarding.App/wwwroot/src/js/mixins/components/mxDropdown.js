export default function (data) {
    return {
        mxDropdown_inputClass: 'block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50',
        // PROPERTIES
        mxDropdown_selected: null,
        mxDropdown_open: false,
        mxDropdown_placeholder: null,
        mxDropdown_imageSrc: 'https://cdn.devdojo.com/images/may2023/adam.jpeg',
        mxDropdown_groups: [],
        init() { 
        },
        // GETTERS  
        get mxDropdown_buttonClass() { return 'inline-flex items-center justify-center h-12 py-2 pl-3 pr-12 text-sm font-medium transition-colors bg-white border rounded-md text-neutral-700 hover:bg-neutral-100 active:bg-white focus:bg-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none'},     
        get mxDropdown_imageClass() { return 'object-cover w-8 h-8 border rounded-full border-neutral-200' },     
        get mxDropdown_buttonClass() { return 'inline-flex items-center justify-center h-12 py-2 pl-3 pr-12 text-sm font-medium transition-colors bg-white border rounded-md text-neutral-700 hover:bg-neutral-100 active:bg-white focus:bg-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none'},     
        get mxDropdown_buttonTextContainerClass() { return 'flex flex-col items-start flex-shrink-0 h-full ml-2 leading-none translate-y-px'},     
        get mxDropdown_buttonSubtitleClass() { return 'text-xs font-light text-neutral-400'},     
        
        
        // METHODS
        _mxField_onChange(field) {
        },
    }
}