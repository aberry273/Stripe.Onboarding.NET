import { mxToast } from '/src/js/mixins/index.js';

export default () => {
    return {
        ...mxToast(),
        Add(title, type, description) {
            this.mxToast_Add(title, type, description)
        },
    }
}