import express from 'express';
import {body} from 'express-validator';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';
const userRouter = express.Router();

/**
 * @api {get} /api/users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiHeader {String} Authorization Bearer token required.
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 401 Unauthorized.
 * @apiError {Object} 500 Server error.
 */

userRouter.get('/', authenticateToken, getUsers);

/**
 * @api {post} /api/users Register a new user
 * @apiName AddUser
 * @apiGroup Users
 *
 * @apiBody {String} username Unique username (3-20 chars, alphanumeric).
 * @apiBody {String} password Password (min 8 chars).
 * @apiBody {String} email Valid email address.
 *
 * @apiSuccess {String} message Success message.
 * @apiError {Object} 400 Validation error.
 */

userRouter.post(
  '/',
  body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
  body('password').trim().isLength({ min: 8, max: 120 }),
  body('email').trim().isEmail(),
  validationErrorHandler,
  addUser
);

/**
 * @api {get} /api/users/:id Get user by ID
 * @apiName GetUserById
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {Object} user User data.
 * @apiError {Object} 404 User not found.
 */
userRouter.get('/:id', getUserById);

/**
 * @api {put} /api/users/:id Edit user by ID
 * @apiName EditUser
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID.
 *
 * @apiBody {String} username Updated username.
 * @apiBody {String} password Updated password.
 * @apiBody {String} email Updated email.
 *
 * @apiSuccess {String} message Success message.
 * @apiError {Object} 404 User not found.
 */
userRouter.put('/:id', editUser);

/**
 * @api {delete} /api/users/:id Delete user by ID
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiError {Object} 404 User not found.
 */
userRouter.delete('/:id', deleteUser);

export default userRouter;
