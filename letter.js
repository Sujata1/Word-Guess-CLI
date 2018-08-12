function Letter(letter) {
    this.letter = letter;
    this.guessed = false;

    Letter.prototype.toString = function () {
        if (isNaN(this.letter)) {
            if (this.guessed) {
                return this.letter + " ";
            }
            return '_ ';
        }
        else {
            this.guessed = true;
            return ' ';
        }
    };

    this.updateLetterGuessed = function (underlying_char) {
        if (underlying_char.toLowerCase() === this.letter.toLowerCase()) {
            this.guessed = true;
        }
    };
}

module.exports = Letter;

