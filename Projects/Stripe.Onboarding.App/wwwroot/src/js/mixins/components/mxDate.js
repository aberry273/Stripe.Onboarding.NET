const minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;
export default function (params) {
    return {
        // PROPERTIES
        mxDate_date: '',
        mxDate_locale: 'en-AU',
        init() {
            this.mxDate_date = params.date;
            this.mxDate_locale = params.locale;
        },
        // GETTERS  
        get $mxDate_buttonRightSvg() { return 'absolute right-0 w-5 h-5 mr-3' }, 
        // METHODS
        _mxDate_FormatShortString(str) {
            const d = new Date(str);
            var delta = Math.round((+new Date - d) / 1000);
            if (delta < day) {
                return d.toLocaleTimeString({ hour: "2-digit", minute: "2-digit" });
            } else {
                return d.toLocaleDateString(this.mxDate_locale, {month: 'short', day: 'numeric'});
            }
        },
        _mxDate_FormatString(str) {
            const d = new Date(str);
            var delta = Math.round((+new Date - d) / 1000);

            var fuzzy;

            if (delta < 30) {
                fuzzy = 'just now';
            } else if (delta < minute) {
                fuzzy = delta + ' moments ago';
            } else if (delta < 2 * minute) {
                fuzzy = 'a minute ago.'
            } else if (delta < hour) {
                fuzzy = Math.floor(delta / minute) + ' minutes ago.';
            } else if (Math.floor(delta / hour) == 1) {
                fuzzy = '1 hour'
            } else if (delta < day) {
                fuzzy = Math.floor(delta / hour) + ' hours ago.';
            } else if (delta < day * 2) {
                fuzzy = 'yesterday';
            } else {
                fuzzy = d.toLocaleDateString({ day: '2-digit', hour: "2-digit", minute: "2-digit" });
            }
            return fuzzy;
        },
    }
}