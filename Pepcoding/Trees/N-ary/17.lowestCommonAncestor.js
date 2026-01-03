/*
==========================================================================
PROBLEM STATEMENT: Lowest Common Ancestor (LCA)
==========================================================================
1. You are given the root of a Generic Tree and two data values 'd1' and 'd2'.
2. You are required to find the Lowest Common Ancestor (LCA) of these two nodes.
3. The LCA is the deepest node in the tree that is an ancestor of both 'd1' and 'd2'.
4. Note: A node is considered an ancestor of itself.

--------------------------------------------------------------------------
INPUT FORMAT:
--------------------------------------------------------------------------
- node: The root of the Generic Tree.
- d1: The first data value.
- d2: The second data value.

It is gauranteed that both values (d1, d2) exists

--------------------------------------------------------------------------
OUTPUT FORMAT:
--------------------------------------------------------------------------
- A single integer representing the value of the LCA node.

/*
------------------------------------------
DIAGRAMMATIC VIEW:
------------------------------------------

              [10]                  
           /    |    \
          /     |     \
       [20]    [30]    [40]       
      /    \  / | \     |
     50    60 70 80 90 [100]       
                /  \
              110  120               

------------------------------------------
EXPECTED OUTPUT EXAMPLES:
------------------------------------------
1. d1 = 110, d2 = 120 => Output: 80
2. d1 = 70,  d2 = 110 => Output: 30
3. d1 = 10,  d2 = 110 => Output: 10
4. d1 = 80,  d2 = 110 => Output: 80 (80 is ancestor of itself)
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
 * Function to find the Lowest Common Ancestor of two nodes
 * @param {Node} node - The root of the tree
 * @param {number} d1 - First value
 * @param {number} d2 - Second value
 * @returns {number} - The value of the LCA node
 */
function rootToNodePath(node, target) {
  if (node.value === target) return [target];
  for (let child of node.children) {
    const childPath = rootToNodePath(child, target);
    if (childPath.length > 0) return [node.value, ...childPath];
  }
  return [];
}
function lca(node, d1, d2) {
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
  return rtnp1[s1 - 1];
}

console.log(lca(root, 70, 110));
console.log(lca(root, 30, 110));
console.log(lca(root, 120, 110));

/**
 * NOTES: LOWEST COMMON ANCESTOR (LCA)
 *
 * 1. OBJECTIVE
 * - Find the lowest common ancestor of two given nodes (d1 and d2) in a generic tree.
 * - LCA is the deepest node that is an ancestor to both target nodes.
 *
 * 2. ALGORITHM LOGIC (Based on your solution)
 * - Path Retrieval: Obtain the paths from the root to each target node (d1 and d2).
 * - Path Comparison: Iterate through both paths simultaneously starting from the root (index 0).
 * - Finding Divergence:
 * - The paths will be identical as long as the nodes are common ancestors.
 * - The moment the values in the paths differ, the previous node (s1 - 1) is the LCA.
 * - Return: The last common node found before the paths diverged.
 *
 * 3. KEY CHARACTERISTICS
 * - Dependency: Relies on the 'Root to Node Path' helper function.
 * - Visual Logic: Think of it as finding the last common junction in two paths starting from the same source.
 *
 * 4. PERFORMANCE
 * - Time Complexity: O(N) because finding paths takes O(N) and comparing them takes O(H).
 * - Space Complexity: O(H) to store the paths and handle the recursion stack.
 */
