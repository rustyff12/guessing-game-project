// Guessing game project
// readline import and define user interface in node
const readline = require("node:readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const secretNumber = 42;

// checkGuess checks num against secret number and returns a statement and a boolean value
const checkGuess = (num) => {
    if (num > secretNumber) {
        console.log("Too high");
        return false;
    } else if (num < secretNumber) {
        console.log("Too low");
        return false;
    } else if (num === secretNumber) {
        console.log("Correct!");
        return true;
    }
};

// askGuess for recieving user guess
const askGuess = () => {
    rl.question("Enter a guess: ", (answer) => {
        // make sure answer is a valid input
        let ansNum = Number(answer);
        if (isNaN(answer)) {
            console.log("Not a number");
            return askGuess();
        }

        // if correct close, otherwise call function again
        if (checkGuess(ansNum)) {
            rl.close();
        } else {
            askGuess();
        }
    });
};
askGuess();
