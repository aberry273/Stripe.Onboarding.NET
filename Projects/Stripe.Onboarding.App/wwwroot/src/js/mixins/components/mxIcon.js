export default function (data) {
    return {
        // PROPERTIES
        // Path property of icon
        mxIcon_svgPath: '',
        // Raw SVG of icon
        mxIcon_svgHtml: '',
        // Name of HeroIcon (CamelCase)
        mxIcon_name: '',
        // Label with icon
        mxIcon_label: '',
        // class
        mxIcon_class: '',
        // Icons
        mxIcon_cog: 'cog',
        init() {},
        // GETTERS
        // OBSOLETE
        get mxIcon_billingSvgHtml() { return '<rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line>'}, 
        get mxIcon_settingsSvgHtml() { return '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>'}, 
        get mxIcon_profileSvgHtml() { return '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>'}, 
        get mxIcon_shortcutSvgHtml() { return '<rect width="20" height="16" x="2" y="4" rx="2" ry="2"></rect><path d="M6 8h.001"></path><path d="M10 8h.001"></path><path d="M14 8h.001"></path><path d="M18 8h.001"></path><path d="M8 12h.001"></path><path d="M12 12h.001"></path><path d="M16 12h.001"></path><path d="M7 16h10"></path>'}, 
        get mxIcon_expandSvgHtml() { return '<path d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path></circle>'}, 
        get mxIcon_expandPath() { return 'M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'}, 
        // IN USE
        get mxIcon_classLarge() { 'w-6 h-6' },
        get mxIcon_classMedium() { 'w-5 h-5' },
        get mxIcon_classSmall() { 'w-4 h-4 mr-2' },
        get mxIcon_buttonRightSvg() { return 'absolute right-0 w-5 h-5 mr-3' },
        get mxIcon_buttonSubtitleClass() { return 'text-xs font-light text-neutral-400'}, 
        // METHODS
        _mxIcon_CreateSvgPath(path) {
            return `<path stroke-linecap="round" stroke-linejoin="round" d="${path}" />`
        },
        _mxIcon_CreateSvgHtml(html) {
            return `<path stroke-linecap="round" stroke-linejoin="round" d="${path}" />`
        }
    }
}