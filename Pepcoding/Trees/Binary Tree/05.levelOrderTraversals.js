/*
==========================================================================
PROBLEM: Level Order Traversal of a Binary Tree
==========================================================================
TASK: 
  Print the Binary Tree level by level (Breadth-First Search).
  Each level should be printed on a new line, and nodes within 
  each level should be printed from left to right.

INPUT:
  - node: Root of the Binary Tree

OUTPUT:
  - Nodes printed line by line according to their level.

--------------------------------------------------------------------------
DIAGRAMMATIC VIEW (Example Input & Output):
--------------------------------------------------------------------------

VISUAL REPRESENTATION OF INPUT:
                   [ 50 ]              <-- Level 0
                /          \
            [ 25 ]        [ 75 ]       <-- Level 1
           /      \      /      \
        [ 12 ]  [ 37 ] [ 62 ]  [ 87 ]  <-- Level 2

EXPECTED OUTPUT:
50 
25 75 
12 37 62 87 

Logic Hint:
1. Use a Queue data structure (FIFO - First In First Out).
2. Strategy (Remove, Print, Add):
   - Remove a node from the front of the queue.
   - Print the node's data.
   - Add its children (Left then Right) to the back of the queue.
3. For Line Breaks:
   - Use two queues (main and helper).
   - Or count the nodes in the current level before starting the loop.
==========================================================================
*/

const binaryTreeRoot = {
  data: 50,
  left: {
    data: 25,
    left: { data: 12, left: null, right: null },
    right: { data: 37, left: null, right: null },
  },
  right: {
    data: 75,
    left: { data: 62, left: null, right: null },
    right: { data: 87, left: null, right: null },
  },
};

/*
--------------------------------------------------------------------------
FUNCTION DEFINITION:
--------------------------------------------------------------------------
*/

function levelOrder(node) {
  // Your code here
  let pq = [],
    res = [[]];
  pq.push(node);
  while (pq.length > 0) {
    let count = pq.length;
    for (let i = 0; i < count; i++) {
      const curr = pq.shift();
      res[res.length - 1].push(curr.data);
      if (curr.left) pq.push(curr.left);
      if (curr.right) pq.push(curr.right);
    }
    if (pq.length > 0) res.push([]);
  }
  return res;
}

console.log(levelOrder(binaryTreeRoot));

/*
--------------------------------------------------------------------------
LOGIC COMPARISON TABLE: DEPTH VS BREADTH
--------------------------------------------------------------------------

| Feature           | Pre/In/Post Order (DFS)     | Level Order (BFS)           |
|-------------------|-----------------------------|-----------------------------|
| **Data Structure**| Recursion Stack             | Queue                       |
| **Travel Pattern**| Deep into one branch first  | Wide across levels first    |
| **Sumeet's Logic**| Euler Tour (Ant's path)     | RPA (Remove, Print, Add)    |
| **Complexity** | O(N) Time, O(H) Space       | O(N) Time, O(W) Space       |
--------------------------------------------------------------------------
==========================================================================
EXPLANATION: Level Order Traversal (BFS)
==========================================================================

1. THE RPA CYCLE (Remove, Print, Add):
   - Remove the front node from the Queue.
   - Print (or store) its data.
   - Add its children to the back of the Queue.

2. LINE-BY-LINE LOGIC:
   By freezing the 'count' (queue.length) at the start of each level:
   - We process only the nodes that were already there.
   - Children added during the process wait for the next 'count' cycle.

3. COMPARISON WITH DFS:
   - DFS (Pre/In/Post): Goes deep. Uses a Stack.
   - BFS (Level Order): Goes wide. Uses a Queue.

--------------------------------------------------------------------------
FINAL OUTPUT STRUCTURE:
--------------------------------------------------------------------------
Level 0: [50]
Level 1: [25, 75]
Level 2: [12, 37, 62, 87]
==========================================================================
*/
