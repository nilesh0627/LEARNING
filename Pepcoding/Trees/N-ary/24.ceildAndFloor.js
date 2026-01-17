/*
==========================================================================
PROBLEM: Ceil and Floor (Generic Tree)
==========================================================================
TASK: 
  Find the Ceil and Floor of a given value 'X' in the tree.

DEFINITIONS:
  - Ceil: Smallest value among all values larger than X (Just larger).
  - Floor: Largest value among all values smaller than X (Just smaller).

INPUT:
  - node: Root of the Generic Tree
  - X: The target value to compare against

OUTPUT:
  - ceil: Smallest value > X (Initialize as Infinity)
  - floor: Largest value < X (Initialize as -Infinity)

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW (Logic Trace):
--------------------------------------------------------------------------
Example: X = 65

                   [ 10 ]
          /          |          \
      [ 20 ]       [ 30 ]       [ 40 ]
     /      \     /  |   \        |
   [50]    [60] [70][80] [90]   [100]
                    /  \
                 [110] [120]

1. Values > 65: {70, 80, 110, 120, 90, 100} -> Smallest is 70 (Ceil)
2. Values < 65: {10, 20, 50, 60, 30, 40}    -> Largest is 60 (Floor)

RESULT: { ceil: 70, floor: 60 }
==========================================================================
*/

const root = {
  value: 10,
  children: [
    {
      value: 20,
      children: [
        { value: 50, children: [] },
        { value: 60, children: [] },
      ],
    },
    {
      value: 30,
      children: [
        { value: 70, children: [] },
        {
          value: 80,
          children: [
            { value: 110, children: [] },
            { value: 120, children: [] },
          ],
        },
        { value: 90, children: [] },
      ],
    },
    {
      value: 40,
      children: [{ value: 100, children: [] }],
    },
  ],
};

/*
--------------------------------------------------------------------------
FUNCTION DEFINITION:
--------------------------------------------------------------------------
*/

let ceil = Infinity;
let floor = -Infinity;

function findCeilAndFloor(node, X) {
  // Your code here
  if (node.value > X && node.value < ceil) {
    ceil = node.value;
  } else if (X > node.value && node.value > floor) {
    floor = node.value;
  }
  for (let child of node.children) {
    findCeilAndFloor(child, X);
  }
}
findCeilAndFloor(root, 65);

console.log({ ceil, floor });

/**
 * NOTES: CEIL AND FLOOR
 *
 * 1. OBJECTIVE
 * - Find the Ceil and Floor of a given target value X.
 * - Ceil: Smallest value among nodes larger than X (Just larger).
 * - Floor: Largest value among nodes smaller than X (Just smaller).
 *
 * 2. ALGORITHM LOGIC (Comparison-based approach)
 * - Candidate Tracking: Uses global variables `ceil` and `floor` to store the best matches found.
 * - Finding Ceil:
 * - If node.value > X and node.value < current ceil: Update ceil.
 * - Finding Floor:
 * - If node.value < X and node.value > current floor: Update floor.
 * - Traversal: Recursively visits every node to ensure the closest bounds are found.
 *
 * 3. KEY CHARACTERISTICS
 * - Initialization: ceil = Infinity, floor = -Infinity.
 * - Global State: Updates shared variables across recursive calls to maintain "best found so far."
 * - Full Discovery: Unlike state-based traversal, it checks all nodes as the tree is not necessarily sorted.
 *
 * 4. PERFORMANCE
 * - Time Complexity: O(N) (must visit all nodes).
 * - Space Complexity: O(H) for the recursion stack.
 */
