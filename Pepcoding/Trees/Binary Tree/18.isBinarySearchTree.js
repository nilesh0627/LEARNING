/* Problem Name: Is A Binary Search Tree
Source: Pepcoding (Level 1 - Binary Tree)
Link: https://www.youtube.com/watch?v=MLWawOETrF8

Problem Statement:
1. You are given a pointer to the root of a Binary Tree.
2. You are required to complete the body of the 'isBST' function.
3. The function should check if the tree is a Binary Search Tree (BST).
4. A Binary Tree is a BST if for every node:
   - All nodes in its Left Subtree are smaller than the node.
   - All nodes in its Right Subtree are larger than the node.
   - Both left and right subtrees are also BSTs.
5. Return 'true' if it is a BST, otherwise return 'false'.

Diagrammatic View:
Example 1: Valid BST
          50
       /      \
     25        75
    /  \      /  \
  12   37   62    87

Analysis:
- Node 25: Left(12) < 25 < Right(37). OK.
- Node 75: Left(62) < 75 < Right(87). OK.
- Root 50: All Left (12,25,37) < 50. All Right (62,75,87) > 50. OK.
- Result: True.

Example 2: Invalid BST
          50
       /      \
     25        75
    /  \      /  \
  12   37   62    40  <-- Violation!

Analysis:
- Node 75: Left(62) < 75 < Right(40). Violation! (40 is not > 75).
- Also, relative to Root 50: Node 40 is in the Right Subtree, but 40 < 50. Violation!
- Result: False.

Note:
Simply checking if `left.data < node.data < right.data` is NOT enough. You must ensure the *Max of Left Subtree* < Node < *Min of Right Subtree*.

Sample Input:
50 25 12 n n 37 30 n n 40 n n 75 62 n 70 n n 87 n n

Sample Output:
false

---------------------------------------------------------
*/

/**
 * @param {Node} node
 * @returns {boolean}
 */

const binaryTreeRoot = {
  data: 50,
  left: {
    data: 25,
    left: { data: 12, left: null, right: null },
    right: {
      data: 35,
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

// Helper class/object to return multiple values (isBST, min, max)
class BSTPair {
  constructor() {
    this.isBST = true;
    this.min = Infinity;
    this.max = -Infinity;
  }
}

function isBST(node) {
  // Write your code here
  if (!node) {
    return new BSTPair();
  }
  const lBSTInfo = isBST(node?.left);
  const rBSTInfo = isBST(node?.right);
  const min = Math.min(lBSTInfo.min, rBSTInfo.min, node.data);
  const max = Math.max(lBSTInfo.max, rBSTInfo.max, node.data);
  return {
    /* 
    if any node is greater than max of left side nodes and lesser then min of right side nodes
    then that node statisfies BST condition
    */
    isBST:
      lBSTInfo.isBST &&
      rBSTInfo.isBST &&
      node.data > lBSTInfo.max &&
      node.data < rBSTInfo.min,
    min,
    max,
  };
}

// Driver code to test logic
const result = isBST(binaryTreeRoot);
console.log(result);
// If isBST returns a boolean, print it.
// If it returns a Pair object (common pattern), print result.isBST.
console.log(typeof result === "object" ? result.isBST : result);

/*
Notes for Is Binary Search Tree (BST) - Pepcoding Approach

- Purpose:
  Checks if a given binary tree is a Binary Search Tree (BST).
  A BST is defined as a binary tree where for every node:
    - All nodes in its left subtree are less than the node's value.
    - All nodes in its right subtree are greater than the node's value.
    - Both left and right subtrees are also BSTs.

- Approach:
  1. Uses recursion to traverse the tree in post-order (left, right, node).
  2. For each node, gathers three pieces of information from its subtrees:
     - Whether the left subtree is a BST (`lBSTInfo.isBST`)
     - The minimum value in the left subtree (`lBSTInfo.min`)
     - The maximum value in the left subtree (`lBSTInfo.max`)
     - Similarly for the right subtree.
  3. Calculates:
     - The minimum value for the current subtree: `min = Math.min(lBSTInfo.min, rBSTInfo.min, node.data)`
     - The maximum value for the current subtree: `max = Math.max(lBSTInfo.max, rBSTInfo.max, node.data)`
     - Whether the current subtree is a BST:
       `isBST: lBSTInfo.isBST && rBSTInfo.isBST && node.data > lBSTInfo.max && node.data < rBSTInfo.min`
       (This ensures all values in the left subtree are less, and all in the right are greater.)

- Why use min and max from subtrees?
  - **Key Point:**  
    Simply checking `node.left.data < node.data < node.right.data` is NOT enough.
    You must ensure that **all** values in the left subtree are less than the current node, and **all** values in the right subtree are greater.
  - **Example:**
    ```
          50
         /  \
       25    75
      /  \     \
    12   37    40  <-- Violation!
    ```
    - Here, 40 is in the right subtree of 50, but 40 < 50, which violates the BST property.
    - By tracking the min and max of each subtree, you can catch such violations.

- Why use a helper class/object (BSTPair)?
  - To return multiple values ([isBST](http://_vscodecontentref_/0), [min](http://_vscodecontentref_/1), [max](http://_vscodecontentref_/2)) from each recursive call.
  - This allows each node to make decisions based on the full information from its subtrees.

- What are you trying to do?
  - For every node, you want to know:
    1. Is the left subtree a BST?
    2. Is the right subtree a BST?
    3. Are all values in the left subtree less than the current node?
    4. Are all values in the right subtree greater than the current node?
  - If all these are true, the current subtree is a BST.

- Complexity:
  - Time: O(n), where n is the number of nodes (each node visited once).
  - Space: O(h), where h is the height of the tree (due to recursion stack).

- Usage:
    const result = isBST(binaryTreeRoot);
    console.log(result.isBST);

- Summary:
  - The code ensures the BST property for the entire tree by propagating min, max, and isBST information up from the leaves to the root.
  - This approach catches subtle violations that simple parent-child comparisons would miss.
*/
