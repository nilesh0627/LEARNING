/* 
Problem Name: Path to Leaf From Root in Range

Problem Statement:
You are given the root node of a Binary Tree, a lower bound 'low', and an upper bound 'high'.

Your task is to find and print all paths from the Root to a Leaf node such that the sum of the node values in the path falls within the inclusive range [low, high].
- The path must start at the root and end at a leaf.
- A leaf is a node with no left and no right child.
- The output paths should be printed with node values separated by spaces.

Diagrammatic View:
Example Tree Structure:

          50
       /      \
     25        75
    /  \      /  \
  12   37   62    87
      /  \  / \
    30   40 60 70

Scenario: 
Range: [150, 250]

Explanation:
1. Path: 50 -> 25 -> 12. Sum = 87. (87 < 150). Reject.
2. Path: 50 -> 25 -> 37 -> 30. Sum = 142. (142 < 150). Reject.
3. Path: 50 -> 25 -> 37 -> 40. Sum = 152. (150 <= 152 <= 250). Accept.
4. Path: 50 -> 75 -> 62 -> 60. Sum = 247. (150 <= 247 <= 250). Accept.
5. Path: 50 -> 75 -> 62 -> 70. Sum = 257. (257 > 250). Reject.
6. Path: 50 -> 75 -> 87. Sum = 212. (150 <= 212 <= 250). Accept.

Result:
50 25 37 40
50 75 62 60
50 75 87
*/

/**
 * @param {Node} node - The root of the tree
 * @param {string} path - Accumulates the path string
 * @param {number} sum - Accumulates the sum of nodes
 * @param {number} low - Lower bound
 * @param {number} high - Upper bound
 */

const binaryTreeRoot = {
  data: 50,
  left: {
    data: 25,
    left: { data: 12, left: null, right: null },
    right: {
      data: 37,
      left: { data: 30, left: null, right: null },
      right: { data: 40, left: null, right: null },
    },
  },
  right: {
    data: 75,
    left: {
      data: 62,
      left: { data: 60, left: null, right: null },
      right: { data: 70, left: null, right: null },
    },
    right: { data: 87, left: null, right: null },
  },
};
function pathToLeafFromRoot(node, low, high, path = [], sum = 0) {
  // Write your code here
  if (!node) {
    return;
  }
  sum += node.data;
  path.push(node.data);
  pathToLeafFromRoot(node?.left, low, high, path, sum);
  pathToLeafFromRoot(node?.right, low, high, path, sum);

  //means it is a leaf
  if (!node?.left && !node?.right) {
    // within the range sum
    if (sum >= low && sum <= high) {
      console.log(path);
    }
  }
  sum -= node.data;
  path.pop();
}

pathToLeafFromRoot(binaryTreeRoot, 150, 250);

/*
--------------------------------------------------------------------------
THE "SMART" EXPLANATION (How your code actually runs):
--------------------------------------------------------------------------

1. THE "CARRY-FORWARD" STRATEGY:
   - Your code carries two things down the tree: an array (`path`) and a 
     number (`sum`). 
   - Because `path` is an array (Object), every function call shares the 
     SAME physical list. 
   - Because `sum` is a number (Primitive), every function call gets its 
     OWN private copy of the total.

2. LOGIC STEPS (The "Visit" Process):
   - **Step 1 (The Entry):** As soon as you enter a node, you claim it. 
     You add it to the path and add its value to your sum.
   - **Step 2 (The Exploration):** You dive deep into the left child, 
     then the right child.
   - **Step 3 (The Leaf Check):** Once the children are done, you check 
     if you are a "Leaf" (both sides null). If the sum is right, you 
     print the path.
   - **Step 4 (The Clean-up):** Before leaving the node to go back up 
     to the parent, you `pop()` the path. This "erases" your visit so 
     the parent's next branch starts with a clean slate.

3. INTUITIVE PATH TRACKING:
   - Imagine a traveler with a pencil and an eraser. 
   - Entry: Write your name on the list.
   - Move: Go to the next room.
   - Exit: Erase your name from the list.
   - This ensures the "list" always represents the direct line from the 
     root to where you are standing right now.

4. COMPLEXITY:
   - Time: O(N) - You visit every node once.
   - Space: O(H) - The 'path' array grows as deep as the tree height.

==========================================================================
*/
