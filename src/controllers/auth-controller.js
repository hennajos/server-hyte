import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import {selectUserByUsername} from '../models/user-model.js';

// user authentication (login)
const login = async (req, res) => {
  const {username, password} = req.body;
  if (!username) {
    return res.status(401).json({message: 'Username missing.'});
  }
  const user = await selectUserByUsername(username);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.json({message: 'login ok', user, token});
    }
  }
    res.status(401).json({message: 'Bad username/password.'});
};

const getMe = (req, res) => {
  console.log('getMe', req.user);
  if (req.user) {
    res.json({message: 'token ok', user: req.user});
  } else {
    res.sendStatus(401);
  }
};

export {login, getMe};
