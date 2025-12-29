/*
  TITLE: Implement classNames()

  PROBLEM DESCRIPTION:
  Create a utility function to generate dynamic class names. It filters out falsy 
  values and processes arguments based on their data type.

  INPUT FORMAT:
  - Accepts arbitrary arguments (Strings, Numbers, Objects, or Arrays).

  OUTPUT FORMAT:
  - Returns a single space-separated string.

  CONSTRAINTS:
  - Strings & Numbers: Included directly.
  - Objects: Include enumerable keys if the value is truthy.
  - Arrays: Flatten recursively.
  - Others: (Null, undefined, boolean, symbol, bigint) are ignored.

  EXAMPLES:
  1. classNames('BFE', 'dev', 100) 
     => 'BFE dev 100'

  2. classNames(['BFE', [{dev: true}, ['is']]]) 
     => 'BFE dev is'

  3. classNames({a: true, b: false, c: 0}, null, undefined) 
     => 'a'
*/

/**
 * @param {any[]} args
 * @returns {string}
 */
function classNames(...args) {
  // your code here
  let res = [];
  function parse(input) {
    if (!input) return ""; // remove falsy values like undefined, null etc.
    const type = typeof input;

    if ((type === "string" && input.trim() !== "") || type === "number")
      res.push(input);
    else if (Array.isArray(input)) {
      for (let item of input) parse(item);
    } else if (type === "object") {
      for (let key in input) {
        if (!!input[key]) parse(key);
      }
    }
  }
  parse(args);
  return res.join(" ");
}

console.log(classNames("BFE", "dev", "is", 100));
console.log(classNames(["BFE", [{ dev: true }, ["is"]]]));
console.log(classNames({ a: true, b: false, c: 0 }, null, undefined));
console.log(classNames([]));
