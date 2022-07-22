

var register = function() {
    try {
        var worker = navigator.serviceWorker.register('service-worker.js')
    
        if(worker.installing) {
            console.log('Worker installing')
        }
        else if (worker.waiting) {
            console.log('Worker installed')
        }
        else if(worker.active) {
            console.log('Worker active')
        }
        
    }
    catch (error) {
        console.error(error)
    }
}

console.log('Registering Worker')
register()