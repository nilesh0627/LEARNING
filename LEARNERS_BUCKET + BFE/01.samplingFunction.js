/*
Create a function in JavaScript that accepts a function as input and a count and executes that input function once for a given count of calls. Known as sampling function.

https://learnersbucket.com/examples/interview/sampling-function-in-javascript/

*/

function sampler(fn, count) {
  let executionCount = 0;
  return function (...args) {
    executionCount++;
    if (executionCount % count !== 0) return;
    fn.apply(this, args);
  };
}

function message(name) {
  console.log("hello", name);
}

const sample = sampler(message, 4);
sample();
sample();
sample();
sample("nilesh"); // this will be executed
sample();
sample();
sample();
sample("nilesh"); // this will be executed
