const wordList = ["car", "and","was", "wow", "bee", "not", "pot", "pen","men", "man", "war","bun", "all", "fan","ace","act",
"sun","cat","bar","fun"];

function getRandomSecretWord(words){
	let randomNumber = Math.floor(Math.random() * (words.wordList.length));
	console.log("SECRET WORD: "+ words.wordList[randomNumber]);
	return words.wordList[randomNumber];
}

function compareWords(guessedWord, gameObject){
	lowerCaseGuessedWord = guessedWord.toLowerCase();
	lowerCaseSecretString = gameObject.secretString.toLowerCase();
	
	if (!wordList.includes(lowerCaseGuessedWord)){
		gameObject.guessedStrings.push({inputWord:guessedWord, result:"Invalid word"});	
	}
	else if(lowerCaseSecretString == lowerCaseGuessedWord){
		gameObject.guessedStrings.push({ inputWord:guessedWord, result:"Correct Answer" });
		gameObject.counter = gameObject.counter + 1;	
	}
	else {
		let foundMatches = 0;
        let count = {};
        for( let letter of lowerCaseSecretString ) { 
            count[letter] = count + 1 || 1;
        }
        for( let letter of lowerCaseGuessedWord ) { 
            if( count[letter] ) {
                count[letter] = count[letter] -1;
                foundMatches = foundMatches +1;
            }
        }
		gameObject.guessedStrings.push({inputWord:guessedWord,result:foundMatches + " character matched"});
		gameObject.counter = gameObject.counter + 1;
	}
}

const words = {
	wordList,
	getRandomSecretWord,
	compareWords
};

module.exports = words;

