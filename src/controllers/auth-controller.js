import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import {selectUserByUsername} from '../models/user-model.js';
import {customError} from '../middlewares/error-handler.js';


// user authentication (login)
const login = async (req, res, next) => {
  const {username, password} = req.body;
  if (!username) {
    return next(customError('Username missing.', 400));
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
  next(customError('Bad username/password.', 401));
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
