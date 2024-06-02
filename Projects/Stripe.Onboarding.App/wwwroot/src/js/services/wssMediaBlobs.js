import { emit, createClient, connectedEvent, messageEvent } from './utilities.js'
import wssService from './wssService.js'
import { mxAlert } from '/src/js/mixins/index.js';


export default function (settings) {
    return {
        // mixins
        ...mxAlert(settings),
        // inherited
        ...wssService(settings),

        async init() {
            await this.initializeWssClient();
            await this.connectUser(settings.userId);

            // On updates from the websocket 
            this._mxEvents_On(this.getMessageEvent(), async (e) => {
                const data = e.data;
                if (!data) return;
                if (data.alert) this._mxAlert_AddAlert(data);
                this.updateItems(data);
            })
        },
        // Custom logic
    }
}