import { emit, createClient, connectedEvent, messageEvent } from './utilities.js'
import wssService from './wssService.js'
import { mxAlert, mxList, mxSearch } from '/src/js/mixins/index.js';
const wssContentPostActionsUpdate = 'wss:post:action';
const quoteEvent = 'action:post:quote';
export default function (settings) {
    return {
        postbackUrl: 'wssContentPosts.postbackUrl',
        queryUrl: 'wssContentPosts.queryUrl',
        actions: [],
        quotedPosts: [],
        //cachedFilters: {},
        // mixins
        ...mxAlert(settings),
        ...mxList(settings),
        ...mxSearch(settings),
        // inherited
        ...wssService(settings),

        async init() {
            this.postbackUrl = settings.postbackUrl;
            this.queryUrl = settings.queryUrl;
            this.userId = settings.userId;
            await this.initializeWssClient();
            await this.connectUser(settings.userId);

            // On updates from the websocket 
            this._mxEvents_On(this.getMessageEvent(), async (e) => {
                const data = e.data;
                if (!data) return;
                if (data.alert) this._mxAlert_AddAlert(data);
                this.items = this.updateItems(this.items, data);
            })
            // Listen for wssContentPostActionsUpdate
            this._mxEvents_On(wssContentPostActionsUpdate, async (data) => {
                if (!data) return;
                this.actions = this.updateItems(this.actions, data);
            })
            // Listen of post quoting
            // Not used right now - to be used as state for editForm t
            /*
            this._mxEvents_On(quoteEvent, async (item) => {
                const threadKey = item.threadId;
                const index = this.quotes.indexOf(threadKey);
                if (index > -1) return;
                if (index == -1) {
                    this.quotes.push(threadKey)
                }  
            })
            */
        },
        // Custom logic
        async SearchPosts(filters, searchUrl) {
            let query = this._mxList_GetFilters(filters);
            const postQuery = this._mxSearch_CreateSearchQuery(query, this.userId);
            if (postQuery == null) return;
            return await this._mxSearch_Post(searchUrl || this.queryUrl, postQuery);
        },
        // Custom logic
        /*
        async Filter(filters) {
            const key = this.CreateFilterKey(filters);
            const result = await this.SearchPosts(filters)
            this.cachedFilters[key] = result;

            this.items = this.insertOrUpdateItems(this.items, result.posts);
            this.actions = this.insertOrUpdateItems(this.actions, result.actions);
        },
        */
        CreateFilterKey(filters) {
            let query = this._mxList_GetFilters(filters);
            const postQuery = this._mxSearch_CreateSearchQuery(query, this.userId);
            return JSON.stringify(postQuery);
        },
        async SearchByUrl(searchUrl, filters, replace = false) {
            const result = await this.SearchPosts(filters, searchUrl)
            this.setSearchResults(result, replace);
        },
        async Search(filters, replace = false) {
            const result = await this.SearchPosts(filters)
            this.setSearchResults(result, replace);
        },
        setSearchResults(result, replace = false) {
            if (replace) {
                console.log('replacing items');
                this.items = result.posts;
                this.quotedPosts = result.quotedPosts;
                this.actions = result.actions;
            }
            else {
                this.items = this.insertOrUpdateItems(this.items, result.posts);
                this.quotedPosts = this.insertOrUpdateItems(this.items, result.quotedPosts);
                this.actions = this.insertOrUpdateItems(this.actions, result.actions);
            }
        },
        GetPostAction(postId, userId) {
            const actions = this.actions.filter(x => x.userId == userId && x.contentPostId == postId);
            if (actions == null || actions.length == 0) return null;
            return actions[0];
        },
        GetQuotePost(quotedPostId) {
            return this.quotedPosts.filter(x => x.id == quotedPostId)[0];
        },
        FilterPostsById(postIds) {
            return this.items.filter(x => postIds.indexOf(x.id) > -1);
        },
        CheckUserPostAction(postId, userId, actionType) {
            const action = this.GetPostAction(postId, userId);
            if (action == null) return false;
            return action[actionType] === true;
        },
    }
}