export default function (data) {
    return {
        // PROPERTIES
        init() {
        },
        // GETTERS
        // METHODS
        _mxCommon_UpdateRouteParam(key, val) {
            let qp = new URLSearchParams();
            if (val !== '') qp.set(key, val);
            history.replaceState(null, null, "?" + qp.toString());
        },
    }
}
