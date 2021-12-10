const puzzleNumber = process.argv[2];

if(!puzzleNumber) {
  console.log('Please provide puzzle number in the argument..\ne.g. `npm run start 21`');
} else {
  import(`./lib/day${puzzleNumber}.js`)
    .then((puzzle) => {
      const result = puzzle.default();
      console.log(`Puzzle ${puzzleNumber} result is: `, result);
    })
    .catch((error) => {
      if (error.code === 'ERR_MODULE_NOT_FOUND') {
        console.error(`Puzzle ${puzzleNumber} does not exist yet.`, error);
      } else {
        console.error(`An error occurred while loading puzzle ${puzzleNumber}:\n\n${error.stack}\n`);
      }
    });
}
