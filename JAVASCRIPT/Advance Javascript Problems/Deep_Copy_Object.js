const obj1={
    name:'nilesh',
    address:{
      village:'chauri',
      post:'Birsair',
      district:'madhubani'
    }
  }
  
  // function deepClone(obj){
  //   const copy={}
  //   for(let key in obj){
  //       if(typeof obj[key]==='object'){
  //         copy[key]=deepClone(obj[key])
  //       }
  //       else{
  //         copy[key]=obj[key]
  //       }
  //   }
  //   return copy
  // }


  // Better Approach
  function deepClone(obj, res={}){
    for(let key in obj){
      if(typeof obj[key] === 'object'){
        res[key]=deepClone(obj[key])
      }
      else{
        res[key]=obj[key]
      }
    }
    return res
  }
  
  console.log(deepClone(obj1))