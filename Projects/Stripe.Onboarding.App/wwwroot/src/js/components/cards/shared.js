const defaults = {}
import { mxCardPost } from '/src/js/mixins/index.js';

export function content(data) {
    return `
    <template x-for="(post, i) in mxCardPost_thread" :key="i">
        <div x-show="i == currentPage">
            <div class="padded pt-0 pb-0" x-html="post.content"></div>
        </div>
    </template>
    `
}
export function media(data) {
    return `
    <template x-if="selectedPost.media != null && selectedPost.media.length > 0">
        <div x-data="gridCardMedia( {
                userId: selectedPost.userId,
                itemEvent: $store.wssContentPosts.getMessageEvent(),
                items: selectedPost.media,
                modalId: 'media-modal'+selectedPost.id,
                cols: 3
            })">
        </div>
    </template>
    `
}

export function quotes(data) {
    return `
    <template x-for="quotedPost in quotedPosts">
        <div class="padded">
                <div x-data="cardPostQuote({
                    quotePost: quotedPost,
                    item: _mxCardPost_getQuotePost(quotedPost.contentPostQuoteId)
                })"></div>
            <div x-show="quotedPost.response" x-html="quotedPost.response" class="pt"></div>
        </div>
    </template>
    `
}

export function pagination(data) {
    return `
   <template x-if="mxCardPost_thread.length > 1">
        <div class="grid" align="center">
            <ul>
            <template x-for="page in mxCardPost_thread.length">
                <i @click="currentPage = page-1" :class="currentPage == page-1 ? 'primary': ''" class="icon material-iconss icon-click">•</i>
            </template>
            </ul>
        </div>
    </template>
    `
}
export function header(data) {
    return `
    <header class="padded pb-0">
        <nav>
            <template x-if="selectedPost.profile != null">
                <ul class="profile">
                    <template x-if="selectedPost.profile.image != null && selectedPost.profile.image.length>0">
                        <li>
                            <button class="avatar small">
                                <img
                                    :src="selectedPost.profile.image+'?w=40'"
                                />
                            </button>
                        </li>
                    </template>
                    <aside>
                        <li class="secondary pa-0" style="padding-top:0px;">
                            <strong class="pb-0">
                                <span x-text="selectedPost.profile.username"></span>
                            </strong>
                        </li>
                        </aside>
                </ul>
            </template>
            <ul>
                <li>
                    <strong x-show="selectedPost.channelName">
                        <a class="py-0 primary my-0" style='text-decoration:none' :href="'/channels/'+selectedPost.targetChannel">
                            <sup x-text="selectedPost.channelName"></sup>
                        </a>
                    </strong>

                    <i x-show="!showMetadata && selectedPost.tags" aria-label="Show more" @click="showMetadata = true" :class="false ? 'primary': ''" class="icon material-icons icon-click" rel="prev">expand_more</i>
                    <i x-show="showMetadata && selectedPost.tags" aria-label="Show more" @click="showMetadata = false" :class="false ? 'primary': ''" class="icon material-icons icon-click" rel="prev">expand_less</i>
                    <!--Show more-->
                    <template x-if="selectedPost.userId == userId">
                        <details class="dropdown flat no-chevron">
                            <summary role="outline">
                                <i aria-label="Close" class="icon material-icons icon-click" rel="prev">more_vert</i>
                            </summary>
                            <ul dir="rtl">
                                <li x-show="!showMetadata && selectedPost.tags"><a class="click" @click="showMetadata = true">Show tags</a></li>
                                <li x-show="showMetadata && selectedPost.tags"><a class="click" @click="showMetadata = false">Hide tags</a></li>

                                <li><a class="click" @click="_mxCardPost_modalAction('share', selectedPost)">Share</a></li>
                            </ul>
                        </details>
                    </template>
                </li>
            </ul>
        </nav>
    </header>
    `
}

