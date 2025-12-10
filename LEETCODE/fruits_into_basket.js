function totalFruit(fruits) {
  let left = 0,
    right = 0,
    maxFruits = 0;
  const map = {};
  while (right < fruits.length) {
    if (map[fruits[right]]) map[fruits[right]] += 1;
    else map[fruits[right]] = 1;
    while (Object.keys(map).length > 2) {
      map[fruits[left]] -= 1;
      if (map[fruits[left]] < 1) delete map[fruits[left]];
      left++;
    }
    maxFruits = Math.max(maxFruits, right - left + 1);
    right++;
  }
  return maxFruits;
}

console.log(totalFruit([1, 2, 1]));
console.log(totalFruit([0, 1, 2, 2]));
console.log(totalFruit([1, 2, 3, 2, 2]));
