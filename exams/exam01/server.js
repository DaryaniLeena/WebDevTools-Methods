const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const words = require('./word'); 
const game = require('./game'); 
const loginWeb=require('./login-web');

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/', (req, res) => { 
  const sessionId = req.cookies && req.cookies.session;
  if(!sessionId && !game.userSessions[sessionId]){
    res.redirect('/login');
  }else{
    res.redirect('/game');
  }
});

app.get('/game', (req, res) => {
  game.startNewGame(words,req.cookies.session);
  res.send(game.gamePage(words, req.cookies.session));
});

app.get('/login',(req,res)=>{
  res.send(loginWeb.loginPage());
});

app.post('/login',express.urlencoded({extended:false}),(req,res)=>{
  const { user } = String(req.body.userName);
  let token = Math.random().toString(36).substring(7);
	game.userSessions[token] = user;
	res.cookie('session', token, {
	  sameSite: 'Strict', 
	});
  res.redirect('/');
});

app.post('/guessWord', express.urlencoded({ extended: false }), (req, res) => {
  const {inputword, token}  = req.body; 
  let gameObject = game.getCurrentGame(token);
  words.compareWords(inputword, gameObject);
  res.send(game.gamePage(words, token));
});

app.get('/logout',(req, res) =>{
  const sessionId = req.cookies && req.cookies.session;
  delete game.userSessions[sessionId];
  res.clearCookie('session');
  res.redirect('/login');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
