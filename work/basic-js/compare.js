"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) { 
  
  let count = 0;  // To store the count of valid pairs 
  let comparison = 'a';   // To find integer position of a char in array
  let wordArray = new Array(26); 
  wordArray.fill(0); 
  let guessArray = new Array(26); 
	guessArray.fill(0); 

	
  word = word.toLowerCase();  // Change words to lowercase to ignore case while
  guess = guess.toLowerCase();
	
	for (let i = 0; i < word.length; i++) {   // Update the frequencies of the characters of string s1 
    wordArray[word.charAt(i).charCodeAt(0) - comparison.charCodeAt(0)]++; 
}
	
	for (let i = 0; i < guess.length; i++) {   // Update the frequencies of the characters of string s2 
    guessArray[guess.charAt(i).charCodeAt(0) - comparison.charCodeAt(0)]++; 
  }

	for (let i = 0; i < 26; i++){   // Find the count of valid pairs 
    count += (Math.min(wordArray[i], guessArray[i])); 
  }

	return count; 
}
