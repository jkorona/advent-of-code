import { runner } from './utils.js';

function findAdjacentLocations(matrix, i, j) {
  const up = matrix?.[i - 1]?.[j] ?? -1;
  const down = matrix?.[i + 1]?.[j] ?? -1;
  const left = matrix?.[i]?.[j - 1] ?? -1;
  const right = matrix?.[i]?.[j + 1] ?? -1;
  return [up, down, left, right].filter(v => v >= 0);
}

function task1(matrix) {
  const lowPoints = [];
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const value = row[j];
      const adjacentLocations = findAdjacentLocations(matrix, i, j);
      if (adjacentLocations.every(al => al > value)) {
        lowPoints.push(value);
      }
    }
  }
  return lowPoints.reduce((sum, lowPoint) => sum + lowPoint + 1, 0);
}

function task2(matrix) {
  return 0;
}

export default runner((input) => {
  const rows = input.split(/\r?\n/);
  const matrix = rows.map((row) => row.split('').map(v => parseInt(v)));

  return [task1(matrix), task2(matrix)];
}, 9)
