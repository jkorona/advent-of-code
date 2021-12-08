import { runner } from './utils.js';

function findUniqueNumbers(combinations) {
  return combinations.filter((combination) => {
    return [2, 3, 4, 7].includes(combination.length);
  });
}

const segmentsPerNumber = [
  ['a', 'b', 'c', 'e', 'f', 'g'], // 0
  ['c', 'f'], // 1
  ['a', 'c', 'd', 'e', 'g'], // 2
  ['a', 'c', 'd', 'f', 'g'], // 3
  ['b', 'd', 'c', 'f'], // 4
  ['a', 'b', 'd', 'f', 'g'], // 5
  ['a', 'b', 'd', 'e', 'f', 'g'], // 6
  ['a', 'c', 'f'], // 7
  ['a', 'b', 'c', 'd', 'e', 'f', 'g'], // 8
  ['a', 'b', 'c', 'd', 'f', 'g'], // 9
];

function group(list) {
  return list.reduce((result, item) => {
    result[item] = result[item] ? result[item] + 1 : 1;
    return result;
  }, {})
}

function decode(patterns) {
  const connections = patterns.reduce((result, pattern) => {
    const symbols = pattern.split('');
    return segmentsPerNumber
      .filter(segment => segment.length === pattern.length)
      .reduce((connections, possibleMatch) => {
        possibleMatch.forEach(letter => connections[letter] = connections[letter].concat(symbols));
        return connections;
      }, result);
  }, { 'a': [], 'b': [], 'c': [], 'd': [], 'e': [], 'f': [], 'g': [] });

  Object.entries(connections).reduce((decoded, [symbol, possibilities]) => {
    const grouped = group(possibilities);
    console.log(symbol, grouped)

  }, {});
}

function task1(displays) {
  return displays.reduce((count, { outputValues }) => {
    return count + findUniqueNumbers(outputValues).length;
  }, 0)
}

function task2(displays) {
  displays.forEach(({ uniqueSignalPatterns, outputValues }) => {
    const decoded = Array(10);
    const uniqueNumbers = findUniqueNumbers(uniqueSignalPatterns).sort((a, b) => a.length - b.length);

    decoded[1] = uniqueNumbers[0];
    decoded[7] = uniqueNumbers[1];
    decoded[4] = uniqueNumbers[2];
    decoded[8] = uniqueNumbers[3];

    decode(uniqueSignalPatterns)
  });
  return 0;
}

export default runner((input) => {
  // const lines = input.split(/\r?\n/).filter(Boolean);
  const lines = ['acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'];

  const displays = lines.map((line) => {
    let [uniqueSignalPatterns, outputValues] = line.split(' | ').map((element) => element.split(' '));
    return { uniqueSignalPatterns, outputValues };
  });

  return [task1(displays), task2(displays)];
}, 8, true);
