import {insertEntry, selectEntriesByUserId} from '../models/entry-model.js';
import {customError} from '../middlewares/error-handler.js';


const postEntry = async (req, res, next) => {
  // user_id, entry_date, mood, weight, sleep_hours, notes
  const newEntry = req.body;
  newEntry.user_id = req.user.user_id;

  try {
    await insertEntry(newEntry);
    res.status(201).json({message: "Entry added."});
  } catch (error) {
    next(customError(error.message, 500));
  }
};

/**
 * Get all entries of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res, next) => {
  try {
    const entries = await selectEntriesByUserId(req.user.user_id);
    if (entries.length === 0) {
      return next(customError("No entries found.", 404));
    }
    res.json(entries);
  } catch (error) {
    next(customError(error.message, 500));
  }
};

export {postEntry, getEntries};
