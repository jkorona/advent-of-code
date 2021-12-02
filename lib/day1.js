import { readFileSync } from 'fs';

export default function() {
  const input = readFileSync('./data/day1.txt', 'utf8');
  const numbers = input.split(/\r?\n/).map(number => parseInt(number, 10));
  
  let result = 0;
  numbers.reduce((prev, next) => {
    if(prev < next) result++;
    return next;
  });
  
  return result;
}
