var inquirer = require("inquirer");
var word = require("./word.js");

startNewGame();
function startNewGame() {
    var guessWord = ["Jurassic Park", "University Toronto", "OISE Building", "CNE Tower"];
    this.computerGuess = guessWord[Math.floor(Math.random() * guessWord.length)];
    console.log("computerGuess: " + this.computerGuess);
    var guessThisWord = computerGuess.toLowerCase();
    wordToGuess = new word();
    wordToGuess.loadCurrentWord(computerGuess);
    console.log(wordToGuess.underlyingWord.join(" ")); //Show word to user
    playWordGame(10, wordToGuess, guessThisWord);
};

function playWordGame(guessCounter, wordToGuess, guessThisWord) {
    if (guessCounter > 0) {
        inquirer.prompt([
            {
                name: "userGuessed",
                message: "Guess a Letter: "
            }
        ]).then(function (answer) {
            var userGuessedLetter = answer.userGuessed;
            var letterPos = guessThisWord.indexOf(userGuessedLetter, 0);
            
            if (letterPos !== -1) {     //Found match
                while (letterPos !== -1) {
                    wordToGuess.makeGuessTrue(letterPos, userGuessedLetter);
                    letterPos = guessThisWord.indexOf(userGuessedLetter, letterPos + 1);
                }
                console.log("\033[32m", "\n" + "CORRECT!!" + "\n", "\x1b[0m");
            }
            else {           //No match found
                console.log("\033[31m", "\nINCORRECT!!\n", "\x1b[0m");
                guessCounter -= 1;
                console.log(guessCounter + " guesses remaining!!\n")
            }
            
            console.log(wordToGuess.underlyingWord.join(" "));    //Show words to user
            
            var guessSuccess = wordToGuess.underlyingWord.filter(function (e) { // check if all word guessed
                return e.guessed === false;
            });
            
            if (guessSuccess.length !== 0) {
                playWordGame(guessCounter, wordToGuess, guessThisWord);
            }
            else {
                console.log("\nYou got it rigth!  Next Word!\n");
                startNewGame();
            }
        });
    }
    else {
        console.log("\033[31m", "\nWrong Answer!!!  Next Word!\n", "\x1b[0m");
        startNewGame();
    }
}
