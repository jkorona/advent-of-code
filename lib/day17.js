import { runner } from './utils.js';

export default runner(() => {
  // const input = 'target area: x=20..30, y=-10..-5';
  const input = 'target area: x=236..262, y=-78..-58';
  const [xmin, xmax, ymin, ymax] = Array.from(input.matchAll(/\-?\d+/g)).map(([v]) => parseInt(v, 10));

  const task1 = (ymin + 1) * ymin / 2;

  return [task1, 0];
});
