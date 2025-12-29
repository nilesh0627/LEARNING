/*
Problem:
Write two functions:
A() returns 2 after 2 seconds
B() returns 3 after 3 seconds

Return their sum in two ways:
Parallel execution → Total time: 3 seconds
Sequential execution → Total time: 5 seconds

Solution - used promise.all and normal async await handling, solved in 10 minutes
*/

// evaluate function measures the time taken for function to finish. it is for testing series and parellel functions
const evaluate = async (fn, label, ...rest) => {
  const startTime = performance.now();
  console.log(`Executing ${label} task starts...`);
  let result = await fn(...rest);
  const endTime = performance.now();
  console.log(
    `Task ${label} finished in ${Number.parseInt(
      endTime - startTime
    )} milliseconds with sum:`,
    result
  );
};

function wait(num, delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num);
    }, delay);
  });
}

// Sequential execution
async function seriesSum(num1, num2) {
  const x1 = await wait(num1, 3000);
  const x2 = await wait(num2, 2000);
  return x1 + x2;
}
// const seriesResult = await seriesSum(2, 3);
// console.log(seriesResult);

evaluate(seriesSum, "sequential", 2, 3);

// Parallel execution
async function parellelSum(num1, num2) {
  const [x1, x2] = await Promise.all([wait(num1, 3000), wait(num2, 2000)]);
  return x1 + x2;
}
evaluate(parellelSum, "parellel", 2, 3);
// const parellelResult = await parellelSum(2, 3);
// console.log(parellelResult);

//------------------------------------------------------------------------------------------------------
/* Alternative clean way of parellel execution*/
/**
 * These will be run in parallel where we call the functions first,
 * then wait for the result later
 */
const parallel = async () => {
  // execution starts parallely
  const task1 = A();
  const task2 = B();

  const result1 = await task1;
  const result2 = await task2;

  return result1 + result2;
};
