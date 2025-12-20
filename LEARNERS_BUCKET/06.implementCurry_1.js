/*
Implement Curry Function

Problem Statement:
Create a function `sum` that allows you to add numbers using a curried syntax, such that:

sum(1)(2)(3)() // returns 6

- Each call with a number returns a new function that expects the next number.
- When called with no arguments (i.e., with empty parentheses), it returns the sum of all previously provided numbers.

Example Usage:
sum(1)(2)(3)()      // 6
sum(5)(10)(-2)(7)() // 20
sum()               // 0

Constraints:
- The function should handle any number of chained calls.
- If called with no arguments at the start (sum()), it should return 0.
*/
function sum(num1) {
  if (num1 === undefined) return 0;
  return function (num2) {
    if (num2 === undefined) return num1;
    return sum(num2 + num1);
  };
}

console.log(sum()); // 0
console.log(sum(1)());
console.log(sum(1)(2)(3)()); // 6
console.log(sum(5)(10)(-2)(7)()); // 20
