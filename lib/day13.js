import { runner } from './utils.js';

function modelPaperSheet(coordinates) {
  const [extremeX, extremeY] = coordinates.reduce(([width, height], [x, y]) => {
    return [
      x > width ? x : width,
      y > height ? y : height
    ];
  }, [0, 0]);

  const model = Array(extremeX + 1)
    .fill(null)
    .map(() => Array(extremeY + 1).fill('.'));

  coordinates.forEach(([x, y]) => {
    model[x][y] = '#';
  });

  return model;
}

function printPaperSheet(paperSheet) {
  for (let y = 0; y < paperSheet[0].length; y++) {
    let line = '';
    for (let x = 0; x < paperSheet.length; x++) {
      line += paperSheet[x][y];
    }
    console.log(line);
  }
  console.log();
}

function foldTwoSheets(a, b) {
  return a.reduce((foldedPaper, aColumn, x) => {
    const bColumn = b[x];
    const foldedColumn = aColumn.reduce((foldedColumn, pixel, y) => {
      if ([pixel, bColumn[y]].includes('#')) {
        foldedColumn.push('#');
      } else {
        foldedColumn.push('.');
      }
      return foldedColumn;
    }, []);
    foldedPaper.push(foldedColumn);
    return foldedPaper;
  }, []);
}

function foldX(paperSheet, line) {
  let left = paperSheet.slice(0, line);
  let right = paperSheet.slice(line + 1).reverse();

  return foldTwoSheets(left, right);
}

function foldY(paperSheet, line) {
  let [top, bottom] = paperSheet.reduce(([top, bottom], column, x) => {
    top.push(column.slice(0, line));
    bottom.push(column.slice(line + 1));
    return [top, bottom];
  }, [[], []]);

  // turn over bottom
  bottom = bottom.reduce((bottom, column) => {
    bottom.push(column.reverse());
    return bottom;
  }, []);

  // put together
  return foldTwoSheets(top, bottom);
}

function foldPaperSheet(paperSheet, folds) {
  return folds.reduce((paperSheet, [axis, line]) => {
    return axis === 'x' ? foldX(paperSheet, line) : foldY(paperSheet, line);
  }, paperSheet);
}

export default runner((input) => {
  const sections = input.split(/\r?\n{2}/);
  const coordinates = sections[0]
    .split(/\r?\n/)
    .map((string) => string.split(',').map(v => parseInt(v, 10)));

  const folds = sections[1]
    .split(/\r?\n/)
    .map((string) => {
      let [axis, line] = string.split(' ')[2].split('=');
      return [axis, parseInt(line, 10)];
    });

  const paperSheet = modelPaperSheet(coordinates);
  const foldedPaperSheet = foldPaperSheet(paperSheet, folds);

  printPaperSheet(foldedPaperSheet);

  const dots = foldedPaperSheet.reduce((dots, column) => {
    return dots + column.reduce((sum, pixel) => pixel === '#' ? sum + 1 : sum, 0);
  }, 0)

  return [dots, 'HGAJBEHC'];
}, 13);
