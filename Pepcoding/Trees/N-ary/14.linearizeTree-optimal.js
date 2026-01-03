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

function linearize(node) {
  if (node.children.length === 0) return node;
  const lastNodeTail = linearize(node.children[node.children.length - 1]);
  while (node.children.length > 1) {
    const lastNode = node.children.pop();
    const secondLastNodeTail = linearize(
      node.children[node.children.length - 1]
    );
    secondLastNodeTail.children.push(lastNode);
  }
  return lastNodeTail;
}

linearize(root);
console.dir(root, { depth: null });

/**
    NOTES: LINEARIZE A GENERIC TREE (EFFICIENT O(N) APPROACH)

    1. CORE MECHANISM
       - The function flattens a tree into a single vertical line.
       - It follows a "Recursive Tail-Return" strategy: every call returns 
         the bottom-most node (tail) of its linearized branch.

    2. STEP-BY-STEP PROCESS
       - Leaf Case: If a node has no children, it is the tail. Return itself.
       - Processing Last Child: Recursively linearize the last child first 
         to get the final tail of the entire subtree.
       - Sibling Connection Loop: 
           a. Pop the last sibling.
           b. Linearize the second-to-last sibling to find its tail.
           c. Attach the popped last sibling to that tail.
       - Final Return: Return the tail collected from the initial last child.

    3. KEY CONTROLS
       - Uses .pop() to reduce children.length until only one child remains.
       - By returning the tail, it avoids re-scanning the branch multiple times.

    4. TRAVERSAL ORDER
       - Pre-order logic: The structure follows the pre-order sequence, 
         but the processing happens bottom-up to connect tails to heads.
*/
