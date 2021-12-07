'use strict';

import { readFileSync } from 'fs';

function calculate(fishes, days) {
  let state = [...fishes];

  for (let day = 0; day < days; day++) {
    state = state.reduce((newState, fish) => {
      if (!fish) {
        newState.push(6, 8);
      } else {
        newState.push(fish - 1);
      }
      return newState;
    }, []);
  }

  return state.length;
}

function task1(fishes) {
  return calculate(fishes, 80)
}

function task2(fishes) {
  return calculate(fishes, 256)
}

export default function () {
  const input = readFileSync('./data/day6_1.txt', 'utf8');
  const fishes = input.split(',');

  const task1Result = task1(fishes);
  const task2Result = task2(fishes);

  return `\n\n\t* task 1: ${task1Result}\n\t* task 2: ${task2Result}\n`;
}
