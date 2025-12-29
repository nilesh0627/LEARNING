/*
 * ==========================================
 * PROBLEM STATEMENT: Maximum in a Generic Tree
 * ==========================================
 * 1. You are given the root of a Generic Tree.
 * 2. You are required to find and return the node with
 * the maximum value in the entire tree.
 * 3. Assume the tree contains at least one node.
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
 * A single integer representing the maximum node value found.
 * Example Output: 120
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
 * Function to find the maximum value in a Generic Tree
 * @param {Node} node - The root of the tree
 * @returns {number} - The maximum value
 */
function maxNode(node) {
  // Your code here
  let max = node.value;
  for (let child of node.children) {
    let childMax = maxNode(child);
    max = Math.max(max, childMax);
  }
  return max;
}

console.log(maxNode(root));
