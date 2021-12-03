'use strict';

import { readFileSync } from 'fs';

function task1(binaries) {
  const lookup = binaries.reduce((result, binary) => {
    return binary.split('').reduce((result, stringDigit, index) => {
      if (!result[index]) result.push([0, 0]);
      const digit = parseInt(stringDigit, 10);
      result[index][digit] += 1;
      return result;
    }, result)
  }, []);
  
  const [gamma, epsilon] = lookup.reduce(([gamma, epsilon], [zeros, ones]) => {
    const gammaDigit = zeros > ones ? '0' : '1';
    const epsilonDigit = zeros > ones ? '1' : '0';
    return [gamma + gammaDigit, epsilon + epsilonDigit];
  }, ['', '']);

  const gammaDec = parseInt(gamma, 2);
  const epsilonDec = parseInt(epsilon, 2);

  return gammaDec * epsilonDec;
}

export default function () {
  const input = readFileSync('./data/day3.txt', 'utf8');
  const binaries = input.split(/\r?\n/).filter(Boolean);
  const task1Result = task1(binaries);
  
  return `\n\n\t* task 1: ${task1Result}\n`;
}
