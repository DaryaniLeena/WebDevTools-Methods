const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('./public'));

const counter = () => {
  let count = 2; // so that itemid starts from 3, i & 2 is already given for first two items
  return () => {
    count += 1;
    return count;
  };
};

nextID = counter();
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
  }
};

app.get('/items/', (req, res) => {
  res.json(items);
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
  const itemid=nextID();
  const newItem={
    name: name,
    value: parseInt(quantity),
    itemid: itemid 
  }
  items[itemid] = newItem;
  res.json(items);
});
  
app.delete('/items/:itemid', (req, res) => {
  const itemid = req.params.itemid;
  if(!items[itemid]) {
    res.status(400).json({ error: 'missing-item' });
    return;
  }
  delete items[itemid];
  res.json(items);
});

app.patch('/items/:itemid/:quantity', express.json(), (req, res) => {
  const itemid = req.params.itemid;
  const quantity = req.params.quantity;
  
  if(isNaN(quantity)){
    res.status(400).json({ error: 'bad-request' });
    return;
  }
  if(!items[itemid]) {
    res.status(400).json({ error: 'missing-item' });
    return;
  } 
  items[itemid].value=parseInt(quantity);
  res.json(items);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));

