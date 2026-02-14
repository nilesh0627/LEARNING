/* Problem Name: Construct Binary Tree From Preorder and Inorder Traversal

Problem Statement:
You are given two integer arrays, `preorder` and `inorder`.
- `preorder` represents the pre-order traversal of a binary tree.
- `inorder` represents the in-order traversal of the same binary tree.
- Your task is to construct the original binary tree from these two traversals.
- Assume all elements in the tree are unique.
- The function should return the root node of the completely constructed tree.

Diagrammatic View:
Constructed Tree Structure:

          50
       /      \
     25        75
    /  \      /  \
  12   37   62    87

Analysis:
1. Preorder: [50, 25, 12, 37, 75, 62, 87] -> First element '50' is the Root.
2. Inorder:  [12, 25, 37, 50, 62, 75, 87] -> Find '50' here (at index 3).
3. Elements to the left of '50' in inorder [12, 25, 37] form the Left Subtree (Count = 3).
4. Elements to the right of '50' in inorder [62, 75, 87] form the Right Subtree (Count = 3).
5. Split Preorder using the counts:
   - Left Subtree Preorder: [25, 12, 37]
   - Right Subtree Preorder: [75, 62, 87]
6. Split Inorder using the root index:
   - Left Subtree Inorder: [12, 25, 37]
   - Right Subtree Inorder: [62, 75, 87]
7. Recursively build the left and right subtrees and attach them to Root '50'.

Output: Return the root node object of the constructed tree.

---------------------------------------------------------
Sample Input (Raw Construction):
---------------------------------------------------------
*/

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @returns {object} - The root node of the constructed tree
 */

// Utility function to create a node object matching the structure you use
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

const preorder = [50, 25, 12, 37, 75, 62, 87];
const inorder = [12, 25, 37, 50, 62, 75, 87];

function buildTree(preorder, inorder) {
  // Write your code here
  if (preorder.length === 0) return null;
  const rootData = preorder[0];
  let root = new Node(rootData);
  const rootIndex = inorder.findIndex((data) => data === rootData);

  const leftInorder = inorder.slice(0, rootIndex);
  const rightInorder = inorder.slice(rootIndex + 1);

  const leftPreOrder = preorder.slice(1, rootIndex + 1);
  const rightPreorder = preorder.slice(rootIndex + 1);

  root.left = buildTree(leftPreOrder, leftInorder);
  root.right = buildTree(rightPreorder, rightInorder);

  return root;
}

/* Preorder -> root-left-right
 inorder -> left-root-right
 0th index of preorder will always be root node. 
 
 idea is to find the root node first from inorder. so whatever is on left side of inorder will exist in left side
 and whatever is on right side of root will exits on right side of root

 so now find the new array of preorder and inorder for both left and right side list. repeat this process recursively.
 attach the returned left/right nodes to root.left and root.right
*/

// Driver code to test logic
const newRoot = buildTree(preorder, inorder);
console.dir(newRoot, { depth: null, colors: true });

/*
Notes for Construct Binary Tree From Preorder and Inorder Traversal

- Purpose:
  Given preorder and inorder traversals of a binary tree (with unique elements), reconstruct the original binary tree and return its root node.

- Approach:
  1. The first element of preorder is always the root of the current (sub)tree.
  2. Find the index of this root in the inorder array.
  3. Elements to the left of this index in inorder form the left subtree; elements to the right form the right subtree.
  4. The number of elements in the left subtree (from inorder) tells you how many elements to take from preorder (after the root) for the left subtree.
  5. Recursively build the left and right subtrees using the corresponding preorder and inorder slices.
  6. Attach the returned left and right subtrees to the root node.

- Faith and Expectation (Pepcoding Style):
  - **Faith:**  
    If you call `buildTree(leftPreorder, leftInorder)`, it will return the root of the left subtree, correctly constructed from those traversals.  
    Similarly, `buildTree(rightPreorder, rightInorder)` will return the root of the right subtree.
  - **Expectation:**  
    For the current call, you:
      1. Identify the root node from the first element of preorder.
      2. Split inorder and preorder into left and right parts.
      3. Use faith to build left and right subtrees.
      4. Attach them to the root and return the root.

- Why does this work?
  - Preorder always gives you the root first.
  - Inorder tells you how to split the tree into left and right subtrees.
  - Recursion (faith) ensures that each subtree is built correctly.

- Complexity:
  - Time: O(n^2) due to `findIndex` and array slicing at each recursive call (can be improved to O(n) with a hashmap and indices).
  - Space: O(n) due to recursion stack and array slices.

- Example:
    preorder = [50, 25, 12, 37, 75, 62, 87]
    inorder  = [12, 25, 37, 50, 62, 75, 87]

    - Root is 50 (preorder[0])
    - 50 splits inorder at index 3
    - Left subtree: preorder [25, 12, 37], inorder [12, 25, 37]
    - Right subtree: preorder [75, 62, 87], inorder [62, 75, 87]
    - Recursively build left and right subtrees.

- Usage:
    const root = buildTree(preorder, inorder);

- Summary:
  - The code reconstructs the binary tree by leveraging the properties of preorder and inorder traversals.
  - Faith and expectation pattern ensures correct recursive construction.
  - Returns the root node of the fully built tree.
*/
