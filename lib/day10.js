import { runner } from './utils.js';

const syntax = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};
const openChars = Object.keys(syntax);
const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

function task1(lines) {
  
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

export default runner((input) => {
  const lines = input.split(/\r?\n/).filter(Boolean);
  
  return [task1(lines), 0];
}, 10);
