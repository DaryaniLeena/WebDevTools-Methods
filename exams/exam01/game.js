function gamePage(words, token) {
  return `
<html>
<head>
  <title>game</title>
  <link rel="stylesheet" href="game.css"/>
</head>
<body>
  <div class="main-container">
    <div class="wordListLeena">
      <span class="wordlist-text">
        <span> Word List: </span>
      </span>
      <span class="wordlist-scroll">
        ${getWordList(words)}
        </ul>
      </span>
    </div>
    <div class="flex-container">
      <div>
        <div class="header-div">
         Guessed Words
        </div>
        <div class="content-div">
          ${getGuessedWordList(token)}
          </ul>
        </div>
      </div>
      <div>
        <div class="header-div">
          Result
        </div>
        <div class="content-div">
          ${getWordResultList(token)}
          </ul>
        </div>
      </div>
    </div>    
    <div class="container-forms"> 
      <div class="inputWord">
         <form action="/guessWord" method="POST" class="form-component">
              <input type="text" name="inputword" placeholder="Enter the word" class="inputTextBox" autocomplete="off" required>
              <input type="hidden" name="token" value="${token}" />
              <button id="guessButton" type="submit">Guess</button>
          </form>
      </div>
      <div class="counter-container">
        <span class="counter-span">Number of Attempts : ${getCounter(token)}</span>
      </div>
      <div class="logout">
          <form action="/logout" method="GET">
            <button id="logoutButton" type="submit">Logout</button>
          </form>
      </div>
    </div>
  </div>
</body>
</html>`;   
}

const currentGames = [];
let resultUserGuessArray=[];
const userSessions = {};

function startNewGame(words,sessionId) {
  let token=sessionId;
  let newGame = {
    "answerString" : words.getRandomWord(words),
    "counter" : 0,
    "guessedStrings" : []
  }
  currentGames.push({token:token,playgame:newGame});
  return token;
}

function getWordList(words) {
  return `<ul class="WordListscroll">` +
  Object.values(words.wordList).map( currentWord => `
    <li class="word-unlist">${currentWord}</li>    
    `).join('');
}

function getGuessedWordList(token) {
  currentGameObject = getGame(token);
  currentGuessedStrings = currentGameObject.guessedStrings;
  let ul = `<ul class="scroll">`;
  currentGuessedStrings.forEach((element)=> {
    ul += `<li class="guess-result">${element.inputWord}</li>`
  });
  return ul;
}

function getWordResultList(token) {
  currentGameObject = getGame(token);
  currentGuessedStrings = currentGameObject.guessedStrings;
  let ul = `<ul class="scroll">`;
  currentGuessedStrings.forEach((element)=> {
    ul += `<li class="guess-result">${element.result}</li>`
  });
  return ul;
  }

function getCounter(token){
  currentGameObject = getGame(token);
  currentCounter = currentGameObject.counter;
  let div = ``;
  div += `${currentCounter}`
  return div;
}

function getGame(token) {
  resultUserGuessArray = currentGames.filter(item => item.token==token);
  return resultUserGuessArray[0].playgame;
}

const game = {
  userSessions,
  gamePage,
  currentGames,
  resultUserGuessArray,
  startNewGame,
  getWordList,
  getGuessedWordList,
  getWordResultList,
  getCounter,
  getGame
};

module.exports = game;
