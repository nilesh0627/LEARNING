/* Problem Name: Remove Node in BST
Source: Pepcoding (Level 1 - Binary Search Tree)
Link: https://www.youtube.com/watch?v=5_AZcOOc-kM

Problem Statement:
1. You are given a pointer to the root of a Binary Search Tree (BST) and a data value to be removed.
2. You are required to complete the body of the 'remove' function.
3. The function should remove the node with the given data from the BST and return the root of the modified tree.
4. Ensure that the BST properties are maintained after removal:
   - Case 1: Node has 0 children (Leaf). Just remove it by returning null.
   - Case 2: Node has exactly 1 child. Bypass the node and return its single child to the parent.
   - Case 3: Node has 2 children. Find the maximum node in the left subtree (or minimum in the right subtree), replace the node's data with this max/min value, and recursively remove the max/min node from the respective subtree.

Diagrammatic View:
Example Tree Structure:

          50
       /      \
     25        75
    /  \      /  \
  12   37   62    87
      /  \
    30    40

Analysis:
Let's trace removing the Root Node (50), which falls under Case 3 (Two children):
1. The node to be removed is 50.
2. Find the Maximum value in its Left Subtree (rooted at 25). 
   - Following right children: 25 -> 37 -> 40. The Max value is 40.
3. Replace the data of the node to be removed (50) with this max value (40).
   - The root's data is now 40.
4. Recursively call `remove` on the left subtree to delete the original node '40'.
   - Node 40 is a leaf (Case 1), so it gets replaced with null.

Output Structure (After removing 50):
          40
       /      \
     25        75
    /  \      /  \
  12   37   62    87
      /  
    30    

---------------------------------------------------------
Sample Input (Raw Construction):
---------------------------------------------------------
*/

/**
 * @param {Node} node - The root of the BST
 * @param {number} data - The data to be removed
 * @returns {Node} - The root of the modified BST
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
    left: { data: 62, left: null, right: null },
    right: { data: 87, left: null, right: null },
  },
};

// Helper function to find the maximum value in a BST
function max(node) {
  if (node.right != null) {
    return max(node.right);
  } else {
    return node.data;
  }
}

var remove = function (node, key) {
  if (!node) return null;
  if (key < node.data) {
    node.left = remove(node.left, key);
  } else if (key > node.data) {
    node.right = remove(node.right, key);
  } else {
    // no child
    if (!node.left && !node.right) {
      return null;
    }
    //both child
    else if (node.left && node.right) {
      const leftMax = max(node.left);
      node.data = leftMax;
      node.left = remove(node.left, leftMax);
      return node;
    }
    // 1 child
    else {
      return node?.left || node?.right;
    }
  }
  return node;
};

// Driver code to test logic
const newRoot = remove(binaryTreeRoot, 25);
console.dir(newRoot, { depth: null, colors: true });

/*
Notes for Remove Node in BST (Pepcoding Approach)

- Purpose:
  Removes a node with a given value from a Binary Search Tree (BST) and returns the root of the modified tree, ensuring BST properties are maintained.

- Personal Note:
  This problem took me a whole day to solve! The logic is subtle and requires careful handling of all cases to maintain the BST structure.

- Why use if (key < node.data) {} else if (key > node.data) {} instead of normal recursion?
  - In a BST, all values in the left subtree are less than the current node, and all values in the right subtree are greater.
  - By comparing the key with node.data, we can decide whether to search left or right, ensuring O(h) time complexity (where h is tree height).
  - A normal recursive approach (searching both sides) would break the BST property and be inefficient.

- The 3 Scenarios When Key is Found:
  1. **Node has 0 children (Leaf):**
     - Example: Remove 12 from the tree.
     - Action: Return null to the parent, effectively removing the leaf.
  2. **Node has 1 child:**
     - Example: Remove 37 if it only had a left child (say, 30).
     - Action: Return the single child to the parent, bypassing the node.
  3. **Node has 2 children:**
     - Example: Remove 50 (root node in sample tree).
     - Action:
       - Find the maximum value in the left subtree (in this case, 40).
       - Replace the node's data (50) with this max value (40).
       - Recursively remove the original node with value 40 from the left subtree.
       - This ensures the BST property is maintained.

- Intuition for Case 3 (Node with 2 children):
  - Why do we use the maximum value from the left subtree (or minimum from the right)?
    - The maximum value in the left subtree is guaranteed to be less than all values in the right subtree and greater than all other values in the left subtree.
    - By replacing the node's data with this value, we maintain the BST ordering.
    - After replacement, we must remove the duplicate node (the original max) from the left subtree.
  - Example:
    ```
          50
       /      \
     25        75
    /  \      /  \
  12   37   62    87
      /  \
    30    40
    ```
    - Remove 50:
      - Find max in left subtree: 40.
      - Replace 50 with 40.
      - Remove 40 from left subtree (it's a leaf, so just set its parent's right to null).
    - Result:
    ```
          40
       /      \
     25        75
    /  \      /  \
  12   37   62    87
      /  
    30    
    ```

- Why this approach is important:
  - It maintains the BST property after removal.
  - It avoids unnecessary traversal and keeps the operation efficient.

- Complexity:
  - Time: O(h), where h is the height of the tree (due to BST property traversal).
  - Space: O(h), due to recursion stack.

- Usage:
    const newRoot = remove(binaryTreeRoot, key);

- Summary:
  - The code efficiently removes a node from a BST by leveraging BST properties for traversal.
  - Handles all cases (0, 1, 2 children) with clear logic.
  - The approach ensures the BST remains valid after removal.
  - The case with 2 children uses the maximum from the left subtree for replacement, maintaining order and structure.
*/
