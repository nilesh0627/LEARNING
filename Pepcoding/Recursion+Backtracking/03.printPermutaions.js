/* print all possible permutaions of a string
a string of length n has n! possible permutaions so print them all
approach -> create euler's tree on paper and draw all possible options/selections user has at a time
and at last have the base case.
*/

function printPermutaions(str, ans = "") {
  if (str.length === 0) {
    console.log(ans);
    return;
  }
  for (let i = 0; i < str.length; i++) {
    const selection = str[i];
    const rest = str.substring(0, i) + str.substring(i + 1);
    printPermutaions(rest, ans + selection);
  }
}
printPermutaions("abc");
// printPermutaions("abcd");
