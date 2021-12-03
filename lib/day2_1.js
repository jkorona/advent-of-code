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

  const [distance, depth] = commands.reduce(([distance, depth, aim], [command, value]) => {
    switch (command) {
      case 'forward':
        return [distance + value, depth + aim * value, aim];
      case 'up':
        return [distance, depth, aim - value];
      case 'down':
        return [distance, depth, aim + value];
    }
  }, [0, 0, 0]);

  return distance * depth;
}
