/*
TC: O(\log N), Because at every level, we divide n by 2. The height of the recursion tree is logN. For n=1024, the function only calls itself 10 times.
*/
function repeatRecursive(s, n) {
  if (n <= 0) return "";
  if (n === 1) return s;

  // Faith: Get the repeated string for half of n
  const halfResult = repeatRecursive(s, Math.floor(n / 2));

  if (n % 2 === 0) {
    return halfResult + halfResult;
  } else {
    return halfResult + halfResult + s;
  }
}

console.log(repeatRecursive("abc", 4));
