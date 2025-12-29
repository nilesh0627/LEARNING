/*
 * ==========================================
 * PROBLEM STATEMENT: Height of a Generic Tree
 * ==========================================
 * 1. You are given the root of a Generic Tree.
 * 2. You are required to calculate and return the height
 * of the tree.
 * 3. Height is defined in terms of EDGES:
 * - The distance from the root to the deepest node.
 * - A single node (root only) has a height of 0.
 * - Height = Max depth among all nodes.
 *
 * ------------------------------------------
 * INPUT FORMAT:
 * ------------------------------------------
 * An Euler Path Array (Pre-order with -1 for backtracking).
 * Example: [10, 20, 50, -1, 60, -1, -1, 30, 70, -1, 80, 110, -1, 120, -1, -1, 90, -1, -1, 40, 100, -1, -1, -1]
 * 
       [10]
      /  |  \
    <-   |   ->
   /     |     \
 [20]   [30]   [40]
 /  \   / | \    |
50  60 70 80 90 [100]
        /  \
      110  120
 *
 * ------------------------------------------
 * OUTPUT FORMAT:
 * ------------------------------------------
 * A single integer representing the height (number of edges).
 * Example Output: 3
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
 * Function to calculate the height of a Generic Tree
 * @param {Node} node - The root of the tree
 * @returns {number} - Height of the tree in edges
 */
function heightOfTree(node) {
  // Your code here
  let height = 0;
  for (let child of node.children) {
    let childHeight = heightOfTree(child);
    height = Math.max(height, childHeight);
  }
  return node.children.length > 0 ? height + 1 : height;
}
console.log(heightOfTree(root));
