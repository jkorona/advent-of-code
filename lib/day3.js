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

function calculateRating(binaries, bitCriteria) {
  let filteredList = [...binaries];
  let currentIndex = 0;
  while(filteredList.length > 1) {
    const [zeros, ones] = filteredList.reduce((result, binary) => {
      result[parseInt(binary[currentIndex])] += 1;
      return result;
    }, [0, 0]);
    
    const pattern = bitCriteria(zeros, ones);
    filteredList = filteredList.filter((binary) => binary[currentIndex] === pattern);
    currentIndex++;
  }
  return parseInt(filteredList[0], 2);
}

function task2(binaries) {
  const oxygenGeneratorRating = calculateRating(binaries, (zeros, ones) => zeros > ones ? '0' : '1');
  const co2ScrubberRating = calculateRating(binaries, (zeros, ones) => ones < zeros ? '1' : '0');

  return oxygenGeneratorRating * co2ScrubberRating;
}

export default function () {
  const input = readFileSync('./data/day3.txt', 'utf8');
  const binaries = input.split(/\r?\n/).filter(Boolean);
  const task1Result = task1(binaries);
  const task2Result = task2(binaries);
  
  return `\n\n\t* task 1: ${task1Result}\n\t* task 2: ${task2Result}\n`;
}
