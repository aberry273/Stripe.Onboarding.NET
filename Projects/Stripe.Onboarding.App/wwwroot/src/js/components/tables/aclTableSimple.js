import { mxTable, mxEvent } from '/src/js/mixins/index.js';

export default function (params) {
    return {
        ...mxTable(params),
        ...mxEvent(params),
        // PROPERTIES
        expanded: false,
        // INIT
        init() {
            this._mxTable_setValues(params);
            console.log(this.mxTable_headers)
            console.log(this.mxTable_items)
            this.render();
        },
        // GETTERS
        headerKeys() {
            // return this.mxTable_headers.map((x) => x.text);
        },
        // METHODS
        setEvents() {
            const self = this;
        },
        getKey(item, i) {
            if (!item) return '_';
            return item.text + ':' + i;
        },
        getText(item) {
            if (!item) return '';
            return item.text;
        },
        getValue(item, headerKey) {
            if (!item) return '';
            return item[headerKey];
        },
        render() {
            const html = `
                <table :class="mxTable_class">
                    <thead>
                        <tr>
                            <template x-for="(item, i) in mxTable_headers" :key="getKey(item, i)">
                                <th x-text="getText(item)"></th>
                            </template>
                        </tr>
                    </thead>
                    <tbody>
                        <template x-for="row in mxTable_items">
                            <tr>
                                <template x-for="col in row">
                                    <td x-text="col"></td>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
        }
    }
}