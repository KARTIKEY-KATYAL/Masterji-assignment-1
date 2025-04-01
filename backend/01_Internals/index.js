const fs = require('fs')
const math = require('./math')

fs.writeFileSync('./x.txt',"Hello World",()=>{})
console.log(math)
console.log(math.add(3,4))

const __require = function name(params) {
    // Agar ./ se start ho tho apni dir me check karo first
    // else apne dir store me dhundo
        //...Agar tho mill gaya tho well and good
        //...Node Modules me dhundo
    // User ko Error do
}