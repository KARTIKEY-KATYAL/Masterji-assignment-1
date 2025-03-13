// function WaitSeconds(time) {
//     return new Promise((resolve,reject)=>{
//         if (time > 0){
//             setTimeout(() => {
//             resolve(time);
//             }, time*1000);
//         }else{
//             reject(Error('negative'))
//         }    
//     })
// }

// WaitSeconds(1)
//     .then((time)=>console.log(`Promise resolved after ${time} seconds`))
//     .catch((err) => { throw err })
//     .finally(()=>console.log('Mein tho har bar chalunga'))

class Mypromise{
    constructor(executorfn){
        this._state = 'pending'
        this._successcallbacks = []
        this._errorcallbacks = []
        this._finallycallbacks = []

        this.value = undefined

        executorfn(this.resolverfn.bind(this),this.rejectorfn.bind(this))
    }

    resolverfn(value){
        console.log(`Fulfilling promises total ${this._successcallbacks.length}`);
        
        this.value = value
        this._state = 'fulfilled'
        this._successcallbacks.forEach((cb)=>cb(value))
        this._finallycallbacks.forEach((cb)=>cb())
    }
    
    rejectorfn(err){
        this._state = 'rejected'
        this._errorcallbacks.forEach((cb)=>cb(err))
        this._finallycallbacks.forEach((cb)=>cb())
    }

    
    then(cb){
        if (this._state == "fulfilled"){
            console.log('Apka promise phele se hi fulfilled hai ji');
            cb(this.value)
            return this
        }
        this._successcallbacks.push(cb)
        return this
    }
    
    catch(cb){
        if (this._state == "rejected"){
            console.log('Apka promise phele se hi rejected hai ji')
            cb()
            return this
        }
        this._errorcallbacks.push(cb)
        return this
    }

    finally(cb){
        if (this._state !== 'pending'){
            cb()
            return this
        }
        this._finallycallbacks.push(cb)
        return this
    }
}

function Wait2(seconds) {
  const p = new Mypromise((resolve, reject) => {

        resolve(3)

  });
  return p;
}

Wait2(3)
    .then((c)=>console.log('fulfilled',c))
    .catch(()=>console.log('rejected'))
    .finally(()=>console.log('I am finnaly'))