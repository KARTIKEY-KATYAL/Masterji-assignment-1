let arr = [1,2,3,4,5,6,7,8]

// arr[-1]

function negIndex (){
    return new Proxy(arr,{
        get(target,prop){
            index = Number(prop)
            if (index < 0){
                return target[target.length + index]
            }
            return target[value]
        },
        set(target,prop,value){
            index = Number(prop)
            if (index < 0){
                target[target.length + index] = value
            }else{
                target[index] = value
            }
            return true
        }
    })
}

let neg = negIndex(arr)

console.log(neg[-1]);
