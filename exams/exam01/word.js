const wordList = ["the", "and","you", "was", "for", "are", "wow", "his","one", "had", "but","not", "all", "can","ace","aah",
"abo","act","car","cee"];

function getRandomWord(words){
	let randomNumber = Math.floor(Math.random() * (words.wordList.length));
	console.log("SECRET WORD: "+ words.wordList[randomNumber]);
	return words.wordList[randomNumber];
}

function checkWord(inputWord, gameObject){
	lowerCaseInputWord = inputWord.toLowerCase();
	lowerCaseAnsweredString = gameObject.answerString.toLowerCase();
	
	if (!wordList.includes(lowerCaseInputWord)){
		gameObject.guessedStrings.push({inputWord:inputWord, result:"Invalid word"});	
	}
	else if(lowerCaseAnsweredString == lowerCaseInputWord){
		gameObject.guessedStrings.push({ inputWord:inputWord, result:"Correct Answer" });
		gameObject.counter = gameObject.counter + 1;	
	}
	else {
		let count = 0;
		for (const c of lowerCaseInputWord) {
			if(lowerCaseAnsweredString.includes(c)){
				count++;
			}
		}
		gameObject.guessedStrings.push({inputWord:inputWord,result:count + " character matched"});
		gameObject.counter = gameObject.counter + 1;
	}
}

const words = {
	wordList,
	getRandomWord,
	checkWord
};

module.exports = words;

