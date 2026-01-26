/*
==========================================================================
PROBLEM: Find and Node to Root Path in Binary Tree
==========================================================================
TASK: 
  1. Find if a specific 'data' exists in the Binary Tree.
  2. If found, return the path from that node up to the root in an ArrayList/Array.
  
INPUT:
  - node: Root of the Binary Tree
  - data: The value to find

OUTPUT:
  - An array [node_data, parent_data, ..., root_data] if found, else null.

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW (Example Input & Output):
--------------------------------------------------------------------------

VISUAL REPRESENTATION OF INPUT:
                   [ 50 ]
                /          \
            [ 25 ]        [ 75 ]
           /      \      /      \
        [ 12 ]  [ 37 ] [ 62 ]  [ 87 ]
                         \
                        [ 70 ]



EXPECTED OUTPUT (for data = 70):
[70, 62, 75, 50]

Logic Hint:
1. Base Case: If node is null, return null (not found).
2. If node.data == target, create a new list, add self, and return it.
3. Call recursion on left child. If it returns a list, add self to it and return.
4. Call recursion on right child. If it returns a list, add self to it and return.
5. If both return null, return null.
==========================================================================
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
    left: {
      data: 62,
      left: null,
      right: { data: 70, left: null, right: null },
    },
    right: { data: 87, left: null, right: null },
  },
};

/*
========================================================================================================================================================
 Approach - 1
========================================================================================================================================================
*/

function findAndNodeToRootPath_1(node, data) {
  const path = [];
  let found = false;
  const traverse = (node) => {
    if (!node || found) return;
    if (node.data === data) {
      found = true;
    }
    path.push(node.data);
    traverse(node?.left);
    traverse(node?.right);
    /* Base cases are checked ONLY when a function STARTS. They are NOT re-checked mid-function.
    past function calls which has already gone pass the top line base case so need to add this condition !found so while
    unwinding of recursive calls which already existed when node was found so those calls should not pop the node data from stack
    */
    if (!found) {
      path.pop();
    }
  };
  traverse(node);
  return path;
}

console.log(findAndNodeToRootPath_1(binaryTreeRoot, 70));

/*
========================================================================================================================================================
 Approach - 2
========================================================================================================================================================
*/

function findAndNodeToRootPath_2(node, data) {
  if (!node) return [];
  if (node.data === data) return [node.data];
  if (node.left) {
    const pathL = findAndNodeToRootPath_2(node?.left, data);
    if (pathL.length > 0) {
      return [...pathL, node.data];
    }
  }
  if (node.right) {
    const pathR = findAndNodeToRootPath_2(node?.right, data);
    if (pathR.length > 0) {
      return [...pathR, node.data];
    }
  }
  return [];
}

console.log(findAndNodeToRootPath_2(binaryTreeRoot, 70));

/*
==================== PEP-CODING STYLE EXPLANATION ====================

Problem:
Return Node-to-Root path for a given data value in a Binary Tree.

Approach:
Use recursion where each call returns:
- empty array  → data not found in this subtree
- non-empty array → node-to-root path from data to current node

Faith:
Assume recursive calls correctly return the node-to-root path
from left or right subtree if the data exists there.

Expectations:
find(node, data) should return:
- []                if data does not exist in subtree rooted at node
- [data, ..., node] if data exists in subtree rooted at node

--------------------------------------------------------------------

Base Cases:
1. If node is null → return []
2. If node.data == data → return [node.data]

--------------------------------------------------------------------

Recursive Case:
1. Ask left subtree to find the path
   - If left subtree returns non-empty path,
     append current node and return it

2. Ask right subtree to find the path
   - If right subtree returns non-empty path,
     append current node and return it

3. If both subtrees return empty,
   data does not exist in this subtree → return []

--------------------------------------------------------------------

Why this works:
- Only the successful branch returns a non-empty path
- Path is built while returning (during stack unwind)
- No shared state, no backtracking cleanup needed

--------------------------------------------------------------------

Time Complexity:
O(n)  → each node visited once

Space Complexity:
O(h)  → recursion stack (h = height of tree)

====================================================================
*/
