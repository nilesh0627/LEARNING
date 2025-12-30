/*
 * ==========================================
 * PROBLEM STATEMENT: Level Order Traversal
 * ==========================================
 * 1. You are given the root of a Generic Tree.
 * 2. You are required to traverse the tree level by level.
 * 3. For each level, print the nodes from left to right.
 * 4. All node values should be printed on a single line
 * separated by space, ending with a period (.).
 *
 * ------------------------------------------
 * DIAGRAMMATIC VIEW:
 * ------------------------------------------
 *    10
 *  /  |  \
 * 20  30  40
 *    /  \
 *   50  60
 *
 * ------------------------------------------
 * INPUT FORMAT:
 * ------------------------------------------
 * An Euler Path Array (Pre-order with -1 for backtracking).
 * Example: [10, 20, -1, 30, 50, -1, 60, -1, -1, 40, -1, -1]
 *
 * ------------------------------------------
 * OUTPUT FORMAT:
 * ------------------------------------------
 * 10 20 30 40 50 60 .
 * ==========================================
 */

// root structure for reference (this is how the strcture of tree will look like after construction from input array - check-> 01.constructTree.js for tree construction from input array)
const root = {
  value: 10,
  children: [
    {
      value: 20,
      children: [],
    },
    {
      value: 30,
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
      value: 40,
      children: [],
    },
  ],
};

/**
 * Function to perform Level Order Traversal
 * @param {Node} node - The root of the tree
 */
function levelOrder(node) {
  // Your code here
  let queue = [];
  queue.push(node);
  while (queue.length > 0) {
    const curr = queue.shift();
    console.log(curr.value);
    queue = queue.concat(curr.children);
  }
}

levelOrder(root);
