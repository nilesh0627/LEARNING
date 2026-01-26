/*
==========================================================================
HEADER: Print K Levels Down
==========================================================================
SUMMARY: 
  Given a Binary Tree and a value 'k', the goal is to print all the nodes 
  that are exactly 'k' levels below a starting node. For example, if k=0, 
  print the node itself; if k=1, print its immediate children.
--------------------------------------------------------------------------
PRACTICE SKELETON:
--------------------------------------------------------------------------

function printKLevelsDown(node, k) {
  // 1. Base Case: If node is null or k < 0, return.
  
  // 2. Target Case: If k is 0, we have reached the desired level.
  //    - Print the current node's data.
  //    - Return.
  
  // 3. Recursive Faith: 
  //    - Call printKLevelsDown for the left child with k - 1.
  //    - Call printKLevelsDown for the right child with k - 1.
}

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW:
--------------------------------------------------------------------------

VISUAL REPRESENTATION OF LEVELS:
                   [ 50 ]          <- Level 0 (k=0 for root)
                /          \
            [ 25 ]        [ 75 ]   <- Level 1 (k=1 for root)
           /      \      /      \
        [ 12 ]  [ 37 ] [ 62 ]  [ 87 ] <- Level 2 (k=2 for root)

EXAMPLE: printKLevelsDown(root, 2)
1. root(50) k=2 -> Call children with k=1.
2. node(25) k=1, node(75) k=1 -> Call children with k=0.
3. node(12), node(37), node(62), node(87) all have k=0 -> PRINT.

--------------------------------------------------------------------------
THE "SMART" EXPLANATION (Sumeet Sir's Logic):
--------------------------------------------------------------------------

1. THE FAITH VS. EXPECTATION:
   - **Expectation**: `printKLevelsDown(root, k)` will print all nodes at 
     depth 'k' relative to the root.
   - **Faith**: If I ask the children to print nodes at `k-1` distance 
     from them, they will correctly handle the printing for their subtrees.

2. WHY k-1?
   - As we move one level down in the tree, the distance to the target 
     level decreases by 1. When `k` reaches 0, we are standing on the 
     target node.

3. COMPLEXITY:
   - **Time**: $O(N)$ - In the worst case (like k = height), we might 
     traverse a large portion of the tree.
   - **Space**: $O(H)$ - The recursion stack goes as deep as the height 
     of the tree.

==========================================================================
*/

/*
--------------------------------------------------------------------------
FUNCTION DEFINITION:
--------------------------------------------------------------------------
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

function printKLevelsDown(node, k) {
  if (!node || k < 0) return;
  if (k === 0) {
    console.log(node.data);
    return;
  }
  printKLevelsDown(node?.left, k - 1);
  printKLevelsDown(node?.right, k - 1);
}

printKLevelsDown(binaryTreeRoot, 2);

/*
--------------------------------------------------------------------------
THE "SMART" EXPLANATION (Sumeet Sir's Logic):
--------------------------------------------------------------------------

1. THE FAITH VS. EXPECTATION:
   - **Expectation**: `printKLevelsDown(root, k)` will print everything 
     at level k.
   - **Faith**: If I stand at a node and want to print nodes 'k' levels 
     below me, I can tell my children to print nodes 'k-1' levels below 
     them.

2. BASE CASE LOGIC:
   - We must handle `node == null` to stop recursion at leaf ends.
   - We must handle `k < 0` to prevent unnecessary processing if k starts 
     negative or goes below zero.

3. TRAVERSAL TYPE:
   - The video suggests a **Pre-order** approach (checking self/k=0 
     before calling children) to ensure nodes are printed in a top-down 
     discovery order.

4. COMPLEXITY:
   - **Time**: $O(N)$ - Each node is visited once.
   - **Space**: $O(H)$ - Recursion depth matches the tree height.

==========================================================================
*/
