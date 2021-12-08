import { runner } from './utils.js';



function task1(displays) {
  return displays.reduce((count, { outputValues }) => {
    return count + outputValues.reduce(
      (count, value) => [2, 3, 4, 7].includes(value.length) ? count + 1 : count, 0
    );
  }, 0)
}

export default runner((input) => {
  const lines = input.split(/\r?\n/).filter(Boolean);

  const displays = lines.map((line) => {
    let [uniqueSignalPatterns, outputValues] = line.split(' | ').map((element) => element.split(' '));
    return { uniqueSignalPatterns, outputValues };
  });

  return [task1(displays), 0];
}, 8);
