const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
app.use(express.static('./public'));
app.use(cookieParser());
const users = {
    "11": {
      username: "Amit",
      active: true,
      uid: '11',
    },
    "43": {
      username: "Bao",
      active: true,
      uid: 43,
    },
  };

const items=[{
  "name":"pasta",
  "value":2,
  
},{
  "name":"green tea",
  "value":0,
}];

  app.get('/', (req, res) => {
    let uid = req.cookies.uid;
  
    if(!users[uid]) {
      uid = '';
      res.cookie('uid', '');
    }
  });
  

// app.use(express.static('./public'));
// const loginWeb = require('./login');

// app.get('/login',(req, res) => {	
// 	res.send(loginWeb.loginPage(false));
// });

app.post('/session/:name', express.json(), (req, res) => {
  const username  = req.params.name;
  console.log(username);
  if(!username || username.includes("dog") || username.includes(" ")){
    res.status(400).json({ error: 'bad-login' });
    return;
  }
  const record = Object.values(users).find(user => user.username === username);
  const oldId = record && record.uid;
  const id = oldId || Math.floor(Math.random() * 10000);
  users[id] = { username, active: true, uid: id };
  res.cookie('uid', id);
  res.json(items);
});

// app.get('/people/:name', (req, res) => {
//     const name = req.params.name;
//     if(people[name]) {
//       res.json(people[name]);
//     } else {
//       res.status(404).json({ error: `Unknown user: ${name}`});
//     }
//   });
  
app.get('/items/', (req, res) => {
  res.json(Object.keys(items));
});
  
app.post('/items/:name', express.json(), (req, res) => {
  const name = req.params.name;
  if(!name) {
    res.status(400).json({ error: 'missing-name' });
    return;
  } 
  const record = (items).some(item => item.name === name);
  console.log(record);
  if(record) {
    res.status(409).json({ error: 'duplicate' });
    return;
  }
  const newItem={
            name: req.params.name,
            value:0,
        }
  items.push(newItem);
  console.log(items);
  res.json(items);
});
  
app.delete('/items/:name', (req, res) => {
  const name = req.params.name;
  if(!name) {
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  for(let i=0;i<items.length;i++){
    if(items[i].name=name){
      items.splice(i,1);
      break;
    }
  }
  console.log(items);
  res.json(items);
});


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

