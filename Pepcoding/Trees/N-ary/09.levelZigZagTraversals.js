/*
==========================================
PROBLEM STATEMENT: Level Order Linewise - Zig Zag
==========================================
1. You are given the root of a Generic Tree.
2. You are required to traverse and print nodes 
   level by level in a Zig-Zag fashion.
3. Zig-Zag pattern:
   - Level 0: Left to Right
   - Level 1: Right to Left
   - Level 2: Left to Right
   - Level 3: Right to Left
   ... and so on.
4. Each level should be printed on a NEW line.
5. Within each level, nodes should be separated by a space.

------------------------------------------
DIAGRAMMATIC VIEW:
------------------------------------------

              [10]                  (Level 0: L -> R)
           /    |    \
        <-      |      ->
       /        |        \
     [20]      [30]      [40]       (Level 1: R -> L)
    /    \    / | \       |
   50    60  70 80 90   [100]       (Level 2: L -> R)
               /  \
             110  120               (Level 3: R -> L)

------------------------------------------
INPUT FORMAT:
------------------------------------------
An Euler Path Array (Pre-order with -1 for backtracking).

------------------------------------------
OUTPUT FORMAT:
------------------------------------------
[
  [10],
  [40, 30, 20],
  [50, 60, 70, 80, 90, 100],
  [120, 110]
]
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
 * Function to perform Level Order Linewise Zig-Zag Traversal
 * @param {Node} node - The root of the tree
 */
function levelOrderZigZag(node) {
  // Your code here
  let ps = [],
    cs = [],
    res = [[]],
    flag = true;
  ps.push(node);
  while (ps.length > 0 || cs.length > 0) {
    if (ps.length === 0) {
      ps = cs;
      cs = [];
      res.push([]);
      flag = !flag;
    } else {
      const curr = ps.pop();
      if (flag) {
        for (let i = 0; i < curr.children.length; i++) {
          cs.push(curr.children[i]);
        }
      } else {
        for (let i = curr.children.length - 1; i >= 0; i--) {
          cs.push(curr.children[i]);
        }
      }
      res[res.length - 1].push(curr.value);
    }
  }
  return res;
}

console.log(levelOrderZigZag(root));

/**
    NOTES: LEVEL ORDER LINEWISE - ZIG ZAG (TWO STACKS APPROACH)

    1. OBJECTIVE
       - Traverse the tree level by level in a zig-zag manner.
       - Level 1 (flag = true): Left to Right.
       - Level 2 (flag = false): Right to Left.

    2. DATA STRUCTURES (Based on your solution)
       - Parent Stack (ps): Stores nodes of the current level.
       - Child Stack (cs): Stores nodes of the next level.
       - Flag: Boolean to toggle the insertion order of children.
       - Result (res): Array of arrays to store values line by line.

    3. ALGORITHM LOGIC
       - Pop a node from the Parent Stack (ps).
       - Store its value in the current level's sub-array.
       - Child Insertion (based on flag):
           - If flag is true: Push children into cs from 0 to length-1.
           - If flag is false: Push children into cs from length-1 down to 0.
       - Level Switch (when ps is empty):
           - Move all nodes from cs to ps.
           - Toggle the flag.
           - Add a new empty sub-array to res.

    4. KEY TAKEAWAY
       - Using .pop() on ps ensures the LIFO property.
       - The direction of the next level is determined by the order in which 
         children are pushed into the Child Stack (cs).
*/
