const fs = require('fs')

setTimeout(()=>console.log(`SetTimeout`),0)

setImmediate(()=>console.log("SetImmediate"))

console.log('Hello')