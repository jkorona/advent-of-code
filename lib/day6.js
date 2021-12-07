'use strict';

import { readFileSync } from 'fs';

function task1(fishes, days) {
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

function task2() {
  return 0;
}

export default function () {
  const input = readFileSync('./data/day6.txt', 'utf8');
  const fishes = input.split(',');

  const DAYS = 80;

  const task1Result = task1(fishes, DAYS);
  const task2Result = task2();

  return `\n\n\t* task 1: ${task1Result}\n\t* task 2: ${task2Result}\n`;
}
