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
      isEnd: adjectives.length === 0
    }
  }

}

function task1(matrix) {
  const graph = new Graph(matrix);


}

export default runner((input) => {
  const lines = input.split(/\r?\n/).filter(Boolean);
  const matrix = lines.reduce((matrix, line) => {
    matrix.push(line.split('').map(v => parseInt(v, 10)));
    return matrix;
  }, []);

  return [task1(matrix), 0];
}, true);
