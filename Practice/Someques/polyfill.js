const arr = [1,2,3,4,5,6,7,8,9,10]

const arr2 = arr.map((i)=>i*2)

console.log(arr2);

// Polyfill

if (Array.prototype.myMap == null){
    Array.prototype.myMap = function(userFn){
        const array = this
        let newarr = []
        for (let i = 0 ; i < array.length ;i++){
            const currele = userFn(array[i])
            newarr.push(currele)
        }
        return 
    }
}