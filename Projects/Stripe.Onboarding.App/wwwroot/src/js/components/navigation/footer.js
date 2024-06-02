
function ahref(href, text) {
  return `<a href="${href}">${text}</a>`
}

function li(el) {
  return `<li>${el}</li>`
}

function list(links) {
  let link = ''
  if (links != null && links.length > 0) {
    link = `${ links.map(x => li(ahref(x.href, x.text))).join('') }`
  }
  return link
}

export default function navbar(data) {
    return {
      init() {
        const header = `<ul>${li(`<strong>${data.title}</strong>`)}</ul>`;
        let links = list(data.items)
        this.$root.innerHTML = `
          <footer>
            <nav>
              <li class="pl-0">
                ${data.text}
              </li>
              <ul>
                <li>
                  <details class="dropdown">
                    <summary role="button" class="secondary">Theme</summary>
                    <ul>
                      <li><a href="#" @click="$store.theme.setScheme('auto')">Auto</a></li>
                      <li><a href="#" @click="$store.theme.setScheme('light')">Light</a></li>
                      <li><a href="#" @click="$store.theme.setScheme('dark')">Dark</a></li>
                    </ul>
                  </details>
                </li>
              </ul>
            </nav>
          </footer>
        `;
      }
    };
  }