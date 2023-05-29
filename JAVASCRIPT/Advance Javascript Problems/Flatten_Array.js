function flatten(arr){
    const res=[]
    function flat(arr){
      for(let i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])) flat(arr[i])
        else res.push(arr[i])
      }
    }
    flat(arr)
    return res
  }
  
  console.log(flatten([1,2,[2,3]]))