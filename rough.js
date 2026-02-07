class PromisePolyfill {
  constructor(executorFn) {
    this.value = null;
    this.state = "PENDING";
    this.onResolveHandlers = [];
    this.resolve = this.resolve.bind(this);
    this.then = this.then.bind(this);
    executorFn(this.resolve);
  }
  resolve(params) {
    if (this.state !== "PENDING") return;
    this.value = params;
    this.state = "SUCCESS";
    let res = this.value;
    this.onResolveHandlers.forEach((callback) => {
      res = callback(res);
    });
  }
  then(successCallback) {
    if (this.state === "PENDING") {
      this.onResolveHandlers.push(successCallback);
    } else {
      const res = successCallback(this.value);
      this.value = res;
    }
    return this;
  }
}

const p1 = new PromisePolyfill((resolve, reject) => {
  // resolve(10);
  setTimeout(() => {
    resolve(10);
  }, 1000);
});

p1.then((data) => {
  console.log(data);
  return 2 * 10;
}).then((data) => {
  console.log(data);
  return 2 * 10;
});
