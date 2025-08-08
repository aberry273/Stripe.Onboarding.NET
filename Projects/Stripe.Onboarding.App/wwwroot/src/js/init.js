//import alpinejs from 'https://cdn.skypack.dev/alpinejs';
import alpinejs from './alpine-3.14.1.esm.js'

// ALPINEJS STORES
import * as stores from './stores/index.js';
Object.keys(stores).forEach(store => {
    let data = stores[store]();
    alpinejs.store(store, data);
});

// ALPINEJS BINDINGS
import * as bindings from './bindings/index.js';
Object.keys(bindings).forEach(binding => {
    let data = bindings[binding]();
    alpinejs.bind(binding, () => data);
});

// ALPINEJS DIRECTIVES
import * as directives from './directives/index.js';
Object.keys(directives).forEach(directive => {
    let data = directives[directive];
    alpinejs.directive(directive, data);
});

// ALPINEJS MAGICS
import * as magics from './magics/index.js';
Object.keys(magics).forEach(magic => {
    let data = magics[magic];
    alpinejs.magic(magic, data);
});

// MIXINS
import * as mixins from './mixins/index.js';
Object.keys(mixins).forEach(mixin => {
    alpinejs.data(mixin, mixins[mixin]);
});
// SERVICES
import * as services from './services/index.js';
Object.keys(services).forEach(svc => {
    let settings = {}
    if (settings != null) {
        let data = services[svc](settings);
        alpinejs.store(svc, data);
    }
});

/*
// WEBSOCKETS
import * as websockets from './websockets/index.js';
Object.keys(websockets).forEach(svc => {
    let settings = wssSettings.filter(x => x.serviceName == svc)[0]
    if (settings != null) {
        let data = websockets[svc](settings);
        alpinejs.store(svc, data);
    }
});
*/
// COMPONENTS
import * as components from './components/index.js';
Object.keys(components).forEach(component => {
    alpinejs.data(component, components[component]);
});

window.alpinejs = alpinejs
alpinejs.start();

