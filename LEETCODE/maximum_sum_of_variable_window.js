// Kandane's Algorithm

function getMaximumSum(arr){
    let currSum=arr[0],maxSum=arr[0]
    for(let i=0;i<arr.length;i++){
        currSum=Math.max(arr[i],currSum+arr[i])
        maxSum=Math.max(maxSum,currSum)
    }
    return maxSum
}

console.log(getMaximumSum([-1,4,5,6,-10,2,1]))
console.log(getMaximumSum([-1,-2,-1,-4]))