let student = {
  name: "Ankit",
  age: 24,
};

function printStudentDetails(domain) {
  console.log(`Name: ${this.name}, Age: ${this.age}, Domain: ${domain}`);
}

Function.prototype.myBind = function (context, ...args1) {
  const originalFn = this;
  return function (...args2) {
    originalFn.apply(context, [...args1, ...args2]);
  };
};

const copiedFn = printStudentDetails.myBind(student);

copiedFn("Java");
