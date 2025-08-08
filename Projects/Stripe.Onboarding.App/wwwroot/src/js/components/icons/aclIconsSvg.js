import { mxIcon } from '/src/js/mixins/index.js';
import * as icons from './heroIconsLibrary.js'


export default function (params) {
    return {
        ...mxIcon(params),
        // PROPERTIES
        open: false,
        // INIT
        init() {
            this.mxIcon_class = params.mxIcon_class || params.class;
            this.mxIcon_name = params.mxIcon_name || params.icon;
            this.render();
        },
        // GETTERS
        // METHODS
        getSvg(icon, mxIcon_class) {
            const iconComponent = icons[icon];
            return iconComponent != null ? iconComponent(mxIcon_class) : '';
        },
        render() {
            let html = this.getSvg(this.mxIcon_name, this.mxIcon_class);
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}