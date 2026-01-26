/*
==========================================================================
PROBLEM: Iterative Pre, In, and Post-Order Traversal
==========================================================================
TASK: 
  Perform Pre-order, In-order, and Post-order traversals of a Binary Tree 
  iteratively in a single pass using a Stack.
  Each node is visited multiple times, and its "state" determines which 
  traversal list it currently belongs to.

INPUT:
  - node: Root of the Binary Tree

OUTPUT:
  - Three separate lists representing Pre, In, and Post order sequences.

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW (Example Input & Output):
--------------------------------------------------------------------------

VISUAL REPRESENTATION OF INPUT:
                   [ 50 ]
                /          \
            [ 25 ]        [ 75 ]
           /      \      /      \
        [ 12 ]  [ 37 ] [ 62 ]  [ 87 ]


STATE MACHINE LOGIC:
- State 1: Pre-order work. Increment state, push left child.
- State 2: In-order work. Increment state, push right child.
- State 3: Post-order work. Pop the node from the stack.

EXPECTED OUTPUT:
Pre:  50 25 12 37 75 62 87 
In:   12 25 37 50 62 75 87 
Post: 12 37 25 62 87 75 50 

Logic Hint:
1. Create a Pair class/object to store {node, state}.
2. Push root with state 1 into a Stack.
3. While Stack is not empty:
   - Peek the top Pair.
   - If state == 1: Add to Pre, state++, push left if exists.
   - If state == 2: Add to In, state++, push right if exists.
   - If state == 3: Add to Post, Pop.
==========================================================================
*/

const binaryTreeRoot = {
  data: 50,
  left: {
    data: 25,
    left: { data: 12, left: null, right: null },
    right: { data: 37, left: null, right: null },
  },
  right: {
    data: 75,
    left: { data: 62, left: null, right: null },
    right: { data: 87, left: null, right: null },
  },
};

/*
--------------------------------------------------------------------------
FUNCTION DEFINITION:
- STACK TOP PEEK: `let curr = stack[stack.length - 1]` is crucial. You don't 
  remove the node until it hits State 3. You just "peek" at it to 
  decide the next move.
- SPREAD OPERATOR: `...node` creates a copy so you don't mutate the 
  actual Binary Tree nodes by adding a `state` property to them.
- NULL SAFETY: Your `if (curr.left)` and `if (curr.right)` checks prevent 
  the stack from ever receiving a `null` value, keeping the loop clean.
--------------------------------------------------------------------------
*/

function iterativeTraversal(node) {
  // Your code here
  let preOrder = "",
    inOrder = "",
    postOrder = "";
  const stack = [];
  stack.push({ ...node, state: 1 });
  while (stack.length > 0) {
    let curr = stack[stack.length - 1];
    if (curr.state === 1) {
      preOrder += curr.data + " ";
      curr.state = 2;
      if (curr.left) stack.push({ ...curr.left, state: 1 });
    } else if (curr.state === 2) {
      inOrder += curr.data + " ";
      curr.state = 3;
      if (curr.right) stack.push({ ...curr.right, state: 1 });
    } else if (curr.state === 3) {
      postOrder += curr.data + " ";
      stack.pop();
    }
  }
  return { preOrder, inOrder, postOrder };
}

console.log(iterativeTraversal(binaryTreeRoot));

/*
--------------------------------------------------------------------------
THE "SMART" EXPLANATION (Sumeet Sir's Logic):
--------------------------------------------------------------------------

1. THE FAITH VS. EXPECTATION:
   - **Expectation**: We want to mimic the recursive Euler Tour where a node is 
     visited thrice (before left, between children, after right).
   - **Faith**: By using a manual Stack and a 'state' counter, we have faith 
     that we can track our exact position in the recursion tree without 
     actually using recursion.

2. IDENTITY ELEMENTS (STATES):
   - **State 1**: Arrival at the node. This is the **Pre-order** area.
   - **State 2**: Returning from the left subtree. This is the **In-order** area.
   - **State 3**: Returning from the right subtree. This is the **Post-order** area.

3. COMPLEXITY:
   - **Time**: O(N) because each node is pushed/popped once and visited 3 times.
   - **Space**: O(H) where H is the height of the tree, representing the 
     maximum size of the stack.
==========================================================================
/*
==========================================================================
EXPLANATION: Iterative Traversal Logic (State-Machine)
==========================================================================
The code you wrote is a manual simulation of the recursion stack. In 
recursion, the computer "remembers" where to go next. Here, you are using 
the 'state' property to act as that memory.

--------------------------------------------------------------------------
THE 3-STATE TRANSITION CYCLE:
--------------------------------------------------------------------------

1. STATE 1: THE ARRIVAL (Pre-order)
   - Work: You add to `preOrder`.
   - Action: You set the state to 2 (so you know what to do when you return).
   - Move: You push the Left child into the stack to go deeper.

2. STATE 2: THE MID-POINT (In-order)
   - Work: You've returned from the left subtree. You add to `inOrder`.
   - Action: You set the state to 3.
   - Move: You push the Right child into the stack.

3. STATE 3: THE DEPARTURE (Post-order)
   - Work: You've finished both subtrees. You add to `postOrder`.
   - Action: You POP the node. You are done with this branch.
*/
