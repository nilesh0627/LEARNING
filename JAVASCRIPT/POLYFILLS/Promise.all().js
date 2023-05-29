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

PromisePolyFill.resolve=function(data){
  return new PromisePolyFill((resolve)=>{
    resolve(data)
  })
}

PromisePolyFill.all=function(promiseList){
  const result=[]
  let fulFilledCount=0
  return new PromisePolyFill((resolve,reject)=>{
     for(let i=0;i<promiseList.length;i++){
       promiseList[i].then((data)=>{
         result[i]=data
         fulFilledCount++
         if(fulFilledCount === promiseList.length)
           resolve(result)
       }).catch((error)=>{
         reject(error)
         return
       })
     }
  })
}


const p1=new PromisePolyFill((resolve)=>{
  resolve(23)
})

const p2=PromisePolyFill.resolve(92)

const p3=new PromisePolyFill((resolve)=>{
  setTimeout(()=>{
    resolve('Important Data')
  },1000)
})

const p4=new PromisePolyFill((_resolve,reject)=>{
  reject('Something Went Wrong')
})


PromisePolyFill.all([p1,p2,p3]).then((values)=>{
  console.log(values)
}).catch((error)=>{
  console.log(error)
})
