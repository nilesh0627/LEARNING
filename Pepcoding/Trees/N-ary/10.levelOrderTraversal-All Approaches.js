// root structure for reference (this is how the strcture of tree will look like after construction from input array - check-> 01.constructTree.js for tree construction from input array)
const root = {
  value: 10,
  children: [
    {
      value: 20,
      children: [
        {
          value: 50,
          children: [],
        },
        {
          value: 60,
          children: [],
        },
      ],
    },
    {
      value: 30,
      children: [
        {
          value: 70,
          children: [],
        },
        {
          value: 80,
          children: [
            {
              value: 110,
              children: [],
            },
            {
              value: 120,
              children: [],
            },
          ],
        },
        {
          value: 90,
          children: [],
        },
      ],
    },
    {
      value: 40,
      children: [
        {
          value: 100,
          children: [],
        },
      ],
    },
  ],
};
/*
==========================================================================
APPROACH 1: TWO QUEUES (Main Queue & Child Queue)
==========================================================================
- Logic: Use pq for the current level and cq for the next level.
- Processing: Remove from pq, print, and add children to cq.
- Swap: When pq is empty, move cq nodes into pq for the next level.
*/
function levelOrderTwoQueues(node) {
  if (!node) return [];
  // Your code here
  let pq = [],
    cq = [],
    res = [[]];
  pq.push(node);
  while (pq.length > 0 || cq.length > 0) {
    if (pq.length === 0) {
      res.push([]); // if pq empty then add new level
      pq = [...cq];
      cq = [];
    } else {
      const curr = pq.shift();
      res[res.length - 1].push(curr.value);
      cq = [...cq, ...curr.children];
    }
  }
  return res;
}

console.log(levelOrderTwoQueues(root));

/*
==========================================================================
APPROACH 2: DELIMITER (Null or Marker Node)
==========================================================================
- Logic: Add a 'null' marker to signal the end of a level.
- Processing: When 'null' is hit, a level is complete.
- Cycle: Add a new 'null' only if the queue still has children for the next level.
*/
function levelOrderDelimiter(node) {
  // Your code here
  const pq = [],
    res = [[]];
  pq.push(node);
  pq.push(null);
  while (pq.length > 0) {
    const curr = pq.shift();
    if (curr === null) {
      if (pq.length > 0) {
        pq.push(null);
        res.push([]);
      }
    } else {
      res[res.length - 1].push(curr.value);
      for (let i = 0; i < curr.children.length; i++) {
        pq.push(curr.children[i]);
      }
    }
  }
  return res;
}

console.log(levelOrderDelimiter(root));

/*
==========================================================================
APPROACH 3: COUNT (Size-based)
==========================================================================
- Logic: Use a single queue and capture its size at the start of each level.
- Loop: The inner 'for' loop ensures only nodes of the current level are processed.
- Benefit: This is often considered the cleanest approach as it avoids 
  extra queues or special marker nodes like 'null'.
*/
function levelOrderCount(node) {
  // Your code here
  let pq = [],
    res = [[]];
  pq.push(node);
  while (pq.length > 0) {
    let count = pq.length;
    for (let i = 0; i < count; i++) {
      const curr = pq.shift();
      res[res.length - 1].push(curr.value);
      curr.children.forEach((node) => pq.push(node));
    }
    if (pq.length > 0) res.push([]);
  }
  return res;
}
console.log(levelOrderCount(root));

/*
==========================================================================
APPROACH 4: PAIR CLASS (Object Tracking)
==========================================================================
- Logic: Store node and its level depth together in a pair/object.
- Change: If current node level != previous node level, you've hit a new line.
*/
function levelOrderPair(node) {
  // Your code here
}
