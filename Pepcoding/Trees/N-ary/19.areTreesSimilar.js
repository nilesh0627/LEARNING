/*
==========================================================================
PROBLEM STATEMENT: Are Trees Similar in Shape
==========================================================================
1. You are given the roots of two Generic Trees.
2. You are required to check if the two trees are similar in shape.
3. Two trees are similar in shape if they have the same structure, 
   regardless of the data values stored in the nodes.
4. Specifically, for every corresponding node in both trees, the number 
   of children must be the same.

--------------------------------------------------------------------------
INPUT FORMAT:
--------------------------------------------------------------------------
- node1: Root of the first Generic Tree.
- node2: Root of the second Generic Tree.

--------------------------------------------------------------------------
OUTPUT FORMAT:
--------------------------------------------------------------------------
- A boolean value: true if the trees are similar in shape, false otherwise.

---------------------------------------------------------------------------
DIAGRAMMATIC VIEW:
---------------------------------------------------------------------------

       Tree 1:              Tree 2:
        [10]                 [A]          <- Both have 3 children
      /  |  \              /  |  \
    20  30  40           B   C   D        <- Similar structure

       Tree 1:              Tree 3:
        [10]                 [A]          
      /  |  \              /     \
    20  30  40           B        C       <- Not similar (3 vs 2 children)

---------------------------------------------------------------------------
EXPECTED OUTPUT EXAMPLES:
---------------------------------------------------------------------------
1. Tree 1 and Tree 2 => Output: true (Data doesn't matter)
2. Tree 1 and Tree 3 => Output: false (Number of children mismatch)
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
          children: [],
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
      value: "B",
      children: [
        {
          value: "E",
          children: [],
        },
        {
          value: "F",
          children: [],
        },
      ],
    },
    {
      value: "C",
      children: [
        {
          value: "G",
          children: [],
        },
        {
          value: "H",
          children: [],
        },
        {
          value: "I",
          children: [],
        },
      ],
    },
    {
      value: "D",
      children: [
        {
          value: "J",
          children: [],
        },
      ],
    },
  ],
};

/**
 * Function to check if two trees are similar in shape
 * @param {Node} node1 - Root of the first tree
 * @param {Node} node2 - Root of the second tree
 * @returns {boolean} - true if similar, else false
 */
function areSimilar(node1, node2) {
  console.log({ node1, node2 });
  // Your code here
  if (node1.children.length !== node2.children.length) return false;
  const childrenLength = node1.children.length;
  for (let i = 0; i < childrenLength; i++) {
    const isSimilar = areSimilar(node1.children[i], node2.children[i]);
    if (!isSimilar) return false;
  }
  return true;
}

console.log(areSimilar(root1, root2));

/*
==========================================================================
ARE TREES SIMILAR IN SHAPE - SOLUTION REVIEW
==========================================================================
- Logic: Simultaneous Depth-First Traversal.
- Strategy:
  1. Count Check: If the number of children at the current level differs, 
     the structure is already different. Return false.
  2. Recursive Deep Dive: If counts match, verify that every pair of 
     corresponding subtrees is also similar.
  3. Final Verdict: If all children pass the check, the trees are similar.

--------------------------------------------------------------------------
REVISION POINTS:
--------------------------------------------------------------------------
1. Time Complexity: O(n), where n is the number of nodes in the smaller tree.
2. Space Complexity: O(h), where h is the height of the tree (due to recursion stack).
3. Edge Case: If both roots are null/undefined, they are technically similar. 
   (Though usually, in these problems, valid nodes are guaranteed).
==========================================================================
*/
