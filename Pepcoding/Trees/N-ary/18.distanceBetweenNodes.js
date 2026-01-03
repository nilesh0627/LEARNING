/*
==========================================================================
PROBLEM STATEMENT: Distance Between Two Nodes in Generic Tree
==========================================================================
1. You are given the root of a Generic Tree and two data values (d1, d2).
2. You are required to find the distance between the nodes containing 
   values 'd1' and 'd2'.
3. The distance is defined as the number of edges on the unique path 
   between the two nodes.

--------------------------------------------------------------------------
INPUT FORMAT:
--------------------------------------------------------------------------
- node: The root of the Generic Tree.
- d1: The first data value.
- d2: The second data value.

--------------------------------------------------------------------------
OUTPUT FORMAT:
--------------------------------------------------------------------------
- An integer representing the number of edges between the two nodes.

------------------------------------------
DIAGRAMMATIC VIEW:
------------------------------------------

              [10]                  
           /    |    \
        [20]   [30]  [40]       
       /    \  / | \     
     50    60 70 80 90        
                /  \
              110  120               

------------------------------------------
EXPECTED OUTPUT EXAMPLES:
------------------------------------------
1. d1 = 70, d2 = 110 => Path: 70->30->80->110 (3 edges) => Output: 3
2. d1 = 50, d2 = 60  => Path: 50->20->60 (2 edges)      => Output: 2
3. d1 = 10, d2 = 110 => Path: 10->30->80->110 (3 edges) => Output: 3
==========================================================================
*/

// root structure for reference (this is how the strcture of tree will look like after construction from input array - check-> 01.constructTree.js for tree construction from input array)
const root = {
  value: 10,
  children: [
    {
      value: 20,
      children: [
        {
          value: 50,
          children: [],
        },
        {
          value: 60,
          children: [],
        },
      ],
    },
    {
      value: 30,
      children: [
        {
          value: 70,
          children: [],
        },
        {
          value: 80,
          children: [
            {
              value: 110,
              children: [],
            },
            {
              value: 120,
              children: [],
            },
          ],
        },
        {
          value: 90,
          children: [],
        },
      ],
    },
    {
      value: 40,
      children: [
        {
          value: 100,
          children: [],
        },
      ],
    },
  ],
};

/**
 * Function to find the distance between two nodes in terms of edges
 * @param {Node} node - The root of the tree
 * @param {number} d1 - First value
 * @param {number} d2 - Second value
 * @returns {number} - The distance (number of edges)
 */
function distanceBetweenNodes(node, d1, d2) {
  // Your code here
  const rtnp1 = rootToNodePath(node, d1);
  const rtnp2 = rootToNodePath(node, d2);
  let s1 = 0,
    s2 = 0;
  while (s1 < rtnp1.length && s2 < rtnp2.length) {
    if (rtnp1[s1] !== rtnp2[s2]) break;
    s1++;
    s2++;
  }
  s1 = s1 - 1;
  s2 = s2 - 1;
  return rtnp1.length - 1 - s1 + (rtnp2.length - s2 - 1);
}

function rootToNodePath(node, target) {
  if (node.value === target) return [target];
  for (let child of node.children) {
    const childPath = rootToNodePath(child, target);
    if (childPath.length > 0) return [node.value, ...childPath];
  }
  return [];
}

console.log(distanceBetweenNodes(root, 70, 110));
console.log(distanceBetweenNodes(root, 50, 60));
console.log(distanceBetweenNodes(root, 10, 110));

/**
 * NOTES: DISTANCE BETWEEN NODES
 *
 * 1. OBJECTIVE
 * - Calculate the number of edges between two nodes (d1 and d2) in a generic tree.
 * - Distance is the sum of the paths from each node to their Lowest Common Ancestor (LCA).
 *
 * 2. ALGORITHM LOGIC (Based on your solution)
 * - Path Retrieval: Generate root-to-node paths for both target nodes.
 * - Intersection Search: Compare paths from the root (index 0) to find the point where they diverge.
 * - LCA Identification: The last matching index (s1 - 1 or s2 - 1) represents the LCA.
 * - Distance Calculation:
 * - Depth of d1 from LCA: (path1.length - 1) - LCA_index.
 * - Depth of d2 from LCA: (path2.length - 1) - LCA_index.
 * - Total Distance: Sum of these two individual depths.
 *
 * 3. KEY CHARACTERISTICS
 * - Logic Reuse: Leverages the 'Root to Node Path' logic to simplify the problem into path differences.
 * - Edge Counting: The final subtraction ensures we are counting edges (connections), not nodes.
 *
 * 4. PERFORMANCE
 * - Time Complexity: O(N) because finding paths requires a full tree traversal in the worst case.
 * - Space Complexity: O(H) for storing the two paths and the recursion stack.
 */
