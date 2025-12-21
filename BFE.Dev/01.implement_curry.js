/*
Implement Curry

Problem Statement:
Create a function `curry` that transforms a given function into its curried version.  
A curried function can be called with any number of arguments at each step, and when the total number of arguments provided is equal to or greater than the original function's arity (the number of arguments a function expects.), it executes the original function.

Examples:
const join = (a, b, c) => `${a}_${b}_${c}`;
const curriedJoin = curry(join);

curriedJoin(1, 2, 3);    // '1_2_3'
curriedJoin(1)(2, 3);    // '1_2_3'
curriedJoin(1, 2)(3);    // '1_2_3'
curriedJoin(1)(2)(3);    // '1_2_3'

----------------------------------------------------------
Solution Explanation:

- The `curry` function returns a new function `curried` that collects arguments.
- If the number of collected arguments is equal to or greater than the original function's arity (`fn.length`), it calls the original function with all collected arguments.
- Otherwise, it returns a new function that collects more arguments and repeats the check.
- This allows flexible partial application: you can call the curried function with any number of arguments at each step, until enough arguments are collected to invoke the original function.

Key Points:
- Uses closures to remember previously collected arguments.
- Supports calling with any combination of arguments (e.g., all at once, one by one, or in
*/
function curry(fn) {
  // your code here
  return function curried(...args1) {
    if (args1.length >= fn.length) return fn.apply(this, args1);
    else {
      return function (...args2) {
        return curried.apply(this, [...args1, ...args2]);
      };
    }
  };
}
const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};
const curriedJoin = curry(join);
curriedJoin(1, 2, 3); // '1_2_3'
curriedJoin(1)(2, 3); // '1_2_3'
curriedJoin(1, 2)(3); // '1_2_3'
curriedJoin(1)(2)(3); // '1_2_3'
