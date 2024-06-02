

export default function (data){
    return {
        init() {
            this.$watch('open', () => { })
        },
        // PROPERTIES
        mxModal_Open: false,
        mxModal_IsOpenClass: 'modal-is-open',
        mxModal_OpeningClass: 'modal-is-opening',
        mxModal_ClosingClass: 'modal-is-closing',
        mxModal_ScrollbarWidthCssVar: "--pico-scrollbar-width",
        mxModal_AnimationDuration: 300,        
        mxModal_Visible: null,
        // GETTERS
        get mxModal_Test() { return 'test' },
        // METHODS
        _mxModal_GetScrollbarWidth() {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            return scrollbarWidth;
        },
        _mxModal_Toggle(id) {
            const modal = document.getElementById(id);
            if (!modal) return;
            modal && (modal.open ? this._mxModal_Close(id) : this._mxModal_Open(id));
        },
        _mxModal_Open(id) {
            const modal = document.getElementById(id);
            if (!modal) return;
            const { documentElement: html } = document;
            const scrollbarWidth = this._mxModal_GetScrollbarWidth();
            if (scrollbarWidth) {
                html.style.setProperty(this.mxModal_ScrollbarWidthCssVar, `${scrollbarWidth}px`);
            }
            html.classList.add(this.mxModal_IsOpenClass, this.mxModal_OpeningClass);
            setTimeout(() => {
                this.mxModal_Visible = modal;
                html.classList.remove(this.mxModal_OpeningClass);
            }, this.mxModal_AnimationDuration);
            modal.showModal();
        },
        _mxModal_Close(id) {
            const modal = document.getElementById(id);
            if (!modal) return;
            this.mxModal_Visible = null;
            const { documentElement: html } = document;
            html.classList.add(this.mxModal_ClosingClass);
            setTimeout(() => {
            html.classList.remove(this.mxModal_ClosingClass, this.mxModal_IsOpenClass);
            html.style.removeProperty(this.mxModal_ScrollbarWidthCssVar);
            modal.close();
            }, this.mxModal_AnimationDuration);
        },
    }
}