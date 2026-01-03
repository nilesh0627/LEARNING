/*
==========================================================================
PROBLEM STATEMENT: Remove Leaves from a Generic Tree
==========================================================================
1. You are given the root of a Generic Tree.
2. You are required to remove all leaf nodes from the tree.
3. A leaf node is defined as a node that has no children.
4. Important: Only remove the original leaves. If a node becomes a leaf 
   after its own children are removed, it should NOT be removed in the 
   same operation.

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
The function modifies the tree in-place.
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

/**
 * Function to remove leaves from the tree in-place
 * @param {Node} node - The root of the tree
 */
function removeLeaves(node) {
  // Your code here
  node.children = node.children.filter((child) => child.children.length > 0);
  for (let child of node.children) {
    removeLeaves(child);
  }
}

removeLeaves(root);
console.log(root);

/**
    NOTES: REMOVE LEAVES FROM GENERIC TREE

    1. LOGIC FOR REMOVAL
       - A node is a leaf if its children list is empty (length === 0).
       - We iterate through a node's children and remove those that are leaves.
       - Then, we recursively call the function on the remaining children.

    2. WHY YOUR SOLUTION WORKS (JS SPECIFIC)
       - Using .filter() creates a NEW array. This avoids the "Concurrent 
         Modification" issue where modifying a list while iterating over it 
         causes items to be skipped or indices to shift.
       - In other languages (like Java), you would need to iterate BACKWARDS 
         (from length-1 down to 0) to safely remove items by index.

    3. PRE-ORDER VS POST-ORDER
       - Removal must happen in PRE-ORDER.
       - If you use Post-order: You might remove a node's children first, 
         making that node a "new" leaf, which then gets incorrectly removed 
         when the recursion returns to the parent.
       - Pre-order ensures we only remove the original leaves of the tree.

    4. RECURSIVE STEP
       - After filtering the current node's children, the function must 
         be called on the surviving children to check their sub-trees.

    5. KEY TAKEAWAY
       - Always modify/filter the children list BEFORE recursing deeper.
       - Functional methods like .filter() are safer in JS for this task.
*/
