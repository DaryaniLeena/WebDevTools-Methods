const secretString = "RECAT";
export function compareWords(guessedWord) {
    if (guessedWord.length !== 5) {
        return guessedWord + " was not a valid word";
    } else if (secretString.toLowerCase() === guessedWord.toLowerCase()) {
        return guessedWord + " is the secret word!";
    } else {
        let foundMatches = 0;
        let possibleCharacters = {};
        for (let letter of secretString.toLowerCase()) {
            possibleCharacters[letter] = possibleCharacters + 1 || 1;
        }
        for (let letter of guessedWord.toLowerCase()) {
            if (possibleCharacters[letter]) {
                possibleCharacters[letter] = possibleCharacters[letter] - 1;
                foundMatches = foundMatches + 1;
            }
        }
        return guessedWord + " had " + foundMatches + " letters in common";
    }
}
