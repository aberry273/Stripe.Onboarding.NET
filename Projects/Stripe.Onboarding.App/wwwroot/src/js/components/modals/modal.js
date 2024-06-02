import { open, close, toggle, isOpenClass, openingClass, closingClass, scrollbarWidthCssVar, animationDuration } from './utilities.js'

const defaults = {
  ms: 500,
  text: '',
}
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


        this.load(data);
        const self = this;
        // Listen for the event.
        window.addEventListener(this.event,
          (ev) => {
            self.toggle()
          }, false,
        );
      },
      toggle() {
        toggle(this.id)
      },
      load(data) {
        this.$root.innerHTML = `
          <!-- Edit post -->
          <dialog id="${this.id}">
            <article>
              <header>
                <button
                  aria-label="Close"
                  rel="prev"
                  data-target="modal-example"
                  @click="toggle"
                ></button>
                <h3 x-text="title"></h3>
              </header>
              <p x-text="text"></p>
              <footer>
                <button
                  role="button"
                  class="secondary"
                  data-target="modal-example"
                  @click="toggle"
                >
                  Cancel</button
                ><button autofocus data-target="modal-example" @click="toggle">
                  Confirm
                </button>
              </footer>
            </article>
          </dialog>
            `
      },
      defaults() {
        this.load(defaults)
      }
    }
}