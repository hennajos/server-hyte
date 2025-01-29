import express from 'express';
import {addItem, getItems, getItembyId, editItem, deleteItem} from './items.js';
import {getUsers, addUser, login, getUserbyId} from './users.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use('/', express.static('public'));

app.use(express.json());

app.get('/api/', (req, res) => {
  console.log('Get-pyyntö havaittu');
  console.log(req.url);
  res.send('Welcome to my REST API!');
});

app.get('/api/items', getItems);
app.get('/api/items/:id', getItembyId);
app.post('/api/items', addItem);
app.put('/api/items', editItem);
app.delete('/api/items', deleteItem);

app.get('/api/users', getUsers);
app.post('/api/users', addUser);
app.post('/api/users/login', login);
app.get('/api/users/:id', getUserbyId);



app.get('/api/sum/:num1/:num2', (req, res) => {
  console.log(req.params);
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);
  if(isNaN(num1) || isNaN(num2)) {
    res.status(400);
    res.json({
      error: 'Molempien parametrien pitää olla numeroita.'
    });
    return;
  }
  res.json({'Kirjauksia': num1 + num2});
});

app.post('/api/tervehdys', (req, res) => {
  console.log(req.body);
  res.status(201);
  res.json({reply: 'Tervetuloa sovellukseen ' + req.body.sender});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
