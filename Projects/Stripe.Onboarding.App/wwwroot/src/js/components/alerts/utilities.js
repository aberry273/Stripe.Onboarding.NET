export const isOpenClass = "modal-is-open";

export function getIcon(snackbar) {
    let icon = ''
    if(snackbar.type == 'success') {
        icon = 'check_circle'
    }
    if(snackbar.type == 'information') {
        icon = 'warning'
    }
    if(snackbar.type == 'error') {
        icon = 'error'
    }
    return icon;
}