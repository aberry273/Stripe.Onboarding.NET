import { open, close, toggle, isOpenClass, openingClass, closingClass, scrollbarWidthCssVar, animationDuration } from './utilities.js'

export default function (data = {}) {
    return {
        show: false,
        text: '',
        id: '',
        event: '',
        // data
        title: '',
        text: '',
        init() {
            this.show = data.show;
            // either use id, event for separate targets, or use the target property to simplify
            this.id = data.id || data.target
            this.event = data.event || data.target;
            // view data
            this.title = data.title;
            this.text = data.text;
            this.form = data.form;
            const postbackUrl = this.form.postbackUrl;

            this.load(data);
            const self = this;
            // If the modal event is triggered, and data is passed in { key: val }
            // Update the form.fields[].value to equal the associated data property
            this.$events.on(this.event, (data) => {
                const postbackType = data.postbackType;
                if (postbackType != null) {
                    self.form.postbackType = postbackType;
                }
                // hacky solution to append id to route, really should create a bespoke form for content posts
                const postbackUrlRoute = data.postbackUrlRoute;
                if (postbackUrlRoute != null) {
                    self.form.postbackUrl = postbackUrl + "/" + postbackUrlRoute
                }
                if (self.form == null || self.form.fields == null) return;
                for (var i = 0; i < self.form.fields.length; i++) {
                    const field = self.form.fields[i].name.toLowerCase();
                    if(data.item == null) continue;
                    if (data.item[field] != null) {
                        self.form.fields[i].value = data.item[field]
                    }
                }
                self.toggle()
            })
            this.$events.on(this.form.event, (data) => {
                if (data.statusCode == 200) {
                    
                }
                self.toggle();
            })
        },
        toggle() {
            toggle(this.id)
        },
        load(data) {
            const html = `
              <!-- Edit post -->
              <dialog id="${this.id}">
                <article>
                  <header>
                    <button
                      aria-label="Close"
                      rel="prev"
                      data-target="${this.id}"
                      @click="toggle"
                    ></button>
                    <h3 x-text="title"></h3>
                  </header>
                  <div x-data="formFile(form)"></div>
                </article>
              </dialog>
                `
            this.$nextTick(() => {
                this.$root.innerHTML = html
            })
        },
        defaults() {
            this.load(defaults)
        }
    }
}