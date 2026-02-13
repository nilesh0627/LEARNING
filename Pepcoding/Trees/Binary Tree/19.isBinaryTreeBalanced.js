/* Problem Name: Is Balanced Binary Tree
Source: Pepcoding (Level 1 - Binary Tree)
Link: https://www.youtube.com/watch?v=9X1TYiipolA

Problem Statement:
1. You are given a pointer to the root of a Binary Tree.
2. You are required to complete the body of the 'isBalanced' function.
3. The function should check if the tree is "Balanced".
4. A Binary Tree is Balanced if for **every node**:
   - The absolute difference between the height of its Left Subtree and the height of its Right Subtree is at most 1.
   - |Height(Left) - Height(Right)| <= 1
   - This property must hold true for ALL nodes, not just the root.
5. Return 'true' if it is balanced, otherwise return 'false'.

Diagrammatic View:
Example 1: Balanced
          50
       /      \
     25        75
    /  \      /  
  12   37   62    

Analysis:
- Node 12, 37, 62: Leaf nodes. Height=1. Balance Factor(|0-0|) = 0. OK.
- Node 25: Left Height=1, Right Height=1. Diff=0. OK.
- Node 75: Left Height=1, Right Height=0. Diff=1. OK.
- Root 50: Left Height=2, Right Height=2. Diff=0. OK.
- Result: True.

Example 2: Unbalanced
          50
       /      
     25        
    /  
  12   

Analysis:
- Node 12: Leaf. OK.
- Node 25: Left Height=1, Right Height=0. Diff=1. OK.
- Root 50: Left Height=2, Right Height=0. Diff=2. (>1) VIOLATION!
- Result: False.

Note:
Like the BST problem, an efficient solution returns multiple values (Height, IsBalanced) to avoid O(N^2) complexity.

Sample Input:
50 25 12 n n 37 n n 75 62 n n n

Sample Output:
true

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
    right: { data: 37, left: null, right: null },
  },
  right: {
    data: 75,
    left: { data: 62, left: null, right: null },
    right: null,
  },
};

// Global variable or Helper Class approach is common
// Often solved by returning an object { isBal: boolean, ht: number }

function isBalanced(node) {
  // Write your code here
  const checkBalanced = (node) => {
    if (!node) return 0;
    const lHeight = checkBalanced(node?.left);
    const rHeight = checkBalanced(node?.right);
    if (lHeight === -1 || rHeight === -1) return -1;
    if (Math.abs(lHeight - rHeight) > 1) {
      return -1;
    }
    return Math.max(lHeight, rHeight) + 1;
  };
  return checkBalanced(node) !== -1;
}

// Driver code to test logic
console.log(isBalanced(binaryTreeRoot));

/*
Notes for Is Balanced Binary Tree (Pepcoding Approach)

- Purpose:
  Checks if a binary tree is balanced.
  A binary tree is balanced if, for every node, the absolute difference between the heights of its left and right subtrees is at most 1.

- Approach:
  1. Uses a recursive helper function `checkBalanced(node)` to compute the height of each subtree.
  2. For each node:
     - Recursively computes the height of the left and right subtrees.
     - If either subtree is unbalanced (returns -1), propagate -1 upwards.
     - If the difference in heights is greater than 1, return -1 (marks the tree as unbalanced).
     - Otherwise, return the height of the current node (`Math.max(lHeight, rHeight) + 1`).
  3. The main function returns `true` if the helper does not return -1, otherwise `false`.

- Why use -1 as a sentinel value?
  - If any subtree is unbalanced, -1 is propagated up immediately, avoiding unnecessary calculations. (Very very important, this technique will be used for recursive calls optimisations)
  - This ensures O(n) time complexity, as each node is visited only once.

- What are you trying to do?
  - For every node, check if the balance condition holds.
  - Efficiently propagate unbalanced status up the tree to avoid redundant checks.

- Complexity:
  - Time: O(n), where n is the number of nodes (each node visited once).
  - Space: O(h), where h is the height of the tree (due to recursion stack).

- Example:
    For the sample tree:
              50
           /      \
         25        75
        /  \      /  
      12   37   62    
    The tree is balanced (returns true).

    For:
              50
           /      
         25        
        /  
      12   
    The tree is unbalanced (returns false).

- Usage:
    isBalanced(binaryTreeRoot);

- Summary:
  - The code efficiently checks the balance condition for all nodes.
  - Uses a sentinel value (-1) to propagate unbalanced status and avoid O(n^2) complexity.
  - Returns true if the tree is balanced, false otherwise.
*/
