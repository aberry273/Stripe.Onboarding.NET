
import { mxEvents } from '/src/js/mixins/index.js';
export default function (data) {
    return {
        ...mxEvents(data),
        // PROPERTIES
        mxAlert_EventAdd: 'snackbar-add',
        mxAlert_EventShow: 'snackbar-show',
        init() {
        },
        // GETTERS
        get mxModal_Test() { return true },
        // METHODS
        _mxAlert_SendAlert(event, data) {
            const snackbarType = (data.code == 200) ? 'success' : 'error';
            const wasSuccess = (data.code == 200) ? 'successfully' : 'failed';
            const message = `${data.update} post ${wasSuccess}`
            this._mxEvents_Emit(this.mxAlert_EventShow, { code: data.code, type: snackbarType, text: message });
        },
        _mxAlert_AddAlert(data) {
            const snackbarType = (data.code == 200) ? 'success' : 'error';
            const wasSuccess = (data.code == 200) ? 'successfully' : 'failed';
            const message = `${data.update} post ${wasSuccess}`
            this._mxEvents_Emit(this.mxAlert_EventAdd, { code: data.code, type: snackbarType, text: message });
        },
    }
}