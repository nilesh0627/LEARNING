/* Problem Name: Construct Binary Search Tree From Preorder Traversal
Source: Pepcoding (Level 1 - Binary Tree / BST) / Leetcode 1008
Link: https://www.youtube.com/watch?v=Bexswo4pqZQ

Problem Statement:
1. You are given an integer array `preorder`, which represents the preorder traversal of a Binary Search Tree (BST).
2. You are required to complete the body of the `bstFromPreorder` function.
3. The function should construct the original BST from this traversal and return its root node.
4. A Binary Search Tree is a binary tree where for every node, any descendant of `node.left` has a value strictly less than `node.data`, and any descendant of `node.right` has a value strictly greater than `node.data`.
5. The preorder traversal of a binary tree displays the value of the node first, then traverses `node.left`, then traverses `node.right`.

Diagrammatic View:
Example Preorder Array: [30, 20, 10, 15, 25, 23, 39, 35, 42]

Constructed Tree Structure:
          30
       /      \
     20        39
    /  \      /  \
  10   25   35    42
   \   /
   15 23

Analysis (O(N) Range-based approach):
1. The first element (30) is always the root.
2. For every node, we maintain a valid range `(min, max)`. For the root, it is `(-Infinity, Infinity)`.
3. We check the next element in the array using a global/shared index. If the element falls within the `(min, max)` range for the current recursive call, we create the node and increment our index.
4. For the Left child, the valid range becomes `(min, parentData)`.
5. For the Right child, the valid range becomes `(parentData, max)`.
6. Example Trace:
   - Root 30 is created. Next is 20. Range for 30's left is `(-Inf, 30)`. 20 fits. Create Node 20.
   - Next is 10. Range for 20's left is `(-Inf, 20)`. 10 fits. Create Node 10.
   - Next is 15. Range for 10's left is `(-Inf, 10)`. 15 does not fit. Return null (Left child of 10 is null).
   - Range for 10's right is `(10, 20)`. 15 fits. Create Node 15.

---------------------------------------------------------
Sample Input (Raw Construction):
---------------------------------------------------------
*/

/**
 * @param {number[]} preorder
 * @returns {object} - The root node of the constructed BST
 */

// Utility class to create a node object
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

const preorder = [30, 20, 10, 15, 25, 23, 39, 35, 42];

function bstFromPreorder(preorder) {
  // Write your code here
  let root = new Node(preorder[0]),
    i = 1;
  const stack = [];
  stack.push(root);
  while (i < preorder.length) {
    const elm = new Node(preorder[i]);
    const top = stack[stack.length - 1];

    if (elm.data < top?.data) {
      top.left = elm;
      stack.push(elm);
      i++;
    } else {
      let lastPopped = null;
      while (elm.data > stack[stack.length - 1]?.data && stack.length > 0) {
        lastPopped = stack.pop();
      }
      lastPopped.right = elm;
      stack.push(elm);
      i++;
    }
  }
  return root;
}

// Driver code to test logic
const newRoot = bstFromPreorder(preorder);
console.dir(newRoot, { depth: null, colors: true });

/*
Notes for Construct BST from Preorder Traversal (Stack-based Approach)

- Purpose:
  Given a preorder traversal array of a Binary Search Tree (BST), reconstruct the original BST and return its root node.

- Approach (Stack-based, O(n) time):
  1. The first element of preorder is always the root.
  2. Use a stack to keep track of the path from the root to the current node.
  3. For each new value in preorder:
     - If it is less than the top of the stack, it is the left child of the top node. Push it onto the stack.
     - If it is greater, pop nodes from the stack until you find a node with a value greater than the current value or the stack is empty. The last popped node is the parent, and the new value is its right child. Push the new node onto the stack.
  4. Repeat until all elements are processed.

- Why does this work?
  - The stack maintains the path from the root to the current insertion point.
  - Left children are always less than their parent and are pushed onto the stack.
  - When a value is greater, it must be a right child of the last node smaller than it (which is found by popping the stack).

- Faith and Expectation (Pepcoding Style):
  - **Faith:**  
    The stack always represents the path from the root to the current node, maintaining the BST property.
  - **Expectation:**  
    For each value, find its correct parent (either as a left or right child) and attach it, updating the stack accordingly.

- Complexity:
  - Time: O(n), where n is the number of nodes (each node is pushed and popped at most once).
  - Space: O(h), where h is the height of the tree (stack size).

- Example Trace:
    preorder = [30, 20, 10, 15, 25, 23, 39, 35, 42]
    - 30 is root, stack: [30]
    - 20 < 30 → left child, stack: [30, 20]
    - 10 < 20 → left child, stack: [30, 20, 10]
    - 15 > 10 → pop 10, 15 < 20 → right child of 10, stack: [30, 20, 15]
    - 25 > 15, 25 > 20 → pop 15, pop 20, 25 < 30 → right child of 20, stack: [30, 25]
    - ... and so on.

- Usage:
    const root = bstFromPreorder(preorder);

- Summary:
  - This approach efficiently reconstructs the BST from preorder using a stack.
  - It avoids recursion and repeated searching, making it optimal for this problem.
*/
