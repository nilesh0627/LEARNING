/* Problem Name: Transform Back from Left Cloned Tree

Problem Statement:
You are given the root node of a "Left Cloned Tree" (a tree where every node has a duplicate of itself inserted as its left child).
Your task is to transform this tree back to its **Original Normal Form**.

Transformation Logic (Reverse Operation):
1. For every node, the current `node.left` is its clone.
2. The `node.left.left` is the actual original left child (or null).
3. We need to bypass the clone: Set `node.left` to `node.left.left`.
4. This effectively removes the clone from the structure.
5. Recursively repeat this process for the left subtree (which is now at `node.left`) and the right subtree.

Diagrammatic View:
Input Tree (Left Cloned structure based on sample input):

             A
           /   \
        (A)     C
        /      /
       B     (C)
     /   \   /
   (B)    E F
   /     / /
  D    (E)(F)
 /
(D)

Output Tree (Normalized):

       A
      / \
     B   C
    / \  /
   D  E F

Legend: (X) denotes the clone of node X.

---------------------------------------------------------
Sample Input (Raw Construction):
---------------------------------------------------------
*/

/**
 * @param {Node} node - The root of the Left Cloned Tree
 * @returns {Node} - The root of the Normalized Tree
 */

const leftClonedTreeRoot = {
  data: "A",
  left: {
    data: "A",
    left: {
      data: "B",
      left: {
        data: "B",
        left: {
          data: "D",
          left: { data: "D", left: null, right: null },
          right: null,
        },
        right: null,
      },
      right: {
        data: "E",
        left: { data: "E", left: null, right: null },
        right: null,
      },
    },
    right: null,
  },
  right: {
    data: "C",
    left: {
      data: "C",
      left: {
        data: "F",
        left: { data: "F", left: null, right: null },
        right: null,
      },
      right: null,
    },
    right: null,
  },
};

function transBackFromLeftClonedTree(node) {
  // Write your code here
  if (!node) return null;
  node.left = node?.left?.left || null;
  transBackFromLeftClonedTree(node?.left);
  transBackFromLeftClonedTree(node?.right);
  return node;
}

console.log(transBackFromLeftClonedTree(leftClonedTreeRoot), {
  depth: null,
  colors: true,
});

/*
--------------------------------------------------------------------------
THE "SMART" EXPLANATION (Transform Back from Left Cloned Tree):
--------------------------------------------------------------------------

1. THE FAITH VS. EXPECTATION:
   - Expectation: `transBackFromLeftClonedTree(root)` will remove all 
     clone nodes and restore the original tree structure.
   - Faith: I trust my left child's left child (the original sub-tree) 
     and my right child to transform themselves back. Once they are 
     fixed, I just need to remove my own duplicate and reconnect.

2. THE "BYPASS" STRATEGY:
   - This is essentially a "De-cloning Surgery." 
   - In the cloned tree, every original node `N` has a clone `N'` as its 
     left child, and the original left subtree hangs off `N'`.
   - To fix this, we make `N.left` point directly to `N'.left`.

3. LOGIC STEPS:
   - Step 1 (Base Case): If node is null, return null.
   - Step 2 (The bypass): Update `node.left` to point to 
     `node.left.left`. This effectively kicks the "clone" node out of 
     the tree by skipping it.
   - Step 3 (Recursion): 
     - Recursively call for the *new* `node.left` (the original child).
     - Recursively call for `node.right`.



4. INTUITIVE VISUALIZATION:
   - Cloned: [A] -> [A_clone] -> [B]
   - Bypass: [A] ----------------> [B]
   - You are basically "snapping" the link to the clone and re-linking 
     to the real grandchild.

5. COMPLEXITY:
   - Time: O(N) - Every original node is processed.
   - Space: O(H) - Recursion depth matches the original tree height.

==========================================================================
*/
