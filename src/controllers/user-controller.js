import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
import {
  insertUser,
  selectAllUsers,
  selectUserById,
} from '../models/user-model.js';
import {customError} from '../middlewares/error-handler.js';
import promisePool from '../utils/database.js';

// kaikkien käyttäjätietojen haku
const getUsers = async (req, res) => {
  // in real world application, password properties should never be sent to client
  const users = await selectAllUsers();
  res.json(users);
};

// Userin haku id:n perusteella
const getUserById = async (req, res, next) => {
  console.log('getUserById', req.params.id);

  try {
    const user = await selectUserById(req.params.id);
    console.log('User found:', user);
    // jos user löytyi, eli arvo ei ole undefined, lähetetään se vastauksena
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    next(customError(error.message, 500));
  }
};

// käyttäjän lisäys (rekisteröinti)
// lisätään parempi virheenkäsittely myöhemmin
const addUser = async (req, res, next) => {
  console.log('addUser request body', req.body);
  // esitellään 3 uutta muuttujaa, johon sijoitetaan req.body:n vastaavien propertyjen arvot
  const {username, password, email} = req.body;
  // luodaan selväkielisestä sanasta tiiviste, joka tallennetaan kantaan
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // luodaan uusi käyttäjä olio ja lisätään se tietokantaa käyttäen modelia
  const newUser = {
    username,
    password: hashedPassword,
    email,
  };
  try {
    const result = await insertUser(newUser);
    res.status(201);
    return res.json({message: 'User added. id: ' + result});
  } catch (error) {
    next(customError(error.message, 500));
  }
};

// Userin muokkaus id:n perusteella (käytä DB)
const editUser = async (req, res, next) => {
  try {
  console.log('editUser request body', req.body);
    const {username, password, email} = req.body;
    const [result] = await promisePool.execute(
      'UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?',
      [username, password, email, req.params.id]
    );
    if (result.affectedRows > 0) {
    res.json({message: 'User updated.'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
  } catch (error) {
    next(customError(error.message, 500));
  }
};

const postUser = async (req, res) => {
  // validation errors can be retrieved from the request object (added by express-validator middleware)
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const newUserId = await addUser(req.body);
  res.json({message: 'new user added', user_id: newUserId});
};

// Userin poisto id:n perusteella (käytä DB)
const deleteUser = async (req, res, next) => {
  try {
  console.log('deleteUser', req.params.id);
    const [result] = await promisePool.execute(
      'DELETE FROM users WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'User deleted.' });
  } else {
    res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    next(customError(error.message, 500));
  }
};

export {getUsers, getUserById, addUser, editUser, deleteUser, postUser};
