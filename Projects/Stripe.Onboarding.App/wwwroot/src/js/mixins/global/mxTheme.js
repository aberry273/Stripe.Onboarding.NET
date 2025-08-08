export default function (data) {
    return {
        // PROPERTIES

        init() {
        },
        // GETTERS
        // METHODS
        _mxEvents_Emit(ev, payload) {
            const event = new CustomEvent(ev, {
                detail: payload
            });
            window.dispatchEvent(event);
        },
        _mxEvents_On(ev, cb) {
            // Listen for the event.
            window.addEventListener(
                ev,
                (async (e) => await cb(e.detail))
            );
        },
    }
}