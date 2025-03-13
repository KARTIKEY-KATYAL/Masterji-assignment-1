function Debounce(fn,delay) {
    let myId
    return function (...args) {
        clearTimeout(myId)
        myId = setTimeout(() => {
            fn.apply(this,args)
        }, delay);
    }
}

function Throttle(fn,delay) {
    let myId = null
    return function(...args){
        if (myId == null){
        myId = setTimeout(() => {
          fn(...args);
        }, delay);
        }
    }
}