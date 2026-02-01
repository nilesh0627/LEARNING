/* Problem Name: Transform Back from Left Cloned Tree

Problem Statement:
You are given the root node of a "Left Cloned Tree" (a tree where every node has a duplicate of itself inserted as its left child).
Your task is to transform this tree back to its **Original Normal Form**.

Transformation Logic (Reverse Operation):
1. For every node, the current `node.left` is its clone.
2. The `node.left.left` is the actual original left child (or null).
3. We need to bypass the clone: Set `node.left` to `node.left.left`.
4. This effectively removes the clone from the structure.
5. Recursively repeat this process for the left subtree (which is now at `node.left`) and the right subtree.

Diagrammatic View:
Input Tree (Left Cloned structure based on sample input):

             A
           /   \
        (A)     C
        /      /
       B     (C)
     /   \   /
   (B)    E F
   /     / /
  D    (E)(F)
 /
(D)

Output Tree (Normalized):

       A
      / \
     B   C
    / \  /
   D  E F

Legend: (X) denotes the clone of node X.

---------------------------------------------------------
Sample Input (Raw Construction):
---------------------------------------------------------
*/

// Appraoch - 2
function transBackFromLeftClonedTree1(node) {
  // Write your code here
  if (!node) return null;
  const lNode = transBackFromLeftClonedTree(node?.left?.left);
  const rNode = transBackFromLeftClonedTree(node?.right);
  node.left = lNode;
  node.right = rNode;
  return node;
}

console.log(transBackFromLeftClonedTree1(leftClonedTreeRoot), {
  depth: null,
  colors: true,
});

/*
--------------------------------------------------------------------------
THE "SMART" EXPLANATION (Approach 2: Post-Order De-cloning):
--------------------------------------------------------------------------

1. THE FAITH VS. EXPECTATION:
   - Expectation: `transBack(node)` will return a perfectly cleaned 
     original tree.
   - Faith: I trust `transBack(node.left.left)` to return a cleaned 
     Left Subtree, and `transBack(node.right)` to return a cleaned 
     Right Subtree. 

2. LOGIC STEPS (The "Bottom-Up" Restoration):
   - Step 1 (Skip Clone): We skip `node.left` (the clone) and jump 
     straight to `node.left.left` (the real child).
   - Step 2 (Recurse): We call the function on that real left child and 
     the original right child.
   - Step 3 (Re-attachment): We attach the "already cleaned" results 
     (lNode and rNode) directly to our current node.
   - Step 4 (Return): Return the current node to the parent.

3. INTUITIVE VISUALIZATION:
   - You are standing at Node A.
   - You ignore the duplicate (A_clone) right below you.
   - You reach out to the real child (B) and say "Hey, fix yourself 
     and your family, then come hold my left hand."
   - You do the same for the right child.



4. WHY THIS IS ROBUST:
   - By calling `node.left.left` inside the argument, you effectively 
     delete the clone node from the execution flow entirely. It is 
     never processed as a "parent" node.

5. COMPLEXITY:
   - Time: O(N) - Visits each original node.
   - Space: O(H) - Recursion depth proportional to original tree height.

==========================================================================
*/
