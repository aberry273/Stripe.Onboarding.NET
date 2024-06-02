export default function (data) {
    return {
        selected: null,
        filterId: '',
        filtered: [],
        loading: false,
        sourceUrl: '#',
        fetchPostsUrl: '#',
        fetchReviewsUrl: '#',
        targetThread: null,
        parentId: null,
        expandable: true,
        threadUrl: '/',
        initialItems: [],
        contentPostUpdateEvent: 'content-post-updated',
        async init() {
            //Settings
            this.expandable = data.expandable;
            this.filterId = data.feed;
            this.sourceUrl = data.sourceUrl;
            this.userId = data.userId;
            this.channel = data.channel;
            this.reviewUrl = data.reviewUrl;
            this.threadUrl = data.threadUrl;
            this.targetThread = data.targetThread;
            this.parentId = data.parentId;
            this.fetchPostsUrl = data.fetchPostsUrl;
            this.fetchReviewsUrl = data.fetchReviewsUrl;
            this.initialItems = data.items;
            

            const initPosts = data != null ? data.postItems : [];
            const initReviews = data != null ? data.reviewItems : [];
            
            this.$store.content.setPosts(initPosts);
            this.$store.content.setReviews(initReviews);

            await this.setupPostWebsockets();
            await this.setupReviewWebsockets();

            let queryData = this.getPageQueryFilters(data);
            const postQuery = this.createQueryRequest(queryData);
            if (postQuery != null)
                await this.fetchPosts(postQuery);
            
            if(data.userId) {
                const reviewQuery = this.createQueryRequest({ userId: [data.userId] });
                if (reviewQuery != null)
                    await this.fetchReviews(reviewQuery);
            }
           
            // On updates from UI > contentPost/contentPostReply
            this.$events.on('action:post', async (e) => {
                await this.handleAction(e);
            })
            this.$events.on('filter:posts', async (e) => {
                const filterKeys = Object.keys(e);
                let queryData = this.getPageQueryFilters(data);
                for (var i = 0; i < filterKeys.length; i++) {
                    const key = filterKeys[i];
                    queryData[key] = e[key];
                }
                const postQuery = this.createQueryRequest(queryData);
                if (postQuery != null)
                    await this.fetchPosts(postQuery);
            })
        },
        // Getters
        get posts() { return this.$store.content.posts },
        get reviews() { return this.$store.content.reviews },

        // Websockets
        async setupPostWebsockets() {
            // On websocket client initialized, send channel to server
            this.$events.on(this.$store.wssContentPosts.getConnectedEvent(), async (ev) => {
                await this.$store.wssContentPosts.connectUser(this.userId);
            })
            // On updates from the websocket
            this.$events.on(this.$store.wssContentPosts.getMessageEvent(), async (e) => {
                const data = e.data;
                if (data.alert) this.sendAlert(data);
                this.$events.emit(this.contentPostUpdateEvent, data.data);
                this.updatePostItems(data);
            })
        },
        async setupReviewWebsockets() {
            // On websocket client initialized, send channel to server
            this.$events.on(this.$store.wssContentPostReviews.getConnectedEvent(), async (ev) => {
                await this.$store.wssContentPostReviews.connectUser(this.userId);
            })
            // On updates from the websocket
            this.$events.on(this.$store.wssContentPostReviews.getMessageEvent(), async (e) => {
                const data = e.data;
                if (data.alert) this.sendAlert(data);
                this.updateReviewItems(data);
            })
        },
        // Store methods
        updatePostItems(wssMessage) {
            this.$store.content.updatePosts(wssMessage);
        },
        updateReviewItems(wssMessage) {
            this.$store.content.updateReviews(wssMessage);
        },
        setPostItems(items) {
            this.$store.content.setPosts(items);
        },
        // API Calls
        async fetchPosts(query) {
            if (!this.fetchPostsUrl || !query) return;
            const results = await this.$fetch.POST(this.fetchPostsUrl, query);
            this.$store.content.setPosts(results);
        },
        async fetchReviews(query) {
            if (!this.fetchReviewsUrl || !query) return;
            const results = await this.$fetch.POST(this.fetchReviewsUrl, query);
            this.$store.content.setReviews(results);
        },
        
        async postAgree(request) {
            const payload = this.getOrCreatePayload(request);
            await this.$fetch.POST(this.reviewUrl + '/agree', payload);
        },
        async postDisagree(request) {
            const payload = this.getOrCreatePayload(request);
            await this.$fetch.POST(this.reviewUrl + '/disagree', payload);
        },
        async toggleLike(request) {
            const payload = this.getOrCreatePayload(request);
            if (payload.like)
                await this.$fetch.POST(this.reviewUrl + '/unlike', payload);
            else
                await this.$fetch.POST(this.reviewUrl + '/like', payload);
        },
        
        // API Data methods
        getPageQueryFilters(data) {
            let queryData = {}
            if (data.parentId) queryData.parentId = [data.parentId]
            if (data.targetChannel) queryData.targetChannel = [data.targetChannel]
            return queryData;
        },
        createQueryRequest(data) {
            if (!data) return;
            let filters = [];
        
            const keys = Object.keys(data);
            for(let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const filter = {
                    name: key,
                    //Equals, NotEquals, Null, NotNull, GreaterThan, LessThan
                    Operator: 'Equals',
                    Values: data[key],
                    Condition: 'Filter',
                }
                filters.push(filter)
            }
            let payload = {
                query: null,
                page: 0,
                itemsPerPage: 10,
                filters: filters,
            }
            return payload;
        }, 

        // UI Logic
        agrees(post) {
            if (!this.reviews || this.reviews.length == 0) return false;
            const review = this.reviews.filter(x => x.userId == this.userId && x.contentPostId == post.id)[0];
            if (!review) return false;
            if (review.agree == null) return false
            return review.agree != null && review.agree == true;
        },
        disagrees(post) {
            if (!this.reviews || this.reviews.length == 0) return false;
            const review = this.reviews.filter(x => x.userId == this.userId && x.contentPostId == post.id)[0];
            if (!review) return false;
            return review.disagree != null && review.disagree == true;
        },
        likes(post) {
            if (!this.reviews || this.reviews.length == 0) return false;
            const review = this.reviews.filter(x => x.userId == this.userId && x.contentPostId == post.id)[0];
            if (!review) return false;
            return review.like != null && review.like == true;
        },
        sendAlert(data) {
            const snackbarType = (data.code == 200) ? 'success' : 'error';
            const wasSuccess = (data.code == 200) ? 'successfully' : 'failed';
            const message = `${data.update} post ${wasSuccess}`
            const event = 'snackbar-add';//`snackbar-${snackbarType}`;
            this.$events.emit(event, { code: data.code, type: snackbarType, text: message });
        },
        async handleAction(request) {
            const action = request.action;
            if (action == 'agree') {
                await this.postAgree(request);
            }
            if (action == 'disagree') {
                await this.postDisagree(request);
            }
            if (action == 'like') {
                await this.toggleLike(request);
            }
        },
        getOrCreatePayload(request) {
            const review = this.reviews.filter(x => x.userId == request.userId && x.contentPostId == request.item.id)[0];
            if (review != null) return review;
            return {
                userId: request.userId,
                contentPostId: request.item.id,
                agree: null,
                disagree: null,
                like: null,
            }
        },
    
    }
}