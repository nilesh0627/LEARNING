/*
 Given an object which can have a function as a value at a nested level, create a function that will accept arguments as input and pass it through all the functions in the input object and return the computed value.

 https://learnersbucket.com/examples/interview/piping-function-in-javascript-part-1/
 
 */

function deepExecute(obj, args, res = {}) {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      res[key] = deepExecute(obj[key], args);
    } else if (typeof obj[key] === "function") {
      res[key] = obj[key](...args);
    }
  }
  return res;
}

function pipe(obj) {
  // Your implementation here...
  return function (...args) {
    const result = deepExecute(obj, args);
    return result;
  };
}

const obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
};

console.log(pipe(obj)(1, 1, 1));

/*
Input:
{
  a : {
    b : (a,b,c) => a+b+c,
    c : (a,b,c) => a+b-c,
  },
  d : (a,b,c) => a-b-c
}


Output:
{
  a : {
    b : 3,
    c : 1
  },
  d: -1
}
*/
