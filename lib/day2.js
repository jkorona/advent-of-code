'use strict';

import { runner } from './utils.js';

function task1(commands) {
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

function task2(commands) {
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

export default runner((input) => {
  const commands = input.split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const [command, value] = line.split(' ');
      return [command, parseInt(value, 10)];
    });

  return [task1(commands), task2(commands)];
}, 2);
