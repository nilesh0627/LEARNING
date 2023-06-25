// function flatten(arr){
//     const res=[]
//     function flat(arr){
//       for(let i=0;i<arr.length;i++){
//         if(Array.isArray(arr[i])) flat(arr[i])
//         else res.push(arr[i])
//       }
//     }
//     flat(arr)
//     return res
//   }
  
//   console.log(flatten([1,2,[2,3]]))

//Better Approach

const arr=[1,[2,3,[4,5],[6,7]]]

function flatten(arr, res=[]){
  for(let item of arr){
    if(Array.isArray(item)){
      flatten(item, res)
    }
    else{
      res.push(item)
    }
  }
  return res
}

console.log(flatten(arr))