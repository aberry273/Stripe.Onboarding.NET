export default function (data) {
    return {
        // PROPERTIES
        mxEvent_event: '',
        init() {
        },
        // GETTERS
        // METHODS
        _mxEvent_Emit(ev, payload) {
            const event = new CustomEvent(ev, {
                detail: payload
            });
            window.dispatchEvent(event);
        },
        _mxEvent_On(ev, cb) {
            // Listen for the event.
            window.addEventListener(
                ev,
                (async (e) => await cb(e.detail))
            );
        },
    }
}