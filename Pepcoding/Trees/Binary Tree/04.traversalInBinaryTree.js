/*
==========================================================================
PROBLEM: Traversals in a Binary Tree (Pre, In, and Post Order)
==========================================================================
TASK: 
  Visit every node in the tree and print its data in three specific orders:
  1. Pre-order:  Node -> Left -> Right (Euler Left)
  2. In-order:   Left -> Node -> Right (Euler Between)
  3. Post-order: Left -> Right -> Node (Euler Right)

INPUT:
  - node: Root of the Binary Tree

OUTPUT:
  - Console output for Pre, In, and Post orders.

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW (The Euler Tour):
--------------------------------------------------------------------------

VISUAL REPRESENTATION:
Imagine a path tracing around the outside of the tree (The Euler Tour).
- Pre-order: When you visit a node for the 1st time (Left side).
- In-order:  When you visit a node for the 2nd time (Bottom/Between children).
- Post-order: When you visit a node for the 3rd time (Right side).

                   [ 50 ]
                /          \
            [ 25 ]        [ 75 ]
           /      \      /      \
        [ 12 ]  [ 37 ] [ 62 ]  [ 87 ]

PRE-ORDER: 50, 25, 12, 37, 75, 62, 87 (Root first)
IN-ORDER:  12, 25, 37, 50, 62, 75, 87 (Left-to-Right scan)
POST-ORDER: 12, 37, 25, 62, 87, 75, 50 (Root last)

Logic Hint:
1. Base Case: If node is null, return.
2. PRE: Print node data (Before any calls).
3. Recursive call: traverse(node.left).
4. IN: Print node data (Between the two calls).
5. Recursive call: traverse(node.right).
6. POST: Print node data (After all calls).
-------------------------------------------------------------------------------------------------------------
| Feature        | Pre-order              | In-order                               | Post-order             |
|----------------|------------------------|----------------------------------------|------------------------|
| Euler Location | euler Left of the node | euler b/w the left and right of node.  | euler Right of the node|
| Visit Number   | 1st Visit (Arrival).   | 2nd Visit (Transition).                | 3rd Visit (Departure). |
| Sequence       | Node -> Left -> Right. | Left -> Node -> Right.                 | Left -> Right -> Node. |
| Recursion State| Before going "Deep."   | Returning from Left.                   | Returning from Right.  |
| Code Position  | Before both calls.     | Between the two calls.                 | After both calls.      |
| Typical Use    | Cloning, Printing Tree.| BST Sorted Order.                      | Size, Sum, Height.     |
--------------------------------------------------------------------------------------------------------------
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

/*
--------------------------------------------------------------------------
FUNCTION DEFINITION:
--------------------------------------------------------------------------
*/

function traversals(node) {
  if (!node) return;
  // Your code here
  console.log("pre->", node.data); //euler left -> pre
  traversals(node.left);
  console.log("In->", node.data); //euler between -> in
  traversals(node.left);
  console.log("Post->", node.data); //euler post -> post
}

traversals(binaryTreeRoot);

/*
==========================================================================
EXPLANATION: The Euler Tour & The Three Orders (Sumeet Sir's Logic)
==========================================================================

Sumeet Sir explains traversals not just as code, but as a "Journey" 
around the tree. Imagine an ant crawling along the perimeter of the tree, 
starting from the left of the root, hugging the nodes, and returning 
to the top from the right.

1. THE THREE VISITS:
   Every node is encountered THREE times during this journey:
   - 1st Visit (Left side): You just arrived. This is PRE-ORDER.
   - 2nd Visit (Between): You finished the left child, now moving to right. 
     This is IN-ORDER.
   - 3rd Visit (Right side): You are leaving the node for good. 
     This is POST-ORDER.

2. THE "RECURSION STACK" AREAS:
   In the code, these three visits correspond to specific lines:
   
   function traversals(node) {
     // AREA 1: Before calling Left (PRE)
     // --------------------------------
     display(node.left);
     // AREA 2: After Left, Before Right (IN)
     // --------------------------------
     display(node.right);
     // AREA 3: After calling Right (POST)
     // --------------------------------
   }

3. WHY IT MATTERS:
   - PRE-ORDER (N L R): Tells you the "Path" taken. Useful for cloning a tree.
   - IN-ORDER (L N R): For Binary Search Trees, this prints data in 
     sorted order. It's the "scanning" view.
   - POST-ORDER (L R N): Useful for "bottom-up" problems (like height/size) 
     where you must process children before the parent.

---------------------------------------------------------------------------------------------
| Feature        | Pre-order              | In-order               | Post-order             |
|----------------|------------------------|------------------------|------------------------|
| Euler Location | Left side of the node. | Between the children.  | Right side of the node.|
| Visit Number   | 1st Visit (Arrival).   | 2nd Visit (Transition).| 3rd Visit (Departure). |
| Sequence       | Node -> Left -> Right. | Left -> Node -> Right. | Left -> Right -> Node. |
| Recursion State| Before going "Deep."   | Returning from Left.   | Returning from Right.  |
| Code Position  | Before both calls.     | Between the two calls. | After both calls.      |
| Typical Use    | Cloning, Printing Tree.| BST Sorted Order.      | Size, Sum, Height.     |
---------------------------------------------------------------------------------------------

KEY TAKEAWAY:
Think of the recursive calls as "diving deep." 
Pre is "On the way down." 
In is "Shifting from left to right." 
Post is "On the way back up."
==========================================================================
*/
