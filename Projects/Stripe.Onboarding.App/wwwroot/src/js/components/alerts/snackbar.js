import { getIcon } from './utilities.js'
const defaults = {
  ms: 3000,
  type: '',
  icon: '',
  text: '<p><strong>title</strong></p><p>this is a new test of a auto-formatted markdown</p>',
}
export default function (data = {}) {
	return {
      show: false,
      text: '',
      ms: data.ms || defaults.ms,
      type: data.type || defaults.type,
      icon: data.icon || defaults.icon,
      standalone: true,
      init() {
        this.show = data.show;
        this.icon = getIcon(data)
        this.load(data);
        const self = this;
        
        
        // Listen for the websocket event.
        this.$events.on(data.event || "snackbar:open", (payload) => {
          const data = {
              text: payload.text,
              success: true
          }
          self.load(data)
          self.show = true;
          // if a timer is set
          if (self.ms && self.ms > 0)
              setTimeout(function () {
                  self.show = false
              }, self.ms);
        });
      },
      show() {
        this.show = true;
      },
      load(data) {
        // Turn into object as it returns reactive Proxy
        //const data = JSON.parse(JSON.stringify(payload))
        const icon = this.icon;
        const html = `
        <template x-if="show">
          <article class="is-fixed dense page-modal snackbar standalone" :class="type" x-transition>
            <nav>
              <i class="material-icons">${icon}</i>
              <p>${data.text}</p>
              <i class="flat click material-icons" aria-label="Close" @click="show = false" rel="prev">close</i>
            </nav>
          </article>
        </template>`
        this.$nextTick(() => { 
          this.$root.innerHTML = html
        })
      },
      defaults() {
        this.load(defaults)
      }
    }
}