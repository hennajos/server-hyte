const items = [
  {id: 1, name: 'puu'},
  {id: 2, name: 'pensas'},
  {id: 3, name: 'kukka'},
  {id: 4, name: 'kasvi'},
];

const getItems = (req, res) => {
  res.json(items);
};

const getItembyId = (req, res) => {
  console.log('getItembyId', req.params.id);
  const item = items.find((item) => {
    return item.id == req.params.id;
  });
  console.log('Item found:', item)
  if (item) {
    res.json(item)
  } else {
    res.status(404);
    res.json({message: 'Item not found'});
  }
};

const addItem = (req, res) => {
  console.log('addItem request body', req.body);
  if (req.body.name) {
    const latestId = items[items.length-1].id
    const newItem = {id: latestId +1, name: req.body.name};
    items.push(newItem);
    res.status(201);
    return res.json({message: 'Item added.'});
  }
  res.status(400);
  return res.json({message: 'Missing name property.'});
};

const editItem = (req, res) => {
  console.log('editItem request body', req.body);
  const item = items.find((item) => item.id === req.params.id);
  if (item) {
    item.name = req.body.name;
    res.json({message: 'Updated item.'});
  } else {
    return res.status(404).json({ message: 'Item not found' });
  }
};

const deleteItem = (req, res) => {
  console.log('deleteItem request body', req.params.id);
  const index = items.findIndex((item) => item.id == req.params.id);
  if (index !== -1) {
    items.splice(index, 1);
    res.json({message: 'Item deleted'});
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

export {getItems, addItem, getItembyId, editItem, deleteItem};
