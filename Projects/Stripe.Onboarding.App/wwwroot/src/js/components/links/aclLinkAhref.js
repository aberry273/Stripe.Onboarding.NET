import { mxIcon, mxContent, mxLink } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxLink(params),
        ...mxContent(params),
        ...mxIcon(params),
        // PROPERTIES
        open: false,
        // INIT
        init() {
            this.mxIcon_name = params.mxIcon_name;
            this.mxLink_text = params.mxLink_text;
            this.mxLink_label = params.mxLink_label;
            this.mxLink_href = params.mxLink_href;
            this.render();
        },
        // GETTERS
        // METHODS
        render() {
            const html = `
            <a href="${this.mxLink_href}" :class="mxLink_ahrefClass">
                <svg class="w-4 h-4 mr-2" x-data="aclIconsSvg({mxIcon_name})"></svg>
                <span>${this.mxLink_text}</span>
                <span :class="mxLink_helpTextClass" x-text="mxLink_label"></span>
            </a>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}