function PromisePolyFill(executor){
    let state="PENDING"
    let value=null
    let onResolveHandlers=[]
    
    this.resolve = function(result){
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
    
    executor(this.resolve)
}

PromisePolyFill.resolve=function(data){
  return new PromisePolyFill((resolve)=>{
    resolve(data)
  })
}
  
  
PromisePolyFill.resolve(54).then((data)=>{
  console.log(data)
})