export function footer(data) {
    return `
    <footer class="padded">
        <nav>
            <ul>
                <li>
                    <!--Replies-->
                    <strong class="py-0 my-0">
                        <a class="py-0 secondary my-0" style='text-decoration:none' :href="selectedPost.href">
                            <small>
                                <small>
                                    <span x-text="selectedPost.shortThreadId"></span>

                                </small>
                            </small>
                        </a>
                    </strong>
                </li>
            </ul>
            <ul>
                <li>
                    <!--Agree-->
                    <button :disabled="!userId" @click="_mxCardPost_action('agree', selectedPost)" class="chip small " style="" :class="_mxCardPost_userSelectedAction('agree', selectedPost) ? 'flat primary': 'flat'" >
                        <i aria-label="Agree" class="icon material-icons">expand_less</i>
                        <sup class="noselect" x-text="selectedPost.agrees || 0"></sup>
                    </button>

                    <!--Disagree-->
                    <button :disabled="!userId" @click="_mxCardPost_action('disagree', selectedPost)" class="chip small " style="" :class="_mxCardPost_userSelectedAction('disagree', selectedPost) ? 'flat primary': 'flat'" >
                        <i aria-label="Disagree" class="icon material-icons">expand_more</i>
                        <sup class="noselect" x-text="selectedPost.disagrees || 0"></sup>
                    </button>

                    <!--Likes-->
                    <!--
                    <i @click="_mxCardPost_action('like', selectedPost)" aria-label="Liked" :class="_mxCardPost_userSelectedAction('like', selectedPost) ? 'primary': ''" class=" icon material-icons icon-click" rel="prev">favorite</i>
                    <sup class="noselect" rel="prev" x-text="selectedPost.likes || 0 "></sup>
                    -->

                    <!--Quotes-->
                    <button :disabled="!userId" @click="_mxCardPost_quote(selectedPost)" class="chip small flat" style="" >
                        <i aria-label="Quote" class="icon material-icons">format_quote</i>
                        <sup class="noselect" x-text="selectedPost.quotes || 0"></sup>
                    </button>

                    <!--Reply-->
                    <button :disabled="!userId" @click="_mxCardPost_reply(selectedPost)" class="chip small flat" style="" >
                        <i aria-label="Reply" class="icon material-icons">chat</i>
                        <sup class="noselect" x-text="selectedPost.replies || 0"></sup>
                    </button>
                </li>
            </ul>
        </nav>
        <nav x-show="showMetadata && selectedPost.tags">
            <ul>
                <li>
                    <div class=" chips">
                        <template x-for="(tag, i) in selectedPost.tags">
                            <a @click="_mxCardPost_filterByTag(tag)" style="text-decoration:none" class="tag flat closable primary small">
                                <strong><sup x-text="tag"</sup></strong>
                            </a>
                        </template>
                    </div>
                </li>
            </ul>
        </nav>
    </footer>
    `
}

/// Quote specific
export function contentQuote(data) {
    return `
    <template x-for="(post, i) in mxCardPost_thread" :key="i">
        <div x-show="i == currentPage" class="content truncated">
            <div class="padded pt-0 pb-0" x-html="post.content"></div>
        </div>
    </template>
    `
}
export function headerQuote(data) {
    return `
    <header class="padded pb-0">
        <nav>
            <template x-if="selectedPost.profile != null">
                <ul class="profile">
                    <template x-if="selectedPost.profile.image != null && selectedPost.profile.image.length>0">
                        <li>
                            <button class="avatar small">
                                <img
                                    :src="selectedPost.profile.image+'?w=40'"
                                />
                            </button>
                        </li>
                    </template>
                    <aside>
                        <li class="secondary pa-0" style="padding-top:0px;">
                            <strong class="pb-0">
                                <span x-text="selectedPost.profile.username"></span>
                            </strong>
                        </li>
                        </aside>
                </ul>
            </template>
            <ul>
                <li>
                    <strong x-show="selectedPost.channelName">
                        <a class="py-0 primary my-0" style='text-decoration:none' :href="'/channels/'+selectedPost.targetChannel">
                            <sup x-text="selectedPost.channelName"></sup>
                        </a>
                    </strong>
                </li>
            </ul>
        </nav>
    </header>
    `
}
export function footerQuote(data) {
    return ` 
        <footer class="">
            <nav>
                <ul>
                    <li>
                        <!--Replies-->
                        <strong class="py-0 my-0">
                            <a class="py-0 secondary my-0" style='text-decoration:none' :href="selectedPost.href">
                                <small>
                                    <small>
                                        <span x-text="item.shortThreadId"></span>
                                    </small>
                                </small>
                            </a>
                        </strong>
                    </li>
                </ul>
                <ul>
                    <li>
                        <!--Agree-->
                        <button :disabled="!userId" @click="_mxCardPost_action('agree', selectedPost)" class="chip small " style="" :class="_mxCardPost_userSelectedAction('agree', selectedPost) ? 'flat primary': 'flat'" >
                            <i aria-label="Agree" class="icon material-icons">expand_less</i>
                            <sup class="noselect" x-text="selectedPost.agrees || 0"></sup>
                        </button>

                        <!--Disagree-->
                        <button :disabled="!userId" @click="_mxCardPost_action('disagree', selectedPost)" class="chip small " style="" :class="_mxCardPost_userSelectedAction('disagree', selectedPost) ? 'flat primary': 'flat'" >
                            <i aria-label="Disagree" class="icon material-icons">expand_more</i>
                            <sup class="noselect" x-text="selectedPost.disagrees || 0"></sup>
                        </button>
                    </li>
                </ul>
            </nav>
        </footer>`
}