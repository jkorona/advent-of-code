'use strict';

import { readFileSync } from 'fs';

export default function () {
  const input = readFileSync('./data/day2.txt', 'utf8');
  const commands = input.split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const [command, value] = line.split(' ');
      return [command, parseInt(value, 10)];
    });

  const [distance, depth] = commands.reduce(([distance, depth], [command, value]) => {
    switch (command) {
      case 'forward':
        return [distance + value, depth];
      case 'up':
        return [distance, depth - value];
      case 'down':
        return [distance, depth + value];
    }
  }, [0, 0]);

  return distance * depth;
}
