import { runner } from './utils.js';

const syntax = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};
const openChars = Object.keys(syntax);

function task1(lines) {
  const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  const errors = lines.reduce((errors, line) => {
    const openings = [];
    for (const char of line) {
      if (openChars.includes(char)) {
        openings.push(char)
      } else {
        const lastOpening = openings.pop();
        if (syntax[lastOpening] !== char) {
          return [...errors, char];
        }
      }
    }
    return errors;
  }, []);

  return errors.reduce((sum, error) => {
    return sum + points[error];
  }, 0);
}

function autocompleteScore(chars) {
  const points = { ')': 1, ']': 2, '}': 3, '>': 4 };
  return chars.reduce((score, char) => 5 * score + points[char], 0);
}

function task2(lines) {
  const fixes = lines.reduce((fixes, line) => {
    const openings = [];
    for (const char of line) {
      if (openChars.includes(char)) {
        openings.push(char)
      } else {
        const lastOpening = openings.pop();
        if (syntax[lastOpening] !== char) {
          return fixes
        }
      }
    }
    const closures = openings.reverse().map((char) => syntax[char]);
    return [...fixes, closures];
  }, []);

  const scores = fixes.map(autocompleteScore).sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}

export default runner((input) => {
  const lines = input.split(/\r?\n/).filter(Boolean);

  return [task1(lines), task2(lines)];
}, 10);
