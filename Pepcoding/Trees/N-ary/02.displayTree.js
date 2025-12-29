/*
 * ==========================================
 * PROBLEM STATEMENT: Display a Generic Tree
 * ==========================================
 * 1. You are given the root of a Generic Tree.
 * 2. You are required to display the tree structure in
 * the following format:
 * NodeValue -> Child1, Child2, Child3, .
 * 3. Each node and its immediate children should be
 * printed on a new line.
 * 4. This process should be repeated recursively for
 * all nodes in the tree.
 *
 * ------------------------------------------
 * INPUT FORMAT:
 * ------------------------------------------
 * An Euler Path Array (Pre-order with -1 for backtracking).
 * Example: [10, 20, 50, -1, 60, -1, -1, 30, 70, -1, 80, 110, -1, 120, -1, -1, 90, -1, -1, 40, 100, -1, -1, -1]

       [10]
      /  |  \
    <-   |   ->
   /     |     \
 [20]   [30]   [40]
 /  \   / | \    |
50  60 70 80 90 [100]
        /  \
      110  120


 * ------------------------------------------
 * OUTPUT FORMAT:
 * ------------------------------------------
 * Multiple lines showing node-to-children mappings.
 * Example Output:
 * 10 -> 20, 30, 40, .
 * 20 -> 50, 60, .
 * 50 -> .
 * ... and so on for all nodes.
 * ==========================================
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

const getNodeRelationMapping = (node) => {
  let mappingPath = "";
  mappingPath += node.value + " ->";
  node.children.forEach((child) => {
    mappingPath += " " + child.value + ",";
  });
  mappingPath += " .";
  return mappingPath;
};

/**
 * Function to display the structure of a Generic Tree
 * @param {Node} node - The current node to display
 */
function display(node) {
  // Your code here
  console.log(getNodeRelationMapping(node));
  for (let child of node.children) {
    display(child);
  }
}

display(root);
