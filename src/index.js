import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.get('/api/', (req, res) => {
  res.send('Welcome to my REST API!');
});

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
  res.json({Summa: num1 + num2});
});

app.post('/api/moro', (req, res) => {
  console.log(req.body);
  res.status(201);
  res.json({reply: 'Tervetuloa sovellukseen ' + req.body.sender});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
