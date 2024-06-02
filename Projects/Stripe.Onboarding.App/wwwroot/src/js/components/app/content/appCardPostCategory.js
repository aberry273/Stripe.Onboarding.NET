const defaults = {}
import textPost from './posts/textPost.js'

export default function (data) {
    return {
        currentPage: 0,
        thread: [],
        item: null,
        threadUrl: null,
        userId: null,
        actionEvent: 'action:post',
        modalEvent: 'action:post',
        redirectEvent: 'action:post',
        showTags: false,
        init() {
            this.item = data.item;
            this.userId = data.userId;
            this.threadUrl = data.threadUrl;

            this.thread = this.setThreadItems(data.item);

            const self = this;
            this.$nextTick(() => {
                this.load(self.data)
            })
            this.$events.on('content-post-updated', (item) => {
                if (item.id != this.item.id) return;
                this.item = item;
                this.thread = this.setThreadItems(item);
            });

        },
        setThreadItems(op) {
            // flatten parent and child hierarchy into single array
            let thread = [op].concat((op.threads == null) ? [] : op.threads)
            thread = thread.map(x => {
                x.threadUrl = this.getThreadUrl(x);
                return x;
            })
            return thread;
        },
        action(action) {
            const payload = {
                // postback type
                action: action,
                // content post item
                item: this.selectedPost,
                userId: this.userId,
            }
            this.$events.emit(this.actionEvent, payload)
        },
        redirectAction(action) {
            const ev = `redirect-${action}`;
            this.$events.emit(ev, this.selectedPost)
        },
        modalAction(action) {
            const ev = `modal-${action}-post`;
            const payload = {
                // route to append to postbackUrl 
                postbackUrlRoute: this.selectedPost.id,
                // postback type
                postbackType: 'PUT',
                // content post item
                item: this.selectedPost,
            }
            this.$events.emit(ev, payload)
        },
        get selectedPost() {
            return this.thread[this.currentPage]
        },
        get totalAgrees() {
            return this.thread.reduce((sum, item) => sum + item.agrees, 0);
        },
        get totalDisagrees() {
            return this.thread.reduce((sum, item) => sum + item.disagrees, 0);
        },
        get totalReplies() {
            return this.thread.reduce((sum, item) => sum + item.replies, 0);
        },
        get totalLikes() {
            return this.thread.reduce((sum, item) => sum + item.likes, 0);
        },
        getThreadUrl(post) {
            return `${this.threadUrl}/${post.id}`;
        },
        renderPost(post) {
            if (post.type == 'textarea') return textPost(post)
            return textPost(post)
        },
        load(data) {
            const html = `
          <div>
            <article class="dense padless" :id="item.id">
              <!--Header-->
              <header class="padded">
                <nav>
                    <ul>
                    <template x-if="selectedPost.profile != null">
                        <li>
                            <button class="round small primary img">
                            <img
                            class="circular"
                            :src="selectedPost.profile"
                            :alt="selectedPost.username"
                            />
                            </button>
                        </li>
                    </template>
                    <aside class="dense">
                        <li class="secondary"><strong x-text="selectedPost.username"></strong></li>
                    </aside>
                    </ul>
                    <ul>
                    <li>
                        <details class="dropdown flat no-chevron">
                        <summary role="outline">
                            <i aria-label="Close" class="icon material-icons icon-click" rel="prev">more_vert</i>
                        </summary>
                        <ul dir="rtl">
                            <li><a class="click" @click="modalAction('share')">Share</a></li>
                            <li><a class="click" @click="modalAction('edit')">Edit</a></li>
                            <li><a class="click" @click="modalAction('delete')">Delete</a></li>
                        </ul>
                        </details>
                    </li>
                    </ul>
                </nav>
              </header> 
              <!--End Header-->

              <!--Quote-->
              <template x-if="selectedPost.targetThread && currentPage == 0">
                  <blockquote class="dense">
                    <a :href="'#'+selectedPost.targetThread" x-text="'@'+selectedPost.targetThread"></a>
                  </blockquote>
              </template>
              <!-- End Quote-->
              
              <!--Content-->
              <template x-for="(post, i) in thread" :key="i"> 
                <div class="content" x-show="i == currentPage" x-html="renderPost(post, i)" ></div>
              </template>
              <!--End content-->

              <!-- Pagination-->
              <template x-if="thread.length > 1">
                <div class="grid" align="center">
                  <ul>
                    <template x-for="page in thread.length">
                      <i @click="currentPage = page-1" :class="currentPage == page-1 ? 'primary': ''" class="icon material-iconss icon-click">•</i>
                    </template>
                  </ul>
                </div>
              </template>
              <!--End Pagination-->

              <!--Ratings-->
              <footer class="padded">
                  <nav>
                      <ul>
                        <li>
                            <!--Agree-->
                            <i aria-label="Agree" :href="selectedPost.id" @click="action('agree')" :class="agrees(selectedPost) ? 'primary': ''" class="icon material-icons icon-click" rel="prev">expand_less</i>
                            <sup class="noselect" rel="prev" x-text="selectedPost.agrees || 0"></sup>
                            <!--Disagree-->
                            <i aria-label="Disagree" @click="action('disagree')" :class="disagrees(selectedPost) ? 'primary': ''" class="icon material-icons icon-click" rel="prev">expand_more</i>
                            <sup class="noselect" rel="prev"x-text="selectedPost.disagrees || 0"></sup>
                            <!--Replies-->
                            <a class="" :href="selectedPost.threadUrl"><i aria-label="Reply" @click="quickAction('comment')" :class="false ? 'primary': ''" class="icon material-icons icon-click" rel="prev">chat</i></a>
                            <sup class="noselect" rel="prev" x-text="selectedPost.replies || 0"></sup>
                            <!--Show more-->
                            <i aria-label="Show More" x-show="!showTags && selectedPost.tags != null && selectedPost.tags.length > 0" @click="showTags = !showTags" :class="selectedPost.tags != null ? 'primary': ''" class="icon material-icons icon-click" rel="prev">unfold_more</i>
                            <i aria-label="Show Less" x-show="showTags" @click="showTags = !showTags" :class="selectedPost.tags != null ? 'primary': ''" class="icon material-icons icon-click" rel="prev">unfold_less</i>
                        </li>
                      </ul> 
                      <ul>
                        <li>
                            <i @click="action('like')" aria-label="Liked" :class="likes(selectedPost) ? 'primary': ''" class=" icon material-icons icon-click" rel="prev">favorite</i>
                            <sup class="noselect" rel="prev" x-text="selectedPost.likes || 0 "></sup> 
                        </li>
                      </ul>
                  </nav>
                  <nav x-show="showTags">
                    <ul>
                      <li>
                        <div class="container">
                        <template x-for="(tag, i) in selectedPost.tags">
                          <button class="tag flat secondary small" x-text="tag"></button>
                        </template>
                      </div>
                      </li>
                    </ul>
                  </nav>
              </footer>
              <!--End Ratings-->
          </article> 
        </div>
        `
            this.$nextTick(() => {
                this.$root.innerHTML = html
            });
        },
        defaults() {
            this.load(defaults)
        }
    }
}