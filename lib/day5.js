'use strict';

import { readFileSync } from 'fs';

function createArea(size) {
  return new Array(size).fill(0).map(() => Array(size).fill(0));
}

function printArea(area) {
  area.forEach((row) => console.log(row.join('')));
  console.log();
}

function drawLine(area, coords) {
  const [a, b] = coords;
  if (a[0] === b[0]) {
    for (let y = a[1]; y <= b[1]; y++) {
      area[y][a[0]] += 1;
    }
  } else { // a[1] === b[1]
    for (let x = a[0]; x <= b[0]; x++) {
      area[a[1]][x] += 1;
    }
  }
}

function filterLines(coords) {
  return coords.filter(([a, b]) => a[0] === b[0] || a[1] === b[1]);
}

function adjustLines(coords) {
  return coords.map(([a, b]) => {
    if (b[1] < a[1] || b[0] < a[0]) {
      return [b, a]
    }
    return [a, b];
  });
}

function task1(coords, areaSize) {
  const area = createArea(areaSize);
  adjustLines(filterLines(coords)).forEach(line => drawLine(area, line));

  return area.reduce((sum, row) => {
    return row.reduce((sum, cell) => {
      return cell > 1 ? sum + 1 : sum;
    }, sum);
  }, 0);
}

function task2(coords, areaSize) {
  const area = createArea(areaSize);

  coords = adjustLines(coords);
  console.log(coords);
  coords.forEach(line => drawLine(area, line));


  return area.reduce((sum, row) => {
    return row.reduce((sum, cell) => {
      return cell > 1 ? sum + 1 : sum;
    }, sum);
  }, 0);
}

export default function () {
  const input = readFileSync('./data/day5_1.txt', 'utf8');
  const lines = input.split(/\r?\n/);
  const coords = lines.map((line) => {
    const points = line.split(' -> ');
    return points.map((point) => {
      return point.split(',').map(point => parseInt(point, 10));
    });
  });

  const task1Result = 0;//task1(coords, 10);
  const task2Result = task2(coords, 10);

  return `\n\n\t* task 1: ${task1Result}\n\t* task 2: ${task2Result}\n`;
}
