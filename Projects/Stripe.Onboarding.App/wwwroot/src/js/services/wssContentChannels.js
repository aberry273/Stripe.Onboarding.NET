import { emit, createClient, connectedEvent, messageEvent } from './utilities.js'
import wssService from './wssService.js'
import {mxAlert, mxFetch, mxList, mxSearch } from '/src/js/mixins/index.js';

export default function (settings) {
    return {
        // properties
        postbackUrl: 'wssContentChannels.postbackUrl',
        queryUrl: 'wssContentChannels.queryUrl',
        // mixins
        ...mxFetch(settings),
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
            this._mxEvents_On(this.getMessageEvent(), async (e) => {
                const data = e.data;
                if (!data) return;
                if (data.alert) this._mxAlert_AddAlert(data);
                this.items = this.updateItems(this.items, data);
            })
        },
        // Custom logic
        async Search(filters) {
            let query = this._mxList_GetFilters(filters);
            const postQuery = this._mxSearch_CreateSearchQuery(query, this.userId);
            if (postQuery == null) return;
            const result = await this._mxSearch_Post(this.queryUrl, postQuery);
            this.setItems(result.posts);
            this.actions = result.actions;
        },
    }
}