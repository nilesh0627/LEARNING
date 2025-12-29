/*
        [10]
      /  |  \
    <-   |   ->
   /     |     \
 [20]   [30]   [40]
 /  \   / | \    |
50  60 70 80 90 [100]
        /  \
      110  120


Problem Statement: Generic Tree Constructor
You are given an array of integers representing the Pre-order Traversal of a Generic Tree (N-ary Tree) with a special marker (-1) used to denote that all children of the current node have been processed.

The task is to:
Construct the tree in memory using a Node class.
The Node class should contain a data value and a list/array of its children.
Understand the Euler path logic:
When you encounter a number, it represents a new node.
When you encounter -1, it represents a backtrack (moving back to the parent because the current node's subtree is complete).

input: [10, 20, 50, -1, 60, -1, -1, 30, 70, -1, 80, 110, -1, 120, -1, -1, 90, -1, -1, 40, 100, -1, -1, -1]
*/

class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

function constructTree(list) {
  let root = null,
    stack = [];
  for (let num of list) {
    if (num === -1) stack.pop();
    else {
      const node = new Node(num);
      if (stack.length === 0) {
        root = node;
      } else {
        const currentParentNode = stack[stack.length - 1];
        currentParentNode.children.push(node);
      }
      stack.push(node);
    }
  }
  return root;
}

console.log(
  constructTree([
    10, 20, 50, -1, 60, -1, -1, 30, 70, -1, 80, 110, -1, 120, -1, -1, 90, -1,
    -1, 40, 100, -1, -1, -1,
  ])
);
