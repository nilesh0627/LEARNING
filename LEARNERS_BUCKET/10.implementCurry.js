/*
Implement a curry function that transforms a multi-argument function into a sequence of functions. It must repeatedly return a new function until the number of arguments provided matches or exceeds the original function's parameters (func.length). The final call must execute the original function while preserving the original execution context (this).

Scenario,Input,Output
Simple Sum,"curry((a, b) => a + b)(3)(4)",7
Multi-Step,"curry((a, b, c) => a * b * c)(4)(5)(6)",120
Context (this),"obj = {b: 5, m: curry(function(a){ return this.b * a })}; obj.m(3)",15
Partial Reuse,"const add3 = curry((a, b) => a + b)(3); add3(4);",7


*/
function curry(func) {
  // 1. Return the initial wrapper function
  return function curried(...args) {
    /**
     * 2. The Base Case:
     * If we have enough arguments (compared to func.length),
     * execute the function immediately using 'apply' to pass 'this'.
     */
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    /**
     * 3. The Recursive / Partial Step:
     * If we don't have enough arguments, we return a BOUND function.
     * * WHY BIND?
     * - 'this': It "locks" the current execution context (e.g., your 'obj').
     * - '...args': It "presets" the arguments collected so far.
     * * This allows sequences like obj.mul(3)()(2) to work because:
     * a) Every call remembers the object ('this').
     * b) Every call "snowballs" the arguments into the next call.
     */
    return curried.bind(this, ...args);
  };
}

/**
 * REVISION EXAMPLE
 */
const obj = {
  base: 5,
  // Note: 'this' is NOT a parameter in JS. It is a keyword.
  mul: curry(function (foo, bar) {
    return this.base * foo + bar;
  }),
};

// Test Cases for Revision:
console.log(obj.mul(3)(2)); // 17 (Standard)
console.log(obj.mul(3)()(2)); // 17 (Empty calls handled by bind)
console.log(obj.mul()(3)()(2)); // 17 (Initial empty call + context preservation)

function multiplyThreeNumbers(a, b, c) {
  return a * b * c;
}

const curriedMultiplyThreeNumbers = curry(multiplyThreeNumbers);
curriedMultiplyThreeNumbers(4)(5)(6); // 120

const containsFour = curriedMultiplyThreeNumbers(4);
const containsFourMulFive = containsFour(5);
containsFourMulFive(6); // 120
