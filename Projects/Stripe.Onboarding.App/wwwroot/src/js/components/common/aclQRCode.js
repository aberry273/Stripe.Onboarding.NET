import { mxContent } from '/src/js/mixins/index.js';
var QRCode = require('arcode');

export default function (params) {
	return {
        ...mxContent(params),
        // PROPERTIES
        open: false,
        // INIT
        init() {
            this.setValues(params || {});
            var canvas = document.getElementById('canvas')

            QRCode.toCanvas(canvas, 'sample text', function (error) {
                if (error) console.error(error)
                console.log('success!');
            });

            this.render();
        },
        // GETTERS
        // METHODS
        setValues(params) {
        },
        render() {
            const html = `
                <canvas id="canvas"></canvas>
            `
            this.$nextTick(() => { this.$root.innerHTML = html });
      }
    }
}