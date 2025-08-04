import { mxContent, mxIcon, mxButton, mxList, mxFetch, mxEvent, mxSocial } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxContent(params),
        ...mxIcon(params),
        ...mxButton(params),
        ...mxList(params),
        ...mxFetch(params),
        ...mxEvent(params),
        ...mxSocial(params),
        // PROPERTIES
        tooltipArrow: true,
        tooltipPosition: '',
        // redirect for navigating the user to the comment page
        // inline for opening up replies on click of replies
        loading: false,
        postItems: [],
        actionItems: [],
        menuItems: [],
        // INIT
        async init() {
            this._mxSocial_SetParams(params);
            this.setParams(params);
            this.render();
            if (this.mxSocial_websockets) await this._mxSocial_WssUnshiftItem();
            if (this.mxSocial_searchOnInit) await this._mxSocial_Search();
        },
        // GETTERS 
        get modeThread() {
            return this.mxSocial_mode == 'thread'
        },
        get modeInline() {
            return this.mxSocial_mode == 'inline'
        },
        // METHODS
        setParams(params) {

        },
        replies() {
            return JSON.parse(JSON.stringify(replyItems))
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * max);
        },
        hasReplies(item) {
            if (item == null || !item.ui) return false;
            return item.ui.showReplies;
        },
        render() {
            const html = `
            <div class="flex flex-col w-full max-w ">
                <div x-show="loading" class="ml-2 ma-4" x-data="aclCommonSpinner({ text: 'Loading comments..' })"></div>
                <template x-for="(item, i) in mxSocial_postItems" :key="item.id">
                    <div
                        x-data="aclSocialCardFeedPost(_mxSocial_GetCommentWithMenuActions(item))"
                        @on:click:replies="(ev) => { _mxSocial_TogglePostReplies(item) }"]>
                    </div>

                </template>
            </div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}