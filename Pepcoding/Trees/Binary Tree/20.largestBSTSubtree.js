/* Problem Name: Largest BST Subtree (Binary Tree)

Problem Statement:
You are given the root node of a Binary Tree.
Your task is to find and print the "Largest Subtree" within the given binary tree that is a valid Binary Search Tree (BST).
- A subtree is defined by its root node.
- "Largest" is defined by the number of nodes in that subtree.
- A valid BST requires: 
  1) All nodes in the left subtree must be smaller than the node.
  2) All nodes in the right subtree must be larger than the node.
  3) Both subtrees must also be valid BSTs.
- The output should be the Root Node Data of that largest BST subtree and its Size, separated by '@'.
- Format: "RootData@Size"

Diagrammatic View:
Example Tree Structure:

          50
       /      \
     25        75
    /  \      /  \
  12   37   62    87
      /  \
    30    51

Analysis:
1. Node 37 Subtree: Left(30) < 37 < Right(51). Valid BST. Size = 3.
2. Node 25 Subtree: Left(12) < 25 < Right(37's min is 30). Valid BST. Size = 5.
3. Node 75 Subtree: Left(62) < 75 < Right(87). Valid BST. Size = 3.
4. Root 50 Subtree: Is this a valid BST?
   - Look at 50's Left Subtree (rooted at 25).
   - The maximum value in 50's left subtree is 51 (right child of 37).
   - For 50 to be a BST, ALL nodes in its left subtree must be < 50.
   - 51 is NOT < 50. Therefore, the tree rooted at 50 is NOT a BST.
5. The largest valid BST subtree is the one rooted at 25, which contains 5 nodes.

Output: 25@5

---------------------------------------------------------
Sample Input (Raw Construction):
---------------------------------------------------------
*/

/**
 * @param {Node} node - The root of the tree
 */

const binaryTreeRoot = {
  data: 50,
  left: {
    data: 25,
    left: { data: 12, left: null, right: null },
    right: {
      data: 37,
      left: { data: 30, left: null, right: null },
      right: { data: 51, left: null, right: null },
    },
  },
  right: {
    data: 75,
    left: { data: 62, left: null, right: null },
    right: { data: 87, left: null, right: null },
  },
};

function largestBstSubtree(node) {
  // Write your code here
  let res = {
    count: 0,
    node: null,
  };
  const isBinarySearchTree = (node) => {
    if (!node) {
      return {
        isBST: true,
        min: Infinity,
        max: -Infinity,
        count: 0,
      };
    }
    const lBST = isBinarySearchTree(node?.left);
    const rBST = isBinarySearchTree(node?.right);
    const isBST =
      lBST.isBST && rBST.isBST && node.data > lBST.max && node.data < rBST.min;
    const min = Math.min(node.data, lBST.min, rBST.min);
    const max = Math.max(node.data, lBST.max, rBST.max);
    const count = lBST.count + rBST.count + 1;
    if (isBST && count > res.count) {
      res = {
        count,
        node,
      };
    }
    return {
      isBST,
      min,
      max,
      count,
    };
  };
  isBinarySearchTree(node);
  return `${res.node.data}@${res.count}`;
}

console.log(largestBstSubtree(binaryTreeRoot));

/*
Notes for Largest BST Subtree in a Binary Tree (Pepcoding Approach)

- Purpose:
  Finds the largest subtree within a given binary tree that is a valid Binary Search Tree (BST).
  Returns the root node's data and the size of that largest BST subtree in the format "RootData@Size".

- Approach:
  1. Uses a recursive helper function `isBinarySearchTree(node)` to traverse the tree in post-order.
  2. For each node, gathers information from its left and right subtrees:
     - Whether the left and right subtrees are BSTs (`lBST.isBST`, `rBST.isBST`)
     - The minimum and maximum values in the left and right subtrees (`lBST.min`, `lBST.max`, etc.)
     - The count of nodes in the left and right subtrees (`lBST.count`, `rBST.count`)
  3. For the current node:
     - Checks if the subtree rooted at this node is a BST:
       - Both left and right subtrees must be BSTs.
       - All values in the left subtree must be less than the current node's value.
       - All values in the right subtree must be greater than the current node's value.
     - Calculates the minimum and maximum values for the current subtree.
     - Calculates the total node count for the current subtree.
     - If the current subtree is a BST and its size is greater than the previously found largest BST, updates the result (`res`).
  4. After the traversal, returns the root data and size of the largest BST subtree found.

- Why track min, max, and count?
  - **min/max:** To ensure the BST property holds for all nodes in the subtree, not just immediate children.
  - **count:** To determine the size of the current BST subtree and compare it to the largest found so far.

- What are you trying to do?
  - For every node, determine if the subtree rooted at that node is a BST.
  - If it is, check if it's the largest BST found so far and update the result accordingly.

- Complexity:
  - Time: O(n), where n is the number of nodes (each node visited once).
  - Space: O(h), where h is the height of the tree (due to recursion stack).

- Example:
    For the sample tree:
              50
           /      \
         25        75
        /  \      /  \
      12   37   62    87
          /  \
        30    51

    The largest BST subtree is rooted at 25 and contains 5 nodes.
    Output: 25@5

- Usage:
    largestBstSubtree(binaryTreeRoot);

- Summary:
  - The code efficiently finds the largest BST subtree by propagating BST status, min, max, and count up the tree.
  - It ensures correctness by checking the BST property at every node using subtree min/max.
  - Returns the required output in the specified format.
*/
