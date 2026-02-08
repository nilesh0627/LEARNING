/* Problem Name: Tilt Of Binary Tree
Source: Pepcoding (Level 1 - Binary Tree)
Link: https://www.youtube.com/watch?v=CVXfXjuBM8I

Problem Statement:
1. You are given a pointer to the root of a Binary Tree.
2. You are required to complete the body of the 'findTilt' function.
3. The "Tilt" of a single node is defined as the absolute difference between the sum of all nodes in its left subtree and the sum of all nodes in its right subtree.
   - Tilt = |Sum(Left Subtree) - Sum(Right Subtree)|
4. The "Tilt of the Tree" is defined as the sum of tilts of all nodes in the tree.
5. The function should print or return the total tilt of the tree.

Diagrammatic View:
Example Tree Structure:

          50
       /      \
     25        75
    /  \      /  \
  12   37   62    87
      /      \
    30       70

Analysis:
1. Node 30 (Leaf): LeftSum = 0, RightSum = 0. Tilt = |0 - 0| = 0. NodeSum = 30.
2. Node 37: LeftSum = 30, RightSum = 0. Tilt = |30 - 0| = 30. NodeSum = 37+30 = 67.
3. Node 12 (Leaf): LeftSum = 0, RightSum = 0. Tilt = 0. NodeSum = 12.
4. Node 25: LeftSum = 12, RightSum = 67. Tilt = |12 - 67| = 55. NodeSum = 25+12+67 = 104.
5. Node 70 (Leaf): Tilt = 0. NodeSum = 70.
6. Node 62: LeftSum = 0, RightSum = 70. Tilt = |0 - 70| = 70. NodeSum = 62+70 = 132.
7. Node 87 (Leaf): Tilt = 0. NodeSum = 87.
8. Node 75: LeftSum = 132, RightSum = 87. Tilt = |132 - 87| = 45. NodeSum = 75+132+87 = 294.
9. Root 50: LeftSum = 104, RightSum = 294. Tilt = |104 - 294| = 190. NodeSum = 50+104+294 = 448.

Total Tilt = 0 + 30 + 0 + 55 + 0 + 70 + 0 + 45 + 190 = 390.

---------------------------------------------------------
*/

/**
 * @param {Node} node
 */

const binaryTreeRoot = {
  data: 50,
  left: {
    data: 25,
    left: { data: 12, left: null, right: null },
    right: {
      data: 37,
      left: { data: 30, left: null, right: null },
      right: null,
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

// Global variable to store total tilt (common approach for this problem)
let tilt = 0;

function findTilt(node) {
  // Write your code here
  if (!node) return 0;
  const lSum = findTilt(node?.left);
  const rSum = findTilt(node?.right);
  const sum = node.data + lSum + rSum;
  tilt += Math.abs(lSum - rSum);
  return sum;
}

// Driver code to test logic
findTilt(binaryTreeRoot);
console.log(tilt);

/*
Notes for Tilt of Binary Tree (Pepcoding Approach)

- Purpose:
  Calculates the "tilt" of a binary tree, where tilt of a node is the absolute difference between the sum of all nodes in its left subtree and the sum of all nodes in its right subtree.
  The tilt of the tree is the sum of tilts of all nodes.

- Approach:
  1. Uses a recursive function `findTilt(node)` to compute the sum of each subtree.
  2. For each node:
     - Recursively computes the sum of the left (`lSum`) and right (`rSum`) subtrees.
     - Calculates the tilt for the current node as `Math.abs(lSum - rSum)` and adds it to a global variable `tilt`.
     - Returns the sum of the subtree rooted at the current node to its parent call.
  3. The function is called once on the root, and the result is printed from the global `tilt`.

- Faith vs. Expectation:
  - Faith: Recursive calls will return the correct subtree sums for left and right children.
  - Expectation: Use those sums to calculate the tilt for the current node and return the total sum for parent calculation.

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
           /      \
         30       70

    The total tilt is 390.

- Usage:
    findTilt(binaryTreeRoot);
    console.log(tilt);

- Key Points:
  - Efficient single traversal (no repeated subtree sum calculations).
  - Global variable tracks total tilt.
  - Recursion returns subtree sum for parent tilt calculation.
*/
