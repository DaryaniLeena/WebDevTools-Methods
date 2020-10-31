const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
app.use(express.static('./public'));
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
const users = {
    "11": {
      username: "Amit",
      active: false,
      uid: 11,
    },
    "43": {
      username: "Bao",
      active: false,
      uid: 43,
    },
  };

// const items=[{
//   "name":"pasta",
//   "value":2,
  
// },{
//   "name":"green tea",
//   "value":0,
// }];
const items={
  "1":{
    "name":"pasta",
    "value":2,
    "itemid":1
},
"2":{
  "name":"green tea",
  "value":0,
  "itemId":2
}};

app.get('/', (req, res) => {
  const uid = req.cookies && req.cookies.uid;
  if(uid && users[uid]) {
    res.json(tems);
  }
  console.log(users);
});

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
   console.log(users);
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
  res.json(tems);
});
  
app.post('/items/:name/:quantity', express.json(), (req, res) => {
  const name = req.params.name;
  const quantity = req.params.quantity;
  if(!name) {
    res.status(400).json({ error: 'missing-name' });
    return;
  } 
  const record = Object.values(items).some(item => item.name === name);
  if(record) {
    res.status(409).json({ error: 'duplicate' });
    return;
  }
  const x=(Math.floor(Math.random() * 98) + 3); // random number between 3 and 100 (2 and 1 is already given for first two)
  const newItem={
    name: name,
    value: quantity,
    itemid: x 
  }
  items[x] = newItem;
  // items.push(newItem);
  console.log(items);
  res.json(items);
});
  
app.delete('/items/:index', (req, res) => {
  const index = req.params.index;
  console.log(index);
  console.log(items);
  if(!items[index]) {
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  // items.splice(index,1);
  delete items[index];
  console.log(items);
  res.json(items);
});

app.post('/session', (req, res) => {
  const uid = req.cookies.uid;
  if(users[uid]) {
    users[uid].active = false;
  }
  
  res.clearCookie('uid');
  res.send({err: 0, redirectUrl: "/"});
});

app.patch('/items/:itemid/:quantity', express.json(), (req, res) => {
  const index = req.params.itemid;
  const quantity = req.params.quantity;
  if(!items[index]) {
    res.status(400).json({ error: 'missing-name' });
    return;
  } 
  items[index].value=parseInt(quantity);
  console.log(items);
  res.json(items);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

