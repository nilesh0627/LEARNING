/* Problem Name: Print Single Child Nodes (Binary Tree)

Problem Statement:
You are given the root node of a Binary Tree.
Your task is to find and print all nodes that are "Single Children".
- A node is a "Single Child" if its parent has exactly one child (the node itself).
- If a parent has both a left and a right child, neither of them is a single child.
- The Root node is never considered a single child (it has no parent).
- The output usually requires printing the value of such nodes, typically in a Pre-order traversal (Parent -> Left -> Right).

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
1. Node 50: Root (Not single).
2. Node 25: Parent(50) has 2 children (25, 75). Not single.
3. Node 75: Parent(50) has 2 children (25, 75). Not single.
4. Node 12: Parent(25) has 2 children (12, 37). Not single.
5. Node 37: Parent(25) has 2 children (12, 37). Not single.
6. Node 30: Parent(37) has ONLY Left child (30). -> PRINT 30.
7. Node 62: Parent(75) has 2 children (62, 87). Not single.
8. Node 87: Parent(75) has 2 children (62, 87). Not single.
9. Node 70: Parent(62) has ONLY Right child (70). -> PRINT 70.

Output: 30, 70

---------------------------------------------------------
Sample Input (Raw Construction):
---------------------------------------------------------
*/

/**
 * @param {Node} node - The root of the tree
 * @param {Node} parent - The parent of the current node (initially null)
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

function printSingleChildNodes(node) {
  // Write your code here
  if (!node) return;
  if (node?.left && !node?.right) {
    console.log(node?.left?.data);
  } else if (!node?.left && node?.right) {
    console.log(node?.right?.data);
  }
  printSingleChildNodes(node?.left);
  printSingleChildNodes(node?.right);
}

printSingleChildNodes(binaryTreeRoot);

/*
--------------------------------------------------------------------------
THE "SMART" EXPLANATION (Print Single Child Nodes):
--------------------------------------------------------------------------

1. THE FAITH VS. EXPECTATION:
   - Expectation: `printSingleChildNodes(root)` will print all nodes in 
     the tree that are the ONLY child of their parent.
   - Faith: If I check my own children and print if one is missing, I 
     can then trust my left and right children to find and print all 
     single-child nodes in their respective subtrees.

2. LOGIC STEPS:
   - Step 1 (Base Case): If node is null, return (stop the search).
   - Step 2 (The Parent's Responsibility): 
     - If (left exists AND right is null) -> Print left child's data.
     - Else if (left is null AND right exists) -> Print right child's data.
   - Step 3 (The Recursive Dive): Call the function for both node.left 
     and node.right to continue the check down the tree.

3. INTUITIVE VISUALIZATION:
   - You are standing at a node looking DOWN. 
   - You aren't checking if *you* are a single child; you are checking 
     if you are a "single parent." 
   - If you have only one "arm" (child), you shout out that child's name.

[Image of binary tree with single child nodes highlighted]

4. WHY PRE-ORDER?
   - The video uses Pre-order (check children before recursing) so that 
     we discover single children in a top-down manner, which is the 
     standard expectation for this problem.

5. COMPLEXITY:
   - Time: O(N) - Every node is visited once.
   - Space: O(H) - Max depth of the recursion stack is the tree height.

==========================================================================
*/
