import { runner } from './utils.js';
import Heap from 'heap';

const top = (x, y) => x - 1 >= 0 ? [x - 1, y] : null
const down = (x, y, size) => x + 1 < size ? [x + 1, y] : null
const right = (x, y, size) => y + 1 < size ? [x, y + 1] : null;
const left = (x, y) => y - 1 >= 0 ? [x, y - 1] : null;

const getNeighbours = (x, y, size) => [
  top(x, y),
  down(x, y, size),
  right(x, y, size),
  left(x, y),
].filter(Boolean);

function dijkstra(matrix) {
  const size = matrix.length;
  const visited = Array(size).fill().map(() => Array(size).fill(false));
  const queue = new Heap((a, b) => a[2] - b[2]);

  queue.push([0, 0, 0]);

  while (!queue.empty()) {
    const [x, y, risk] = queue.pop();

    if (x === size - 1 && y === size - 1) {
      return risk;
    }
    visited[x][y] = true;

    const neighbours = getNeighbours(x, y, size);
    for (const [x1, y1] of neighbours) {
      if (!visited[x1][y1]) {
        queue.push([x1, y1, risk + matrix[x1][y1]]);
      }
    }
  }

  throw new Error('Path not found');
}

const key = (x, y) => `${x},${y}`;

function astar(matrix) {
  const size = matrix.length;
  const open = new Heap((a, b) => a.f - b.f);
  const openMap = new Map();
  const closed = new Set();

  open.push({ x: 0, y: 0, f: 0, g: 0, h: 0 });
  openMap.set(key(0, 0), 0);

  while (!open.empty()) {
    const node = open.pop();
    closed.add(key(node.x, node.y));

    if (node.x === size - 1 && node.y === size - 1) {
      return node.g;
    }

    const neighbours = getNeighbours(node.x, node.y, size);

    for (const neighbour of neighbours) {
      const childNode = { x: neighbour[0], y: neighbour[1] };
      const childKey = key(childNode.x, childNode.y);
      if (!closed.has(childKey)) {
        childNode.g = node.g + matrix[childNode.x][childNode.y];
        childNode.h = manhattan(childNode, { x: size - 1, y: size - 1 });
        childNode.f = childNode.g + childNode.h

        const openNodeG = openMap.get(childKey) ?? Infinity;
        if (childNode.g <= openNodeG) {
          open.push(childNode);
          openMap.set(childKey, childNode.g);
        }
      }
    }
  }
}

function manhattan(current, goal) {
  return Math.abs(current.x - goal.x) + Math.abs(current.y - goal.y);
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

  console.time('Find path in BIG graph');
  const result = astar(hugeMatrix);
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
});
