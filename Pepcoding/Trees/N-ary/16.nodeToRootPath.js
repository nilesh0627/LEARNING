/*
==========================================================================
PROBLEM STATEMENT: Node to Root Path in Generic Tree
==========================================================================
1. You are given the root of a Generic Tree and a target value.
2. You are required to find the path from the node containing the 
   target value up to the root node.
3. The path should be returned as a list of values.
4. The first element of the list must be the target node itself, and 
   the last element must be the root node.
5. If the target value is not present in the tree, return an empty list.

--------------------------------------------------------------------------
INPUT FORMAT:
--------------------------------------------------------------------------
- node: The root of the Generic Tree.
- target: The integer value to search for within the tree.

--------------------------------------------------------------------------
OUTPUT FORMAT:
--------------------------------------------------------------------------
- An array of integers representing the path from the target to the root.
--------------------------------------------------------------------------
DIAGRAMMATIC VIEW:
--------------------------------------------------------------------------

              [10]                  
           /    |    \
          /     |     \
       [20]    [30]    [40]       
      /    \  / | \     |
     50    60 70 80 90 [100]       
                /  \
              110  120               

--------------------------------------------------------------------------
EXPECTED OUTPUT EXAMPLES:
--------------------------------------------------------------------------
1. target = 110  =>  Output: [110, 80, 30, 10]
2. target = 100  =>  Output: [100, 40, 10]
3. target = 10   =>  Output: [10]
4. target = 500  =>  Output: [] (Not found)
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
 * Function to find the path from a specific node to the root
 * @param {Node} node - The root of the tree
 * @param {number} target - The value to search for
 * @returns {number[]} - Array of values from target node to root
 */
function nodeToRootPath(node, target) {
  // Your code here
  if (node.value === target) {
    return [node.value];
  }
  for (let child of node.children) {
    const childPath = nodeToRootPath(child, target);
    if (childPath.length > 0) return [...childPath, node.value];
  }
  return [];
}

console.log(nodeToRootPath(root, 110));

/**
 * NOTES: NODE TO ROOT PATH
 *
 * 1. OBJECTIVE
 * - Find the path from a specific target node back up to the root node.
 * - Return the path as an array where the target is the first element and root is the last.
 *
 * 2. ALGORITHM LOGIC
 * - Base Case: If the current node is the target, return a new list containing the node.
 * - Recursive Call: Call the function on each child to see if they can find the target in their subtree.
 * - Path Building: If a child returns a non-empty list, add the current node to that list and return it.
 * - Fallback: If no child finds the target and the current node isn't the target, return an empty list.
 *
 * 3. KEY CHARACTERISTICS
 * - Backtracking: The path is constructed as the recursion "bubbles up" from the target to the root.
 * - Efficiency: Once the target is found, further sibling searches are aborted to save time.
 *
 * 4. PERFORMANCE
 * - Time Complexity: O(N) because it performs a depth-first traversal of the tree.
 * - Space Complexity: O(H) where H is the height of the tree, due to the recursion stack.
 */
