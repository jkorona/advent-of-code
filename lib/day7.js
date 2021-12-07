'use strict';

import { runner } from './utils.js';

function task1(positions) {
  const start = positions[0], end = positions[positions.length - 1];
  let minFuel = Number.MAX_VALUE;
  for (let number = start; number <= end; number++) {
    const fuel = positions.reduce((totalFuel, position) =>
      totalFuel + Math.max(position, number) - Math.min(position, number),
      0);
    if (minFuel > fuel) {
      minFuel = fuel;
    }
  }
  return minFuel;
}

function task2(positions) {
  const start = positions[0], end = positions[positions.length - 1];
  let minFuel = Number.MAX_VALUE;
  for (let number = start; number <= end; number++) {
    const fuel = positions.reduce((totalFuel, position) => {
      const steps = Math.max(position, number) - Math.min(position, number);
      const fuelConsumption = Array(steps).fill(0).reduce((sum, _ ,index) => sum + index + 1, 0);
      return totalFuel + fuelConsumption;
    }, 0);
    if (minFuel > fuel) {
      minFuel = fuel;
    }
  }
  return minFuel;
}

export default runner(function (input) {
  const positions = input.split(',').map(v => parseInt(v, 10)).sort((a, b) => a - b);
  return [task1(positions), task2(positions)]
}, 7, false);
