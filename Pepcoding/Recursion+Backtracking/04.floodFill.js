/* Flood Fill Paths Problem

Given a 2D grid (matrix) consisting of 0s (open cells) and 1s (blocked cells), find and print all possible paths from the top-left cell (0, 0) to the bottom-right cell (n-1, m-1). You can move up, left, down, or right at each step, but you cannot move into blocked cells or revisit any cell in the same path.

Input:
A 2D array matrix of size n x m containing 0s and 1s.
Output:
Print each valid path as a string, where each character represents a move:
't' for up
'l' for left
'd' for down
'r' for right
Constraints:

You cannot move outside the grid.
You cannot move into cells with value 1.
You cannot revisit any cell in the same path.
Example:

Sample Output:
(Each line is a valid path from (0,0) to (2,2))
*/

const matrix = [
  [0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 1, 1, 1, 0],
  [1, 0, 1, 1, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0],
];
function floodFill(matrix, sr, sc, path, visited) {
  if (
    sr < 0 ||
    sc < 0 ||
    sr === matrix.length ||
    sc === matrix[0].length ||
    matrix[sr][sc] === 1 ||
    visited[sr][sc] === true
  ) {
    return;
  }
  if (sr === matrix.length - 1 && sc === matrix[0].length - 1) {
    console.log(path);
    return;
  }
  visited[sr][sc] = true;
  floodFill(matrix, sr - 1, sc, path + "t", visited); // moved top
  floodFill(matrix, sr, sc - 1, path + "l", visited); // moved left
  floodFill(matrix, sr + 1, sc, path + "d", visited); // moved down
  floodFill(matrix, sr, sc + 1, path + "r", visited); // moved right
  visited[sr][sc] = false;
}
let visited = Array.from({ length: matrix.length }, () =>
  new Array(matrix[0].length).fill(false)
);
floodFill(matrix, 0, 0, "", visited);

/*
Flood Fill Paths Problem

Given a 2D grid (matrix) consisting of 0s (open cells) and 1s (blocked cells), 
find and print all possible paths from the top-left cell (0, 0) to the bottom-right cell (n-1, m-1). 
You can move up, left, down, or right at each step, but you cannot move into blocked cells or revisit any cell in the same path.

Input:
- A 2D array 'matrix' of size n x m containing 0s and 1s.

Output:
- Print each valid path as a string, where each character represents a move:
    't' for up
    'l' for left
    'd' for down
    'r' for right

Constraints:
- You cannot move outside the grid.
- You cannot move into cells with value 1.
- You cannot revisit any cell in the same path.

Example:
const matrix = [
  [0, 1, 0],
  [0, 0, 0],
  [1, 0, 0]
];

Sample Output:
ddrr
drdr
rdrr
rdrd
(Each line is a valid path from (0,0) to (2,2))

----------------------------------------------------------
Levels and Options (Recursion & Backtracking)

Level:
- Each recursive call represents a level in your decision tree.
- At each level, you are at a cell (sr, sc) in the grid.

Options:
- From each cell, you have up to 4 options (moves):
    Move top ('t')
    Move left ('l')
    Move down ('d')
    Move right ('r')
- You can only choose an option if:
    - The next cell is inside the grid.
    - The next cell is not blocked (matrix[sr][sc] !== 1).
    - The next cell is not already visited in the current path.

Recursion:
- For each valid option, you make a recursive call to the next cell, adding the move to your path.
- This explores all possible paths from the current cell.

Backtracking:
- Before exploring options, mark the current cell as visited (visited[sr][sc] = true).
- After all options are explored, unmark the cell (visited[sr][sc] = false) so it can be used in other paths.
- This ensures you don’t revisit cells in the same path, but allow them in other paths.

Base Cases:
- Invalid Move: If out of bounds, blocked, or already visited, return immediately.
- Destination Reached: If at the bottom-right cell, print the path.

Summary of Code Flow:
1. Start at (0, 0) with an empty path.
2. At each cell (level):
    - Try all 4 directions (options).
    - For each valid move, go deeper (next level).
3. If destination reached: Print the path.
4. Backtrack: Unmark the cell before returning to previous level.

This is classic recursion + backtracking:
- Levels: Each cell you visit.
- Options: Each direction you can move.
- Backtracking: Unmarking visited cells after exploring all options.


/*
Euler Tree for Flood Fill Recursion

At each cell (sr, sc), the recursion explores all 4 directions.
The Euler Tree visualizes entering and exiting each cell as the recursion proceeds.

Example for a 2x2 grid:

Start at (0,0)
|
|-- Move Down to (1,0)
|   |
|   |-- Move Right to (1,1) [Destination]
|   |
|   |-- Backtrack to (1,0)
|
|-- Move Right to (0,1)
|   |
|   |-- Move Down to (1,1) [Destination]
|   |
|   |-- Backtrack to (0,1)
|
|-- Backtrack to (0,0)

General Euler Tree Structure:
- Each node represents a cell (sr, sc).
- Each branch represents a move (t, l, d, r).
- Leaf nodes are either base cases (invalid move) or destination reached.
- Backtracking occurs after all options are explored.

Visualization:
(sr, sc)
|
|-- t: (sr-1, sc)
|-- l: (sr, sc-1)
|-- d: (sr+1, sc)
|-- r: (sr, sc+1)
|
|-- Backtrack to (sr, sc)

This tree helps you understand:
- The order in which recursion explores cells.
- How backtracking returns control after exploring all options.
- How paths are constructed and printed at the

*/
