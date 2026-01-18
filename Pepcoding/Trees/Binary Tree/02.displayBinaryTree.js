/*
==========================================================================
PROBLEM: Display a Binary Tree
==========================================================================
TASK: 
  Print the Binary Tree in a specific formatted way. Each node's line 
  should show its left child, itself, and its right child.
  If a child is missing, print "." instead.

INPUT:
  - node: Root of the Binary Tree

OUTPUT:
  - Console output for each node.

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW (Example Input & Output):
--------------------------------------------------------------------------



VISUAL REPRESENTATION OF INPUT:
                   [ 50 ]
                /          \
            [ 25 ]        [ 75 ]
           /      \      /      \
        [ 12 ]  [ 37 ] [ 62 ]  [ 87 ]
                /        \
              [ 30 ]    [ 70 ]

FORMATTED OUTPUT EXPECTED:
25 <- 50 -> 75
12 <- 25 -> 37
. <- 12 -> .
30 <- 37 -> .
. <- 30 -> .
62 <- 75 -> 87
. <- 62 -> 70
. <- 70 -> .
. <- 87 -> .

Logic Hint:
1. Base Case: If node is null, return.
2. Build a string for the current node's "family" (left, self, right).
   - If left exists, use left.data, else use ".".
   - If right exists, use right.data, else use ".".
3. Print the string.
4. Recursive call: display(node.left).
5. Recursive call: display(node.right).
==========================================================================
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

function display(node) {
  // Your code here
  console.log(
    `${node.left?.data || "."} <- ${node.data} -> ${node?.right?.data || "."}`,
  );
  if (node.left) display(node.left);
  if (node.right) display(node.right);
}

display(binaryTreeRoot);

/**
  NOTES: BINARY TREE DISPLAY (NODE-CENTRIC)

  1. OBJECTIVE
     Visualize the Binary Tree structure by printing each node along with 
     its immediate Left and Right children.

  2. LOGIC (Pre-order Visualization)
     - Current Node: Print the parent node in the center.
     - Left Child: Print on the left. If null, represent with a dot (.).
     - Right Child: Print on the right. If null, represent with a dot (.).
     - Recursion: Move to the left child (if exists), then to the right child.

  3. FORMATTING INTUITION
     The string `${left} <- ${parent} -> ${right}` creates a clear 
     horizontal snapshot of the node's local connectivity.

     EXAMPLE OUTPUT:
        12 <- 25 -> 37
        . <- 12 -> .
        30 <- 37 -> .

  4. KEY CHARACTERISTICS
     - Order: This is a Pre-order traversal because the parent is printed 
       before visiting children.
     - Null Safety: Uses optional chaining (?.) or conditional checks to 
       avoid errors when children are missing.
     - Distinctness: Clearly separates the "Left" and "Right" identity, 
       which is the hallmark of Binary Trees.

  5. PERFORMANCE
     - Time Complexity: O(N) as every node is visited exactly once.
     - Space Complexity: O(H) for the recursion stack.
*/
