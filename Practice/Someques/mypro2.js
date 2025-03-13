class MyPromise{
    constructor(executorfn){
        this._state = "pending"
        this._successcallback = []
        this._errorcallback = []
        this._finnalycallback = []
        this.value = undefined

        executorfn(this.resolverfn.bind(this),this.rejectorfn.bind(this))
    }

    resolverfn(value){
        this._state = "fullfilled";
        this.value = value
        this._successcallback.forEach((cb)=>cb(value))
        this._finnalycallback.forEach((cb)=>cb(value))
    }
    
    rejectorfn(err){
        this._state = "rejected"
        this._errorcallback.forEach((cb)=>cb(err))
        this._finnalycallback.forEach((cb)=>cb(value))        
    }

    then(cb){
        if (this._state == "fulfilled"){
            cb(this.value)
            return this
        }
        this._successcallback.push(cb)
        return this
    }

    catch(cb){
            if (this._state == "fulfilled") {
              cb();
              return this;
            }
        this._errorcallback.push(cb)
        return this
    }

    finally(cb){
            if (this._state !== "pending") {
              cb();
              return this;
            }
        this._finnalycallback.push(cb)
        return this
    }

    
}

function Wait2(seconds) {
  const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, seconds);
  });
  return p;
}

Wait2(3)
  .then((c) => console.log("fulfilled", c))
  .catch(() => console.log("rejected"))
  .finally(() => console.log("I am finnaly"));