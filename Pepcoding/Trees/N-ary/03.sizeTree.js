/*
 * ==========================================
 * PROBLEM STATEMENT: Size of Generic Tree
 * ==========================================
 * 1. You are given the root of a Generic Tree.
 * 2. You are required to calculate and return the total
 * number of nodes present in the tree.
 * 3. The size is defined as the total count of nodes,
 * including the root and all its descendants.
 *
 * ------------------------------------------
 * INPUT FORMAT:
 * ------------------------------------------
 * An Euler Path Array (Pre-order with -1 for backtracking).
 * Example: [10, 20, 50, -1, 60, -1, -1, 30, 70, -1, 80, 110, -1, 120, -1, -1, 90, -1, -1, 40, 100, -1, -1, -1]
 *
 * ------------------------------------------
 * OUTPUT FORMAT:
 * ------------------------------------------
 * A single integer representing the total number of nodes.
 * Example Output: 12
 * ==========================================
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
 * Function to calculate the size of a Generic Tree
 * @param {Node} node - The root of the tree
 * @returns {number} - Total number of nodes
 */
function size(node) {
  // Your code here
  let count = 1;
  for (let child of node.children) {
    count += size(child);
  }
  return count;
}

console.log(size(root));
