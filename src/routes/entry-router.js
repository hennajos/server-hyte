import express from 'express';
import {getEntries, postEntry} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const entryRouter = express.Router();

// post to /api/entries
entryRouter
  .route('/')
  .post(
    authenticateToken,
    body('entry_date').notEmpty().isDate(),
    body('mood').trim().notEmpty().isLength({min: 3, max: 25}).escape(),
    body('weight').isFloat({min: 2, max: 200}),
    body('sleep_hours').isInt({min: 0, max: 24}),
    body('notes').trim().escape().custom((value, {req}) => {

      console.log('custom validator', value);
      return !(req.body.mood === value);
    }),
    validationErrorHandler,
    postEntry,
  )
  .get(authenticateToken, getEntries);

export default entryRouter;
