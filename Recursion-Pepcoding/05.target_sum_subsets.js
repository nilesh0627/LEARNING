function printSubsetsTargetSum(arr, target) {
  const sum = arr.reduce((accum, curr) => accum + curr, 0);
  if (arr.length === 0) {
    return;
  }
  if (target === sum) {
    console.log(arr);
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    printSubsetsTargetSum([...arr.slice(0, i), ...arr.slice(i + 1)], target);
  }
}

printSubsetsTargetSum([20, 10, 20, 30, 40], 50);
