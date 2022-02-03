'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}
// Spec 3 - Add guess and hint to the board: Define a variable called hint that collects the returned value of generateHint(guess). .push the guess and the hint (as a combined string) into the board.
const generateHint = (guess) => {
  // your code here
  // create variables solutionArray and guessArray that each split up passed in arguments, [.split]
  let solutionArray = solution.split("");
  let guessArray = guess.split("");
  // Set a variable correctLetters equal to 0
  let correctLetters = 0;
  // Create a variable correctLetterLocations and set it to 0
  let correctLetterLocations = 0;
  // In a for loop, iterate over the solutionArray, comparing each index of solutionArray against the same index of guessArray. If the item matches, increment correctLetterLocations, and set that index in solutionArray to null.
  // !length is local to a function and provides the number of arguments actually passed to the function
  for (let i = 0; i < solutionArray.length; i++) {
    // if the guess you passed in equals the solution, return 'You guessed it!'
    if (solutionArray[i] === guessArray[i]) {
      // increment correctLetterLocations, and set that index in solutionArray to null
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }

  // in a for loop, again iterate over the solutionArray. Using .indexOf, determine if the item at the current index in guessArray appears inside of solutionArray. Save that index in a variable called targetIndex. Now, if targetIndex is greater than -1(it exists in the array), 
  // ! > greater than / < less than
  for (let i = 0; i < solutionArray.length; i++) {
    let targetIndex = solutionArray.indexOf(guessArray[i])
    if (targetIndex > -1) {
      // increment correctLetters and set the item in solutionArray at that index equal to null.
      correctLetters++;
      solutionArray[targetIndex] = null;
    }
  }

  // Spec 2.4 - return hint string: Optionally, you can use the colors package, return a string that prints out the hints you generated, with correctLetterLocations being red, correctLetters being white, and separated by a hyphen. > (NOTE: If you choose to use this color package, only console.log the result. If you return the result your program will fail the tests.) 

  // !toString() is an in-built method in Java that returns the value given to it in string format. Hence, any object that this method is applied on, will then be returned as a string object

  let hint = correctLetterLocations.toString() + "-" + correctLetters.toString();
  return hint;
};

const mastermind = (guess) => {
  solution = 'abcd';
  // Comment this out to generate a random solution

  // generateSolution();

  // Define a test solution: Helpful suggestion: while developing you can set a default solution for you to test against. At the top of mastermind(), simply set const solution = 'abcd'; as a global variable.

  // Detect a correct solution: In mastermind(), if the guess you passed in equals the solution, return 'You guessed it!';

  if (solution === guess) {
    console.log("You guessed it!")
    return "You guessed it!"
  } else {
    let hint = generateHint(guess);
    board.push(guess + " " + hint);

    // End the game: After 10 incorrect guesses, if the board length equals 10, return 'You ran out of turns! The solution was' and the solution. Otherwise, return 'Guess again.'.

    if (board.length > 10) {
      console.log("No more turns! Try again")
      return "No More turns! Try again"
    } else {
      console.log("Try Again!")
      return "Try Again!"
    }
  }
};

const getPrompt = () => {

  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
// MasterMind App Specs
// *Create a new branch called "masterMind"
// *Spec 0 - Define a test solution: Helpful suggestion: while developing you can set a default solution for you to test against. At the top of mastermind(), simply set const solution = 'abcd'; as a global variable.

// *Spec 1 - Detect a correct solution: In mastermind(), if the guess you passed in equals the solution, return 'You guessed it!'; 

//*Spec 2 - Generate a hint: generateHint() should take one argument, guess.

//* Spec 2.1 - Split up the solution and guess: In generateHint(), create variables solutionArray and guessArray that each split up passed in arguments, [.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/splitting on '' (empty string).

//*Spec 2.2 - Determine correct "letter-locations": Create a variable correctLetterLocations and set it to 0. This variable will record how many correct "letter-locations" were guessed. For instance, a guess of aabc against a solution of deba would yield one correct "letter-location" (b). In a for loop, iterate over the solutionArray, comparing each index of solutionArray against the same index of guessArray. If the item matches, increment correctLetterLocations, and set that index in solutionArray to null.

//*Spec 2.3 - Determine correct "letters": Now that we have nulled the already counted correctLetterLocations, we can see if the guessArray contains any correctLetters that were not in the correct location. Set a variable correctLetters equal to 0, and in a for loop, again iterate over the solutionArray. Using .indexOf, determine if the item at the current index in guessArray appears inside of solutionArray. Save that index in a variable called targetIndex. Now, if targetIndex is greater than -1(it exists in the array), increment correctLetters and set the item in solutionArray at that index equal to null.

//*Spec 2.4 - return hint string: Optionally, you can use the colors package, return a string that prints out the hints you generated, with correctLetterLocations being red, correctLetters being white, and separated by a hyphen. > (NOTE: If you choose to use this color package, only console.log the result. If you return the result your program will fail the tests.)

// *Spec 3 - Add guess and hint to the board: Define a variable called hint that collects the returned value of generateHint(guess). .push the guess and the hint (as a combined string) into the board.

// *Spec 4 - End the game: After 10 incorrect guesses, if the board length equals 10, return 'You ran out of turns! The solution was' and the solution. Otherwise, return 'Guess again.'.

