/* Problem Name: Construct Binary Tree From Postorder and Inorder Traversal
Source: Pepcoding / Leetcode 106
Link: https://www.youtube.com/watch?v=Lc3RBGtyn7M

Problem Statement:
You are given two integer arrays, `postorder` and `inorder`.
- `postorder` represents the post-order traversal of a binary tree.
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
1. Postorder: [12, 37, 25, 62, 87, 75, 50] -> Last element '50' is the Root.
2. Inorder:  [12, 25, 37, 50, 62, 75, 87] -> Find '50' here (at index 3).
3. Elements to the left of '50' in inorder [12, 25, 37] form the Left Subtree (Count = 3).
4. Elements to the right of '50' in inorder [62, 75, 87] form the Right Subtree (Count = 3).
5. Split Postorder using the counts:
   - Left Subtree Postorder: [12, 37, 25] (First 3 elements)
   - Right Subtree Postorder: [62, 87, 75] (Next 3 elements)
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @returns {object} - The root node of the constructed tree
 */

// Utility class to create a node object matching the structure you use
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

const postorder = [12, 37, 25, 62, 87, 75, 50];
const inorder = [12, 25, 37, 50, 62, 75, 87];

function buildTree(inorder, postorder) {
  // Write your code here
  if (inorder.length === 0) return null;
  const rootData = postorder[postorder.length - 1];
  let root = new Node(rootData);
  const rootIndex = inorder.findIndex((data) => data === rootData);

  const leftInOrder = inorder.slice(0, rootIndex);
  const rightInorder = inorder.slice(rootIndex + 1);

  const leftPostOrder = postorder.slice(0, rootIndex);
  const rightPostOrder = postorder.slice(rootIndex, postorder.length - 1);

  root.left = buildTree(leftInOrder, leftPostOrder);
  root.right = buildTree(rightInorder, rightPostOrder);

  return root;
}

// Driver code to test logic
const newRoot = buildTree(inorder, postorder);
console.dir(newRoot, { depth: null, colors: true });

/*
Notes for Construct Binary Tree From Inorder and Postorder Traversal

- Purpose:
  Reconstructs a binary tree from its inorder and postorder traversal arrays.
  Returns the root node of the constructed tree.

- Approach:
  1. The last element of postorder is always the root of the current (sub)tree.
  2. Find the index of this root value in the inorder array.
  3. Elements to the left of this index in inorder form the left subtree; elements to the right form the right subtree.
  4. The number of elements in the left subtree (from inorder) tells you how many elements to take from postorder (from the start) for the left subtree.
  5. Recursively build the left and right subtrees using the corresponding slices of inorder and postorder.
  6. Attach the returned left and right subtrees to the root node.

- Faith and Expectation (Pepcoding Style):
  - **Faith:**  
    If you call `buildTree(leftInorder, leftPostorder)`, it will return the root of the left subtree, correctly constructed from those traversals.  
    Similarly, `buildTree(rightInorder, rightPostorder)` will return the root of the right subtree.
  - **Expectation:**  
    For the current call, you:
      1. Identify the root node from the last element of postorder.
      2. Split inorder and postorder into left and right parts.
      3. Use faith to build left and right subtrees.
      4. Attach them to the root and return the root.

- Why does this work?
  - Postorder always gives you the root last.
  - Inorder tells you how to split the tree into left and right subtrees.
  - Recursion (faith) ensures that each subtree is built correctly.

- Complexity:
  - Time: O(n^2) due to `findIndex` and array slicing at each recursive call (can be improved to O(n) with a hashmap and indices).
  - Space: O(n) due to recursion stack and array slices.

- Example:
    postorder = [12, 37, 25, 62, 87, 75, 50]
    inorder   = [12, 25, 37, 50, 62, 75, 87]

    - Root is 50 (postorder[postorder.length - 1])
    - 50 splits inorder at index 3
    - Left subtree: inorder [12, 25, 37], postorder [12, 37, 25]
    - Right subtree: inorder [62, 75, 87], postorder [62, 87, 75]
    - Recursively build left and right subtrees.

- Usage:
    const root = buildTree(inorder, postorder);

- Summary:
  - The code reconstructs the binary tree by leveraging the properties of inorder and postorder traversals.
  - Faith and expectation pattern ensures correct recursive construction.
  - Returns the root node of the fully built tree.
*/
