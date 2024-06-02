export default function (ref, filePath){
  return {
    init() {
        fetch(filePath).then(r => r.text()).then(html => {
            const self = this
             this.$refs[ref].innerHTML = html;
        })
    }
  }
}