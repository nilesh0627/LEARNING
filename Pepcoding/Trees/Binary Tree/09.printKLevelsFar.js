/*
==========================================================================
HEADER: Print Nodes K Level Far
==========================================================================
SUMMARY: 
  Given a Binary Tree, a target 'node' value, and a distance 'k', the 
  goal is to print all nodes that are exactly 'k' distance away from 
  the target node. These nodes can be in the subtree of the target 
  OR above it in the tree (requiring a traversal through the root).
/*
--------------------------------------------------------------------------
PRACTICE SKELETON:
--------------------------------------------------------------------------

function printKNodesFar(node, targetData, k) {
  // 1. First, find the 'Node to Root Path' for the target data.
  // 2. Iterate through the path (nodes representing target, parent, grandparent, etc.).
  // 3. For each node in the path:
  //    - If it's the target (index 0), print its K levels down.
  //    - If it's an ancestor at distance 'i', print its (K-i) levels down.
  //    - IMPORTANT: Avoid re-entering the subtree you just came from.
}

function printKLevelsDown(node, k, blocker) {
  // Utility function used by printKNodesFar
  // 1. Base case: null or k < 0 or node == blocker.
  // 2. If k == 0: Print node.
  // 3. Recurse left and right with k-1.
}
--------------------------------------------------------------------------
VISUAL REPRESENTATION:
--------------------------------------------------------------------------

                    [ 50 ]                        <-- Root (Level 0)
                 /          \
             [ 25 ]        [ 75 ]                 <-- Level 1
            /      \      /      \
         [ 12 ]  [ 37 ] [ 62 ]  [ 87 ]            <-- Level 2
                 /    \      \
              [ 30 ] [ 40 ] [ 70 ]                <-- Level 3


VISUAL LOGIC:
Target Node: 37, k=2
Path to Root: [37, 25, 50]

1. From 37: Print 2 levels down.
2. From 25 (dist=1): Print (2-1 = 1) level down, but DON'T go towards 37.
3. From 50 (dist=2): Print (2-2 = 0) level down, but DON'T go towards 25.

[Image showing nodes k-distance away both below the target and via the parent/root]

--------------------------------------------------------------------------
THE "SMART" EXPLANATION (Sumeet Sir's Logic):
--------------------------------------------------------------------------

1. THE FAITH VS. EXPECTATION:
   - **Expectation**: To find nodes 'k' distance away, we look both down 
     (subtrees) and up (ancestors and their other subtrees).
   - **Faith**: We use the `nodeToRootPath` to find ancestors and then 
     re-use our `printKLevelsDown` function to find nodes in the 
     "opposite" branches.

2. THE BLOCKER CONCEPT:
   - When moving from an ancestor (like 25) to find nodes at distance `k-i`, 
     we must not go back into the subtree containing the target (37). 
     We pass the previous node in the path as a "blocker" to stop recursion.

3. COMPLEXITY:
   - **Time**: $O(N)$ - Path finding is $O(N)$ and printing levels is $O(N)$.
   - **Space**: $O(N)$ - To store the path and recursion stack.


/*
--------------------------------------------------------------------------
FUNCTION DEFINITION:
--------------------------------------------------------------------------
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
      left: null,
      right: { data: 70, left: null, right: null },
    },
    right: { data: 87, left: null, right: null },
  },
};

function printKLevelsDown(node, k, blocker) {
  if (k < 0 || !node || node === blocker) return;
  if (k === 0) {
    console.log(node?.data);
    return;
  }
  printKLevelsDown(node?.left, k - 1, blocker);
  printKLevelsDown(node?.right, k - 1, blocker);
}

function nodetoRootPath(node, target) {
  if (node.data === target) return [node];
  if (node.left) {
    const lPath = nodetoRootPath(node.left, target);
    if (lPath.length > 0) return [...lPath, node];
  }
  if (node.right) {
    const rPath = nodetoRootPath(node.right, target);
    if (rPath.length > 0) return [...rPath, node];
  }
  return [];
}

function printKNodesFar(node, targetData, k) {
  // Your code here
  const path = nodetoRootPath(node, targetData);
  let start = 0;
  while (start < path.length && k >= 0) {
    printKLevelsDown(path[start], k, start === 0 ? null : path[start - 1]);
    k -= 1;
    start += 1;
  }
}

printKNodesFar(binaryTreeRoot, 75, 2);

/*
--------------------------------------------------------------------------
THE "SMART" EXPLANATION (Sumeet Sir's Logic):
--------------------------------------------------------------------------

1. THE OBSTACLE (Why recursion alone fails):
   - In a tree, we can easily go down (`node.left`, `node.right`), but we 
     cannot easily go UP because we don't have parent pointers.
   - **Problem**: Finding nodes 'k' distance away means checking both 
     descendants (down) and ancestors (up/sideways).

2. THE STRATEGY (Path + Blocker):
   - **Step 1: Node-to-Root Path**: Since we can't climb up, we calculate 
     the path from the target node to the root first. This gives us a 
     linear route "home" (e.g., `[75, 50, ...]` represents 
     Target -> Parent -> Grandparent).
   - **Step 2: Iterate & Decay**: We travel up this path.
     - At the Target (dist 0): Find nodes `k` down.
     - At Parent (dist 1): Find nodes `k-1` down.
     - At Grandparent (dist 2): Find nodes `k-2` down.

3. THE CRITICAL LOGIC (The "Blocker"):
   - When we stand at an ancestor (e.g., Node 50) and look down for nodes 
     at distance `k-1`, we must **not** go back towards the path we just 
     came from (Node 75).
   - **Solution**: We pass a `blocker` node to the `printKLevelsDown` function.
   - If `node == blocker`, we return immediately. This ensures we only 
     search the "other" side of the tree (unexplored branches).

4. COMPLEXITY:
   - **Time**: $O(N)$ - Finding the path takes $O(N)$, and printing takes 
     roughly $O(N)$ in the worst case (traversing the whole tree).
   - **Space**: $O(H)$ - For the recursion stack and storing the path list.

==========================================================================
*/
