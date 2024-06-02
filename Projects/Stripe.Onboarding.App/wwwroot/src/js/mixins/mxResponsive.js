export default function (data){
    return {
        // PROPERTIES
        mxResponsive_Small: 576,
        mxResponsive_Medium: 768,
        mxResponsive_Large: 1024,
        mxResponsive_XLarge: 1280,
        mxResponsive_XXLarge: 1536,
        
        // GETTERS
        get mxResponsive_GetWindowWidth() { return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);  },
        get mxResponsive_IsMobile() { return this.mxResponsive_IsXSmall || this.mxResponsive_IsSmall },
        get mxResponsive_IsTablet() { return this.mxResponsive_IsMedium },
        get mxResponsive_IsDesktop() { return this.mxResponsive_IsLarge || this.mxResponsive_IsXLarge || this.mxResponsive_IsXXLarge },

        get mxResponsive_IsXSmall() { return this.mxResponsive_GetWindowWidth < this.mxResponsive_Small },
        get mxResponsive_IsSmall() { return this.mxResponsive_GetWindowWidth >= this.mxResponsive_IsXSmall && this.mxResponsive_GetWindowWidth < this.mxResponsive_Medium},
        get mxResponsive_IsMedium() { return this.mxResponsive_GetWindowWidth >= this.mxResponsive_Medium && this.mxResponsive_GetWindowWidth < this.mxResponsive_Large},
        get mxResponsive_IsLarge() { return this.mxResponsive_GetWindowWidth >= this.mxResponsive_Large && this.mxResponsive_GetWindowWidth < this.mxResponsive_XLarge},
        get mxResponsive_IsXLarge() { return this.mxResponsive_GetWindowWidth >= this.mxResponsive_XLarge && this.mxResponsive_GetWindowWidth < this.mxResponsive_XXLarge},
        get mxResponsive_IsXXLarge() { return this.mxResponsive_GetWindowWidth >= this.mxResponsive_XXLarge },

        init() {
            console.log('mxResponsive')
        },
        
        // METHODS
        _mxResponsive_IsSmall() { return this.mxResponsive_GetWindowWidth < this.mxResponsive_Small },

        _mxResponsive_Init(data) {
            this.init();
        },
    }
}