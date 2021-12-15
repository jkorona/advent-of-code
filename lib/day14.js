import { runner } from './utils.js';

function simulateStep(template, rules) {
  const chars = template.split('');
  return chars.slice(0, -1).reduce((result, char, index) => {
    const pair = char + template[index + 1];
    if (rules[pair]) {
      return result + char + rules[pair];
    }
    return result;
  }, '') + chars.slice(-1);
}

function task1(template, rules, nrOfSteps) {

  const newTemplate = Array(nrOfSteps).fill().reduce((template) => {
    return simulateStep(template, rules);
  }, template);

  let occurrences = newTemplate.split('').reduce((occurrences, char) => {
    if (!occurrences[char]) {
      occurrences[char] = 1;
    } else {
      occurrences[char] = occurrences[char] + 1;
    }
    return occurrences;
  }, {});
  occurrences = Object.values(occurrences).sort((a, b) => a - b);
  return occurrences[occurrences.length - 1] - occurrences[0];
}

function makeChunks(string) {
  const chunkSize = Math.ceil(string.length / 2);
  return [
    string.substring(0, chunkSize),
    string.substring(chunkSize - 1),
  ];
}

function joinChunks(chunks) {
  return chunks.reduce((string, chunk) => {
    return string + chunk.substr(1);
  });
}


function task2(template, rules, nrOfSteps) {
  const lookup = new Map();

  const divideAndConquer = (string) => {
    if (lookup.has(string)) {
      return lookup.get(string);
    }

    if (string.length <= 4) {
      return simulateStep(string, rules)
    }

    let chunks = makeChunks(string);
    chunks = chunks.map((chunk) => divideAndConquer(chunk));
    const result = joinChunks(chunks);
    lookup.set(string, result);

    return result;
  }

  const newTemplate = Array(nrOfSteps).fill().reduce((template) => {
    return divideAndConquer(template);
  }, template);

  let occurrences = newTemplate.split('').reduce((occurrences, char) => {
    if (!occurrences[char]) {
      occurrences[char] = 1;
    } else {
      occurrences[char] = occurrences[char] + 1;
    }
    return occurrences;
  }, {});
  occurrences = Object.values(occurrences).sort((a, b) => a - b);
  return occurrences[occurrences.length - 1] - occurrences[0];
}

export default runner((input) => {
  const lines = input.split(/\r?\n/);
  const template = lines.shift();
  const rules = lines
    .filter(Boolean)
    .map(line => line.split(' -> '))
    .reduce((object, [pattern, insertion]) => {
      return { ...object, [pattern]: insertion };
    }, {});

  return [task1(template, rules, 10), task2(template, rules, 30)];
}, 14, true);
