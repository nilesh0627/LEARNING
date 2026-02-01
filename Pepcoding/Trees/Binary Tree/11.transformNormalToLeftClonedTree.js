/* Problem Name: Transform to Left Cloned Tree

Problem Statement:
You are given the root node of a Binary Tree.
Your task is to transform the tree by creating a clone of every node and inserting it between the original node and its left child.

Transformation Logic:
1. Create a duplicate (clone) node for every existing node.
2. Set the clone as the left child of the original node.
3. The original left child becomes the left child of the clone.
4. The right child of the original node remains as it is.
5. This must be done recursively for the entire tree.

Diagrammatic View:
Example Tree Structure (Before):

          A
       /     \
     B        C
    / \      /
   D   E    F 


Example Tree Structure (After):

             A
           /   \
        (A)     C
        /      /
       B     (C) 
     /   \    /
   (B)    E  F
   /     /  /
  D    (E) (F)
 /
(D)

Legend: (X) denotes the clone of node X.

Scenario: 
Original: 50 -> Left: 25
Transformed: 50 -> Left: 50(Clone) -> Left: 25

Explanation:
- For Node A: Create Node A'.
- A.left becomes A'.
- A'.left becomes the original B.
- Repeat for B (B -> B' -> D) and so on.
- Right children are attached to the original nodes, not the clones.

---------------------------------------------------------
Sample Input (Raw Construction):
---------------------------------------------------------
binaryTreeRoot (Object Structure)

---------------------------------------------------------
Sample Output:
---------------------------------------------------------
The tree is modified in place. No return value is strictly necessary, 
but the Root of the transformed tree is usually returned.
*/

/**
 * @param {Node} node - The root of the tree
 * @returns {Node} - The root of the transformed tree
 */

//           A
//        /     \
//      B        C
//     / \      /
//    D   E    F

const binaryTreeRoot = {
  data: "A",
  left: {
    data: "B",
    left: { data: "D", left: null, right: null },
    right: { data: "E", left: null, right: null },
  },
  right: {
    data: "C",
    left: { data: "F", left: null, right: null },
    right: null,
  },
};

function createLeftCloneTree(node) {
  // Write your code here
  if (!node) return null;
  const lNode = createLeftCloneTree(node?.left);
  const rNode = createLeftCloneTree(node?.right);
  const newNode = { data: node.data, left: lNode, right: null };
  node.left = newNode;
  node.right = rNode;
  return node;
}

console.dir(createLeftCloneTree(binaryTreeRoot), { depth: null, colors: true });

/*
--------------------------------------------------------------------------
THE "SMART" EXPLANATION (Create Left Clone Tree):
--------------------------------------------------------------------------

1. THE FAITH VS. EXPECTATION:
   - Expectation: `createLeftCloneTree(root)` will transform the whole 
     tree such that every node has a clone as its left child.
   - Faith: I trust my left and right children to clone themselves 
     completely. Once they return their "cloned" roots (lNode, rNode), 
     I only need to worry about cloning myself and stitching it all 
     together.

2. THE "SURGERY" STRATEGY:
   - This is a Post-Order transformation. We don't change the current 
     node until its children have already been cloned and processed.
   - We create a "middleman" node that sits between the parent and its 
     original left child.

3. LOGIC STEPS (The "Clone & Insert" Process):
   - Step 1 (Recursion): Go deep. Call the function for node.left and 
     node.right. These calls return the "already cloned" subtrees.
   - Step 2 (Creation): Create a 'newNode' (the clone).
     - It gets the same 'data' as the current node.
     - Its 'left' points to the already cloned left subtree (lNode).
   - Step 3 (Insertion): Update the current node's connections.
     - current.left = newNode (The clone becomes the new left child).
     - current.right = rNode (The original right child stays on the right).

4. INTUITIVE VISUALIZATION:
   - Original:  [A] -> [B]
   - Cloned:    [A] -> [A_clone] -> [B] -> [B_clone]
   - Every original node "grows" a twin that hangs off its left arm, 
     and that twin holds the rest of the original left branch.

5. COMPLEXITY:
   - Time: O(N) - Every node is visited and transformed exactly once.
   - Space: O(H) - Stack depth depends on tree height.
==========================================================================
*/
