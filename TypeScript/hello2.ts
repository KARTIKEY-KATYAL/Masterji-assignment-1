function add (x : number ,y : number){
    return x + y
}

console.log(add (3,5))


function CreateUser (user: {firstname : String; lastname ?: String}){

}

function CreateUser2 (user: User){

}

interface User {
    firstname : String,
    lastname ?: String
}

const payload : User = {
    firstname : "Kartikey",
    lastname : "Katyal",

}

CreateUser2(payload)