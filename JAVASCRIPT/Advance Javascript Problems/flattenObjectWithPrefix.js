const user = {
  name: "nilesh",
  age: 30,
  info: {
    address: {
      city: "Bengaluru",
      state: "karnataka",
    },
    job: ["infy"],
    wife: ["aarti"],
  },
};

function flattenObject(obj, prefix = "") {
  let res = {};
  for (let key in obj) {
    if (
      typeof obj[key] === "object" &&
      !Array.isArray(obj[key]) &&
      obj[key] !== null
    ) {
      const childRes = flattenObject(
        obj[key],
        prefix + (prefix.length > 0 ? "_" : "") + key,
      );
      res = { ...res, ...childRes };
    } else {
      res[prefix + (prefix.length > 0 ? "_" : "") + key] = obj[key];
    }
  }
  return res;
}

console.log(flattenObject(user, "user"));
