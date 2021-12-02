'use strict';

import { readFileSync } from 'fs';

export default function() {
  const input = readFileSync('./data/day1.txt', 'utf8');
  const numbers = input.split(/\r?\n/).map(number => parseInt(number, 10)).filter(number => !isNaN(number));

  const windows = [];
  for(let i = 2; i < numbers.length; i++) {
    windows.push(numbers[i] + numbers[i - 1] + numbers[i - 2]);
  }

  let result = 0;
  windows.reduce((prev, next) => {
    if(prev < next) result++;
    return next;
  });
  
  return result;
}
