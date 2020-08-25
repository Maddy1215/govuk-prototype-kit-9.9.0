if ('serviceWorker' in navigator) {
    console.log('Registering service worker');
window.addEventListener('load', () => {
//const sw = 'app/service-worker.js';
navigator.serviceWorker.register('service-worker.js')
//navigator.serviceWorker.register(sw)
.then(registration => {
console.log('Service Worker is registered', registration);
})
.catch(err => {
console.error('Registration failed:', err);
});
});
}