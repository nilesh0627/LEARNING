function PromisePolyFill(executor){
    let state="PENDING"
    let value=null
    let onResolveHandlers=[]
    let error=null
    let onRejectHandlers=[]
    function resolve(result){
      if(state!=="PENDING") return
      value=result
      state="SUCCESS"
      if(onResolveHandlers.length)
        onResolveHandlers.reduce((accum,successCallback)=>{
          return successCallback(accum)
        },value)
      
    }
    this.then = function(successCallback){
      onResolveHandlers.push(successCallback)
      if(state==="SUCCESS")
        value=successCallback(value)
      return this
    }
    
    function reject(err){
      if(state !== "PENDING") return
      error=err
      state="FAILURE"
      if(onRejectHandlers.length)
        onRejectHandlers.reduce((accum,failureCallback)=>{
          return failureCallback(accum)
        },error)
      
    }
    
    this.catch = function(failureCallback){
      onRejectHandlers.push(failureCallback)
      if(state==="FAILURE")
        error=failureCallback(error)
      return this
    }
    executor(resolve, reject)
  }
  const p1=new PromisePolyFill((resolve,reject)=>{
    setTimeout(()=>{
      reject(10)
    },1000)
  })
  
  p1.then((data)=>{
    return 2*data
  }).then((data)=>{
    console.log(data)
  }).catch((error)=>{
    return 2*error
  }).catch((error)=>{
    console.log(`That's What She said ${error} number of times`);
  })