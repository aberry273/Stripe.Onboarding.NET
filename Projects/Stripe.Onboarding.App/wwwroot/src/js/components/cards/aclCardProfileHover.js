import { mxContent, mxIcon, mxLink, mxNavigation } from '/src/js/mixins/index.js';

export default function (params) {
	return {
        ...mxContent(params),
        ...mxNavigation(params),
        ...mxLink(params),
        // PROPERTIES
        open: false,
        showMenu: false,
        hoverCardHovered: false,
        hoverCardDelay: 600,
        hoverCardLeaveDelay: 500,
        hoverCardTimout: null,
        hoverCardLeaveTimeout: null,
 
        // INIT
        init() {
            this.render();
            params = params || {}
            this.setValues(params);
        },
        // GETTERS
        // METHODS
        setValues(params) {
            this.mxIcon_name = params.icon;
            this.mxLink_text = params.displayName;
            this.mxLink_href = params.href;
            this.mxContent_img = params.img;
            this.mxContent_title = params.displayName;
            this.mxContent_subtitle = params.username;
            this.mxContent_text = params.description;
            this.mxContent_subtext = params.date;
        },
        hoverCardEnter () {
            clearTimeout(this.hoverCardLeaveTimeout);
            if(this.hoverCardHovered) return;
            clearTimeout(this.hoverCardTimout);
            this.hoverCardTimout = setTimeout(() => {
                this.hoverCardHovered = true;
            }, this.hoverCardDelay);
        },
        hoverCardLeave () {
            clearTimeout(this.hoverCardTimout);
            if(!this.hoverCardHovered) return;
            clearTimeout(this.hoverCardLeaveTimeout);
            this.hoverCardLeaveTimeout = setTimeout(() => {
                this.hoverCardHovered = false;
            }, this.hoverCardLeaveDelay);
        },
        render() {
            const html = `
                <span class="relative" @mouseover="hoverCardEnter()" @mouseleave="hoverCardLeave()">
                
                <a :href="mxLink_href" x-text="mxLink_text" class="cursor-pointer hover:underline mb-2 font-bold tracking-tight text-gray-900"></a>           
                
                <div x-show="hoverCardHovered" class="absolute top-0 w-[365px] max-w-lg mt-5 z-30 -translate-x-1/2 translate-y-3 left-1/2" x-cloak>
                    <div x-show="hoverCardHovered" class="w-[full] h-auto bg-white space-x-3 p-5 flex items-start rounded-md shadow-sm border border-neutral-200/70" x-transition>
                        <img :src="mxContent_img" :alt="mxContent_title" class="rounded-full w-14 h-14" />
                        <div class="relative">
                            <div>    
                                <span class="mb-1 font-bold" x-text="mxContent_title"></span>
                                <span class="mb-1 text-gray-400" x-text="mxContent_subtitle"></span>
                            </div>
                            <p class="mb-1 text-sm text-gray-600" x-text="mxContent_text"></p>
                            
                            <p class="flex items-center space-x-1 text-xs text-gray-400">
                                <svg class="w-4 h-4 mr-2" x-data="aclIconsSvg({mxIcon_name})"></svg>
                                <span x-text="mxContent_subtext"></span>                  
                            </p>
                        </div>
                    </div>
                </div>
            </span>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}