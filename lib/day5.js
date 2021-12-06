'use strict';

import { readFileSync } from 'fs';

function createArea(size) {
  return new Array(size).fill(0).map(() => Array(size).fill(0));
}

function printArea(area) {
  area.forEach((row) => console.log(row.join('')));
  console.log();
}

function range(start, end) {
  const range = [];
  const step = start < end ? 1 : -1;
  for (let value = start; value !== end; value += step) range.push(value);
  return [...range, end];
}

function drawLine(area, coords) {
  const [[x1, y1], [x2, y2]] = coords;

  if (x1 === x2) {
    range(y1, y2).forEach(y => area[y][x1] += 1);
  } else if (y1 === y2) {
    range(x1, x2).forEach(x => area[y1][x] += 1);
  } else {
    const slope = (y1 - y2) / (x1 - x2);
    range(x1, x2).forEach((x) => {
      const y = (slope * x) - (slope * x1) + y1;
      area[y][x] += 1;
    });
  }
}

function filterLines(coords) {
  return coords.filter(([a, b]) => a[0] === b[0] || a[1] === b[1]);
}

function task1(coords, areaSize) {
  const area = createArea(areaSize);
  filterLines(coords).forEach(line => drawLine(area, line));

  return area.reduce((sum, row) => {
    return row.reduce((sum, cell) => {
      return cell > 1 ? sum + 1 : sum;
    }, sum);
  }, 0);
}

function task2(coords, areaSize) {
  const area = createArea(areaSize);
  coords.forEach(line => drawLine(area, line));

  return area.reduce((sum, row) => {
    return row.reduce((sum, cell) => {
      return cell > 1 ? sum + 1 : sum;
    }, sum);
  }, 0);
}

export default function () {
  const input = readFileSync('./data/day5.txt', 'utf8');
  const lines = input.split(/\r?\n/);
  const coords = lines.map((line) => {
    const points = line.split(' -> ');
    return points.map((point) => {
      return point.split(',').map(point => parseInt(point, 10));
    });
  });

  const task1Result = task1(coords, 1000);
  const task2Result = task2(coords, 1000);

  return `\n\n\t* task 1: ${task1Result}\n\t* task 2: ${task2Result}\n`;
}
