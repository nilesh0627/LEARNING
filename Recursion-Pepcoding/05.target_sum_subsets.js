/*
Target Sum Subsets Problem

Problem Description:
Given an array of integers and a target sum, print all subsets of the array whose elements sum up to the target value.

Input:
- arr: Array of integers
- target: Target sum value

Output:
- Print each subset (as an array) whose sum equals the target.

Example:
printSubsetsTargetSum([20, 10, 30, 40], 50);

Sample Output:
[20, 30]
[10, 40]

----------------------------------------------------------
Approach Explanation (Levels and Options):

Level:
- Each recursive call represents a level in the recursion tree.
- At each level, you decide for the current index whether to include or exclude the element.

Options:
- For each element at index:
    1. Include the element in the current subset (add to currList and currSum).
    2. Exclude the element from the current subset (do not add to currList or currSum).

Recursion:
- For each option, make a recursive call to the next index.
- This explores all possible subsets of the array.

Base Case:
- If index === arr.length:
    - If currSum === target, print currList (valid subset).
    - Otherwise, return.

Summary of Approach:
1. Start at index 0 with an empty subset and sum 0.
2. At each level (element):
    - Option 1: Include the element and recurse.
    - Option 2: Exclude the element and recurse.
3. When all elements are processed, print the subset if its sum matches the target.

This approach uses recursion to explore all subset combinations, with each level representing a decision for one element and each option representing inclusion or exclusion.
*/
function printSubsetsTargetSum(
  arr,
  target,
  index = 0,
  currList = [],
  currSum = 0
) {
  if (index === arr.length) {
    if (currSum === target) {
      console.log(currList);
    }
    return;
  }
  printSubsetsTargetSum(
    arr,
    target,
    index + 1,
    [...currList, arr[index]],
    currSum + arr[index]
  );
  printSubsetsTargetSum(arr, target, index + 1, [...currList], currSum);
}

printSubsetsTargetSum([20, 10, 30, 40], 50);
