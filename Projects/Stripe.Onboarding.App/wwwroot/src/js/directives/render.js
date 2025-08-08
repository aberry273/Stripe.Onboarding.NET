export default (el, { expression }, { Alpine, evaluateLater, effect }) => {
    let payload = evaluateLater(expression)
 
    effect(() => {
        payload(data => {
            fetch(data.html).then(r => r.text()).then(html => {
                console.log(Alpine)
                Alpine.$refs[data.ref].innerHTML = html
            })
        })
    })

}