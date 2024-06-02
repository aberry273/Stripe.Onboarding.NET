export default function (data){
    return {
        // PROPERTIES
        mxWebsockets_Open: false,
        mxWebsockets_Service: null,
        mxWebsockets_Event: '',
        mxWebsockets_UserId: '',
        mxWebsockets_TargetThread: '',
        mxWebsockets_TargetChannel: '',

        // GETTERS
        get mxModal_GetOpen() { return this.mxSearch_Open },

        init() {
            this.$watch('mxWebsockets', () => { })
        },
        
        // METHODS
        _mxWebsockets_Init(data) {
            this.init();
            this.mxWebsockets_Event = data.event;
        },
        async _mxWebsockets_InitWebsocketEvents(wssService, userId, targetChannel, targetThread) {
            this.userId = userId;

            // On websocket client initialized, send channel to server
            this.$events.on(wssService.getConnectedEvent(), async (ev) => {
                await wssService.connectUser(userId);
            })
        },
    }
}