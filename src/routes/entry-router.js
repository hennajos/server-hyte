import express from 'express';
import {getEntries, postEntry} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const entryRouter = express.Router();

/**
 * @api {post} /api/entries Add new diary entry
 * @apiName PostEntry
 * @apiGroup Entries
 * @apiHeader {String} Authorization Bearer token required.
 *
 * @apiBody {String} entry_date Date of entry (YYYY-MM-DD).
 * @apiBody {String} mood Mood description (3-25 chars).
 * @apiBody {Number} weight Weight in kg (2-200).
 * @apiBody {Number} sleep_hours Hours slept (0-24).
 * @apiBody {String} meal Description of meal (3-200 chars).
 * @apiBody {String} notes Additional notes.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} entryId ID of the new entry.
 * @apiError {Object} 400 Validation error.
 * @apiError {Object} 500 Server error.
 */

//post to api entries
entryRouter
  .route('/')
  .post(
    authenticateToken,
    body('entry_date').notEmpty().isDate(),
    body('mood').trim().notEmpty().isLength({min: 3, max: 25}).escape(),
    body('weight', 'must be number between 2-200').isFloat({min: 2, max: 200}),
    body('sleep_hours').isInt({min: 0, max: 24}),
    body('meal').trim().notEmpty().isLength({min:3, max: 200}).escape(),
    //body('notes').isLength({min: 0, max: 1500}).escape(),
    body('notes').trim().escape().custom((value, {req}) => {
      console.log('custom validator', value);
      return !(req.body.mood === value);
    }),
    validationErrorHandler,
    postEntry,
  )

/**
 * @api {get} /api/entries Get all diary entries
 * @apiName GetEntries
 * @apiGroup Entries
 * @apiHeader {String} Authorization Bearer token required.
 *
 * @apiSuccess {Object[]} entries List of diary entries.
 * @apiError {Object} 401 Unauthorized.
 * @apiError {Object} 500 Server error.
 */
entryRouter.get('/', authenticateToken, getEntries);

export default entryRouter;
