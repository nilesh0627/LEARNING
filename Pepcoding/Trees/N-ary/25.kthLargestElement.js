/*
==========================================================================
PROBLEM: K-th Largest Element (Generic Tree)
==========================================================================
TASK: 
  Find the K-th largest value in the tree. 
  Example: K=1 is the Largest, K=2 is the Second Largest, etc.

HINT:
  - You already have a function for 'Floor' (Largest value smaller than X).
  - Can you use 'Floor' repeatedly to find the K-th largest?

INPUT:
  - node: Root of the Generic Tree
  - k: The rank of the largest element to find

OUTPUT:
  - value: The K-th largest integer in the tree

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW (K=3 Trace):
--------------------------------------------------------------------------
Tree Values: [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10]

1. 1st Largest (K=1): 120 (Floor of Infinity)
2. 2nd Largest (K=2): 110 (Floor of 120)
3. 3rd Largest (K=3): 100 (Floor of 110)

                   [ 10 ]
          /          |          \
      [ 20 ]       [ 30 ]       [ 40 ]
     /      \     /  |   \        |
   [50]    [60] [70][80] [90]   [100]
                    /  \
                 [110] [120]
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

function floor(node, X) {
  let res = node.value < X ? node.value : -Infinity;
  for (let child of node.children) {
    const ans = floor(child, X);
    res = Math.max(res, ans);
  }
  return res;
}

function kthLargest(node, k) {
  // Your code here
  let ans = Infinity;
  while (k > 0) {
    ans = floor(node, ans);
    k--;
  }
  return ans;
}

console.log(kthLargest(root, 4));

/**
 * NOTES: KTH LARGEST ELEMENT
 *
 * 1. OBJECTIVE
 * - Find the Kth largest element in a Generic Tree.
 * - This approach avoids sorting or storing all elements in an array.
 *
 * 2. ALGORITHM LOGIC (Iterative Floor approach)
 * - Concept: The largest element is the floor of Infinity. The 2nd largest is the floor of the largest, and so on.
 * - Floor Function:
 * - A recursive helper that returns the largest value in the subtree that is strictly smaller than X.
 * - Returns -Infinity if no such value exists.
 * - K-Loop:
 * - Initialize 'ans' to Infinity.
 * - Run a loop 'k' times. In each iteration, find the floor of the current 'ans'.
 * - Update 'ans' with the result of the floor function.
 *
 * 3. KEY CHARACTERISTICS
 * - State Management: 'ans' acts as a moving upper bound that shifts downward after finding each "next largest" value.
 * - No Extra Space: Unlike storing values in an array and sorting, this uses the tree structure directly.
 * - Dependence: The correctness depends entirely on the Floor function returning the "just smaller" value.
 *
 * 4. PERFORMANCE
 * - Time Complexity: O(K * N), where N is the number of nodes. We traverse the entire tree K times.
 * - Space Complexity: O(H) for the recursion stack of the floor function.
 */
