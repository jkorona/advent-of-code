import { runner } from './utils.js';

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

function stupidStepByStep(matrix, start) {
  const size = matrix.length;
  let position = start;
  let totalRisk = 0;
  let isEnd = start.every(coordinate => coordinate === size - 1);

  function findStepRisk(x, y) {
    const neighbours = [down(x, y, size), right(x, y, size)].filter(Boolean);

    const riskDown = neighbours.length > 0 ? matrix.get(...neighbours[0]) : Infinity;
    const riskRight = neighbours.length > 1 ? matrix.get(...neighbours[1]) : Infinity;

    if (riskDown < riskRight) {
      return [riskDown, neighbours[0]];
    } else if (riskDown > riskRight) {
      return [riskRight, neighbours[1]];
    } else { // are equal
      const totalRiskDown = findStepRisk(...neighbours[0]);
      const totalRiskRight = findStepRisk(...neighbours[1]);
      return (totalRiskDown < totalRiskRight) ?
        [riskDown, neighbours[0]] :
        [riskRight, neighbours[1]];
    }
  }

  while (!isEnd) {
    const [stepRisk, nextPosition] = findStepRisk(...position);
    totalRisk += stepRisk;
    position = nextPosition

    isEnd = position.every(coordinate => coordinate === size - 1);
  }

  return totalRisk;
}

function task1(matrix) {
  return dijkstra(matrix);
}

function task2(matrix) {
  const size = matrix.length;
  let totalRisk = 0;
  let position = [0, 0];
  let isEnd = false;

  while (!isEnd) {
    const [x, y] = position;
    const neighbours = [down(x, y, size), right(x, y, size)].filter(Boolean);

    const riskDown = neighbours.length > 0 ? stupidStepByStep(matrix, neighbours[0]) : Infinity;
    const riskRight = neighbours.length > 1 ? stupidStepByStep(matrix, neighbours[1]) : Infinity;
    
    if (riskDown > riskRight) {
      position = neighbours[1];
    } else {
      position = neighbours[0];
    } // also handle equal values
    
    totalRisk += matrix.get(...position);
    isEnd = position.every(coordinate => coordinate === size - 1);
  }

  return totalRisk;
}

export default runner((input) => {
  const lines = input.split(/\r?\n/).filter(Boolean);
  const matrix = lines.reduce((matrix, line) => {
    matrix.push(line.split('').map(v => parseInt(v, 10)));
    return matrix;
  }, []);
  matrix.get = function (x, y) { return this[x][y] };

  return [task1(matrix), task2(matrix)];
}, true);
