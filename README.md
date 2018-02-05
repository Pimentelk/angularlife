##The Game of Life O(n²)

###Rules for the Game of Life

The neighbors of a given cell are the eight cells that touch it vertically, horizontally, or diagonally.

If a cell is alive  but either has no neighboring cells alive or only one alive, then in the next generation the cell dies  of loneliness.

If a cell is alive and has four or more neighboring cells also alive, then it the next generation the cell dies from overcrowding.

A living cell with either two or three living neighbors remains alive in the next generation.

If a cell is dead, then in the next generation it will become alive if it has exactly three neighboring cells, no more or fewer, that are already alive. All other dead cells remain dead in the next generation.

All births and deaths take place at exactly the same time, so that dying cells can help to give birth to another, but cannot prevent the death of others by reducing overcrowding; nor can cells being born either preserve or kill cells living in the previous generation.