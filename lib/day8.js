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
  displays.forEach(({ uniqueSignalPatterns, outputValues }) => {
    const uniqueNumbers = findUniqueNumbers(uniqueSignalPatterns).sort((a, b) => a.length - b.length);

    function foo(map, value, pattern) {
      const symbols = pattern
        .split('')
        .sort();
      const segments = segmentsPerNumber[value];
      const allExistingSymbols = Object.values(map).flat();
      const [newSymbols, existingSymbols] = split(symbols, (symbol) => !allExistingSymbols.includes(symbol));

      segments.forEach((segment) => {
        if (!map[segment]) {
          map[segment] = newSymbols;
        }
      });
    }

    const map = {};
    foo(map, 1, uniqueNumbers[0]);
    foo(map, 7, uniqueNumbers[1]);
    foo(map, 4, uniqueNumbers[2]);
    foo(map, 8, uniqueNumbers[3]);

    function bar(map, patterns) {
      while (patterns.length > 0) {
        const pattern = patterns.shift();

        const possibleMatches = Object.entries(segmentsPerNumber).filter(([, segment]) => segment.length === pattern.length);
        // console.log(possibleMatches)
        for (const [value, symbols] of possibleMatches) {
          let patternElements = pattern.split('');
          for (const symbol of symbols) {
            const connections = map[symbol]
            const [uniqueConnections, rest] = split(patternElements, (element) => connections.includes(element));
            if (uniqueConnections.length === 1) {
              patternElements = rest;
            } else {
              break;
            }
          }

          if (patternElements.length === 0) {
            console.log('Success', value);
          } else {
            console.log('Failure', value);
          }

        }
      }
    }
    const [remainingPatterns] = split(uniqueSignalPatterns, (pattern) => !uniqueNumbers.includes(pattern));
    bar(map, remainingPatterns);

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
