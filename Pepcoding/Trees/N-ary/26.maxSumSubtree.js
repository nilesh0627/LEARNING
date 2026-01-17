/*
==========================================================================
PROBLEM: Node with Maximum Subtree Sum
==========================================================================
TASK: 
  Find the node in the Generic Tree whose subtree (the node itself + all 
  its descendants) has the maximum possible sum of values.

INPUT:
  - node: Root of the Generic Tree

OUTPUT:
  - maxNode: The value of the node that anchors the maximum sum subtree.
  - maxSum: The actual sum of that subtree.

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW:
--------------------------------------------------------------------------
Example calculation for node [-20]:
Sum = (-20) + (50) + (-60) = -30

Example calculation for node [30]:
Sum = (30) + (70) + (-80 + 110 + -120) + (90)
Sum = 30 + 70 + (-90) + 90 = 100

                   [ 10 ]
          /          |          \
      [-20]        [ 30 ]        [ 40 ]
     /      \     /  |   \        |
   [50]   [-60] [70][-80] [90]   [-100]
                    /  \
                 [110] [-120]

LOGIC HINT:
1. Use recursion to get the sum of children.
2. Calculate total sum = node.value + sum of all children's subtrees.
3. Compare total sum with global maxSubtreeSum and update if larger.
4. Return total sum to the parent.
==========================================================================
*/

const root = {
  value: 10,
  children: [
    {
      value: -20,
      children: [
        { value: 50, children: [] },
        { value: -60, children: [] },
      ],
    },
    {
      value: 30,
      children: [
        { value: 70, children: [] },
        {
          value: -80,
          children: [
            { value: 110, children: [] },
            { value: -120, children: [] },
          ],
        },
        { value: 90, children: [] },
      ],
    },
    {
      value: 40,
      children: [{ value: -100, children: [] }],
    },
  ],
};

/*
--------------------------------------------------------------------------
FUNCTION DEFINITION:
--------------------------------------------------------------------------
*/

let maxNodeValue = 0;
let maxSubtreeSum = -Infinity;

/**
 * Returns the sum of the subtree rooted at node, while
 * updating global variables for the maximum found.
 */
function findMaxSubtree(node) {
  // Your code here
  let sum = node.value;
  for (let child of node.children) {
    sum += findMaxSubtree(child);
  }
  if (sum > maxSubtreeSum) {
    maxSubtreeSum = sum;
    maxNodeValue = node.value;
  }
  return sum;
}

findMaxSubtree(root);

console.log({ maxNodeValue, maxSubtreeSum });

/**
 * NOTES: MAXIMUM SUBTREE SUM
 *
 * 1. OBJECTIVE
 * - Find the node whose subtree (the node itself plus all its descendants) has the maximum sum.
 * - Track both the maximum sum found and the value of the node that roots that subtree.
 *
 * 2. ALGORITHM LOGIC (Post-order Bottom-up approach)
 * - Recursive Summation:
 * - Each node calculates its own subtree sum by starting with its own value.
 * - It then calls the function on its children and adds their returned sums to its own.
 * - State Update:
 * - Once the total sum for the current node's subtree is calculated, compare it to 'maxSubtreeSum'.
 * - If the current sum is larger, update 'maxSubtreeSum' and store the 'maxNodeValue'.
 * - Return Value:
 * - The function must return the calculated sum to its parent so the parent can complete its own calculation.
 *
 * 3. KEY CHARACTERISTICS
 * - Post-order Traversal: The "work" (comparison) happens after visiting all children.
 * - Dual Purpose: The function serves two roles—returning a value for the recursion and updating global state variables.
 * - Global State: Uses 'maxSubtreeSum' initialized to -Infinity to handle trees with negative values.
 *
 * 4. PERFORMANCE
 * - Time Complexity: O(N) as every node is visited exactly once.
 * - Space Complexity: O(H) for the recursion stack, where H is the height of the tree.
 */
