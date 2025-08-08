export default function (data) {
    return {
        // PROPERTIES
        mxCard_img: '',
        mxCard_label: '',

        mxSocial_postItems: [],
        mxSocial_actionItems: [],
        mxSocial_menuItems: [],
        mxSocial_showReplies: true,
        mxSocial_searchOnInit: false,
        mxSocial_websockets: true,
        mxSocial_toggleChat: false,
        mxSocial_mode: '',
        mxSocial_showline: false,
        mxSocial_url: '',
        mxSocial_userId: '',
        mxSocial_params: {},
        init() { },
        // GETTERS  
        get mxCard_helpTextClass() { return 'ml-auto text-xs tracking-widest opacity-60' },
        // METHODS
        _mxSocial_SetParams(params) {
            this.mxSocial_mode = params.mode || 'redirect';
            this.mxSocial_showline = params.showline;
            this.mxSocial_websockets = params.websockets;
            this.mxSocial_searchOnInit = params.searchOnInit || false;
            this.mxSocial_postItems = params.postItems;
            this.mxSocial_actionItems = params.actionItems;
            this.mxSocial_menuItems = params.menuItems;
            this.mxSocial_showReplies = params.showReplies;
            this.mxSocial_userId = params.userId;
            this.mxSocial_url = params.url;
            this.mxSocial_params = params.params;
        }, 

        async _mxSocial_WssPushItem() {
            this._mxEvent_On(this.$store.wssSvcPosts.getMessageEvent(), (result) => {
                const data = result.data.data;
                this.mxSocial_postItems.push(data);
            })
        },
        async _mxSocial_WssUnshiftItem() {
            this._mxEvent_On(this.$store.wssSvcPosts.getMessageEvent(), (result) => {
                const data = result.data.data;
                this.mxSocial_postItems.unshift(data);
            })
        },
        async _mxSocial_Fetch(url, id) {
            const self = this;
            self.loading = true;
            const existingPost = this.mxSocial_postItems.filter(x => x.id == id)[0];
            if (!!existingPost) return existingPost;
            if (url) {
                let result = await self._mxFetch_Post(url, self.mxSocial_params);
                return result.posts;
                self.loading = false;
            } 
        },
        async _mxSocial_Search() {
            const self = this;
            self.loading = true;
            var delayInMilliseconds = 400;
            //setTimeout(async function () {
                if (self.mxSocial_url) {
                    let result = await self._mxFetch_Post(self.mxSocial_url, self.mxSocial_params);
                    self.mxSocial_postItems = result.status == 200
                        ? result.posts
                        : [];
                    self.loading = false;
                }
            //}, delayInMilliseconds);
        },
        _mxSocial_TogglePostReplies(post) {
            post.toggle = !post.toggle;
        },
        _mxSocial_GetCommentWithMenuActions(item) {
            // assign the menu actions to only what is available in the items menu array
            const menu = this._mxSocial_FilterAvailableActions(this.mxSocial_menuItems, item.menu);
            item.menu = this._mxSocial_AssignActionsItemAsValue(menu, item);
        
            const actions = this._mxSocial_FilterAvailableActions(this.mxSocial_actionItems, item.actions);

            const itemActions = this._mxSocial_AssignActionsItemAsValue(actions, item);
            
            item.actions = JSON.parse(JSON.stringify(itemActions));
            item.ui = {
                ...item.ui,
                mdoe: this.mxSocial_mode,
                showline: this.mxSocial_showline,
            }

            return item;
        },
        _mxSocial_FilterAvailableActions(actions, available) {
            if (available == null) return [];
            return actions.filter(x => available.indexOf(x.name) > -1);
        },
        _mxSocial_AssignActionsItemAsValue(actions, item) {
            return actions.map(x => {
                if (x.href && item.ui.href) x.href = item.ui.href;
                x.value = { ...item };
                return x;
            });
        },
        _mxSocial_HasReplies(post) {
            //const children = this.mxSocial_postItems.filter(x => x.id == post.related.parentId);
         
            //return this.mxSocial_showReplies && children.length;
            return this.mxSocial_showReplies
                && post.replies != null
                && post.replies.profiles != null
                && post.replies.profiles.length > 0
        }
    }
}