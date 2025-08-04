import wssSvcBase from './wssSvcBase.js'
import { mxEvent } from '/src/js/mixins/index.js';

export default function (settings) {
    return {
        // inherited
        ...wssSvcBase(settings),
        ...mxEvent(settings),

        async init() {
            this.postbackUrl = settings.postbackUrl;
            this.queryUrl = settings.queryUrl;
            this.userId = settings.userId;
            await this.initializeWssClient();
            await this.connectUser(settings.userId);

            // On update post from the websocket 
            this._mxEvent_On(this.getMessageEvent(), async (e) => {
                const msgData = e.data;
                if (!msgData) return;
            })
        },
    }
}