const secretString = "RECAT";
export function compareWords(guessedWord) {
    if (guessedWord.length !== 5) {
        return guessedWord + " was not a valid word";
    } else if (secretString.toLowerCase() === guessedWord.toLowerCase()) {
        return guessedWord + " is the secret word!";
    } else {
        // let foundMatches = 0;
        // let possibleCharacters = {};
        // for (let letter of secretString.toLowerCase()) {
        //     possibleCharacters[letter] = possibleCharacters + 1 || 1;
        //     console.log(possibleCharacters);
        // }
        // for (let letter of guessedWord.toLowerCase()) {
        //     if (possibleCharacters[letter]) {
        //         possibleCharacters[letter] = possibleCharacters[letter] - 1;
        //         foundMatches = foundMatches + 1;
        //     }

        let scret = new Array(26);
        scret.fill(0);
        let guess = new Array(26);
        guess.fill(0);
        let scretArray = secretString.split("");
        let guessArray = guessedWord.split("");
        let foundMatches = 0;

        for (let character of scretArray) {
            scret[character.charCodeAt(0) - "A".charCodeAt(0)]++;
        }

        for (let character of guessArray) {
            guess[character.charCodeAt(0) - "A".charCodeAt(0)]++;
        }
        console.log(guess);
        console.log(scret);

        for (let i = 0; i < 26; i++) {
            foundMatches += Math.min(scret[i], guess[i]);
        }

        return guessedWord + " had " + foundMatches + " letters in common";
    }
}
