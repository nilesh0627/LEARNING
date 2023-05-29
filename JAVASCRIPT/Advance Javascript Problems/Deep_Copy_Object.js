const obj1={
    name:'nilesh',
    address:{
      village:'chauri',
      post:'Birsair',
      district:'madhubani'
    }
  }
  
  function deepClone(obj){
    const copy={}
    for(let key in obj){
        if(typeof obj[key]==='object'){
          copy[key]=deepClone(obj[key])
        }
        else{
          copy[key]=obj[key]
        }
    }
    return copy
  }
  
  console.log(deepClone(obj1))