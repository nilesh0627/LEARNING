/*
==========================================================================
PROBLEM: Diameter of Generic Tree
==========================================================================
TASK: 
  Find the diameter of the Generic Tree.
  The diameter is defined as the maximum number of edges (distance) 
  between any two nodes in the tree.

INPUT:
  - node: Root of the Generic Tree

OUTPUT:
  - diameter: An integer representing the maximum distance.

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW:
--------------------------------------------------------------------------
The diameter often passes through a node as the sum of its two deepest 
children's heights + 2.

                   [ 10 ]
          /          |          \
      [ 20 ]       [ 30 ]       [ 40 ]
     /      \     /  |   \        |
   [50]    [60] [70][80] [90]   [100]
                    /  \
                 [110] [120]

Path Example: 50 -> 20 -> 10 -> 30 -> 80 -> 110 (Distance = 5)

LOGIC HINT:
1. For every node, find the height of all its children.
2. The two greatest heights (h1 and h2) suggest a potential diameter 
   passing through this node (h1 + h2 + 2).
3. Update global 'diameter' if (h1 + h2 + 2) is greater than current diameter.
4. Return (max_child_height + 1) to the parent.
==========================================================================
*/

const root = {
  value: 10,
  children: [
    {
      value: 20,
      children: [
        { value: 50, children: [] },
        { value: 60, children: [] },
      ],
    },
    {
      value: 30,
      children: [
        { value: 70, children: [] },
        {
          value: 80,
          children: [
            { value: 110, children: [] },
            { value: 120, children: [] },
          ],
        },
        { value: 90, children: [] },
      ],
    },
    {
      value: 40,
      children: [{ value: 100, children: [] }],
    },
  ],
};

/*
--------------------------------------------------------------------------
FUNCTION DEFINITION:
--------------------------------------------------------------------------
*/

let diameter = 0;

/**
 * Returns the height of the node (deepest path from node to a leaf)
 * while updating the global 'diameter' variable.
 */

function calculateDiameterReturnHeight(node) {
  // Your code here
  let maxHeight = 0,
    sMaxHeight = 0;
  for (let child of node.children) {
    const ans = calculateDiameterReturnHeight(child);
    if (ans > maxHeight) {
      sMaxHeight = maxHeight;
      maxHeight = ans;
    } else if (ans > sMaxHeight) {
      sMaxHeight = ans;
    }
  }
  diameter = Math.max(diameter, maxHeight + sMaxHeight + 2);
  return node.children.length > 0 ? maxHeight + 1 : maxHeight;
}

calculateDiameterReturnHeight(root);

console.log({ diameter });

/**
 * NOTES: DIAMETER (THE "BRIDGE" INTUITION)
 *
 * 1. THE CORE IDEA
 * - Every node acts as a "bridge" between its two tallest branches.
 * - Distance = (Tallest Branch) + (Second Tallest Branch) + 2 Edges.
 *
 * 2. THE DUAL-TASK LOGIC
 * - Task A (Update): Calculate 'h1 + h2 + 2' and update global diameter if it's a new record.
 * - Task B (Return): Give the parent the 'Tallest Branch + 1' so the parent can do its own math.
 *
 * 3. WHY THIS IS SMART
 * - Instead of recalculating height repeatedly (O(N^2)), we calculate it once
 * on the way back up (O(N)), checking the diameter at every single node.
 *
 * 4. PERFORMANCE
 * - Time: O(N) | Space: O(H)
 */
