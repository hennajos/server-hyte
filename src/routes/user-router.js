import express from 'express';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
  login,
} from '../controllers/user-controller.js';
const userRouter = express.Router();

userRouter.route('/')
  .get(getUsers)
  .post(addUser);

userRouter.route('/:id')
  .get(getUserById)
  .put(editUser)
  .delete(deleteUser);

userRouter.post('/login', login);

export default userRouter;
