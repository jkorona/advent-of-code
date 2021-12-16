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

function makePairs(string) {
  const pairs = [];
  for (let index = 0; index < string.length - 1; index++) {
    pairs.push(string[index] + string[index + 1]);
  }
  return pairs;
}

function addOccurrences(lookup, pairs, occurrences) {
  return pairs.reduce((lookup, pair) => ({ ...lookup, [pair]: lookup[pair] + occurrences }), lookup);
}

function task2(template, rules, nrOfSteps) {
  let pairs = Object.keys(rules).reduce((lookup, pair) => ({ ...lookup, [pair]: 0 }), {});
      pairs = addOccurrences(pairs, makePairs(template), 1);
  let chars = template.split('').reduce((chars, char) => ({ ...chars, [char]: (chars[char] || 0) + 1 }), {})

  for (let step = 0; step < nrOfSteps; step++) {
    pairs = Object.entries(pairs).reduce((result, [pair, occurences]) => {
      const insert = rules[pair];
      const left = pair[0] + insert;
      const right = insert + pair[1];

      chars[insert] = (chars[insert] || 0) + occurences;

      return addOccurrences(addOccurrences(result, [pair], -occurences), [left, right], occurences);
    }, pairs);
  }

  const elementOccurrences = Object.values(chars).sort((a, b) => a - b);
  return elementOccurrences[elementOccurrences.length - 1] - elementOccurrences[0];
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

  return [task1(template, rules, 10), task2(template, rules, 40)];
}, 14, false);
