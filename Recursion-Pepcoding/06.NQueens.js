/*
N-Queens Problem

Problem Description:
Given an integer n, print all possible ways to place n queens on an n x n chessboard such that no two queens threaten each other.
A queen can attack any other queen in the same row, column, or diagonal.

Input:
- n: Size of the chessboard (number of queens to place)

Output:
- Print each valid arrangement as an array of strings, where:
    - Each string represents a row of the chessboard
    - 'Q' marks a queen, '.' marks an empty cell

Example (n = 4):
[
  ".Q..",
  "...Q",
  "Q...",
  "..Q."
]
[
  "..Q.",
  "Q...",
  "...Q",
  ".Q.."
]

----------------------------------------------------------
Approach Explanation (Levels and Options):

Level:
- Each recursive call represents a level in the recursion tree.
- At each level, you are placing a queen in a specific row (currRow).

Options:
- For each row, you have n options (columns 0 to n-1):
    1. Try to place a queen at (currRow, col) if it is safe (not attacked by any previously placed queen).
    2. If safe, place the queen and move to the next row (currRow + 1).

Recursion:
- For each valid option (safe column), make a recursive call to place the next queen in the next row.
- This explores all possible placements for the queens.

Backtracking:
- After exploring a placement, remove the queen (reset cell to '.') before trying the next option in the same row.
- This ensures all configurations are explored.

Base Case:
- If currRow === n (all queens placed), print the current board configuration (path).

Summary of Approach:
1. Start at row 0 with an empty board.
2. At each row (level):
    - Try placing a queen in each column (option), if safe.
    - For each safe placement, recurse to the next row.
    - Backtrack after each attempt.
3. When all queens are placed, print the arrangement.

This approach uses recursion and backtracking to explore all valid queen placements, with each level representing a row and each option representing a column choice for the queen.
*/
const getPath = (n, col) => {
  return Array.from({ length: n }, (_, i) => (i === col ? "Q" : ".")).join("");
};

// check column and diagonals (left and right)
function isQueenSafe(matrix, row, col) {
  // check all the columns above the row
  for (let i = 0; i < row; i++) {
    if (matrix?.[i]?.[col] === "Q") return false;
  }

  // check diagonals (left->right)
  let i = row - 1,
    j = col - 1;
  while (i >= 0 && j >= 0) {
    if (matrix[i][j] === "Q") return false;
    i--;
    j--;
  }
  // check diagonals (right->left)
  // reset i and j for right->left
  (i = row - 1), (j = col + 1);
  while (i >= 0 && j < matrix.length) {
    if (matrix?.[i]?.[j] === "Q") return false;
    i--;
    j++;
  }
  return true;
}

function getNQueensPaths(n, currRow, path, matrix) {
  if (currRow === n) {
    console.log(path);
    return;
  }
  for (let i = 0; i < n; i++) {
    if (isQueenSafe(matrix, currRow, i)) {
      matrix[currRow][i] = "Q";
      getNQueensPaths(n, currRow + 1, [...path, getPath(n, i)], matrix);
      matrix[currRow][i] = ".";
    }
  }
}
const matrixSize = 5;
getNQueensPaths(
  matrixSize,
  0,
  [],
  Array.from({ length: matrixSize }, () => new Array(matrixSize).fill("."))
);
