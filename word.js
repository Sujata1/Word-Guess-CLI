var letter = require("./letter.js");

function CurrentWord() {
    this.underlyingWord = [];
    this.loadCurrentWord = function (guessWord) {
        for (var i = 0; i < guessWord.length; i++) {
            this.underlyingWord[i] = new letter(guessWord[i]);
        }
    };

    this.makeGuessTrue = function (index, letterGuessed) {
        var correctFlag = false;
        this.underlyingWord[index].updateLetterGuessed(letterGuessed);
    };
}

module.exports = CurrentWord;



