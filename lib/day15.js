import { PriorityQueue, runner } from './utils.js';

const down = (x, y, size) => x + 1 < size ? [x + 1, y] : null
const right = (x, y, size) => y + 1 < size ? [x, y + 1] : null;

function dijkstra(matrix) {
  const size = matrix.length;
  const visited = Array(size).fill().map(() => Array(size).fill(false));
  const queue = new PriorityQueue((a, b) => a[2] - b[2]);
  
  queue.insert([0, 0, 0]);

  while(!queue.empty()) {    
    const [x, y, risk] = queue.min();

    if (x === size - 1 && y === size - 1) {
      return risk;
    }
    visited[x][y] = true;

    const neighbours = [right(x, y, size), down(x, y, size)].filter(Boolean);
    for (const [x1, y1] of neighbours) {
      if (!visited[x1][y1]) {

        queue.insert([x1, y1, risk + matrix[x1][y1]]);
      }
    }
  }

  throw new Error('Path not found');
}

function task1(matrix) {
  console.time('Find path in SMALLER graph');
  const result = dijkstra(matrix);
  console.timeEnd('Find path in SMALLER graph');
  return result;
}

function task2(matrix) {
  const size = matrix.length;
  const hugeMatrix = Array(size * 5)
    .fill([])
    .map(() => Array(size * 5).fill(0))
    .reduce((result, row, i) => {
      const vshift = ~~(i / size);
      return [
        ...result,
        row.reduce((row, value, j) => {
          const [x, y] = [i, j].map((coord) => coord % size);
          const hshift = ~~(j / size);
          const newValue = (matrix[x][y] + vshift + hshift);
          return [...row, newValue > 9 ? newValue - 9 : newValue];
        }, [])
      ]
    }, []);

  // hugeMatrix.forEach(row => console.log(row.join(' ')))

  console.time('Find path in BIG graph');
  const result =  dijkstra(hugeMatrix);
  console.timeEnd('Find path in BIG graph');

  return result;
}

export default runner((input) => {
  const lines = input.split(/\r?\n/).filter(Boolean);
  const matrix = lines.reduce((matrix, line) => {
    matrix.push(line.split('').map(v => parseInt(v, 10)));
    return matrix;
  }, []);

  return [task1(matrix), task2(matrix)];
}, true);
