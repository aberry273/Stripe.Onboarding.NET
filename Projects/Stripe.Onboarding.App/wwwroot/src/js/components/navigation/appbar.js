export default function appbar(data) {
    return {
      init() {
        this.$root.innerText = data;
        this.$root.innerHTML = `
        <nav>
          <ul>
            <li><a href="#" class="secondary">...</a></li>
          </ul>
          <ul>
            <li><strong>Acme Corp</strong></li>
          </ul>
          <ul>
            <li><a href="#" class="secondary">...</a></li>
          </ul>
        </nav>
        `;
      }
    };
  }