import { runner } from './utils.js';

function findUniqueNumbers(combinations) {
  return combinations.filter((combination) => {
    return [2, 3, 4, 7].includes(combination.length);
  });
}

function task1(displays) {
  return displays.reduce((count, { outputValues }) => {
    return count + findUniqueNumbers(outputValues).length;
  }, 0)
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

function split(list, fn) {
  return list.reduce(([a, b], item) => {
    if (fn(item)) a.push(item);
    else b.push(item);
    return [a, b];
  }, [[], []]);
}

function task2(displays) {
  const results = displays.map(({ uniqueSignalPatterns, outputValues }, index) => {
    const uniqueNumbers = findUniqueNumbers(uniqueSignalPatterns).sort((a, b) => a.length - b.length);
    const decoded = Array(1);
    const map = {};

    function fillMap(value, pattern) {
      const symbols = pattern
        .split('')
        .sort();
      const segments = segmentsPerNumber[value];
      const allExistingSymbols = Object.values(map).flat();
      const [newSymbols,] = split(symbols, (symbol) => !allExistingSymbols.includes(symbol));

      segments.forEach((segment) => {
        if (!map[segment]) {
          map[segment] = newSymbols;
        }
      });

      decoded[value] = pattern;
    }

    fillMap(1, uniqueNumbers[0]);
    fillMap(7, uniqueNumbers[1]);
    fillMap(4, uniqueNumbers[2]);
    fillMap(8, uniqueNumbers[3]);

    let [remainingPatterns] = split(uniqueSignalPatterns, (pattern) => !uniqueNumbers.includes(pattern));

    function findAndMatch(sizeFilter, wiresFilter, target) {
      const matches = remainingPatterns
        .filter(pattern => pattern.length === sizeFilter)
        .filter(pattern => wiresFilter[0]?.every((wire) => pattern.includes(wire)) ?? true)
        .filter(pattern => !wiresFilter[1]?.every((wire) => pattern.includes(wire)) ?? true);

      if (matches.length === 1) {
        decoded[target] = matches[0];
        remainingPatterns = remainingPatterns.filter(pattern => pattern !== decoded[target]);
      } else {
        throw new Error(`Ambiguity detected in display: ${index}`);
      }
    }

    findAndMatch(5, [map['e']], 2);
    findAndMatch(5, [map['b']], 5);
    findAndMatch(5, [map['c']], 3);
    findAndMatch(6, [, map['d']], 0);
    findAndMatch(6, [, map['e']], 9);
    findAndMatch(6, [], 6);

    const result = outputValues.map((value) => {
      return decoded.findIndex((code) => {
        return code.length === value.length &&
          Array.from(value).every((letter) => code.includes(letter));
      });
    });

    return result.join('');
  });

  return results.reduce((sum, string) => {
    return sum + parseInt(string, 10);
  }, 0)
}

export default runner((input) => {
  const lines = input.split(/\r?\n/).filter(Boolean);

  const displays = lines.map((line) => {
    let [uniqueSignalPatterns, outputValues] = line.split(' | ').map((element) => element.split(' '));
    return { uniqueSignalPatterns, outputValues };
  });

  return [task1(displays), task2(displays)];
}, 8, false);
