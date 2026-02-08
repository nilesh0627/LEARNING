/* Problem Name: Remove Leaves In Binary Tree

Problem Statement:
You are given the root node of a Binary Tree.
Your task is to remove all leaf nodes from the tree.
- A leaf node is a node that has no left child and no right child.
- If a node is a leaf, it must be removed (replaced with null).
- The function should return the root of the modified tree.
- Note: If the root itself is a leaf, the tree becomes empty.

Diagrammatic View:
Example Tree Structure (Before Removal):

          50
       /      \
     25        75
    /  \      /  \
  12   37   62    87
      /  \    \
    30    40   70

Analysis:
1. Node 12: Is a Leaf? YES. -> Remove (Return null to parent 25).
2. Node 30: Is a Leaf? YES. -> Remove (Return null to parent 37).
3. Node 40: Is a Leaf? YES. -> Remove (Return null to parent 37).
4. Node 37: Children (30, 40) are removed. Node 37 remains.
5. Node 70: Is a Leaf? YES. -> Remove (Return null to parent 62).
6. Node 87: Is a Leaf? YES. -> Remove (Return null to parent 75).
7. Node 62: Right child (70) removed. Node 62 remains.
8. Node 25: Left child (12) removed. Node 25 remains.
9. Node 75: Right child (87) removed. Node 75 remains.

Output Structure (After Removal):
          50
       /      \
     25        75
       \      /
       37   62

---------------------------------------------------------
Sample Input (Raw Construction):
---------------------------------------------------------
*/

/**
 * @param {Node} node - The root of the tree
 * @returns {Node} - The root of the modified tree
 */

const binaryTreeRoot = {
  data: 50,
  left: {
    data: 25,
    left: { data: 12, left: null, right: null },
    right: {
      data: 37,
      left: { data: 30, left: null, right: null },
      right: { data: 40, left: null, right: null },
    },
  },
  right: {
    data: 75,
    left: {
      data: 62,
      left: null,
      right: { data: 70, left: null, right: null },
    },
    right: { data: 87, left: null, right: null },
  },
};

function removeLeaves(node) {
  if (!node) return null;
  if (!node?.left && !node?.right) return null; // if it is leaf
  node.left = removeLeaves(node?.left);
  node.right = removeLeaves(node?.right);
  return node;
}

// Driver code to test logic
removeLeaves(binaryTreeRoot);
console.dir(binaryTreeRoot, { depth: null, colors: true });

/*
Notes for Remove Leaves In Binary Tree

- Purpose:
  Removes all leaf nodes from a binary tree. A leaf node is a node with no left or right child.
  If the root itself is a leaf, the tree becomes empty (null).

- Approach:
  1. Use recursion to traverse the tree.
  2. For each node:
     - If the node is null, return null.
     - If the node is a leaf (both left and right are null), return null (remove it).
     - Otherwise, recursively update left and right children.
  3. Return the modified node.

- Key Points:
  - The function modifies the tree in place.
  - Handles all levels, including the root.
  - Returns the new root after leaf removal.

- Complexity:
  - Time: O(n), where n is the number of nodes (each node visited once).
  - Space: O(h), where h is the height of the tree (recursion stack).

- Usage:
    const newRoot = removeLeaves(binaryTreeRoot);

- Example Output:
    Before:
              50
           /      \
         25        75
        /  \      /  \
      12   37   62    87
          /  \    \
        30    40   70

    After:
              50
           /      \
         25        75
           \      /
           37   62
*/
