/*
HTML Encoding String Problem

Problem Statement:
Given a string and an array of styles, return the HTML-encoded string by wrapping specified substrings with the given HTML tags.

Input:
- str: A string to be encoded.
- styleArr: An array of styles, where each style is represented as [from, to, tag]:
    - from: Start index (inclusive)
    - to: End index (exclusive)
    - tag: The HTML tag to wrap the substring (e.g., 'b', 'i', 'u')

Rules:
- Tags may overlap. In such cases, tags should be properly nested according to their positions.
- If multiple tags start or end at the same index, the order of insertion should maintain proper HTML nesting.

Example:
Input:
const str = 'Hello, world'; 
const styleArr = [[0, 2, 'i'], [4, 9, 'b'], [7, 10, 'u']];

Output: 
'<i>Hel</i>l<b>o, w<u>orl</u></b><u>d</u>'

Note:
- The <u> tag overlaps with the <b> tag, so <u> is placed inside <b> where their ranges overlap, and outside otherwise.
- The function should handle any number of overlapping or nested tags.

Constraints:
- 0 <= from < to <= str.length
- styleArr may contain any number of styles.
- Tags are valid HTML tags as strings.
*/
