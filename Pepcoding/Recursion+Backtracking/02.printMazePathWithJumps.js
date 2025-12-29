/* person take either 1, 2 or 3 jumps either horizontally, vertically or digonally at a time
h1, h2, h3, d1, d2, d3, v1, v2, v3 - all possible paths
print all possible paths
*/
function printMazePathWithJumps(sr, sc, dr, dc, path = "") {
  if (sr === dr && sc === dc) {
    console.log(path);
    return;
  }

  for (let i = 1; i <= 3; i++) {
    if (sc + i <= dc) {
      printMazePathWithJumps(sr, sc + i, dr, dc, path + "h" + i);
    }
  }
  for (let i = 1; i <= 3; i++) {
    if (sr + i <= dr && sc + i <= dc) {
      printMazePathWithJumps(sr + i, sc + i, dr, dc, path + "d" + i);
    }
  }
  for (let i = 1; i <= 3; i++) {
    if (sr + i <= dr) {
      printMazePathWithJumps(sr + i, sc, dr, dc, path + "v" + i);
    }
  }
}

printMazePathWithJumps(1, 1, 3, 3);
