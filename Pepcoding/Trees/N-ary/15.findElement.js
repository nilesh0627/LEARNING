/*
==========================================================================
PROBLEM STATEMENT: Find an element in a Generic Tree
==========================================================================
1. You are given the root of a Generic Tree and a data value 'target'.
2. You are required to find if the element 'target' is present in the tree.
3. If the element is found, return true; otherwise, return false.

--------------------------------------------------------------------------
INPUT FORMAT:
--------------------------------------------------------------------------
- node: The root of the Generic Tree.
- target: The integer value to search for.

--------------------------------------------------------------------------
OUTPUT FORMAT:
--------------------------------------------------------------------------
- A boolean value: true if the element exists, false otherwise.
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
 * Function to find if an element exists in the tree
 * @param {Node} node - The root of the tree
 * @param {number} target - The value to search for
 * @returns {boolean} - true if found, else false
 */
function find(node, target) {
  // Your code here
  if (node.value === target) return true;
  let isFound = false;
  for (let child of node.children) {
    isFound = find(child, target);
    if (isFound) break;
  }
  return isFound;
}
console.log(find(root, 53));

/**
    NOTES: FIND AN ELEMENT IN GENERIC TREE

    1. SEARCH STRATEGY
       - The function uses a Depth-First Search (DFS) approach to find a target.
       - It returns a boolean (true/false) indicating the presence of the value.

    2. STEP-BY-STEP LOGIC (Based on your solution)
       - Initial Check: Compare the current node's value with the target. If 
         they match, return true immediately.
       - Recursive Exploration: If the current node isn't the target, loop 
         through the children.
       - Early Exit: The 'break' statement is crucial. If a child returns 
         true (isFound), the loop stops. There is no need to check the 
         remaining siblings.
       - Final Result: Returns the value of the 'isFound' flag, which remains 
         false only if neither the node nor its descendants contain the target.

    3. WHY THIS IS EFFICIENT
       - Once the target is located in a branch, the "true" result bubbles up 
         the recursion stack without visiting any further nodes in the tree.

    4. KEY TAKEAWAY
       - The recursive call find(child, target) delegates the search to sub-trees.
       - The "if (isFound) break" logic prevents unnecessary processing.
*/
