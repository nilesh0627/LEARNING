# Tree Traversals: DFS vs BFS

---

## 1. Depth-First Search (DFS)

- **Behavior**: Explores as far as possible along each branch before backtracking.
- **Tree Context**: It visits a child and immediately dives into that child’s descendants. It only moves to the next sibling after the entire sub-tree of the first child is exhausted.
- **Traversals**:
  - **Pre-order**: Node is processed before its children.
  - **Post-order**: Node is processed after all its children.
- **Implementation**: Usually **Recursive** (utilizes the System Stack).

## 2. Breadth-First Search (BFS)

- **Behavior**: Also known as **Level-Order Traversal**.
- **Tree Context**: It visits all nodes at the current depth (level) before moving to any nodes at the next depth level.
- **Logic**: Visits all siblings first, then moves to the "grandchildren" level.
- **Implementation**: Usually **Iterative** (utilizes a **Queue** data structure).

---

## 3. Why the "Find" Function is DFS

The `find` function is a classic DFS implementation because of the recursive call stack:

```javascript
for (let child of node.children) {
  isFound = find(child, target); // Execution "pauses" here to go deep
  if (isFound) break; // Moves to next sibling ONLY after find(child) returns
}
```
