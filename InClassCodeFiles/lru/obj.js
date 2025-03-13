let obj = {
    name : {
        fname :"kartikey",
        lname :"katyal"
    },
    age : 21,
    gender : "Male"
}

let obj2 = {
    ...obj
}

obj.name.fname = "devash"

console.log(obj)
console.log(obj2)