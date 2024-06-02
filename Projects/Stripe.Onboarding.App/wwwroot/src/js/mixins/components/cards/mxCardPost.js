const defaults = {}
const quoteEvent = 'action:post:quote';
const replyEvent = 'action:post:reply';
export default function (data) {
    return {
        currentPage: 0,
        mxCardPost_thread: [],
        item: null,
        userId: null,
        updateEvent: '',
        actionEvent: 'action:post', 
        modalEvent: 'action:post',
        redirectEvent: 'action:post',
        filterEvent: 'on:filter:posts',
        showMetadata: false,
        showReplies: false,
        articleClass: '',
        quotedPost: null,
        _mxCardPost_init() {
            this.articleClass = data.class;
            this.item = data.item;
            this.userId = data.userId;
            this.updateEvent = data.updateEvent;
            this.mxCardPost_thread = this._mxCardPost_getThreadItems(data.item);
            this.currentPage = 0;

            this.$events.on(this.updateEvent, (item) => {
                if (this.item.id != item.id) return;
                this.item = item;
                this.mxCardPost_thread = this._mxCardPost_getThreadItems(item);
            });

        },
        _mxCardPost_getThreadItems(op) {
            // flatten parent and child hierarchy into single array
            let postThreads = (op.threads == null) ? [] : op.threads;
            let thread = [op].concat(postThreads)
            return thread;
        },
        _mxCardPost_CreatePostActionPayload(action, item) {
            const payload = {
                userId: this.userId,
                contentPostId: item.id,
            }
            payload[action] = this._mxCardPost_userSelectedAction(action, item) ? false : true;
            return payload;
        },
        async _mxCardPost_reply(item) {
            this.$events.emit(replyEvent, item)
        },
        async _mxCardPost_quote(item) {
            this.$events.emit(quoteEvent, item)
        },
        async _mxCardPost_action(action, item) {
            const payload = this._mxCardPost_CreatePostActionPayload(action, item);

            const result = await this.$store.wssContentPostActions._wssContentActions_HandlePost(payload);
        },
        _mxCardPost_getQuotePost(id) {
            return this.$store.wssContentPosts.GetQuotePost(id);
        },
        _mxCardPost_redirectAction(action) {
            const ev = `redirect-${action}`;
            this.$events.emit(ev, this.mxCardPost_selectedPost)
        },
        _mxCardPost_modalAction(action, item) {
            const ev = `modal-${action}-post`;
            const requestType = action == 'delete' ? 'DELETE' : 'PUT';
            const payload = {
                // route to append to postbackUrl 
                postbackUrlRoute: item.id,
                // postback type
                postbackType: requestType,
                // content post item
                item: item,
            }
            this.$events.emit(ev, payload)
        },
        _mxCardPost_scrollTo(id) {
            const el = document.getElementById(id);
            el.scrollIntoView()
        },
        _mxCardPost_renderPost(post) {
            if (!post.content) return null;
            return cardRenderingText(post)
        },
        _mxCardPost_userSelectedAction(action, item) {
            // Retrieves the action based on the post actions
            //return this._mxContentActions_GetAction(item, action);
            return this.$store.wssContentPosts.CheckUserPostAction(item.id, this.userId, action);
        },
        _mxCardPost_cleanTargetThread(post) {
            if (!post.targetThread) return post.shortThreadId
            var ids = post.targetThread.split('|')
            if (ids.length == 1) return post.shortThreadId
            // get the actual post id
            var last = ids.shift();
            // remove original post item
            //ids.shift();
            var shortenedIds = ids.map(x => this.getTinyThreadId(x));
            return shortenedIds.join('/') + "/" + post.shortThreadId;
        },
        _mxCardPost_getTinyThreadId(threadId) {
            return threadId.slice(0, 8);
        },
        _mxCardPost_getImage(filePath) {
            if (this.imageWidth) {
                return filePath + '?w=' + this.imageWidth;
            }
            return filePath;
        },
        /*
        modalAction(action, data) {
            this.$events.emit(this.modalEvent, data)
        },
        */
        _mxCardPost_filterByThreadId(threadId) {
            const filters =
                [
                    {
                        name: 'Quotes',
                        values: [threadId]
                    }
                ]
            this.$events.emit(this.filterEvent, filters)
        },
        _mxCardPost_filterByTag(tag) {
            const filters =
                [
                    {
                        name: 'Tags',
                        values: [tag]
                    }
                ]
            this.$events.emit(this.filterEvent, filters)
        },
        _mxCardPost_load(html) {
            this.$nextTick(() => {
                this.$root.innerHTML = html
            });
        },
    }
}