let component = `
    <div x-data="cardPost(
    {
      item: item,
    })"></div>
`
import { mxList, mxSearch, mxWebsockets, mxAlert, mxModal, mxResponsive } from '/src/js/mixins/index.js';

export default function (data) {
    return {
        // mixins
        ...mxList(data),
        ...mxSearch(data),
        ...mxWebsockets(data),
        ...mxAlert(data),
        ...mxModal(data),
        ...mxResponsive(data),

        // PROPERTIES
        items: [],
        selectedItem: {},
        userId: '',
        searchUrl: '',
        filterEvent: '',
        modalEvent: 'open-modal-media',
        itemEvent: '',
        quoteEvent: '',
        actionUrl: '',
        actionEvent: 'modal-media-action',
        modalId: '',
        initSearch: false,

        async init() {
            const self = this;
            data = data != null ? data : {}
            this.actionUrl = data.actionUrl;
            this.items = data.items;
            this.searchUrl = data.searchUrl;
            this.userId = data.userId;
            this.initSearch = data.initSearch;
            //this.modalEvent = data.modalEvent;
            this.modalId = data.modalId;

            component = data.component || component
            // init websockets
            await this._mxWebsockets_InitWebsocketEvents(
                this.$store.wssMediaBlobs,
                this.userId,
                this.targetChannel,
                this.targetThread,
            )

            // On updates from the websocket
            this.$events.on(this.$store.wssMediaBlobs.getMessageEvent(), async (e) => {
                const data = e.data;
                if (!data) return;
                if (data.alert) this._mxAlert_AddAlert(data);
                this.updateItemUpdate(data);
            })

            // On updates from filter
            this.$events.on(this.filterEvent, async (filterUpdates) => {
                await this.search(filterUpdates);
            })
            this.$events.on(this.modalId, async (item) => {
                this.$nextTick(() => {
                    this.selectedItem = item;
                    this._mxModal_Open(this.modalId)
                })
            })
            if (this.initSearch) await this.initSearch();
            this.setHtml(data);
        },
        async initSearch() {
            let queryData = {}
            if (data.userId) queryData.userId = [data.userId]
            await this.search(queryData);
        },
        browseNextMedia() {
            if (this.selectedIndex == this.items.length) return;
            this.selectedItem = this.items[this.selectedIndex + 1];
        },
        browsePreviousMedia() {
            if (this.selectedIndex == 0) return;
            this.selectedItem = this.items[this.selectedIndex - 1];
        },

        get hasNext() {
            return this.selectedIndex < this.items.length - 1;
        },
        get hasPrevious() {
            if (this.items == null || this.items.length == 0) return false;
            return this.selectedIndex > 0;
        },
        get selectedIndex() {
            if (this.items == null) return 0;
            if (this.selectedItem == null) return 0;
            return this.items.map(x => x.id).indexOf(this.selectedItem.id)
        },

        async editItem(item) {
            await this.$fetch.PUT(this.actionUrl, item);
            this._mxModal_Close(this.modalId)
        },

        async deleteItem(item) {
            const url = this.actionUrl + "/" + item.id;
            await this.$fetch.DELETE(url);
            this._mxModal_Close(this.modalId)
        },

        CreateActivityPayload(item) {
            return {
                userId: this.userId,
                contentPostId: item.id,
                action: request.action,
                value: null,
            }
        },

        updateItemUpdate(wssMessage) {
            var item = wssMessage.data;
            if (this.items == null) this.items = [];
            if (wssMessage.update == 'Created') {
                const index = this.items.map(x => x.id).indexOf(item.id);
                if (index == -1) this.items.push(item);
                else this.items[index] = item;
            }
            if (wssMessage.update == 'Updated') {
                const index = this.items.map(x => x.id).indexOf(item.id);
                this.items[index] = item
            }
            if (wssMessage.update == 'Deleted') {
                const index = this.items.map(x => x.id).indexOf(item.id);
                this.items.splice(index, 1);
            }
        },

        // METHODS
        async search(filters) {
            let query = this._mxList_GetFilters(filters);
            const postQuery = this._mxSearch_CreateSearchQuery(query, this.userId, 0, 100);
            if (postQuery == null) return;
            this.items = await this._mxSearch_Post(this.searchUrl, postQuery);
        },

        get gridCols() {
            if (this.mxResponsive_IsXSmall) return 'col-1'
            if (this.items == null) return 'col-1'
            if (this.items.length <= 1) return 'col-1'
            if (this.items.length <= 2) return 'col-2'
            if (this.items.length <= 3) return 'col-3'
            return 'col-4';
        },
        get imageWidth() {
            if (this.items.length <= 1) return 400
            if (this.items.length <= 2) return 300
            if (this.items.length <= 3) return 200
            return 200
        },


        // METHODS
        setHtml(data) {
            // make ajax request 
            const html = `
            <div x-transition class="grid" :class="gridCols">
              <template x-for="(item, i) in items" :key="item.id+item.updatedOn || i" >
                <div>
                    <template x-if="item.type == 'Video'">
                      <div x-data="cardVideo({
                          item: item,
                          userId: userId,
                          modalEvent: modalId,
                          imageWidth: imageWidth
                        })"></div>
                    </template>
                    <template x-if="item.type == 'Image'">
                      <div x-data="cardImage({
                          item: item,
                          userId: userId,
                          modalEvent: modalId,
                          imageWidth: imageWidth
                        })"></div>
                    </template>
                </div>
              </template>
              <!--
              <template x-if="items == null || items.length == 0">
                <article class="flat">
                  <header><strong>No images found</strong></header>
                </article>
              </template>
              -->
            </div>
          
            <dialog :id="modalId" class="fullscreen">
                <article class="fullscreen">
                    <header>
                        <nav>
                        <ul>
                            <p>
                                <strong x-text="selectedItem.name"></strong>
                            </p>
                        </ul>
                        <ul>
                         
                            <!--
                            <details class="dropdown flat no-chevron">
                                <summary role="outline">
                                    <i aria-label="Close" class="icon material-icons icon-click" rel="prev">more_vert</i>
                                </summary>
                                <ul>
                                    <li><a class="click" @click="editItem(selectedItem)">Edit</a></li>
                                    <li><a class="click" @click="deleteItem(selectedItem)">Delete</a></li>
                                </ul>
                            </details>
                            -->

                            <button aria-label="Close" rel="prev" @click="_mxModal_Close(modalId)"></button>
                        </ul>
                        </nav>
                    </header>
                    <div>

                        <button aria-label="Previous" 
                            :disabled="!hasPrevious"
                            @click="browsePreviousMedia" 
                            class="material-icons floating-previous" 
                            rel="next">chevron_left</button>
        
                       <figure>
                            <img
                            :src="selectedItem.filePath"
                            onerror="this.src='/src/images/broken.jpg'"
                            :alt="selectedItem.name"
                          /> 
                        </figure>

                        <button aria-label="Next" 
                            :disabled="!hasNext"
                            @click="browseNextMedia" 
                            class="material-icons floating-next" 
                            rel="next">chevron_right</button>
    
                    </div>
                </article>
              
            </dialog> 
            `
            this.$nextTick(() => {
                this.$root.innerHTML = html
            });
        },
    }
}