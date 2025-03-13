const obj = {
    fname:'Kartikey',
    lname:'Katyal',
    age : 18
}

// function changeObj(obj){
//     return new Proxy(obj,{
//         get(target,prop){
//             if (!(prop in target)){
//                 return 'Your Property not exist'
//             }
//             // console.log('test')
//             if (prop == 'age' && target[prop] <= 0){
//                 return 'Invalid age'
//             }
//             return target[prop]
//         },
//         set(target,prop,value){
//             if (!(prop in target)){
//                 console.log(`${prop} not exist in ${target} adding it`)
//                 target[prop] = value
//             }
//               if (prop == 'age' && value < 0) {
//                 // console.log("You can not set negative age");
//                 return "You can not set negative age";
//               } else {
//                 target[prop] = value;
//               }
//               return true
//         }
//     })
// }

// const newProxy = changeObj(obj)
// console.log(newProxy.age)
// newProxy.age = -20
// newProxy.fullname = "Kartikey Katyal"
// console.log(newProxy)
//     // obj.age = -10
//     // console.log(obj)

function changeObj2(obj){
    return new Proxy(obj,{
        get(target , prop){
            if (!(prop in target)){
                 return new Error(`${prop} not exist`)
             }
            switch(prop){
                case 'age':{
                    if (target[prop] < 0){
                        throw new Error(`your age is negative `)
                    }
                    return target[prop]
                }
                case 'fname':{
                    if (target[prop] == ''){
                        throw new Error(`your fname is empty `);
                    }
                    return target[prop];
                }
            }
        },
        set(target,prop,value){
            if (!(prop in target)){
                console.log(`Adding ${prop} in ${target}`)
                target[prop] = value
            }
            switch (prop){
                case ('age'):{
                    if (value < 0 ){
                        throw new Error (`you can not set up negative age`)
                    }
                    target[prop] = value
                    return true
                }
                case ('fname'):{
                    // if (typeof value != String){
                    //     throw new Error ('it is a no')
                    // }
                      if (typeof value == String && value.length < 2) {
                        throw new Error(`fname must be atleast 2 characters`);
                      }
                    target[prop] = value;
                    return true;
                }
                case ('lname'):{
                    if (typeof(value) == String && value.length < 2) {
                      throw new Error(`name must be atleast 2 characters`);
                    }
                    target[prop] = value;
                    return true;
                }
            }
        }
    })
}

const obj2 = changeObj2(obj)

obj2.age = 12
obj2.fname = "abc"
console.log(obj2)

