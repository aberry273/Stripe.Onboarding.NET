const defaults = {
  title: 'example post',
  username: 'user name',
  handle: '@username',
  updated: '10 minutes ago',
  agree: 15,
  disagree: 12,
  text: '<p><strong>title</strong></p><p>this is a new test of a auto-formatted markdown</p>',
  footer: 'footer'
}
export default function (data) {
	return {
      data: null,
      init() {
        this.data = data;
        const self = this;
        this.$nextTick(() => {
          this.load(self.data)
        })
      },
      quickAction(action) {
        const ev = `submit-${action}`;
        this.$events.emit(ev, this.data)
      },
      redirectAction(action) {
        const ev = `redirect-${action}`;
        this.$events.emit(ev, this.data)
      },
      modalAction(action) {
        const ev = `${action}-post`;
        this.$events.emit(ev, this.data)
      },
      load(data) {
        this.$root.innerHTML = `
        <article class="dense">
          <header >
            <nav>
              <ul>
                <li>
                  <button class="round small primary img">
                    <img
                    class="circular"
                    src="${data.profile}"
                    alt="username_profile"
                  />
                  </button>
                </li>
                <aside class="dense">
                  <li><strong>${data.username}</strong></li>
                  <li><a class="secondary disabled"><small>${data.handle}</small></a></li>
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
                      <li><a class="click" @click="modalAction('remove')">Remove</a></li>
                    </ul>
                  </details>
                </li>
              </ul>
            </nav>
          </header> 
          ${data.content}
          <footer>
            <nav>
              <ul>
                <li>
                  <!--Agree-->
                  <i aria-label="Agree" @click="quickAction('agree')" class="icon material-icons icon-click" rel="prev">expand_less</i>
                  <sup class="noselect" rel="prev">${data.agree}</sup>
                  <!--Disagree-->
                  <i aria-label="Disagree" @click="quickAction('disagree')" class="icon material-icons icon-click" rel="prev">expand_more</i>
                  <sup class="noselect" rel="prev">${data.disagree}</sup> 

                  <i aria-label="Reply" @click="redirectAction('reply')" class="icon material-icons icon-click" rel="prev">unfold_more</i>
                </li> 
              </ul>
              <ul>
                <li>
                  <!--Liked-->
                  <i x-show="data.liked" @click="quickAction('like')" aria-label="Liked" class="primary icon material-icons icon-click" rel="prev">favorite</i>
                  <i x-show="!data.liked" @click="quickAction('unlike')" aria-label="Noy liked" class="icon material-icons icon-click" rel="prev">favorite</i>
                </li>
              </ul>
            </nav>
          </footer>
        </article>`
      },
      defaults() {
        this.load(defaults)
      }
    }
}