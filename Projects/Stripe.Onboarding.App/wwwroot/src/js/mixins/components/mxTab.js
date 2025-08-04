export default function (params) {
    return {
        // PROPERTIES  
        mxTab_items: [],
        mxTab_tabButtons: null,
        mxTab_selected: null,
        _mxTab_init() {
            this._mxTab_setValues(params);
        },
        // GETTERS  
        get mxTab_itemClass() { return '' },
        // METHODS
        _mxTab_setValues(params) {
            if (!params) return;
            this.mxTab_type = params.type
            this.mxTab_items = params.items;
            this.mxTab_selected = params.selected;
        },
        _mxTab_setMarkerStyle(tab) {
            if (!tab) return;
            this.$refs.tabMarker.style.width = tab.offsetWidth + 'px';
            this.$refs.tabMarker.style.height = tab.offsetHeight + 'px';
            this.$refs.tabMarker.style.left = tab.offsetLeft + 'px';
        },
        _mxTab_isSelected(tab) {
            const tabName = tab.text || tab;
            return this.mxTab_selected == tabName;
        },
        _mxTab_select(tab) {
            if (!tab) return;
            const tabName = tab.text || tab;
            this.mxTab_selected = tabName;
            //           const id = this.$id(tabName);
            const id = `${tabName}-1`;
            if (!!this.mxTab_tabButtons == 0) return;

            for (var i = 0; i < this.mxTab_tabButtons.children.length; i++) {
                const el = this.mxTab_tabButtons.children[i];
                if (el.id == id) {
                    this._mxTab_setMarkerStyle(el)
                }
            }
        },
    }
}