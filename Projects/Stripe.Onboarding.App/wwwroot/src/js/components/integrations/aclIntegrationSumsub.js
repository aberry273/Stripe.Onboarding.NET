import { mxFetch, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxEvent(params),
        ...mxFetch(params),
        // PROPERTIES
        expanded: false,
        queryText: null,
        accessToken: null,
        component: 'aclCommonSpinner',
        event_applicantStatusChange: 'idCheck.onApplicantStatusChanged',
        // INIT
        async init() {
            this.setValues(params);
            this.render();
            this.$nextTick(() => {
                this.launchWebSdk(this.accessToken);
            });
        },
        // GETTERS
        // METHODS
        setValues(params) {
            console.log(params)
            this.mxFetch_url = params ? params.url : '';
            this.accessToken = params.accessToken;
            this.lang = params.lang;
            this.translationName = params.translationName;
            this.customizationName = params.customizationName;
            this.country = params.country;
            this.email = params.email;
            this.phone = params.phone;
            this.theme = params.theme;
            this.documentDefinitions = params.documentDefinitions;
            this.autoSelectDocumentDefinitions = params.autoSelectDocumentDefinitions;
            this.controlledNavigationBack = params.controlledNavigationBack;
            this.enableScrollIntoView = params.enableScrollIntoView;
            this.applicationId = params.applicationId;
            this.accountsBusinessId = params.accountsBusinessId;
            this.accountsContactId = params.accountsContactId;
            this.accountsIndividualId = params.accountsIndividualId;
        },
        /**
         * @param accessToken - access token that you generated on the backend
         * @param applicantEmail - applicant email (not required)
         * @param applicantPhone - applicant phone (not required)
         * @param customI18nMessages - customized locale messages for current session (not required)
         */
        launchWebSdk(accessToken) {
            const self = this;
            let snsWebSdkInstance = snsWebSdk
                .init(
                    accessToken,
                    // token update callback, must return Promise
                    // Access token expired
                    // get a new one and pass it to the callback to re-initiate the WebSDK
                    () => this.getNewAccessToken()
                )
                .withConf({
                    lang: this.lang || "en", //language of WebSDK texts and comments (ISO 639-1 format)
                    email: this.email,
                    phone: this.phone,
                    country: this.country,
                    translationName: this.translationName,
                    customizationName: this.customizationName,
                    theme: this.theme || "light" | "dark",
                    autoSelectDocumentDefinitions: this.autoSelectDocumentDefinitions,
                    controlledNavigationBack: this.controlledNavigationBack,
                    enableScrollIntoView: this.enableScrollIntoView,
                })
                .withOptions({ addViewportTag: false, adaptIframeHeight: true })
                // see below what kind of messages WebSDK generates
                .on("idCheck.onStepCompleted", (payload) => {
                    console.log("onStepCompleted", payload);
                })
                .on("idCheck.onError", (error) => {
                    console.log("onError", error);
                })
                .onMessage(async (type, payload) => {
                    console.log("onMessage", type, payload);
                    if (type == this.event_applicantStatusChange) {
                        await self.updateApplication(type, payload);
                    }
                })
                .build();

            // you are ready to go:
            // just launch the WebSDK by providing the container element for it
            snsWebSdkInstance.launch("#sumsub-websdk-container");
        },

        getNewAccessToken() {
            return Promise.resolve(newAccessToken); // get a new token from your backend
        },

        async updateApplication(type, data) {
            // else
            this.mxFetch_loading = true;
            try {
                const payload = {
                    type: type,
                    applicationId: this.applicationId,
                    accountsBusinessId: this.accountsBusinessId,
                    accountsContactId: this.accountsContactId,
                    accountsIndividualId: this.accountsIndividualId,
                    ...data
                };
                console.log(this.mxFetch_url);
                const result = await this.$fetch.POST(this.mxFetch_url, payload);

                if (result != null && result.status == 200) {
                    result.items = result.data;
                    
                }
                else {

                }
            } catch (e) {
                console.log(e);
            }
            this.mxFetch_loading = false;
        },
        render() {
            const html = `
                <div id="sumsub-websdk-container"></div>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}