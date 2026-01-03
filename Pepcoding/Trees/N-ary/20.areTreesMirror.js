/*
==========================================================================
PROBLEM STATEMENT: Are Trees Mirror in Shape
==========================================================================
1. You are given the roots of two Generic Trees.
2. You are required to check if the two trees are mirror images of 
   each other in terms of shape (structure).
3. Mirror Condition:
   - The number of children for both nodes must be the same.
   - The children of the first tree must be mirrors of the children 
     of the second tree when viewed in reverse order.
   - Specifically: child[i] of Tree 1 must mirror child[n-1-i] of Tree 2.
4. Data/Values inside the nodes are irrelevant.

--------------------------------------------------------------------------
INPUT FORMAT:
--------------------------------------------------------------------------
- node1: Root of the first Generic Tree.
- node2: Root of the second Generic Tree.

--------------------------------------------------------------------------
OUTPUT FORMAT:
--------------------------------------------------------------------------
- Boolean: true if they are mirrors, false otherwise.

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW: SCENARIO 1 (TRUE)
--------------------------------------------------------------------------
These two trees are mirrors because:
1. Root1's far-left child [20] mirrors Root2's far-right child [B].
2. Root1's far-right child [40] mirrors Root2's far-left child [D].

              ROOT 1                                     ROOT 2
              [10]                                        [A]
           /    |    \                                 /   |   \
        [20]   [30]   [40]                          [D]   [C]   [B]
       /    \  / | \    |                            |   / | \  /  \
      50    60 70 80 90 [100]                      [J]  G  H  I F   E
               /  \                                       /  \
             110  120                                    L    K

RESULT: true
*/

/*
--------------------------------------------------------------------------
DIAGRAMMATIC VIEW: SCENARIO 2 (FALSE)
--------------------------------------------------------------------------
If we take ROOT 1 and compare it with a "Clone" of itself, the result is FALSE 
for Mirror (though it would be TRUE for Similar).

              ROOT 1                                    CLONE OF 1
              [10]                                        [10]
           /    |    \                                 /    |    \
        [20]   [30]   [40]                          [20]   [30]   [40]
       /    \  / | \    |                          /    \  / | \    |
      50    60 70 80 90 [100]                     50    60 70 80 90 [100]

RESULT: false 
(Because Child[0] of Tree 1 is [20] (2 children), but Child[last] 
of Tree 2 is [40] (1 child). They don't reflect.)

==========================================================================
*/

const root1 = {
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

const root2 = {
  value: "A",
  children: [
    {
      value: "D",
      children: [
        {
          value: "J",
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

/**
 * Function to check if two trees are mirror images in shape
 * @param {Node} node1 - Root of the first tree
 * @param {Node} node2 - Root of the second tree
 * @returns {boolean} - true if mirror shapes, else false
 */
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

console.log(areMirror(root1, root2));

/**
 * NOTES: ARE TREES MIRROR IN SHAPE
 *
 * 1. CORE LOGIC
 * - Structural Symmetry: Two trees are mirrors if their children counts match and their
 * subtrees are mirrored.
 * - Mirror Comparison: First child of Tree A must mirror the last child of Tree B.
 *
 * 2. ALGORITHM
 * - Base Condition: If children.length of node1 != node2, return false.
 * - Iteration: Loop through children of node1 (left-to-right).
 * - Recursion: For index i, call areMirror(node1.child[i], node2.child[last - i]).
 * - Early Exit: If any recursive call returns false, immediately return false.
 *
 * 3. KEY INSIGHT
 * - Ignores data (node.value); focuses strictly on the "shape" of the children array.
 * - Uses two pointers logic (start of A, end of B) across recursive calls.
 *
 * 4. PERFORMANCE
 * - Time: O(N) — Every node is visited once.
 * - Space: O(H) — Height of the tree (recursion stack).
 */
