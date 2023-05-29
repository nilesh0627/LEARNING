// Nth Level Currying DS question
// Variation 1
function add(num1) {
  	return function(num2){
   	if(typeof num2 === 'number') return add(num1+num2)
   	    return num1
  	}
}
console.log(add(2)(3)(4)(5)())



// Variation 2
function sum(...arr1){
  return function(...arr2){
    if(arr2.length===0) return arr1.reduce((accum,num)=>accum+num,0)
    const res=arr1.reduce((accum,num)=>accum+num,0)
    return sum(res,...arr2)
  }
}
console.log(sum(1,2,3,4,5)(3,4,5)(8,9)())