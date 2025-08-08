import { mxEvent } from '/src/js/mixins/index.js';

export default () => {
    return {
        ...mxEvent(),
        Emit(ev, payload) {
            this._mxEvent_Emit(ev, payload)
        },
        On(ev, cb) {
            this._mxEvent_On(ev, cb)
        },
        /*
        emit(ev, payload) {
            const event = new CustomEvent(ev, {
                detail: payload
            });
            window.dispatchEvent(event);
        },
        on(ev, cb) {
            // Listen for the event.
            window.addEventListener(
                ev,
                (async (e) => await cb(e.detail))
            );
        },
        */
    }
}