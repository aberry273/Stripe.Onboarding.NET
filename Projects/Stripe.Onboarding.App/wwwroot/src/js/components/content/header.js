export default function header(data) {
    return {
      init() {
        this.$root.innerHTML = `
          <header>
            <hgroup>
              <h1>${data.title}</h1>
              <p>${data.subtitle}</p>
              <p>${data.text}</p>
            </hgroup>
          </header>
        `;
      }
    };
  }