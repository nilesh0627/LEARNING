// Approach: 1
function noRepeatSubstring1(str) {
  let left = 0,
    right = 0,
    maxLength = 0,
    set = new Set();
  while (right < str.length) {
    if (set.has(str[right])) {
      while (set.has(str[right])) {
        set.delete(str[left]);
        left++;
      }
    } else {
      set.add(str[right]);
      maxLength = Math.max(maxLength, right - left + 1);
    }
    right++;
  }
  return maxLength;
}

// Approach: 2 (Better approach)
function noRepeatSubstring2(str) {
  let left = 0,
    right = 0,
    map = {},
    maxLength = 0;
  while (right < str.length) {
    if (str[right] in map) {
      // tricky: use pen paper to analyse this with example of "abccba"
      left = Math.max(left, map[str[right]] + 1);
    }
    map[str[right]] = right;
    maxLength = Math.max(maxLength, right - left + 1);
    // console.log(str.substring(left, right + 1));
    right++;
  }
  return maxLength;
}

console.log("<-------Approach 1--------->");
console.log(noRepeatSubstring1("aabccbb"));
console.log(noRepeatSubstring1("abccba"));
console.log(noRepeatSubstring1("abbbb"));
console.log(noRepeatSubstring1("abccde"));
console.log(noRepeatSubstring1("abxzxc"));
console.log("<-------Approach 2--------->");
console.log(noRepeatSubstring2("aabccbb"));
console.log(noRepeatSubstring2("abccba"));
console.log(noRepeatSubstring2("abbbb"));
console.log(noRepeatSubstring2("abccde"));
console.log(noRepeatSubstring2("abxzxc"));
