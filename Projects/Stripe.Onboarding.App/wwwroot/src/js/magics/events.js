export default () => {
    return {
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
    }
}