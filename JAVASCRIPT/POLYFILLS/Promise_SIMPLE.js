function PromisePolyFill(executor){
    let state="PENDING"
    let value=null
    let error=null
    let onResolve=null
    let onReject=null
    function resolve(result){
      if(state !== "PENDING") return
      value=result
      state="SUCCESS"
      if(typeof onResolve === "function") // For AsynChronus Behaviour (resolve is called after then handler)
        onResolve(value) 
    }
    
    this.then = function(successCallback){
      onResolve=successCallback
      if(state==="SUCCESS") // For SynChronus Behaviour (then handler is called after resolve i.e. No Asynchronous Behaviour)
        onResolve(value)
      return this
    }
    
    function reject(err){
      if(state !== "PENDING") return
      error=err
      state="FAILURE"
      if(typeof onReject === "function") onReject(error)
    }
    
    this.catch = function(failureCallback){
      onReject=failureCallback
      if(state==="FAILURE") onReject(error)
    }
    
    executor(resolve,reject)
  }
  
  
  const p1=new PromisePolyFill((resolve,reject)=>{
    setTimeout(()=>{
      reject('Some Data !!')
    },1000)
  })
  
  p1.then((data)=>{
    console.log(data)
  }).catch((error)=>{
    console.log(error)
  })
  
