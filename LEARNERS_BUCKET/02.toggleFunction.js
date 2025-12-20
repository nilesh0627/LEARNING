// Create a toggle function in JavaScript that accepts a list of arguments and toggles each of them when invoked in a cycle. The toggle function returns each value clockwise on each call of the function and the same can be done by returning a function from the toggle function forming a closure over the values to track the cycle.
// https://learnersbucket.com/examples/interview/create-a-toggle-function-in-javascript/

function toggle(...list) {
  let start = 0;
  return function (...args) {
    if (list.length === 0) return undefined;
    const res = list[start];
    // Increment and wrap around using modulo
    start = (start + 1) % list.length;
    console.log(res);
    return res;
  };
}

let hello = toggle("hello");
hello(); // "hello";
hello(); // "hello";

let onOff = toggle("on", "off");
onOff(); // "on"
onOff(); // "off"
onOff(); // "on"
