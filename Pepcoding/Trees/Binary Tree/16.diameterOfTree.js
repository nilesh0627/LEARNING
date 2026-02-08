/* Problem Name: Diameter Of A Binary Tree
Source: Pepcoding (Level 1 - Binary Tree)
Link: https://www.youtube.com/watch?v=aULnlLj1LmU

Problem Statement:
1. You are given a pointer to the root of a Binary Tree.
2. You are required to complete the body of the 'diameter' function.
3. The diameter of a tree is the number of edges between the two farthest nodes in the tree.
   - The path may or may not pass through the root.
4. The function should return the diameter (integer).

Diagrammatic View:

           50
        /      \
      25        75
     /  \      /  \
   12   37   62    87
       /      \
     30       70

Analysis:
1. Longest path on Left: 30 -> 37 -> 25 (Length 2)
2. Longest path on Right: 70 -> 62 -> 75 (Length 2)
3. Path through Root (50): Left Path + Right Path + 2 edges
   = 2 + 2 + 2 = 6 edges.
4. Note: Diameter isn't always through root. It could be entirely in the left or right child.

Sample Input:
50 25 12 n n 37 30 n n n 75 62 n 70 n n 87 n n

Sample Output:
6

---------------------------------------------------------
*/

/**
 * @param {Node} node
 * @returns {number}
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
// max diamter doesnot need to always pass through root node.
// there can be any child at any level whose childrens are very deep and that will have max diameter
// that why for every node, keep track of left and right node height and update maxDiameter after each node calculation
let maxDiameter = 0;
function diameter(node) {
  // Write your code here
  if (!node) return 0;
  const h1 = diameter(node?.left);
  const h2 = diameter(node?.right);
  const nodeHeight = Math.max(h1, h2) + (!node?.left && !node?.right ? 0 : 1);
  maxDiameter = Math.max(maxDiameter, h1 + h2 + 2);
  return nodeHeight;
}

// Driver code to test logic
diameter(binaryTreeRoot);
console.log(maxDiameter);

/*
Notes for Diameter of Binary Tree (Pepcoding Approach)

max diamter doesnot need to always pass through root node.
there can be any child at any level whose childrens are very deep and that will have max diameter
that why for every node, keep track of left and right node height and update maxDiameter after each node calculation 

- Purpose:
  Calculates the diameter of a binary tree, defined as the number of edges in the longest path between any two nodes.

- Approach:
  1. Uses a recursive function `diameter(node)` to compute the height of each subtree.
  2. For each node:
     - Recursively computes the height of the left (`h1`) and right (`h2`) subtrees.
     - Calculates the height of the current node as `Math.max(h1, h2) + (isLeaf ? 0 : 1)`.
     - Updates a global variable `maxDiameter` with the maximum value of `h1 + h2 + 2` (number of edges through the current node).
  3. Returns the height of the current node to its parent call.

- Key Points:
  - The diameter may or may not pass through the root.
  - The function updates `maxDiameter` at every node, ensuring the global maximum is found.
  - The height calculation uses a custom convention: leaf node height is 0, internal node height is max child height + 1.
  - The function is called once on the root, and the result is printed from `maxDiameter`.

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

    The diameter is 6 (number of edges in the longest path).

- Usage:
    diameter(binaryTreeRoot);
    console.log(maxDiameter);
*/
