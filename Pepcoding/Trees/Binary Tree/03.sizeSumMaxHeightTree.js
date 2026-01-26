/*
==========================================================================
PROBLEM: Size, Sum, Max, and Height of a Binary Tree
==========================================================================
TASK: 
  Calculate four fundamental properties of a given Binary Tree:
  1. Size: Total number of nodes in the tree.
  2. Sum: The arithmetic sum of all node data.
  3. Max: The maximum value present in the tree.
  4. Height: The deepest level of the tree (measured in terms of edges).

INPUT:
  - node: Root of the Binary Tree

OUTPUT:
  - Four values representing Size, Sum, Max, and Height.

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

EXPECTED RESULTS (Based on Diagram):
- Size: 9
- Sum: 448
- Max: 87
- Height: 3

Logic Hint:
1. Base Case: If the node is null, return appropriate identities:
   - Size: 0
   - Sum: 0
   - Max: -Infinity
   - Height: -1 (for edge-based height)
2. Recursive Step:
   - Get results from the left child.
   - Get results from the right child.
3. Calculation:
   - Size: (ls + rs + 1)
   - Sum: (lsum + rsum + node.data)
   - Max: Math.max(node.data, lmax, rmax)
   - Height: Math.max(lh, rh) + 1
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

function size(node) {
  // Your code here
  if (!node) return 0;
  let count = 0;
  count += size(node?.left);
  count += size(node?.right);
  return count + 1;
}

function sum(node) {
  // Your code here
  if (!node) return 0;
  let res = 0;
  res += sum(node?.left);
  res += sum(node?.right);
  return res + node?.data;
}

function max(node) {
  // Your code here
  if (!node) return -Infinity;
  const currVal = node?.data;
  const leftNodeMax = max(node?.left);
  const rightNodeMax = max(node?.right);
  return Math.max(currVal, leftNodeMax, rightNodeMax);
}

function height(node) {
  // Your code here
  if (!node) return -1;
  const leftNodeHeight = height(node?.left);
  const rightNodeHeight = height(node?.right);

  return Math.max(leftNodeHeight, rightNodeHeight) + 1;
}

console.log("Total nodes in tree:", size(binaryTreeRoot));
console.log("Sum of all nodes in tree: ", sum(binaryTreeRoot));
console.log("Maximum among all nodes in tree:", max(binaryTreeRoot));
console.log("Height of Binary tree:", height(binaryTreeRoot));

/*
==========================================================================
EXPLANATION: Size, Sum, Max, and Height
==========================================================================

1. THE "POST-ORDER" STRATEGY
   These functions use Post-order traversal (Left, Right, then Root). 
   You cannot calculate the parent's value until you have the 
   results from both children.

2. BASE CASE IDENTITIES (The "Smart" Defaults)
   - Size/Sum (0): The additive identity. Adding 0 doesn't change results.
   - Max (-Infinity): The comparison identity. Any node value will be 
     greater than -Infinity.
   - Height (-1): The edge-counting trick. Since a single node has 0 edges,
     its null children must return -1 so that: max(-1, -1) + 1 = 0.

3. RECURSIVE FAITH
   - You don't "calculate" the whole tree. 
   - You ask the left child for its "answer," the right child for its "answer," 
     and then simply perform a single operation to include the current node.

4. COMPLEXITY
   - Time: O(N) -> Every node is visited exactly once.
   - Space: O(H) -> The call stack depth is equal to the tree height.
*/
