/*
==========================================================================
PROBLEM: Iterative Pre-order and Post-order Traversal
==========================================================================
TASK: 
  Perform both Pre-order and Post-order traversals of a Generic Tree 
  ITERATIVELY (using a Stack, not recursion).

INPUT:
  - node: Root of the Generic Tree

OUTPUT:
  - preOrder: String/Array of values in pre-order sequence.
  - postOrder: String/Array of values in post-order sequence.

HINT:
  - Use a Stack to store a pair: {node, state}.
  - state == -1: Pre-order visit, then increment state.
  - state == index of children: Process that specific child, increment state.
  - state == node.children.length: Post-order visit, then pop from stack.

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW:
--------------------------------------------------------------------------
Pre-order: 10 20 30 50 60 40
Post-order: 20 50 60 30 40 10

                   [ 10 ]
          /          |          \
      [ 20 ]       [ 30 ]       [ 40 ]
                  /      \
                [50]    [60]
ALGORITHM VISUALIZATION:
State -1: Add to Pre-order, Move state to 0.
State 0 to n-1: Push child[state] to stack, Increment state.
State n: Add to Post-order, Pop from stack.
==========================================================================
*/

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
        { value: 50, children: [] },
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

/*
--------------------------------------------------------------------------
FUNCTION DEFINITION:
--------------------------------------------------------------------------
*/

function iterativeTraversal(node) {
  let pre = "";
  let post = "";
  let stack = [];
  // Your iterative logic here
  stack.push({ node, state: -1 });
  while (stack.length > 0) {
    let top = stack[stack.length - 1];
    if (top.state === -1) pre += top.node.value + " ";
    top.state += 1;
    if (top.node.children.length > top.state) {
      stack.push({ node: top.node.children[top.state], state: -1 });
    } else {
      const postEl = stack.pop();
      post += postEl.node.value + " ";
    }
  }
  return { pre, post };
}

console.log(iterativeTraversal(root));

/**
 * NOTES: ITERATIVE PRE-ORDER AND POST-ORDER
 *
 * 1. OBJECTIVE
 * - Traverse a Generic Tree without using recursion.
 * - Generate both Pre-order and Post-order strings in a single pass.
 *
 * 2. ALGORITHM LOGIC (Stack with State-tracking)
 * - State Definition:
 * - state === -1: Node is visited for the first time (Pre-order).
 * - state >= 0: Represents the index of the child currently being processed.
 * - Processing Loop:
 * - If state == -1: Add node to 'pre' string and increment state.
 * - If state < children.length: Push the child at index 'state' onto the stack with state -1, then increment current node's state.
 * - If state == children.length: All children are done. Pop node from stack and add to 'post' string.
 *
 * 3. KEY CHARACTERISTICS
 * - Stack Simulation: Replaces the call stack with a custom array of objects {node, state}.
 * - State as Pointer: The state variable tells us exactly where we left off when we "return" to a parent node.
 * - Single Pass: Both Pre and Post orders are captured by identifying the "entry" and "exit" points of each node.
 *
 * 4. PERFORMANCE
 * - Time Complexity: O(N) because every node is pushed and popped exactly once.
 * - Space Complexity: O(H) where H is the height of the tree (maximum stack depth).
 */
