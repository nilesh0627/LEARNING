/*
==========================================================================
PROBLEM: Predecessor and Successor (Generic Tree)
==========================================================================
TASK: 
  Find the nodes visited immediately before and after a target value 
  during a Pre-order traversal.

INPUT:
  - node: Root of the Generic Tree
  - target: Value to search for

OUTPUT:
  - predecessor: Value visited before target (null if target is first)
  - successor: Value visited after target (null if target is last)

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW (Pre-order Trace):
--------------------------------------------------------------------------
Sequence: 10 -> 20 -> 50 -> 60 -> 30 -> 70 -> 80 -> 110 -> 120 -> 90 -> 40 -> 100

                   [ 10 ]
          /          |          \
      [ 20 ]       [ 30 ]       [ 40 ]
     /      \     /  |   \        |
   [50]    [60] [70][80] [90]   [100]
                    /  \
                 [110] [120]

EXAMPLE (Target: 30):
- Predecessor: 60 (last node processed before state changed)
- Successor: 70 (first node processed after state changed)
==========================================================================
--------------------------------------------------------------------------
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

let predecessor = null;
let successor = null;
let state = 0; // 0: searching, 1: target found, 2: successor found

function findPredecessorAndSuccessor(node, target) {
  if (state === 0) {
    if (node.value === target) {
      state = 1;
    } else {
      predecessor = node.value;
    }
  } else {
    if (state === 1) {
      state = 2;
      successor = node.value;
    }
  }

  for (let child of node.children) {
    if (state !== 2) findPredecessorAndSuccessor(child, target);
  }
}

findPredecessorAndSuccessor(root, 30);

console.log({ predecessor, successor, state });

/**
 * NOTES: PREDECESSOR AND SUCCESSOR
 *
 * 1. OBJECTIVE
 * - Find the Pre-order Predecessor and Successor of a given target node.
 * - Predecessor: The node visited immediately before the target in Pre-order.
 * - Successor: The node visited immediately after the target in Pre-order.
 *
 * 2. ALGORITHM LOGIC (State-based approach)
 * - State Tracking: Uses a 'state' variable to track where we are in relation to the target.
 * - State 0 (Before Target):
 * - Until the target is found, update 'predecessor' to the current node value at every visit.
 * - When target is found, change state to 1.
 * - State 1 (At Target):
 * - The next node visited in the traversal will be the successor.
 * - On the very next visit, set 'successor' and change state to 2.
 * - State 2 (After Successor):
 * - Traversal is complete; stop making further changes.
 *
 * 3. KEY CHARACTERISTICS
 * - Travel & Change: Uses external/global state variables to persist information across recursive calls.
 * - Pre-order Dependency: The sequence follows the "Node -> Children" pattern.
 * - Early Completion: Once state reach 2, the goal is met.
 *
 * 4. PERFORMANCE
 * - Time Complexity: O(N) worst case (visits nodes until successor is found).
 * - Space Complexity: O(H) for the recursion stack.
 */
