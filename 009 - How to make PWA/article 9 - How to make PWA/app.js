

var register = function() {
    try {
        navigator.serviceWorker.register('service-worker.js')
    }
    catch (error) {
        console.error(error)
    }
}
register()