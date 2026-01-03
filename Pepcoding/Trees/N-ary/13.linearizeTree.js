/*
==========================================================================
PROBLEM STATEMENT: Linearize a Generic Tree
==========================================================================
1. You are given the root of a Generic Tree.
2. You are required to linearize the tree in-place.
3. Linearization means:
   - The tree should be transformed into a single line (like a Linked List).
   - The order of nodes in this line must follow the Pre-order Traversal.
   - For every node, all its children are moved such that the first child 
     remains, and the second child becomes the tail (end) of the first 
     child's linearized branch, and so on.

------------------------------------------
DIAGRAMMATIC VIEW:
------------------------------------------

              [10]                  (Level 0: L -> R)
           /    |    \
        <-      |      ->
       /        |        \
     [20]      [30]      [40]       (Level 1: R -> L)
    /    \    / | \       |
   50    60  70 80 90   [100]       (Level 2: L -> R)
               /  \
             110  120               (Level 3: R -> L)

--------------------------------------------------------------------------
INPUT FORMAT:
--------------------------------------------------------------------------
A Node object representing the root of the Generic Tree.

--------------------------------------------------------------------------
OUTPUT FORMAT:
--------------------------------------------------------------------------
The function modifies the tree in-place. No return is required.
==========================================================================
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

function getNodeTail(node) {
  let tail = node;
  while (tail.children.length > 0) {
    tail = tail.children[0];
  }
  return tail;
}

function linearize(node) {
  // 1. Ask children to linearize themselves
  for (let child of node.children) {
    linearize(child);
  }
  // 2. Stitch children together
  while (node.children.length > 1) {
    const last = node.children.pop();
    const secondLast = node.children[node.children.length - 1];

    // Find where the secondLast branch ends
    const secondLastTail = getNodeTail(secondLast);

    // Connect the popped last child to that tail
    secondLastTail.children.push(last);
  }
}

linearize(root);
console.dir(root, { depth: null });

/**
    NOTES: LINEARIZE A GENERIC TREE

    1. OBJECTIVE
       - Transform a generic tree into a single line (linked list structure).
       - The order must follow the Pre-order traversal of the original tree.

    2. LOGIC (Recursive Approach)
       - First, recursively call linearize on all children to ensure they are 
         already linearized.
       - Start merging siblings from right to left (last child to second last).
       - Process:
           a. Remove the last child (last).
           b. Find the tail of the second-to-last child (secondLastTail).
           c. Attach the removed "last" child as a child of "secondLastTail".
       - Repeat this until the current node has only one child left.

    3. TAIL HELPER (getNodeTail)
       - To connect the next sibling, we must find the end of the current 
         linearized branch.
       - Start at the node and keep moving down to children[0] until a leaf is hit.

    4. PERFORMANCE (O(N^2))
       - This specific approach is O(N^2) because for every node, we search 
         for the tail, leading to redundant traversals.
       - A more efficient approach (O(N)) would involve the linearize 
         function returning its own tail during the recursive call.

    5. KEY TAKEAWAY
       - The core of linearization is connecting the "tail" of the (n-1)th 
         linearized child to the "head" of the nth child.
*/
