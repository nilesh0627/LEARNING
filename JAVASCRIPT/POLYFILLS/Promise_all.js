const p1 = Promise.resolve("Nilesh");
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
});

// myAll should return a promise then only i can use .then() on that
Promise.myAll = function (promises) {
  const result = [];
  let unresolved = promises.length;
  return new Promise((resolve, reject) => {
    if (unresolved === 0) return resolve([]);
    promises.forEach((promise, index) => {
      promise
        .then((data) => {
          result[index] = data;
          unresolved--;
          if (unresolved === 0) {
            resolve(result);
            return;
          }
        })
        .catch((err) => {
          reject(err);
          return;
        });
    });
  });
};

Promise.myAll([p1, p2])
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

/*
Notes for Promise.myAll Polyfill

- Purpose:
  Implements a custom version of Promise.all, called myAll, which takes an array of promises and returns a new promise.
  The returned promise resolves when all input promises resolve, or rejects as soon as any input promise rejects.

- Key Points:
  1. Returns a new Promise so you can use .then() and .catch() on the result.
  2. Uses a result array to store resolved values at their original indices.
  3. Uses an 'unresolved' counter to track how many promises are still pending.
  4. For each promise:
     - On resolve: store the value, decrement unresolved, and if all are resolved, resolve the result array.
     - On reject: immediately reject the returned promise with the error.
  5. If any promise rejects, the entire myAll promise rejects immediately.
  6. If the input array is empty, the returned promise never resolves (this is a bug; native Promise.all resolves to [] immediately).

- Limitations:
  - Assumes all items in the array are promises. If a non-promise value is passed, it will throw an error.
  - Does not handle the empty array case correctly (should resolve to [] immediately).
  - Does not wrap non-promise values with Promise.resolve().

- Improvements:
  - Wrap each item with Promise.resolve(promise) to handle non-promise values.
  - Add a check for empty input array and resolve immediately.

- Usage:
    Promise.myAll([promise1, promise2, ...])
      .then((results) => { ... })
      .catch((error) => { ... });
*/
