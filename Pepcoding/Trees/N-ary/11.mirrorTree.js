/*
==========================================================================
PROBLEM STATEMENT: Mirror a Generic Tree
==========================================================================
1. You are given the root of a Generic Tree.
2. You are required to mirror the tree in-place.
3. Mirroring means for every node, the order of its children should be 
   reversed. Left-most child becomes right-most, and so on.

--------------------------------------------------------------------------
INPUT FORMAT:
--------------------------------------------------------------------------
A Node object representing the root of the Generic Tree.

--------------------------------------------------------------------------
OUTPUT FORMAT:
--------------------------------------------------------------------------
The function does not return anything; it modifies the tree in-place.
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

function reverse(root) {
  let start = 0,
    end = root.children.length - 1;
  while (start < end) {
    [root.children[start], root.children[end]] = [
      root.children[end],
      root.children[start],
    ];
    start++;
    end--;
  }
  return root;
}

/*
==========================================================================
MIRROR A GENERIC TREE - SOLUTION
==========================================================================
- Logic: Use recursion to reach the deepest nodes first (Post-order).
- Faith: Assume 'mirror(child)' will correctly mirror the child's subtree.
- Action: After children are mirrored, reverse the 'children' array of the 
  current node to complete its own mirroring.
*/
function mirror(root) {
  // Your code here
  for (let node of root.children) {
    mirror(node);
  }
  reverse(root);
  return root;
}

console.log(mirror(root));
