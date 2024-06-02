export default () => (el, data) => {
    if (data == null || typeof(data) === 'undefined') return ''
    if (el == null) return data 
    return `<${el}>${data}</${el}>`
}