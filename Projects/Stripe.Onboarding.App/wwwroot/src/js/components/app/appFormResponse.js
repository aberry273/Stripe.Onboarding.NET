
import { mxForm, mxModal, mxResponsive } from '/src/js/mixins/index.js';
const quoteEvent = 'action:post:quote';
const replyEvent = 'action:post:reply';
export default function (data) {
    return {
        ...mxForm(data),
        ...mxModal(data),
        ...mxResponsive(data),
        // PROPERTIES
        loading: false,
        fields: [],
        item: null,
        label: 'Submit',
        quoteEvent: 'quote:post',
        tagStr: null,
        tags: [],
        tagFieldName: 'Tags',
        imageFieldName: 'Images',
        videoFieldName: 'Videos',
        textFieldName: 'Content',
        showTags: false,
        showText: false,
        showVideo: false,
        showImage: false,
        actionEvent: null,
        showFloatingPanel: false,
        fixed: false,
        fixTop: false,
        boundingRect: null,
        initYPos: 0,
        imageModal: 'upload-media-image-modal',
        // INIT
        init() {
            this.tags = [];
            this.label = data.label;
            this.event = data.event;
            this.item = data.item;
            this.postbackType = data.postbackType
            this.fields = data.fields,
            this.actionEvent = data.actionEvent;
            this.fixTop = data.fixTop || false;

            var tagField = this._mxForm_GetField(this.fields, this.tagFieldName);
            this.showTags = tagField = null ? !tagField.hidden : true
            var imageField = this._mxForm_GetField(this.fields, this.imageFieldName);
            this.showImage = imageField != null ? !imageField.hidden : null
            var videoField = this._mxForm_GetField(this.fields, this.videoFieldName);
            this.showVideo = videoField != null ? !videoField.hidden : null

            // On updates from cards
            // Move this and all content/post based logic to page level js instead
            this.$events.on(quoteEvent, async (item) => {
                const field = this._mxForm_GetField(this.fields, 'QuotedItems');
                if (!field) return;

                let threadIds = field.value || []
                
                const quotedItem = this.createQuoteRequestItem(item);
                
                const quotedIds = threadIds.map(x => x.quotedContentPostId);
                const index = quotedIds.indexOf(item.id)
                if (index > -1) return;
                
                threadIds.push(quotedItem)
                
                field.value = threadIds;
                field.items = threadIds;
                this._mxForm_SetField(this.fields, field);
                this.showFloatingPanel = false;

                // If form is in scrollState, show
                if (this.isInPosition) this.fixed = true;
            })
            // On updates from cards
            // Move this and all content/post based logic to page level js instead
            this.$events.on(replyEvent, async (item) => {
                const parentIdField = this._mxForm_GetField(this.fields, 'ParentId');
                if (!parentIdField) return;

                parentIdField.value = item.id;
                this._mxForm_SetField(this.fields, parentIdField);

                const replyToField = this._mxForm_GetField(this.fields, 'ReplyTo');
                if (!replyToField) return;

                var content = item.content.length > 64 ? item.content.Substring(0, 64) + "..." : item.content;
                replyToField.value = `Reply to [${item.shortThreadId}]: ${content}`

                this._mxForm_SetField(this.fields, replyToField);
                this.showFloatingPanel = false;
                // If form is in scrollState, show
                if (this.isInPosition) this.fixed = true;
            })

            this.setHtml(data);
        },
        // GETTERS
        get isInPosition() {
            let inPosition = false;
            if (this.fixTop) {
                inPosition = this.yPosition <= 70
            }
            else {
                inPosition = this.yPosition >= 0
            }
            return inPosition;
        },
        get yPosition() {
            if (this.$refs.fixedElement == null) return 0;
            return this.$refs.fixedElement.getBoundingClientRect().y;
        },
        get tagField() {
            return this._mxForm_GetField(this.fields, this.tagFieldName);
        },
        get imageField() {
            return this._mxForm_GetField(this.fields, this.imageFieldName);
        },
        get videoField() {
            return this._mxForm_GetField(this.fields, this.videoFieldName);
        },
        get textField() {
            return this._mxForm_GetField(this.fields, this.textFieldName);
        },
        get typeSelected() {
            return this.showImage || this.showVideo || this.showText
        },
        get isValid() {
            return (this.textField.value != null && this.textField.value.length > 0)
                || (this.videoField.value != null && this.videoField.value.length > 0)
                || (this.imageField.value != null && this.imageField.value.length > 0)
        },
        get tagField() { return this._mxForm_GetField(this.fields, this.tagFieldName) },

        get fixedStyle() {
            let style = 'display:block;margin-top: 55px;'
            if (this.mxResponsive_IsMobile)
                style += "left: 0; width: 100%;";
            if (this.fixTop) {
                style += "top: 0; bottom: initial;";
            }
            else {
                style += "bottom: 0; top: initial;";
            }
            return style;
        },
        createSingleLineQuotePost(item) {
            return `@${item.shortThreadId}: ${item.content.substring(0, 64)}`
        },
        createQuoteRequestItem(item) {
            const quote = {
                partial: false,
                preview: this.createSingleLineQuotePost(item),
                quotedContentPostId: item.id,
                content: null,
                response: null
            }
            return quote;;
        },
        // 
        async submit(fields) {
            try {
                this.loading = true;

                const payload = this._mxForm_GetFileFormData({ fields: fields })

                const config = this.mxForm_HeadersMultiPart;
                const isJson = false
                let response = await this._mxForm_SubmitAjaxRequest(data.postbackUrl, payload, config, isJson);

                if (this.event) {
                    this.$dispatch(this.event, response)
                }
                this.$dispatch(this.localEvent, response)

                this.resetValues(fields);
            }
            catch (e) {

            }
            this.loading = false;
        },
        resetValues(fields) {
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].clearOnSubmit === true) {
                    fields[i].value = null;
                    fields[i].values = null;
                    fields[i].items = null;
                }
            }
        },
        format(type) {
        },
        cancelTypes() {
            this.hideTagField(true);
            this.hideImageField(true);
            this.hideVideoField(true);
        },
        addTag() {
            this.tags.push(this.tagStr);
            this.tagStr = null;
        },
        hideFloatingPanel(val) {
            this.showFloatingPanel = val;
        },
        hideTagField(val) {
            this.showTags = val;
            this._mxForm_SetFieldVisibility(this.fields, this.tagFieldName, val)
        },
        hideTextField(val) {
            this.showText = !val;
            this._mxForm_SetFieldVisibility(this.fields, this.textFieldName, val)
        },
        hideImageField(val) {
            this.showImage = !val;
            this._mxForm_SetFieldVisibility(this.fields, this.imageFieldName, val)
        },
        hideVideoField(val) {
            this.showVideo = !val;
            this._mxForm_SetFieldVisibility(this.fields, this.videoFieldName, val)
        },
        setHtml(data) {
            // make ajax request
            const label = data.label || 'Submit'
            const html = `
            <span x-ref="fixedElement"><span>
            <!--Floating-->
            <nav class="floating bottom container" 
                    @scroll.window="fixed = isInPosition ? true : false"
                    style="left:0; border: 1px solid #CCC; padding-left: 0; z-index:111;"
                    :style="fixed ? fixedStyle : 'display:none;'">
                      <article x-show="showFloatingPanel == false" class="dense sticky" style="width: 100%;  margin-bottom:0px; padding-right: var(--pico-spacing);">
                        <progress x-show="loading"></progress>
                        <!--Quotes-->
                        <fieldset class="padded" x-data="formFields({fields})"></fieldset>

                        <fieldset role="group">
                            <!--Toggle fields-->
                            <!--Format-->
                            <!--
                            <button class="small secondary material-icons flat" x-show="!showText" @click="hideTextField(false)" :disabled="loading">text_format</button>
                            <button class="small secondary material-icons flat" x-show="showText" @click="hideTextField(true)" :disabled="loading">cancel</button>
                            -->
                            <!--Video-->
                            <button class="small secondary material-icons flat" x-show="!showVideo" @click="hideVideoField(false)" :disabled="loading">videocam</button>
                            <button class="small secondary material-icons flat" x-show="showVideo" @click="hideVideoField(true)" :disabled="loading">cancel</button>

                            <!--Image-->
                            <button class="small secondary material-icons flat" x-show="!showImage" @click="hideImageField(false)" :disabled="loading">image</button>
                            <button class="small secondary material-icons flat" x-show="showImage" @click="hideImageField(true)" :disabled="loading">cancel</button>

                            <!--Tags-->
                            <button x-show="showTags == true" class="small secondary material-icons flat" @click="hideTagField(false)" :disabled="loading">sell</button>
                            <button x-show="showTags == false" class="small secondary material-icons flat" @click="hideTagField(true)" :disabled="loading">cancel</button>

                            <!--Cancel-->
                            <!--
                            <button class="small secondary material-icons flat" x-show="typeSelected" @click="cancelTypes" :disabled="loading">cancel</button>
                            -->
                            <!--Hide-->
                            <button class="small secondary material-icons flat" @click="hideFloatingPanel(true)" :disabled="loading">expand_more</button>
                            <!--Submit-->
                            <button class="" @click="await submit(fields)"  :disabled="loading || !isValid">${label}</button>

                        </fieldset> 
                    </article>
            </nav>
            <!--Floating button-->
            <button
                x-show="(showFloatingPanel)"
                @click="hideFloatingPanel(false)"
                class="material-icons round xsmall"
                style="y-index:1111; position: fixed; bottom: 76px; right: calc(var(--pico-spacing)*1);">
                chat
            </button>

            <!--Padded element for bottom fixed form-->
            
            <div class="sticky"  style="height: 200px; background: transparent;" x-show="!showFloatingPanel && fixed">
            </div>

            <article class="dense sticky"  x-show="!showFloatingPanel && !fixed">
                <progress x-show="loading"></progress>
                <!--Quotes-->
                <fieldset class="padded" x-data="formFields({fields})"></fieldset>

                <fieldset role="group">
                    <!--Toggle fields-->
                    <!--
                    <button class="small secondary material-icons flat" x-show="!typeSelected" @click="hideTextField(false)" :disabled="loading">text_format</button>
                    -->
                    <button class="small secondary material-icons flat" x-show="!typeSelected" @click="hideVideoField(false)" :disabled="loading">videocam</button>
                    <button class="small secondary material-icons flat" x-show="!typeSelected" @click="hideImageField(false)" :disabled="loading">image</button>
                    <!--Cancel-->
                    <button class="small secondary material-icons flat" x-show="typeSelected" @click="cancelTypes" :disabled="loading">cancel</button>

                    <!--Type formats-->
                    <button class="small secondary material-icons flat small" x-show="showText" @click="showText = !showText" :disabled="loading">format_list_bulleted</button>
                    <button class="small secondary material-icons flat small" x-show="showText" @click="showText = !showText" :disabled="loading">format_list_numbered</button>
                    <button class="small secondary material-icons flat small" x-show="showText" @click="showText = !showText" :disabled="loading">link</button>
                    <button class="small secondary material-icons flat small" x-show="showText" @click="showText = !showText" :disabled="loading">format_quote</button>
                    <button class="small secondary material-icons flat small" x-show="showText" @click="showText = !showText" :disabled="loading">code</button>

                    <input name="Tag" disabled type="text" placeholder="" />

                    <button x-show="showTags == true" class="secondary material-icons flat" @click="hideTagField(false)" :disabled="loading">sell</button>
                    <button x-show="showTags == false" class="secondary material-icons flat" @click="hideTagField(true)" :disabled="loading">cancel</button>

                    <button class="" @click="await submit(fields)"  :disabled="loading || !isValid">${label}</button>

                </fieldset> 
            </article>
        `
            this.$nextTick(() => {
                this.$root.innerHTML = html
            });
        },
    }
}