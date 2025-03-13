const arr = [1,2,3,4,5,6]

// arr[-1]

function negIndex(){
    return new Proxy(arr,{
        get(target,prop){
            const index = Number(prop)

            if (index < 0){
                return target[target.length + index];
            }else{
                return target[index];
            }
        },
        set(target,prop,value){
            const index = Number(prop)

            if (index < 0){
                target[target.length + index] = value;
            }
            else{
                target[index] = value
            }
            return true
        }
    })
}

let neg = negIndex(arr);

console.log(neg[-2]);

neg[-3] = 121

console.log(arr);
console.log(neg);

