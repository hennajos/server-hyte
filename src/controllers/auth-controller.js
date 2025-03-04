import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import {selectUserByUsername} from '../models/user-model.js';
import {customError} from '../middlewares/error-handler.js';


// user authentication (login)
const login = async (req, res, next) => {
  const {username, password} = req.body;
  if (!username || !password) {
    return next(customError('Username and password are required.', 400));
  }

  try {
    const user = await selectUserByUsername(username);
    if (!user) {
      return next(customError('Bad username/password.', 401));
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(customError('Bad username/password.', 401));
    }

    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({message: 'login ok', token});
  } catch (error) {
    next(customError(error.message, 500));
  }
};

const getMe = (req, res, next) => {
  console.log('getMe', req.user);
  if (!req.user) {
    return next(customError('Unauthorized', 401));
  }
  res.json({message: 'token ok', user: {id: req.user.id, username: req.user.username}});
};

export {login, getMe};
