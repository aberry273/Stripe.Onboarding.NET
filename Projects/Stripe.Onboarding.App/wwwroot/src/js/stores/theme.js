export default () => ({
    // PROPERTIES
    _scheme: "auto",
    menuTarget: "details.dropdown",
    buttonsTarget: "a[data-theme-switcher]",
    buttonAttribute: "data-theme-switcher",
    rootAttribute: "data-theme",
    localStorageKey: "picoPreferredColorScheme",
    theme: 'dark',

    /*
    init() {
        this.on = window.matchMedia('(prefers-color-scheme: dark)').matches
    },
    theme: 'light',
    get isDark() { return this.theme == 'dark' },
    toggle() {
        this.theme = !this.theme == 'dark' ? 'light' : 'dark'
    }
    */
    init() {
        this.setScheme(this.schemeFromLocalStorage);
        this.initSwitchers();
    },
    // Get color scheme from local storage
    get schemeFromLocalStorage() {
        return window.localStorage?.getItem(this.localStorageKey) ?? this._scheme;
    },

    // Preferred color scheme
    get preferredColorScheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    },

    // Init switchers
    initSwitchers() {
        const buttons = document.querySelectorAll(this.buttonsTarget);
        buttons.forEach((button) => {
            button.addEventListener(
                "click",
                (event) => {
                    event.preventDefault();
                    // Set scheme
                    this.setScheme(button.getAttribute(this.buttonAttribute));
                    // Close dropdown
                    document.querySelector(this.menuTarget)?.removeAttribute("open");
                },
                false
            );
        });
    },
    toggle() {
        this.theme = !this.theme == 'dark' ? 'light' : 'dark'
        this.setScheme(this.theme);
    },
    // Set scheme
    setScheme(scheme) {
        if (scheme == "auto") {
            this._scheme = this.preferredColorScheme;
        } else if (scheme == "dark" || scheme == "light") {
            this._scheme = scheme;
        }
        this.applyScheme();
        this.schemeToLocalStorage();
    },

    // Get scheme
    get scheme() {
        return this._scheme;
    },

    // Apply scheme
    applyScheme() {
        document.querySelector("html")?.setAttribute(this.rootAttribute, this.scheme);
    },

    // Store scheme to local storage
    schemeToLocalStorage() {
        console.log('set scheme');
        window.localStorage?.setItem(this.localStorageKey, this.scheme);
    },
})