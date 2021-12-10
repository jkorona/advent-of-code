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

function outOfBoundary(map, i, j) {
  return i < 0 || j < 0 || i === map.length || j === map[i].length;
}

function exploreBasin(map, i, j) {
  if (outOfBoundary(map, i, j) || map[i][j][0] === 9 || map[i][j][1]) {
    return 0;
  }
  map[i][j][1] = true; // mark visited
  return 1 +
    exploreBasin(map, i + 1, j) + // down
    exploreBasin(map, i, j + 1) + // right
    exploreBasin(map, i, j - 1) + // left
    exploreBasin(map, i - 1, j); // bottom
}

function task2(matrix) {
  const map = matrix.map((row) => row.map(value => [value, false]));
  const basins = [];

  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    for (let j = 0; j < row.length; j++) {
      const [value, visited] = row[j];
      if (!visited && value !== 9) {
        basins.push(exploreBasin(map, i, j));
      }
    }
  }
  return basins.reduce((peaks, basin) => {
    if (basin > +peaks[0]) {
      return [basin, peaks[1], peaks[2]].sort((a, b) => a - b);
    }
    return peaks;
  }, [1, 1, 1]).reduce((a, b) => a * b);
}

export default runner((input) => {
  const rows = input.split(/\r?\n/);
  const matrix = rows.map((row) => row.split('').map(v => parseInt(v)));

  return [task1(matrix), task2(matrix)];
}, 9)
