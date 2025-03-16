import {insertEntry, selectEntriesByUserId} from '../models/entry-model.js';
import {customError} from '../middlewares/error-handler.js';

const postEntry = async (req, res) => {
  try {
      const user_id = req.user.user_id; // Autentikoidun käyttäjän ID
      const { entry_date, mood, weight, sleep_hours, meal, notes } = req.body;

      if (!user_id) {
          return res.status(400).json({ error: 'User ID missing' });
      }

      const entry = { user_id, entry_date, mood, weight, sleep_hours, meal, notes };
      const entryId = await insertEntry(entry);
      res.status(201).json({ message: 'Entry added', entryId });
  } catch (error) {
    console.error("Error in postEntry:", error);
    res.status(500).json({ error: error.message });
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
