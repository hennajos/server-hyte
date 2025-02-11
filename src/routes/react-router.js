import express from 'express';
import {getEntries, getEntryById} from '../controllers/entry-controller.js';
import {getUsers, getUserById, users} from '../controllers/entry-controller.js';

const reactRouter = express.Router();

reactRouter.route('/')
  .get(getEntries)
  .get(getUsers);

reactRouter.route('/:id')
  .get(getEntryById)
  .get(getUserById);

reactRouter.post('/users', users);

export default reactRouter;
