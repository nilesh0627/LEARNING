/*
==========================================================================
PROBLEM STATEMENT: Is Generic Tree Symmetric
==========================================================================
1. You are given the root of a Generic Tree.
2. You are required to check if the tree is symmetric in shape.
3. A tree is symmetric if it is a mirror image of itself.
4. If you draw a vertical line through the root, the left side should 
   be a reflection of the right side.

--------------------------------------------------------------------------
INPUT FORMAT:
--------------------------------------------------------------------------
- node: The root of the Generic Tree.

--------------------------------------------------------------------------
OUTPUT FORMAT:
--------------------------------------------------------------------------
- A boolean: true if the tree is symmetric, false otherwise.

--------------------------------------------------------------------------
DIAGRAMS FOR SYMMETRY (TRUE vs FALSE)
--------------------------------------------------------------------------

SCENARIO 1: TRUE (SYMMETRIC)
The structure on the left is a flipped version of the structure on the right.

                    [  A  ]                       <-- Root
                 /     |     \
              /        |        \
          [ D ]      [ C ]      [ B ]             <-- Level 1
         /     \    /  |  \    /     \
       [J]     [M][I] [H] [G][F]     [E]          <-- Level 2
                      /   \
                    [K]   [L]                     <-- Level 3

--------------------------------------------------------------------------

SCENARIO 2: FALSE (NOT SYMMETRIC)
Even if the number of nodes is the same, if the internal children 
are not mirrored, the whole tree is not symmetric.

                    [  A  ]                       <-- Root
                 /     |     \
              /        |        \
          [ D ]      [ C ]      [ B ]             <-- Level 1
         /     \    /  |  \    /     
       [J]     [M][I] [H] [G][F]                  <-- Level 2
                      /   \
                    [K]   [L]                     <-- Level 3

(In Scenario 2, if you flip the tree, the node 60 would move to the 
right side of 40, but in the original, it's on the left. So, it's NOT 
a mirror of itself.)
==========================================================================
*/
const root = {
  value: "A",
  children: [
    {
      value: "D",
      children: [
        {
          value: "J",
          children: [],
        },
        {
          value: "M",
          children: [],
        },
      ],
    },
    {
      value: "C",
      children: [
        {
          value: "I",
          children: [],
        },
        {
          value: "H",
          children: [
            {
              value: "K",
              children: [],
            },
            {
              value: "L",
              children: [],
            },
          ],
        },
        {
          value: "G",
          children: [],
        },
      ],
    },
    {
      value: "B",
      children: [
        {
          value: "F",
          children: [],
        },
        {
          value: "E",
          children: [],
        },
      ],
    },
  ],
};

function areMirror(node1, node2) {
  // Your code here
  if (node1.children.length !== node2.children.length) return false;
  let i = 0;
  while (i < node1.children.length) {
    const isMirror = areMirror(
      node1.children[i],
      node2.children[node2.children.length - 1 - i]
    );
    if (!isMirror) return false;
    i++;
  }
  return true;
}

function isSymmetric(node) {
  // Your code here
  return areMirror(node, node);
}

console.log(isSymmetric(root));
