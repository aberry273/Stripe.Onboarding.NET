export const isOpenClass = "modal-is-open";
export const openingClass = "modal-is-opening";
export const closingClass = "modal-is-closing";
export const scrollbarWidthCssVar = "--pico-scrollbar-width";
export const animationDuration = 400; // ms
let visibleModal = null;
const getScrollbarWidth = () => {visibleModal
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    return scrollbarWidth;
};
export function toggle(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal && (modal.open ? close(id) : open(id));
}
export function open(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    const { documentElement: html } = document;
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth) {
        html.style.setProperty(scrollbarWidthCssVar, `${scrollbarWidth}px`);
    }
    html.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
        visibleModal = modal;
        html.classList.remove(openingClass);
    }, animationDuration);
    modal.showModal();
};
export function close(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    visibleModal = null;
    const { documentElement: html } = document;
    html.classList.add(closingClass);
    setTimeout(() => {
    html.classList.remove(closingClass, isOpenClass);
    html.style.removeProperty(scrollbarWidthCssVar);
    modal.close();
    }, animationDuration);
};