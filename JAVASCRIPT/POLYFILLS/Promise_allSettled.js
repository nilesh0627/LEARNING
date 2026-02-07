const p1 = Promise.resolve("Nilesh");
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(22);
  }, 1000);
});

Promise.myAllSettled = function (promises) {
  const result = [];
  let unresolved = promises.length;
  return new Promise((resolve) => {
    if (unresolved === 0) return resolve([]);
    promises.forEach((promise, index) => {
      // wrarpping promise in Promise.resolve(promise) so in case if any non-promise value like 'string/number' is passed then it should not throw error
      Promise.resolve(promise)
        .then((data) => {
          result[index] = {
            status: "fulfilled",
            value: data,
          };
          unresolved--;
        })
        .catch((err) => {
          result[index] = {
            status: "rejected",
            reason: err,
          };
          unresolved--;
        })
        .finally(() => {
          if (unresolved === 0) {
            resolve(result);
          }
        });
    });
  });
};

Promise.myAllSettled([p1, p2, p3]).then((data) => console.log(data));

/*
Notes for Promise.myAllSettled Polyfill

- Purpose:
  Implements a custom version of Promise.allSettled, called myAllSettled, which takes an array of promises (or values) and returns a new promise.
  The returned promise resolves after all input promises have settled (either fulfilled or rejected), with an array describing the outcome of each promise.

- Key Points:
  1. Returns a new Promise so you can use .then() on the result.
  2. Uses a result array to store outcome objects at their original indices.
  3. Uses an 'unresolved' counter to track how many promises are still pending.
  4. For each promise:
     - Wraps with Promise.resolve to handle non-promise values.
     - On resolve: stores { status: "fulfilled", value: ... } in result.
     - On reject: stores { status: "rejected", reason: ... } in result.
     - On finally: checks if all promises are settled, then resolves the result array.
  5. The returned promise never rejects; it always resolves with an array of outcome objects.
  6. Handles the empty array case correctly (resolves to [] immediately).

- Improvements over basic version:
  - Handles non-promise values gracefully.
  - Handles empty input array.

- Usage:
    Promise.myAllSettled([promise1, promise2, ...])
      .then((results) => { ... });

- Example Output:
    [
      { status: "fulfilled", value: "Nilesh" },
      { status: "fulfilled", value: 10 },
      { status: "rejected", reason: 22 }
    ]
*/
