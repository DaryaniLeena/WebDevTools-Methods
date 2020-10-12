const express = require('express');
const app = express();
const PORT = 3000;
const words = require('./word'); 
const game = require('./game'); 
const loginWeb=require('./login-web');

app.use(express.static('./public'));

app.get('/', (req, res) => {  
  if(!game.currentUser ){
    res.redirect('/login');
  }else{
    let token = game.startNewGame(words);
    res.send(game.gamePage(words, token));
    delete game.currentUser;
  }
});

app.get('/login',(req,res)=>{
  res.send(loginWeb.loginPage());
});

app.post('/login',express.urlencoded({extended:false}),(req,res)=>{
  game.currentUser=String(req.body.userName);
  res.redirect('/');
});

app.post('/guessWord', express.urlencoded({ extended: false }), (req, res) => {
  const {inputword, token}  = req.body; 
  let gameObject = game.getGame(token);
  words.checkWord(inputword, gameObject);
  res.send(game.gamePage(words, token));
});

app.get('/playAgain', express.urlencoded({ extended: false }), (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
