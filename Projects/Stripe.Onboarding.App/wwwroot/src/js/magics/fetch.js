import { mxFetch } from '/src/js/mixins/index.js';

export default () => {
    return {
        ...mxFetch(),
        async GET(url, data) { 
            return await this._mxFetch_Get(url, data);
        },
        async POST(url, data, headers, isJson = true) {
            return await this._mxFetch_Post(url, data, headers, isJson);
        },
        async PUT(url, data, headers, isJson = true) {
            return await this._mxFetch_Put(url, data, headers, isJson);
        },
        async DELETE(url, data, headers) {
            return await this._mxFetch_Delete(url, data, headers);
        }
    }
}