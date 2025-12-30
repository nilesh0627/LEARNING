/*
 * ==========================================
 * PROBLEM STATEMENT: Traversals in Generic Tree (Pre & Post Order)
 * ==========================================
 * 1. You are given the root of a Generic Tree.
 * 2. You are required to traverse the tree and print:
 * - "Node Pre" when visiting a node before its children.
 * - "Edge Pre" when moving from a parent to a child.
 * - "Edge Post" when returning from a child to a parent.
 * - "Node Post" when visiting a node after all its children.
 *
 * ------------------------------------------
 * INPUT FORMAT:
 * ------------------------------------------
 * An Euler Path Array (Pre-order with -1 for backtracking).
 * Example: [10, 20, -1, 30, 50, -1, 60, -1, -1, 40, -1, -1]
 
    10
  /  |  \
20   30   40
    /  \
  50   60

 * ------------------------------------------
 * OUTPUT FORMAT:
 * ------------------------------------------
 * Strings in the following style:
 * Node Pre 10
 * Edge Pre 10--20
 * Node Pre 20
 * Node Post 20
 * Edge Post 10--20
 * ... and so on.
 * ==========================================
 */

// root structure for reference (this is how the strcture of tree will look like after construction from input array - check-> 01.constructTree.js for tree construction from input array)
const root = {
  value: 10,
  children: [
    {
      value: 20,
      children: [],
    },
    {
      value: 30,
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
      value: 40,
      children: [],
    },
  ],
};

/**
 * Function to perform Pre and Post order traversals
 * @param {Node} node - The root of the tree
 */
function traversals(node) {
  // Your code here
  console.log(`Node Pre ${node.value}`);

  for (let child of node.children) {
    console.log(`Edge Pre ${node.value}--${child.value}`);
    traversals(child);
    console.log(`Edge Post ${node.value}--${child.value}`);
  }
  console.log(`Node Post ${node.value}`);
}

traversals(root);

/**
    NOTES: GENERIC TREE TRAVERSALS (EULER PATH)

    1. PRE-ORDER (Node Pre)
       - Processed when the function first hits the node.
       - Represents the LEFT side of the node in the Euler path.
       - Logic: Place statement before the children loop.

    2. POST-ORDER (Node Post)
       - Processed after all recursive calls for children are finished.
       - Represents the RIGHT side of the node in the Euler path.
       - Logic: Place statement after the children loop.

    3. EDGE MOVEMENTS
       - Edge Pre: Occurs specifically before entering a child's branch.
       - Edge Post: Occurs specifically after returning from a child's branch.

    4. KEY CHARACTERISTICS
       - Pre-order: Root is always the first node visited.
       - Post-order: Root is always the last node visited.
       - This follows the "Depth-First" recursion pattern.
*/
