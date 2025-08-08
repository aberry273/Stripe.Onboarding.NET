export default function (data) {
    return {
        // PROPERTIES
        mxCard_href: '',
        mxCard_img: '',
        mxCard_label: '',
        mxCard_title: '',
        mxCard_subtitle: '',
        mxCard_text: '',
        mxCard_subtext: '',
        init() {},
        // GETTERS 
        get mxCard_helpTextClass() { return 'ml-auto text-xs tracking-widest opacity-60' }, 
        get mxCard_helpTextClass() { return 'ml-auto text-xs tracking-widest opacity-60' }, 
        get mxCard_helpTextClass() { return 'ml-auto text-xs tracking-widest opacity-60' }, 
        get mxCard_helpTextClass() { return 'ml-auto text-xs tracking-widest opacity-60' }, 
        get mxCard_helpTextClass() { return 'ml-auto text-xs tracking-widest opacity-60' }, 
        // METHODS
        _mxCard_SetValues(params) {
            if (!params) return;
            this.mxCard_href = params.href;
            this.mxCard_img = params.img;
            this.mxCard_label = params.label;
            this.mxCard_title = params.title;
            this.mxCard_subtitle = params.subtitle;
            this.mxCard_text = params.text;
            this.mxCard_subtext = params.subtext;
        },
    }
}