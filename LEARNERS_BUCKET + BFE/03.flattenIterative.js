/* 
Input: [1, [2, 3], [4, [5, 6]]]
Output: [1, 2, 3, 4, 5, 6]
write a function to flatten it with and without recursion.
*/

function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length > 0) {
    const current = stack.pop();
    if (Array.isArray(current)) {
      stack.push(...current);
    } else {
      result.push(current);
    }
  }
  return result.reverse();
}

console.log(flattenIterative([1, 2, [3, 4]]));
console.log(flattenIterative([1, [2, 3], [4, [5, 6]]]));
