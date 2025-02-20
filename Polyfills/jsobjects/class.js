class Person {
    constructor(fname,lname){
        this.fname = fname,
        this.lname = lname
    }
    getFullName(){
        console.log(`${this.fname} ${this.lname}`)
    }
}

const p1 = new Person('Kartikey','Katyal')
const p2 = new Person('Devash','Katyal')

p1.getFullName()
p2.getFullName()