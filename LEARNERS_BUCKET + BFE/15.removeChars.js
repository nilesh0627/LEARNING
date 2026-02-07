/*
Given a string contaning only a, b and c, remove all b and ac.

removeChars('ab') // 'a'
removeChars('abc') // ''
removeChars('cabbaabcca') // 'caa'

What is the time and space complexity of your approach?
*/

function removeChars(input) {
  // your code here
  const stack = [];
  let i = 0;
  while (i < input.length) {
    stack.push(input[i]);
    const top1 = stack[stack.length - 1];
    const top2 = stack[stack.length - 2];
    if (top1 === "b") stack.pop();
    else if (top1 === "c" && top2 === "a") {
      stack.pop();
      stack.pop();
    }
    i++;
  }
  return stack.join("");
}

console.log(removeChars("ab"));
console.log(removeChars("abc"));
console.log(removeChars("cabbaabcca"));
