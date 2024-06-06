//import alpinejs from 'https://cdn.skypack.dev/alpinejs';
import alpinejs from './alpine.esm.js'

// Load magics
import * as magics from './magics/index.js';
Object.keys(magics).forEach(magic => {
    let data = magics[magic];
    alpinejs.magic(magic, data);
});

window.alpinejs = alpinejs
alpinejs.start();

