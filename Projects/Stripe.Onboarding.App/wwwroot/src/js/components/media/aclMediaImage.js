import { mxMedia } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxMedia(params),
        // PROPERTIES  
        // INIT
        init() {
            this.setValues(params);
            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxMedia_caption = params.caption;
            this.mxMedia_src = params.src;
            this.mxMedia_alt = params.alt;
            this.mxMedia_class = params.class;
        },
        render() {
            const html = ` 
                <figcaption class="flex items-top justify-center">
                    <img 
                        x-transition:enter="transition ease-in-out duration-300" 
                        x-transition:enter-start="opacity-0 transform scale-50" 
                        x-transition:leave="transition ease-in-in duration-300" 
                        x-transition:leave-end="opacity-0 transform scale-50" 
                        :class="mxMedia_class" 
                        :src="mxMedia_src" 
                        :alt="mxMedia_alt"
                    />
                </figcaption>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}