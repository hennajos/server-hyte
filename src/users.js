const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

const getUsers = (req, res) => {
  res.json(users);
};

const addUser = (req, res) => {
  console.log('addUser request body', req.body);
  if (req.body.username && req.body.password && req.body.email) {
    const latestId = users[users.length - 1].id;
    const newUser = {
      id: latestId + 1,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
    users.push(newUser);
    res.status(201);
    return res.json({message: 'User added.'});
  }
  res.status(400);
  return res.json({message: 'Request missing a property.'});
};

const login = (req, res) => {
  const {username, password} = req.body;
  if (!username) {
    return res.status(401).json({message: 'Username missing.'});
  }
  const user = users.find((user) => {user.username === username});
  if (user && user.password === password) {
    res.json({message: 'Logged in', user});
  } else {
    res.status(401).json({message: 'Username or password missing.'})
  }
};

const getUserbyId = (req, res) => {
  console.log('getUserbyId', req.params.id);
  const user = users.find((user) => {
    return user.id == req.params.id;
  });
  console.log('User found:', user)
  if (user) {
    res.json(user)
  } else {
    res.status(404);
    res.json({message: 'User not found'});
  }
};

export {getUsers, addUser, login, getUserbyId};
