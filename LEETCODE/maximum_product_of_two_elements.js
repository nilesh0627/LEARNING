/*Idea is to use bubble sort to find first two highest elements and return 
their prouct as give is : Elements of the array will always be +ve */

console.log('adding a console');
function getMaximumProduct(arr){
    for(let i=0;i<2;i++){
        let max=0
        for(let j=0;j<arr.length-i;j++){
            if(arr[j]>arr[max]) max=j
        }
        let temp=arr[max]
        arr[max]=arr[arr.length-1-i]
        arr[arr.length-1-i]=temp
    }
    return arr[arr.length-1]*arr[arr.length-2]
}
console.log(getMaximumProduct([2,4,1,7,8,12,9]))
console.log(getMaximumProduct([12,11,10,9,8,7,6]))
console.log(getMaximumProduct([12,11,10,9,8,7]))