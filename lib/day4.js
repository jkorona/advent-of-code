'use strict';

import { readFileSync } from 'fs';


function mark(board, number) {
  return board.map((row) => {
    return row.map((cell) => {
      if (cell[0] === number) {
        return [number, true];
      }
      return cell;
    });
  });
}

function check(board) {
  for (let a = 0; a < 5; a++) {
    let row = board[0][a][1];
    let column = board[a][0][1];
    for (let b = 1; b < 5; b++) {
      row = row && board[b][a][1];
      column = column && board[a][b][1];
    }
    if (row || column) {
      return true
    }
  }
  return false;
}

function sumUnmarked(board) {
  return board.reduce((sum, row) =>
    sum + row.reduce((sum, cell) => !cell[1] ? sum + cell[0] : sum, 0),
    0
  );
}

function task1(draws, boards) {
  let winningBoard;
  let currentDraw;
  const drawsLeft = [...draws];
  while (drawsLeft.length > 0 && !winningBoard) {
    currentDraw = drawsLeft.shift();
    boards = boards.map(board => mark(board, currentDraw));
    winningBoard = boards.find((board) => check(board));
  }
  const unmarkedSum = sumUnmarked(winningBoard);

  return unmarkedSum * currentDraw;
}

export default function () {
  const input = readFileSync('./data/day4_1.txt', 'utf8');
  const groups = input.split(/\r?\n{2}/);

  const draws = groups.shift().split(',').map(v => parseInt(v, 10));
  const boards = groups.reduce((boards, line) => {
    const lines = line.split(/\r?\n/);
    const board = lines.reduce((rows, line) => {
      const row = line.split(' ').filter(Boolean).map(v => [parseInt(v, 10), false]);
      return [...rows, row];
    }, []);
    return [...boards, board];
  }, []);

  const task1Result = task1(draws, boards);

  return `\n\n\t* task 1: ${task1Result}\n\t* task 2: ${0}\n`;
}
