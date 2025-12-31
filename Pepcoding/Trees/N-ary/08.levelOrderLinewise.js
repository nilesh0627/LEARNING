/*
==========================================
PROBLEM STATEMENT: Level Order Linewise
==========================================
1. You are given the root of a Generic Tree.
2. You are required to traverse and print nodes 
   level by level, but each level must be on a NEW line.
3. Within each level, nodes should be printed from 
   left to right separated by a space.

==========================================
DIAGRAMMATIC VIEW:
==========================================
        [10]
      /  |  \
    <-   |   ->
   /     |     \
 [20]   [30]   [40]
 /  \   / | \    |
50  60 70 80 90 [100]
        /  \
      110  120

------------------------------------------
INPUT FORMAT:
------------------------------------------
An Euler Path Array (Pre-order with -1 for backtracking).
Example: [10, 20, -1, 30, 50, -1, 60, -1, -1, 40, -1, -1]

------------------------------------------
OUTPUT FORMAT:
------------------------------------------
[[10], [20, 30, 40], [50, 60, 70, 80, 90, 100],[110, 120]]
==========================================
*/

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

/**
 * Function to perform Level Order Linewise Traversal
 * @param {Node} node - The root of the tree
 */
function levelOrderLinewise(node) {
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

console.log(levelOrderLinewise(root));

/**
    NOTES: LEVEL ORDER LINEWISE (TWO QUEUE APPROACH)

    1. OBJECTIVE
       - Print nodes level by level, where each level is on a new line.
       - Process nodes from left to right within each level.

    2. DATA STRUCTURES
       - Main Queue (mq): Holds nodes of the current level being processed.
       - Child Queue (cq): Holds nodes of the next level (children of mq nodes).

    3. ALGORITHM
       - Step 1: Add root to the Main Queue.
       - Step 2: Remove a node from mq and print it.
       - Step 3: Add all children of that node into cq.
       - Step 4: If mq becomes empty:
           - Print a newline (level finished).
           - Move all nodes from cq to mq (transfer to next level).
           - Empty the cq for the subsequent level.

    4. TERMINATION
       - The process continues until both queues are empty.

    5. KEY ADVANTAGE
       - Clearly separates levels using two distinct containers.
       - Simple logic for identifying when a level ends.
*/
