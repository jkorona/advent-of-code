import { runner } from './utils.js';

function findAdjecents(grid, i, j) {
  const width = grid.length;
  const height = grid[i].length;

  return [
    [i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1],
    [i - 1, j - 1], [i - 1, j + 1], [i + 1, j - 1], [i + 1, j + 1]
  ].filter(([i, j]) => i > - 1 && i < width && j > -1 && j < height);
}

function flash(grid, i, j) {
  if (grid[i][j] !== 0) {
    grid[i][j] += 1;
  }
  if (grid[i][j] > 9) {
    grid[i][j] = 0;
    return 1 + findAdjecents(grid, i, j).reduce((sum, [i, j]) => sum + flash(grid, i, j), 0);
  }
  return 0;
}

function simulateStep(grid) {
  let flashes = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] += 1;
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] > 9) flashes += flash(grid, i, j);
    }
  }

  return flashes;
}

function displayGrid(grid) {
  grid.forEach(row => console.log(row.join('')));
}

function task1(grid, nrOfSteps) {
  let sum = 0;
  for (let step = 0; step < nrOfSteps; step++) {
    sum += simulateStep(grid);
  }
  return sum;
}

function task2(grid) {
  let step = 0;
  let flashes = 0;

  while (flashes !== 100) {
    flashes = simulateStep(grid);
    step++;
  }

  return step;
}


function createGrid(input) {
  return input.split(/\r?\n/).map(line => line.split('').map(v => parseInt(v, 10)))
}

export default runner((input) => {
  return [task1(createGrid(input), 100), task2(createGrid(input))];
}, 11, false);
