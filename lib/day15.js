import { runner } from './utils.js';

class Graph {
  constructor(matrix) {
    this.matrix = matrix;
    this.size = matrix.length;
  }

  start() {
    return this.node(0, 0)
  }

  node(x, y) {
    const adjectives = [];
    if (x + 1 < this.size) {
      adjectives.push(this.node(x + 1, y));
    }
    if (y + 1 < this.size) {
      adjectives.push(this.node(x, y + 1));
    }
    return {
      value: this.matrix[x][y],
      adjectives,
      isEnd: adjectives.length === 0,
    }
  }

}

const key = (x, y) => `${x},${y}`;
const coords = (key) => key.split(',').map(v => parseInt(v, 10));
const down = (x, y, size) => x + 1 < size ? [x + 1, y] : null
const right = (x, y, size) => y + 1 < size ? [x, y + 1] : null;

function extractMin(risks, visited) {
  return Object.keys(risks).reduce((lowest, node) => {
    if (lowest === null || risks[node] < risks[lowest]) {
      if (!visited.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
}

function dijkstra(matrix) {
  const size = matrix.length;

  const risks = {
    [key(size - 1, size - 1, size)]: Infinity,
    [key(1, 0, size)]: matrix[1][0],
    [key(0, 1, size)]: matrix[0][1],
  };
  const predecessors = {
    [key(size - 1, size - 1, size)]: null,
    [key(0, 1, size)]: key(0, 0, size),
    [key(1, 0, size)]: key(0, 0, size),
  }
  const visited = [];

  let node = extractMin(risks, visited);
  while (node) {
    const risk = risks[node];
    const [x, y] = coords(node);
    const children = [down(x, y, size), right(x, y, size)].filter(Boolean);


    for (let child of children) {
      const newRisk = risk + matrix.get(...child);
      const name = key(child[0], child[1]);
      if (!risks[name]) {
        risks[name] = newRisk;
        predecessors[name] = node;
      }
      if (risks[name] > newRisk) {
        risks[name] = newRisk;
        predecessors[name] = node;
      }
    }

    visited.push(node);
    node = extractMin(risks, visited);
  }

  return risks[key(size - 1, size - 1)];
}

function task1(matrix) {
  return dijkstra(matrix);
}

export default runner((input) => {
  const lines = input.split(/\r?\n/).filter(Boolean);
  const matrix = lines.reduce((matrix, line) => {
    matrix.push(line.split('').map(v => parseInt(v, 10)));
    return matrix;
  }, []);
  matrix.get = function (x, y) { return this[x][y] };

  return [task1(matrix), 0];
});
