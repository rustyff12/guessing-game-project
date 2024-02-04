// Guessing game project
// readline import and define user interface in node
const readline = require("node:readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// global variables for: secretNumber, minNumber, maxNumber, numAttempts
let secretNumber;
let minNumber;
let maxNumber;
let numAttempts;

// askRange for min and max
const askRange = (callBack) => {
    console.log("\n================================");
    console.log("===== Number Guessing Game =====");
    console.log("================================");
    rl.question("\nEnter a minimum number: ", (minAns) => {
        minNumber = parseInt(minAns); // Store the minimum number
        rl.question("\nEnter a maximum number: ", (maxAns) => {
            maxNumber = parseInt(maxAns); // Store the maximum number
            console.log(
                `\nI'm thinking of a number between ${minNumber} and ${maxNumber}...\n`
            );
            rl.question(
                "How many lives would you like to begin with? ",
                (answer) => {
                    if (isNaN(answer)) {
                        console.log(
                            "\nSorry that is not a number, please try again"
                        );
                        return askRange();
                    } else {
                        numAttempts = answer;
                    }

                    secretNumber = randomInRange(minNumber, maxNumber); // Set the secretNumber
                    callBack(); //// Callback to continue after getting the range
                }
            );
        });
    });
};

// randomInRange for creating a random whole number
const randomInRange = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

// checkGuess checks num against secret number and returns a statement and a boolean value
const checkGuess = (num) => {
    if (num > secretNumber) {
        console.log("\nToo high\n");
        return false;
    } else if (num < secretNumber) {
        console.log("\nToo low\n");
        return false;
    } else if (num === secretNumber) {
        console.log("\nCorrect!\n");
        return true;
    }
};

// Call askRange and use its result to call randomInRange
/* askRange((min, max) => {
    const randomNumber = randomInRange(min, max);
    return randomNumber;
}); */

// askGuess for recieving user guess
const askGuess = () => {
    console.log(`Guess a number between ${minNumber} and ${maxNumber}...\n`);
    rl.question(
        `Remaining lives: ${numAttempts}\n\nEnter a guess: `,
        (answer) => {
            // make sure answer is a valid input
            let ansNum = parseInt(answer);
            if (isNaN(answer)) {
                console.log(
                    "\n Not a number... \n Please only input a number..."
                );
                return askGuess();
            }
            if (ansNum > maxNumber || ansNum < minNumber) {
                console.log(
                    "\nSorry this number is outside the range you specified.\n\nPleas try again..."
                );
                return askGuess();
            }
            // if correct close, otherwise call function again
            if (numAttempts <= 0) {
                console.log(
                    `\nSorry you are out of turns. Thanks for playing... The correct answer was\n${secretNumber}`
                );
                rl.close();
            } else if (!checkGuess(ansNum) && numAttempts > 0) {
                numAttempts--;
                askGuess();
            } else if (checkGuess(ansNum)) {
                console.log(
                    `Congratulaions, you won.\nYour guess of ${secretNumber} was correct`
                );
                rl.close();
            }
        }
    );
};
// Call askRange and use it's result to call randomInRange
askRange(askGuess);
