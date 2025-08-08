import { emit, createClient, connectedEvent, messageEvent } from './utilities.js'

import { mxEvent, mxService } from '/src/js/mixins/index.js';

export default function (settings) {
    return {
        ...mxEvent(settings),
        ...mxService(settings),
        items: [],
        socket: null,
        settings: {},
        client: null,
        connectionId: null,
        wssEvent: null,
        async init() {
            await this.initializeWssClient()
        },
        async initializeWssClient() {
            this.settings = settings;
            this.wssEvent = settings.wssEvent;
            const self = this;
            // Start the connection.
            try {
                this.client = await createClient(this.settings.url, this.wssEvent)
                if (!this.client) return;
                
                await this.client.start();
                this.connectionId = this.client.connection.connectionId;
                emit(this.wssEvent, connectedEvent, this.client.connection.connectionId);
            } catch (err) {
                console.error(err);
                //setTimeout(createClient, 5000);
            }
        },
        setItems(items) {
            this.items = items;
        },
        insertOrUpdateItems(originalItems, updateitems) { 
            const originalItemIds = originalItems.map(x => x.id) || []
            const updateItemIds = updateitems.map(x => x.id) || []
            for (let i = 0; i < updateItemIds.length; i++) {
                const index = updateItemIds[i];
                if (originalItemIds.indexOf(index) == -1) {
                    originalItems.push(updateitems[i])
                } 
            }
            return originalItems
        },
        updateItems(items, wssMessage) {
            var item = wssMessage.data;
            let emptyItems = false;
            if (items == null) {
                items = [];
                emptyItems = true;
            }
            if (wssMessage.update == 'Created') {
                const index = items.map(x => x.id).indexOf(item.id);
                if (index == -1) items.unshift(item);
                else items[index] = item
            }
            if (wssMessage.update == 'Updated') {
                const index = items.map(x => x.id).indexOf(item.id);
                items[index] = item
                this._mxEvents_Emit(item.id, item);
            }
            if (wssMessage.update == 'Deleted') {
                const index = items.map(x => x.id).indexOf(item.id);
                items.splice(index, 1);
            }
            return items;
        },
        getMessageEvent() {
            return `${this.wssEvent}:${messageEvent}`;
        },
        getConnectedEvent() {
            return `${this.wssEvent}:${connectedEvent}`;
        },
        async connectUser(userId) {
            await this.client.invoke("UserRequest", this.connectionId, userId)
        },
        // Custom logic
    }
}