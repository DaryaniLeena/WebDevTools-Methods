"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) { 
  
  // DO NOT MODIFY
  word = word.toLowerCase(); // change words to lowercase to ignore case while
  guess = guess.toLowerCase();
  let count = 0;
  const charArray = guess.split("");
  for(let letter of word){    let index = charArray.findIndex(char => char === letter);

    if(index >= 0){
      count++;
      charArray.splice(index, 1);
    }
  }
  return count; // this line is wrong
}
