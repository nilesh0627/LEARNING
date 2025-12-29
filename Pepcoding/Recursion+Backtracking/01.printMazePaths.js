/*
Print Maze Paths Problem

Given a grid of size n x m, print all possible paths from the top-left cell (1, 1) to the bottom-right cell (n, m).
You can only move horizontally (right) or vertically (down) at each step.

Input:
- Start cell: (sr, sc) = (1, 1)
- Destination cell: (dr, dc) = (n, m)

Output:
- Print each valid path as a string, where:
    'h' represents a horizontal move (right)
    'v' represents a vertical move (down)

Example:
printMazePaths(1, 1, 3, 3);

Sample Output:
hhvv
hvhv
hvvh
vhhv
vhvh
vvhh

----------------------------------------------------------
Levels and Options (Recursion)

Level:
- Each recursive call represents a level in the decision tree.
- At each level, you are at a cell (sr, sc) in the grid.

Options:
- From each cell, you have up to 2 options:
    1. Move horizontally (right) if sc < dc ('h')
    2. Move vertically (down) if sr < dr ('v')

Recursion:
- For each valid option, make a recursive call to the next cell, adding the move to your path.
- This explores all possible paths from the current cell.

Base Case:
- If you reach the destination cell (sr === dr && sc === dc), print the path.

Summary of Approach:
1. Start at (1, 1) with an empty path.
2. At each cell (level):
    - If moving right is possible, go right (option 'h').
    - If moving down is possible, go down (option 'v').
3. When destination is reached, print the path.

This approach uses recursion to explore all possible paths, with each level representing a cell and each option representing a possible move.
*/
function printMazePaths(sr, sc, dr, dc, path = "") {
  if (sr === dr && sc === dc) {
    console.log(path);
  }
  if (sc < dc) {
    printMazePaths(sr, sc + 1, dr, dc, path + "h");
  }
  if (sr < dr) {
    printMazePaths(sr + 1, sc, dr, dc, path + "v");
  }
}

printMazePaths(1, 1, 3, 3);
