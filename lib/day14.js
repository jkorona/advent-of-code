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

function reduceLookup(lookup, start, end) {
  // const occurrencesPerElement = Object.entries(lookup)
  //   .filter(([, occurences]) => occurences > 0)
  //   .reduce((result, [pair, occurences]) => {
  //     result.push([pair[0], occurences]);
  //     result.push([pair[1], occurences]);
  //     return result;
  //   }, []);

  // const result = {};
  // while (occurrencesPerElement.length > 0) {
  //   const [char, occurences] = occurrencesPerElement.pop();
  //   result[char] = (result[char] || 0) + occurences;
  //   const index = occurrencesPerElement.findIndex(([element]) => element === char);
  //   if (index >= 0 && occurrencesPerElement[index][1] > 0)
  //     occurrencesPerElement[index][1] -= occurences;
  // }

  const lookupList = Object.entries(lookup)
    .filter(([,occurrences]) => !!occurrences)
    .sort((a, b) => a[1] - b[1]);

  console.log(lookupList)

  function remove(list, char) {
    if (list.length === 1) {
      return [list[0], []];
    }
    return list.reduce(([first, queue], entry) => {
      if (!first) {
        if (entry[0][0] === char) {
          if (entry[0][1] !== end || list.filter(([pair]) => pair.endsWith(end)).length > 1) {
            // console.log(list);
            return [entry, queue];
          }
        } 
      }
      return [first, [...queue, entry]];
    }, [null, []]);
  }

  let [current, queue] = remove(lookupList, start);

  const occurences = {
    [current[0][0]]: current[1]
  };

  while(!!current) {
    const secondChar = current[0][1];
    const charOccurrences = current[1];

    occurences[secondChar] = (occurences[secondChar] || 0) + current[1];
    [current, queue] = remove(queue, secondChar);

    if (current && current[1] > charOccurrences) {
      occurences[secondChar] += current[1]  - charOccurrences;
    }
  }

  return occurences;
}

function task2(template, rules, nrOfSteps) {
  const pairs = makePairs(template);
  let lookup = Object.keys(rules).reduce((lookup, pair) => ({ ...lookup, [pair]: 0 }), {})
  lookup = addOccurrences(lookup, pairs, 1);

  function iterate(lookup) {
    return Object.entries(lookup).reduce((result, [pair, occurences]) => {
      const insert = rules[pair];
      const left = pair[0] + insert;
      const right = insert + pair[1];

      return addOccurrences(addOccurrences(result, [pair], -occurences), [left, right], occurences);
    }, lookup);
  }

  lookup = Array(nrOfSteps).fill().reduce(iterate, lookup);
  const occurrences = reduceLookup(lookup, template.charAt(0), template.slice(-1));
  const elementOccurrences = Object.values(occurrences).sort((a, b) => a - b);
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

  return [task1(template, rules, 3), task2(template, rules, 3)];
}, 14, true);
