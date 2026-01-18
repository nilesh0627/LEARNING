/*
==========================================================================
PROBLEM: Binary Tree Constructor
==========================================================================
TASK: 
  Implement the constructor for a Binary Tree using an iterative 
  approach with a Stack. The tree is represented by a Pre-order 
  array where null denotes a null node.

INPUT:
  - arr: [50, 25, 12, null, null, 37, 30, null, null, null, 75, 62, null, 70, null, null, 87, null, null]

OUTPUT:
  - root: The root node of the constructed Binary Tree.

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW (Input Visualization):
--------------------------------------------------------------------------
Input Array: [50, 25, 12, null, null, 37, 30, null, null, null, 75, 62, null, 70, null, null, 87, null, null]

Expected Tree Structure:

                   [ 50 ]
                /          \
            [ 25 ]        [ 75 ]
           /      \      /      \
        [ 12 ]  [ 37 ] [ 62 ]  [ 87 ]
                /        \
              [ 30 ]    [ 70 ]

Logic Flow:
- If State is 1: Handle Left child, increment state to 2, push new Pair if not null.
- If State is 2: Handle Right child, increment state to 3, push new Pair if not null.
- If State is 3: Processing complete, Pop from Stack.
==========================================================================
*/

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Pair {
  constructor(node, state) {
    this.node = node;
    this.state = state; // State 1: Left, State 2: Right, State 3: Pop
  }
}

/*
--------------------------------------------------------------------------
FUNCTION DEFINITION:
--------------------------------------------------------------------------
*/

function constructBinaryTree(arr) {
  // Your code here
  const stack = [];
  let root = null;
  for (let item of arr) {
    const top = stack[stack.length - 1];
    if (item === null) {
      if (top.state === 1) {
        top.state++;
      } else if (top.state === 2) {
        stack.pop();
      }
    } else {
      const node = new Node(item);
      if (stack.length === 0) {
        root = node;
        stack.push({ node, state: 1 });
      } else {
        if (top.state === 1) {
          top.node.left = node;
          top.state++;
        } else if (top.state === 2) {
          top.node.right = node;
          stack.pop();
        }
        stack.push({ node, state: 1 });
      }
    }
  }
  return root;
}

const inputArr = [
  50,
  25,
  12,
  null,
  null,
  37,
  30,
  null,
  null,
  null,
  75,
  62,
  null,
  70,
  null,
  null,
  87,
  null,
  null,
];
console.dir(constructBinaryTree(inputArr), { depth: null, colors: true });

/**
  NOTES: CONSTRUCT BINARY TREE (STACK-BASED)

  1. OBJECTIVE
     Convert a linearized array (with 'null' representing empty spots) 
     into a linked Binary Tree structure using an iterative approach.

  2. STATE DEFINITION
     - State 1: Ready to attach the Left child.
     - State 2: Ready to attach the Right child.
     - Pop: When state reaches 2 (after right child attempt), the node is fully processed.

  3. ALGORITHM LOGIC
     - Root Initialization: The first non-null element becomes the root and 
       is pushed to the stack with state 1.
     - For each subsequent item:
        - If item is NOT null:
           - Create a new Node.
           - If top.state is 1: Attach to top.node.left and increment state.
           - If top.state is 2: Attach to top.node.right and pop the top node.
           - Push the new node to the stack (to fill its own children).
        - If item IS null:
           - If top.state is 1: Just increment state (left child is null).
           - If top.state is 2: Pop the top node (right child is null).

  4. KEY CHARACTERISTICS
     - Stack-driven: Mimics the recursive "depth-first" creation.
     - Null Handling: A 'null' in the array doesn't create a node; it only 
       advances the 'state' of the current parent on the stack.
     - One-to-One Mapping: Each non-null element is pushed once and popped once.

  5. PERFORMANCE
     - Time Complexity: O(N) where N is the number of elements in the array.
     - Space Complexity: O(H) where H is the height of the tree for the stack.
*/
