let component = `
    <div x-data="cardPost(
    {
      item: item,
    })"></div>
`
import { mxList, mxSearch, mxWebsockets, mxAlert } from '/src/js/mixins/index.js';
export default function (data) {
    return {
        // mixins
        ...mxList(data),
        ...mxSearch(data),
        //...mxAction(data),
        ...mxWebsockets(data),
        ...mxAlert(data),

        // PROPERTIES
        items: [],
        userId: '',
        searchUrl: '',
        filterEvent: '',
        actionEvent: '',
        parentId: '',
        itemEvent: '',
        quoteEvent: '',
        loading: false,

        async init() {
            const self = this;
            data = data != null ? data : {}
            this.items = data.items;
            this.filterEvent = data.filterEvent;
            this.actionEvent = data.actionEvent;
            this.itemEvent = data.itemEvent;
            this.searchUrl = data.searchUrl;
            this.userId = data.userId;
            this.parentId = data.parentId;
            this.targetChannel = data.targetChannel;
            this.quoteEvent = data.quoteEvent;
            this.filters = data.filters;

            component = data.component || component

            this.loading = true;
            await this.initSearch();
            this.loading = false;

            this.setHtml(data);
        },
        async initSearch() {
            let queryData = this.filters || {}
            await this.$store.wssContentPosts.SearchByUrl(this.searchUrl, queryData);
        },
        get threadItems() {
            return this.$store.wssContentPosts.items.filter(x => x.parentId == this.parentId);
        },

        // METHODS
        setHtml(data) {
            // make ajax request 
            const html = `
            <div x-transition class="list" :class="loading ? 'loading-padding' : ''">
              <template x-for="(item, i) in threadItems" :key="item.id || i" >
              <div>
              <div class="line-in"></div>
                <div class="primary" x-data="cardPost({
                  item: item,
                  userId: userId,
                  actionEvent: actionEvent,
                  updateEvent: item.id,
                })"></div>
              </template>
              <template x-if="threadItems == null || threadItems.length == 0">
                <article>
                  <header><strong>No replies!</strong></header>
                  It looks not there are no replies
                </article>
              </template>
              </div
            </div>
            `
            this.$nextTick(() => {
                this.$root.innerHTML = html
            });
        },
    }
}