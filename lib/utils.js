import { readFileSync } from 'fs';

export function runner(fn, day, sampleData = false) {
  return () => {
    if (!day || typeof day === 'boolean') {
      sampleData = day;
      day = process.argv[2];
    }
    const fileIndex = sampleData ? `${day}_1` : day;
    const input = readFileSync(`./data/day${fileIndex}.txt`, 'utf8');

    const [task1Result, task2Result] = fn(input);

    return `\n\n\t* task 1: ${task1Result}\n\t* task 2: ${task2Result}\n`;
  }
}
