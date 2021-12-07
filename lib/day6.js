'use strict';

import { readFileSync } from 'fs';

function sum(lookup) {
  return lookup.reduce((sum, element) => sum + element);
}

function calculate(fishes, days) {
  let lookup = fishes.reduce((lookup, fish) => {
    lookup[fish] += 1;
    return lookup;
  }, Array(9).fill(0));

  for (let day = 0; day < days; day++) {
    lookup = lookup.reduce((lookup, nrOfFishes, timer) => {
      if (!timer) {
        lookup[6] = nrOfFishes;
        lookup[8] = nrOfFishes;
      } else {
        lookup[timer - 1] = lookup[timer - 1] + nrOfFishes;
      }
      return lookup;
    }, Array(8).fill(0));
  }

  return sum(lookup);
}

function task1(fishes) {
  return calculate(fishes, 80)
}

function task2(fishes) {
  return calculate(fishes, 256)
}

export default function () {
  const input = readFileSync('./data/day6.txt', 'utf8');
  const fishes = input.split(',').map(v => parseInt(v, 10));

  const task1Result = task1(fishes);
  const task2Result = task2(fishes);

  return `\n\n\t* task 1: ${task1Result}\n\t* task 2: ${task2Result}\n`;
}
