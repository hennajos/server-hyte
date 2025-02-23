import express from 'express';
import {
  getEntries,
  postEntry,
} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const entryRouter = express.Router();

entryRouter.post('/', authenticateToken, postEntry);
entryRouter.get('/', authenticateToken, getEntries);



export default entryRouter;
