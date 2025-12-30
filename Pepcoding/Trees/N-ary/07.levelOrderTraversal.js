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

/**
    NOTES: LEVEL ORDER TRAVERSAL IN GENERIC TREE

    1. CONCEPT (BFS)
       - Visit nodes level by level (top to bottom, left to right).
       - Uses a Queue data structure (FIFO) for implementation.

    2. ALGORITHM (R-P-A)
       - Remove: Remove the front node from the queue.
       - Print: Print the data of the removed node.
       - Add: Add all children of the removed node into the queue.

    3. WORKFLOW
       - Initialize queue and add the root node.
       - Run a loop until the queue becomes empty.
       - Inside the loop, follow the Remove-Print-Add strategy.

    4. KEY CHARACTERISTICS
       - Ensures all nodes at depth 'd' are processed before nodes at 'd+1'.
       - Space complexity depends on the maximum width of the tree.
       - Time complexity is O(N) as every node is visited once.
*/
