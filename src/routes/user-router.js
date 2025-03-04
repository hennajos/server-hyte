import express from 'express';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const userRouter = express.Router();

// all routes to /api/users
userRouter
  .route('/')
  .post(
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8, max: 120}),
    body('email').trim().isEmail(),
    validationErrorHandler,
    addUser,
    )
  .get(authenticateToken, getUsers)
  .put(authenticateToken, editUser);

// all routes to /api/users/:id
userRouter.route('/:id').get(getUserById).put(editUser).delete(deleteUser);


export default userRouter;
