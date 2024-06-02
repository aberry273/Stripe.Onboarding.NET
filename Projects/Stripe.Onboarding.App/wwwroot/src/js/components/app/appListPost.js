let component = `
    <div x-data="appCardPost(
    {
        item: post,
        userId: userId,
        threadUrl: threadUrl,
    })"></div>
`
export default function (data) {
  return {
    // PROPERTIES
    async init() {
      const self = this;
      data = data != null ? data : {}
      component = data.component || component
      this.setHtml(data);
    },
    setHtml(data) {
      // make ajax request 
      const html = `
        <div x-transition>
        <!-- :key="post.id+':'+post.updatedOn"-->
          <template x-for="(post, i) in posts" :key="post.id" >
            ${component}
          </template>
          <template x-if="posts == null || posts.length == 0">
            <article>
              <header><strong>No results!</strong></header>
              No posts could be found
            </article>
          </template>
        </div>
        `
      this.$nextTick(() => {
          this.$root.innerHTML = html
      });
    },
  }
}