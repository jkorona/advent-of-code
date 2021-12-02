const puzzleNumber = process.argv[2];

if(!puzzleNumber) {
  console.log('Please provide puzzle number in the argument..\ne.g. `npm run start 21`');
  return;
}

import(`/lib/day${puzzleNumber}.js`)
  .then((puzzle) => {
    console.log(puzzle);
  })
  .catch(() => {
    console.error(`Puzzle ${puzzleNumber} does not exist yet.`);
  });
