import { mxContent, mxIcon, mxButton, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxContent(params),
        ...mxIcon(params),
        ...mxButton(params),
        ...mxEvent(params),
        // PROPERTIES
        tooltipArrow: true,
        tooltipPosition: '',
        iconClass: '',
        // INIT
        init() {
            this.setValues(params);
            this.render();
        },
        // GETTERS
        get disabledStyle() {
            return 'pointer-events: none; cursor: default';
        },
        // METHODS
        setHover() {
            if (!this.mxButton_tooltip) return;
            this.mxButton_showTooltip = true
        },
        setLeave() {
            this.mxButton_showTooltip = false;
        },
        onClick(e) {
            if (this.mxButton_disabled) return;
            // Override any events or href and run the dispatch
            if (this.mxButton_override) {
                this.$dispatch('onclick', this.mxButton_name);
                return
            }
            // Otherwise if href is passed redirect will occur
            if (this.mxButton_href) {
                return;
            }
            e.preventDefault();
            // Otherwise if the event is passed emit the event
            if (this.mxButton_event) {
                this._mxEvent_Emit(this.mxButton_event, this.mxButton_value);
                return;
            }
            // Fallback to dispatch
            if (!!this.mxButton_name) {
                const dispatchEv = `click.${this.mxButton_name}`;
                this.$dispatch(dispatchEv);
                return;
            }
            this.$dispatch('onclick');
        },
        setValues(params) {
            this.mxIcon_name = params.icon;
            this.mxIcon_class = params.iconClass || this.mxIcon_classMedium || 'w-5 h-5';
            this.mxButton_name = params.name;
            this.mxButton_textClass = params.textClass || 'ml-2';
            this.mxButton_text = params.text;
            this.mxButton_label = params.label;
            this.mxButton_disabled = params.disabled;
            this.mxButton_href = params.href;
            this.mxButton_event = params.event;
            this.mxButton_color = params.color;
            this.mxButton_type = params.type || 'button';
            this.mxButton_value = params.value;
            this.mxButton_id = params.id;
            this.mxButton_override = params.override;
            this.mxButton_tooltip = params.tooltip;
            this.mxButton_class = params.class || this.mxButton_class;
            if (params.disabled) {
                this.mxButton_class += ' text-gray-300 dark:text-gray-300'
            }
        },
        render() {
            const html = `
            <a x-ref="btn"
                :id="mxButton_id"
                :type="mxButton_type"
                @mouseenter.debounce.750ms="setHover" 
                @mouseleave="setLeave" 
                @mouseover.away="setLeave" 
                @click="onClick"
                :disabled="mxButton_disabled"
                :href="mxButton_href"
                :class="mxButton_class"
                :value="mxButton_value"
                x-model="mxButton_value"
                :style="mxButton_disabled ? disabledStyle : 'background-color: ' + mxButton_color">
         
                <template x-if="mxIcon_name">
                    <div :class="mxIcon_class">
                       <svg class="w-5 h-5" x-data="aclIconsSvg({mxIcon_name})"></svg>
                    </div>
                </template>
                <div :class="mxButton_textClass" x-show="mxButton_text" x-text="mxButton_text"></div>
                <template x-if="mxButton_label">
                    <span :class="mxButton_labelClass" x-show="mxButton_label" x-text="mxButton_label"></span>
                </template>

                <!--tooltip-->
                <template x-if="!!mxButton_tooltip">
                    <div x-ref="tooltip" x-show="mxButton_showTooltip" :class="{ 'top-0 left-1/2 -translate-x-1/2 -mt-0.5 -translate-y-full' : tooltipPosition == 'top', 'top-1/2 -translate-y-1/2 -ml-0.5 left-0 -translate-x-full' : tooltipPosition == 'left', 'bottom-0 left-1/2 -translate-x-1/2 -mb-0.5 translate-y-full' : tooltipPosition == 'bottom', 'top-1/2 -translate-y-1/2 -mr-0.5 right-0 translate-x-full' : tooltipPosition == 'right' }" class="absolute w-auto text-sm" x-cloak>
                        <div x-show="mxButton_showTooltip" x-transition class="relative px-2 py-1 text-white bg-black rounded bg-opacity-90">
                            <p x-text="mxButton_tooltip" class="flex-shrink-0 block text-xs whitespace-nowrap"></p>
                            <div x-ref="tooltipArrow" x-show="tooltipArrow" :class="{ 'bottom-0 -translate-x-1/2 left-1/2 w-2.5 translate-y-full' : tooltipPosition == 'top', 'right-0 -translate-y-1/2 top-1/2 h-2.5 -mt-px translate-x-full' : tooltipPosition == 'left', 'top-0 -translate-x-1/2 left-1/2 w-2.5 -translate-y-full' : tooltipPosition == 'bottom', 'left-0 -translate-y-1/2 top-1/2 h-2.5 -mt-px -translate-x-full' : tooltipPosition == 'right' }" class="absolute inline-flex items-center justify-center overflow-hidden">
                                <div :class="{ 'origin-top-left -rotate-45' : tooltipPosition == 'top', 'origin-top-left rotate-45' : tooltipPosition == 'left', 'origin-bottom-left rotate-45' : tooltipPosition == 'bottom', 'origin-top-right -rotate-45' : tooltipPosition == 'right' }" class="w-1.5 h-1.5 transform bg-black bg-opacity-90"></div>
                            </div>
                        </div>
                    </div>
                </template>
            </a>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}