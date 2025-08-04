export default function (params) {
    return {
        // PROPERTIES
        mxLink_href: '',
        mxLink_text: '',
        mxLink_helpText: '',
        init() {
            this.mxLink_text = params.mxLink_text;
            this.mxLink_href = params.mxLink_href;
            this.mxLink_helpText = params.mxLink_helpText;
        },
        // GETTERS  
        get mxLink_ahrefClass() { return 'relative flex cursor-default select-none hover:bg-neutral-100 items-center rounded px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50' },
        get mxLink_helpTextClass() { return 'ml-auto text-xs tracking-widest opacity-60' },
        get mxLink_buttonRightSvg() { return 'absolute right-0 w-5 h-5 mr-3' },
        get mxLink_buttonSubtitleClass() { return 'text-xs font-light text-neutral-400'}, 
        // METHODS
    }
}