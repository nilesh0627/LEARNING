/**
 * PROBLEM: String Abbreviations (Backtracking)
 * * 1. Problem Statement:
 * Given a string (e.g., "pep"), generate all possible abbreviations.
 * In an abbreviation, a substring of characters can be replaced by its length.
 * However, two adjacent numbers are NOT allowed (e.g., "p11" is wrong, it should be "p2").
 * * 2. Pepcoding Style Explanation:
 * * LEVEL: Each character of the string (index 0 to n-1).
 * OPTIONS: At every character, we have two choices:
 * a) Yes (Included): The character joins the path.
 * - If there was a pending 'count', it must be "settled" before the char.
 * b) No (Abbreviated): The character is skipped.
 * - We increment the 'count' to keep track of consecutive skips.
 * *
 * * 3. Why 'count'?
 * We use 'count' to avoid the "Adjacent Number Rule." Instead of adding "1"
 * repeatedly (which would result in "p11"), we carry a counter and only
 * print it when a character is finally included or we reach the end.
 * * 4. Expectation & Faith:
 * - Expectation: printAbbr(str, 0) will print all abbreviations.
 * - Faith: printAbbr(str, 1) knows how to handle the rest of the string.
 * - Link: We decide for str[0] (Include or Skip) and let Faith handle the rest.
 */

function printAbbreviations(str, path = "", index = 0, count = 0) {
  // BASE CASE (Reached the end of the levels)
  if (index === str.length) {
    // If we have a pending count, settle it at the end
    console.log(path + (count > 0 ? count : ""));
    return;
  }

  // OPTION 1: YES (Include character)
  // Rule: Must settle the count first, then add the char, then reset count to 0
  printAbbreviations(
    str,
    path + (count > 0 ? count : "") + str[index],
    index + 1,
    0
  );

  // OPTION 2: NO (Abbreviate character)
  // Rule: Don't add to path, just increase the pending count
  printAbbreviations(str, path, index + 1, count + 1);
}

printAbbreviations("pep");
// Output: pep, pe1, p1p, p2, 1ep, 1e1, 2p, 3
