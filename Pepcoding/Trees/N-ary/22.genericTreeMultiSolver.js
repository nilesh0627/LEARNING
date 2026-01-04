/*
==========================================================================
PROBLEM STATEMENT: Generic Tree - Multisolver
==========================================================================
1. You are given the root of a Generic Tree.
2. You are required to calculate the following properties in a SINGLE 
   traversal (one pass through the tree):
   - Size: Total number of nodes in the tree.
   - Max: The node with the maximum value.
   - Min: The node with the minimum value.
   - Height: The maximum depth of the tree (root is at level 0).

3. Instead of returning values from functions, use a state object or 
   global variables to track the values and update them during the 
   traversal.

--------------------------------------------------------------------------
INPUT FORMAT:
--------------------------------------------------------------------------
- node: The root of the Generic Tree.
- depth: Current depth of the node (start with 0).

--------------------------------------------------------------------------
OUTPUT FORMAT:
--------------------------------------------------------------------------
- Print the final values of Size, Max, Min, and Height.
==========================================================================
VISUAL STRUCTURE OF root
==========================================================================

                   [ 10 ]                          <-- Level 0 (Root)
          /          |          \
         /           |           \
      [ 20 ]       [ 30 ]       [ 40 ]             <-- Level 1
     /      \     /  |   \        |
   [50]    [60] [70][80] [90]   [100]              <-- Level 2
                    /  \
                 [110] [120]                       <-- Level 3

--------------------------------------------------------------------------
STRUCTURAL PROPERTIES:
--------------------------------------------------------------------------
- Total Nodes (Size): 12
- Depth/Height: 3 (Path: 10 -> 30 -> 80 -> 110)
- Max Value: 120
- Min Value: 10
- Is Symmetric? FALSE (Left child [20] has 2 children, Right [40] has 1)
==========================================================================
*/

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

// Initial State (Update these as you traverse)
let size = 0;
let min = Infinity;
let max = -Infinity;
let height = 0;

/**
 * Multisolver function to calculate all properties in one go
 * @param {Node} node - The current node
 * @param {number} depth - The depth of the current node
 */
function multiSolver(node, depth = 0) {
  // Your code here
  size += 1;
  min = Math.min(min, node.value);
  max = Math.max(max, node.value);
  height = Math.max(height, depth);
  for (let child of node.children) {
    multiSolver(child, depth + 1);
  }
}

multiSolver(root);
console.log({ size, min, max, height });

/**
 * NOTES: MULTISOLVER (TRAVEL & CHANGE)
 *
 * 1. OBJECTIVE
 * - Calculate multiple tree properties (size, min, max, height) in a single traversal.
 * - Strategy: Use global/static variables and update them while visiting each node.
 *
 * 2. ALGORITHM LOGIC (Based on your solution)
 * - Initialization: Global variables (size, min, max, height) are set to their identity values.
 * - Traversal: Performs a standard Depth-First Search (DFS).
 * - State Updates:
 * - Size: Incremented by 1 at every node.
 * - Min/Max: Updated by comparing current node's value with existing global values.
 * - Height: Calculated by tracking the depth of the current node and updating the global height if depth is greater.
 * - Recursion: For each child, multiSolver is called with an incremented depth (depth + 1).
 *
 * 3. KEY CHARACTERISTICS
 * - Travel and Change: Unlike previous methods that return values (bubbles up), this method modifies state globally during the visit.
 * - Single Pass: Extremely efficient as it gathers all metadata in one full sweep of the tree.
 * - Depth Tracking: Uses a function parameter ('depth') to pass the current level information down the stack.
 *
 * 4. PERFORMANCE
 * - Time Complexity: O(N) — Visits every node exactly once.
 * - Space Complexity: O(H) — Proportional to the height of the tree for the recursion stack.
 */
