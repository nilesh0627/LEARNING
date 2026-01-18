/**
  NOTES: INTRODUCTION TO BINARY TREES

  1. THE TRANSITION
     Up until now, we studied Generic Trees where nodes have 'n' children.
     Binary Trees are a specific subset where the maximum limit is 2.

  2. CHILD VARIATIONS (The 0, 1, 2 Rule)
     - 0 Children: Leaves (like 40, 60, 25).
     - 1 Child:
        - Node 30: Has only a Left child (40).
        - Node 70: Has only a Right child (80).
     - 2 Children: Nodes with both Left and Right (like Root 50).

     VIDEO TREE DIAGRAM:
               50 (Root)
              /  \
            25    50
                 /  \
               30    70
              /        \
            40          80
           /  \        /  \
         null null   null null

  3. DATA STRUCTURE ARCHITECTURE
     Class Node:
        - int data: To store the value.
        - Node left: Reference to the left child.
        - Node right: Reference to the right child.
     Memory Logic:
        - If a child doesn't exist, the reference must be set to 'null'.
        - Unlike Generic Trees (ArrayList), we use fixed 'left' and 'right' variables.

  4. PRACTICAL USE: EXPRESSION TREES
     Visualizing (a + b) * c:
        - The root is the operator (*).
        - The left branch is a subtree for (a + b).
        - The right branch is the operand (c).
     
     DIAGRAM (a + b) * c:
            *
          /   \
         +     c
        / \
       a   b

     Visualizing a + (b * c):
        - The root is (+).
        - The left branch is (a).
        - The right branch is the subtree (b * c).
     
     DIAGRAM a + (b * c):
            +
          /   \
         a     *
              / \
             b   c

  5. LOGICAL REPRESENTATION
     - Positioning is critical: A "Left" child is logically different from a "Right" child.
     - This distinction is what allows us to represent math operations and BSTs.

  6. IMPLEMENTATION STEPS
     - Node Class: Define data, left, and right.
     - Constructor: Initialize data and set children to null.
     - Display: Print node alongside its specific left and right children.
*/
