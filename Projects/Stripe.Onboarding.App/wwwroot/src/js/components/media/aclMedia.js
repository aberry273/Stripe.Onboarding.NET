import { mxMedia } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxMedia(params),
        // PROPERTIES 
        params: null,
        // INIT
        init() {
            this.setValues(params);
            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.params = params;
        },
        render() {
            const html = ` 
                <template x-if="params.type.toLowerCase() == mxMedia_video.toLowerCase()">
                    <div x-data="aclMediaVideo(params)"></div>
                </template>
                <template x-if="params.type.toLowerCase() == mxMedia_image.toLowerCase()">
                    <div x-data="aclMediaImage(params)"></div>
                </template>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}