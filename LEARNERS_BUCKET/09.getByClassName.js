/*
Implement getElementsByClassName

Problem Statement:
Write a function `getElementsByClassName(node, classNames)` that, given a DOM node and a string of space-separated class names, returns an array of all descendant elements (including the node itself) that contain **all** the specified class names.

Input:
- node: The root DOM node to start searching from.
- classNames: A string of space-separated class names to match.

Output:
- An array of DOM elements that contain all the specified class names.

Examples:
const node1 = new JSDOM(`
  <div class="foo bar baz">
    <span class="bar baz">Span</span>
    <p class="foo baz">Paragraph</p>
    <div class="foo bar"></div>
  </div>
`).window.document.body.children[0];

getElementsByClassName(node1, "foo bar");
// Returns: [<div class="foo bar baz">...</div>, <div class="foo bar"></div>]

const node2 = new JSDOM(`<div class="foo"></div>`).window.document.body.children[0];
getElementsByClassName(node2, "foo");
// Returns: [<div class="foo"></div>]

----------------------------------------------------------
Approach Explanation (Levels and Options):

Level:
- Each recursive call represents a level in the traversal tree.
- At each level, you are visiting a DOM node.

Options:
- For each node:
    1. Check if the node contains all the required class names.
        - If yes, add it to the result array.
    2. Traverse all child nodes recursively.

Recursion:
- For each child node, make a recursive call to continue the search.
- This explores all descendants of the root node.

Base Case:
- If the node has no children, return (end recursion for that branch).

Summary of Approach:
1. Start at the root node.
2. At each node (level):
    - Check if it matches all class names (option 1).
    - Recursively traverse each child (option 2).
3. Collect and return all matching nodes.

This approach uses recursion to traverse the DOM tree, with each level representing a node and each option representing a check or traversal to children.
*/
import { JSDOM } from "jsdom";

function getElementsByClassName(node, classNames) {
  const classList = classNames.split(" ").filter(Boolean);
  const res = [];
  function traverse(node) {
    const isMatch = classList.every((c) => node?.classList?.contains(c));
    if (isMatch) {
      res.push(node);
    }
    if (node?.children?.length === 0) return;
    for (let child of node?.children || []) {
      traverse(child);
    }
  }
  traverse(node);
  return res;
}

const node1 = new JSDOM(
  `<div class="foo bar baz">
    <span class="bar baz">Span</span>
    <p class="foo baz">Paragraph</p>
    <div class="foo bar"></div>
  </div>`
).window.document.body.children[0];

const elements1 = getElementsByClassName(node1, "foo bar");
for (const el of elements1) {
  console.log(el.outerHTML);
}
// [div.foo.bar.baz, div.foo.bar] <-- This is an array of elements.

console.log("*******************************************************");

const node2 = new JSDOM(`<div class="foo"></div>`).window.document.body
  .children[0];

const elements2 = getElementsByClassName(node2, "foo");

for (const el of elements2) {
  console.log(el.outerHTML);
}

// [div.foo] <-- This is an array of elements.
