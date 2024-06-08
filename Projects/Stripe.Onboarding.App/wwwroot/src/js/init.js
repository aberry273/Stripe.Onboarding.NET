//import alpinejs from 'https://cdn.skypack.dev/alpinejs';
import alpinejs from './alpine.esm.js'

// Load magics
import * as magics from './magics/index.js';
Object.keys(magics).forEach(magic => {
    let data = magics[magic];
    alpinejs.magic(magic, data);
}); 

// Load mixins, prefix with
import * as mixins from './mixins/index.js';
Object.keys(mixins).forEach(mixin => {
    alpinejs.data(mixin, mixins[mixin]);
});

// Load rendering components
import * as components from './components/index.js';
Object.keys(components).forEach(component => {
    alpinejs.data(component, components[component]);
});

window.alpinejs = alpinejs
alpinejs.start();

