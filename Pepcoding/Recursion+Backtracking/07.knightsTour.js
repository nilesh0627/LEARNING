/*
====================================================
PROBLEM: KNIGHT'S TOUR (BACKTRACKING)
====================================================

Given:
- An n x n chessboard
- A starting position (row, col)

Task:
- Move the knight such that it visits every cell of the board
  exactly once.
- Print ALL possible valid paths.
- Knight moves in an L-shape:
    (±2, ±1) or (±1, ±2)

This is a classic BACKTRACKING problem.


====================================================
CORE IDEA (PEPCODING STYLE THINKING)
====================================================

We think of the problem in terms of:
- LEVELS  → "Where am I placing the knight now?"
- OPTIONS → "From here, where can I go next?"

Each recursive call represents ONE LEVEL of the Euler Tree.


====================================================
LEVEL MEANING
====================================================

Level = number of cells already visited
      = path.length

So:
- Level 0  → no cells visited
- Level 1  → 1 cell visited
- ...
- Level n*n → all cells visited (solution level)


====================================================
OPTIONS AT EACH LEVEL
====================================================

From any (row, col), a knight has at most 8 options:

1. row - 2, col + 1   (top-right)
2. row - 1, col + 2   (right-top)
3. row + 1, col + 2   (right-bottom)
4. row + 2, col + 1   (bottom-right)
5. row + 2, col - 1   (bottom-left)
6. row + 1, col - 2   (left-bottom)
7. row - 1, col - 2   (left-top)
8. row - 2, col - 1   (top-left)

Each option creates a NEW branch in the Euler tree.


====================================================
REJECTION (INVALID STATE)
====================================================

Before accepting a level, we reject if:
- row or col goes outside the board
- OR the cell is already visited

This is equivalent to:
"Pruning invalid branches early in the Euler tree"


====================================================
CHOOSE STEP
====================================================

If the position is valid:
- Mark the cell as visited
- Add (row, col) to the path

This means:
"I am committing to this choice at this level"


====================================================
SUCCESS BASE CASE
====================================================

If:
- path.length === n * n

Then:
- We have successfully placed the knight on all cells
- This corresponds to reaching a LEAF NODE in the Euler tree
- Print the current path

IMPORTANT:
Even after success, we DO NOT stop the tree.
We backtrack to explore sibling branches.


====================================================
EXPLORATION (DFS ON EULER TREE)
====================================================

From the current level:
- Try all 8 knight move options
- Each recursive call moves us ONE LEVEL deeper
- This is a Depth-First Search traversal


====================================================
UNDO STEP (BACKTRACKING)
====================================================

After exploring all options:
- Unmark the current cell
- Remove it from the path

Meaning:
"I am undoing my choice and going back
 to try other options at the previous level"


====================================================
WHY THIS WORKS
====================================================

- Each path represents one root-to-leaf traversal
- Invalid paths are pruned early
- Valid full-length paths are printed
- Backtracking ensures ALL possibilities are explored


====================================================
IMPORTANT OBSERVATIONS
====================================================

1. Not all board sizes have solutions:
   - 1x1  → yes
   - 2x2  → no
   - 3x3  → no
   - 4x4  → no
   - 5x5+ → yes (some start positions)

2. If nothing prints:
   - It may mean NO valid tour exists
   - Not necessarily a bug

3. This follows the CLASSIC BACKTRACKING TEMPLATE:
   - Reject invalid state
   - Choose
   - Explore all options
   - Undo (backtrack)


====================================================
MENTAL MODEL (ONE LINE)
====================================================

"At each level, place the knight on a valid cell,
 try all 8 moves as options, and backtrack after exploration."

====================================================
*/

function knightsTour(n, row, col, matrix, path) {
  if (row < 0 || col < 0 || row > n - 1 || col > n - 1 || matrix[row][col])
    return;

  matrix[row][col] = true;
  path.push([row, col]);
  if (path.length === n * n) {
    console.log(path);
    matrix[row][col] = false;
    path.pop();
    return;
  }
  //move towards top-right
  knightsTour(n, row - 2, col + 1, matrix, path);
  knightsTour(n, row - 1, col + 2, matrix, path);

  //move towards bottom-right
  knightsTour(n, row + 1, col + 2, matrix, path);
  knightsTour(n, row + 2, col + 1, matrix, path);

  //move towards bottom-left
  knightsTour(n, row + 1, col - 2, matrix, path);
  knightsTour(n, row + 2, col - 1, matrix, path);

  // move towards top-left
  knightsTour(n, row - 2, col - 1, matrix, path);
  knightsTour(n, row - 1, col - 2, matrix, path);
  matrix[row][col] = false;
  path.pop();
}
const size = 5;
const matrix = Array.from({ length: size }, () => new Array(size).fill(false));
const rowPos = 2;
const colPos = 2;
knightsTour(size, rowPos, colPos, matrix, []);
