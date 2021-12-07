import { runner } from './utils.js';

function task1(input) {
  const numbers = input.split(/\r?\n/).map(number => parseInt(number, 10));
  
  let result = 0;
  numbers.reduce((prev, next) => {
    if(prev < next) result++;
    return next;
  });
  
  return result;
}

function task2(input) {
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


export default runner((input) => [task1(input), task2(input)], 1);
