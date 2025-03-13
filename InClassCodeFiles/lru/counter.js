function Increment(params) {
    let count = 0
    return function(){
        count++
        return count
    }
}

let Inc1 = Increment()

console.log(Inc1());
console.log(Inc1());
console.log(Inc1());
console.log(Inc1());

let Inc2 = Increment()

console.log(Inc2());
console.log(Inc2());
console.log(Inc2());
console.log(Inc2());

