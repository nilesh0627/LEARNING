function PromisePolyFill(executor){
    let state="PENDING"
    let value=null
    let onResolveHandlers=[]
    function resolve(result){
      if(state !== "PENDING") return
      value=result
      state="SUCCESS"
      if(onResolveHandlers.length) // For AsynChronus Behaviour (resolve is called after then handler)
        onResolveHandlers.reduce((accum,successCallback)=>{
          return successCallback(accum)
        }, value)
    }
    
    this.then= function (successCallback){
      onResolveHandlers.push(successCallback)
      if(state === "SUCCESS") // For SynChronus Behaviour (then handler is called after resolve i.e. No Asynchronous Behaviour)
        value=successCallback(value)
      return this
    }
    
    executor(resolve)
  }
  
  
  const p1=new PromisePolyFill((resolve,reject)=>{
    setTimeout(()=>{
      resolve(20)
    },1000)
  })
  
  p1.then((data)=>{
    return 2*data
  }).then((data)=>{
    return 3*data
  }).then((data)=>{
    console.log(data)
  })